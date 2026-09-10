<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card color="#2b1b14" class="rounded-xl border-gold pa-6 text-center voucher-card position-relative">
      
      <!-- Contenedor optimizado para PDF con estilos fijos que evitan desbordes -->
      <div ref="pdfRef" class="pdf-ticket-container">
        <div class="ticket-header mb-3">
          <img
            src="/images/LOGO PRINCIPAL.png"
            alt="FRIKI-CON"
            class="pdf-logo mx-auto mb-2"
          />
          <div class="pdf-chip mb-2">
            COMPROBANTE OFICIAL DE INSCRIPCIÓN
          </div>
        </div>

        <div v-if="voucherData" class="pdf-body">
          <div class="pdf-row border-b pb-2 mb-2">
            <span class="pdf-label">CÓDIGO TICKET:</span>
            <span class="pdf-value-primary">
              {{ voucherData.ticketNumber || `FK-${voucherData.id?.toString().padStart(4, '0')}` }}
            </span>
          </div>

          <div class="pdf-row mb-2">
            <span class="pdf-label">Participante:</span>
            <span class="pdf-value-white">{{ voucherData.fullName }}</span>
          </div>

          <div class="pdf-row mb-2">
            <span class="pdf-label">Categoría:</span>
            <span class="pdf-badge-sec">{{ voucherCategory }}</span>
          </div>

          <div class="pdf-row mb-2" v-if="stageOrder">
            <span class="pdf-label">Turno en Escenario:</span>
            <span class="pdf-avatar">{{ stageOrder }}</span>
          </div>

            <div class="pdf-row mb-2">
            <span class="pdf-label">Teléfono:</span>
            <span class="pdf-value-white">{{ voucherData.phone }}</span>
          </div>

          <div class="pdf-row mb-3">
            <span class="pdf-label">Estado Reglas:</span>
            <span class="pdf-success">✔ REGLAS ACEPTADAS</span>
          </div>
        </div>

        <p class="pdf-footer-text">
          Presenta este comprobante o número de ticket el día del evento en la mesa de control de participantes.
        </p>
      </div>

      <!-- Botones de acción fuera del área del PDF -->
      <div class="d-flex ga-3 justify-center mt-4">
        <v-btn color="primary" variant="elevation" prepend-icon="mdi-download" @click="downloadPDF">
          Descargar Ticket PDF
        </v-btn>
        <v-btn variant="outlined" color="white" @click="close">
          Cerrar
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  voucherData: { type: Object, default: null }
});

const emit = defineEmits(['update:modelValue']);
const pdfRef = ref(null);

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const voucherCategory = computed(() => {
  if (!props.voucherData) return '';
  if (props.voucherData.category) return props.voucherData.category;
  if (props.voucherData.cosplay || props.voucherData.entry?.characterName) return 'COSPLAY';
  if (props.voucherData.karaoke || props.voucherData.entry?.songName) return 'KARAOKE';
  if (props.voucherData.drawing || props.voucherData.entry?.drawingName) return 'DRAWING';
  return 'PARTICIPANTE';
});

const stageOrder = computed(() => {
  if (!props.voucherData) return null;
  return props.voucherData.stageOrder ||
         props.voucherData.entry?.stageOrder ||
         props.voucherData.cosplay?.stageOrder ||
         props.voucherData.karaoke?.stageOrder ||
         props.voucherData.drawing?.stageOrder || null;
});

function close() {
  dialog.value = false;
}

async function downloadPDF() {
  if (!pdfRef.value) return;

  try {
    const html2pdf = (await import('html2pdf.js')).default;

    const options = {
      margin: 2,
      filename: `ticket-${props.voucherData?.ticketNumber || 'friki-con'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#2b1b14',
        scrollY: 0 
      },
      jsPDF: { 
        unit: 'mm', 
        format: [80, 150], 
        orientation: 'portrait' 
      } 
    };

    html2pdf().from(pdfRef.value).set(options).save();
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
}
</script>

<style scoped>
.voucher-card {
  background: radial-gradient(circle at 50% 0%, #3a251b 0%, #1a100c 100%);
}
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}

/* Estilos estrictos y fijos para el contenedor del PDF para evitar desbordes y tamaños desiguales */
.pdf-ticket-container {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
  color: #ffffff;
  font-family: inherit;
}

.pdf-logo {
  max-width: 110px !important;
  max-height: 45px !important;
  display: block;
  object-fit: contain;
}

.pdf-chip {
  background-color: rgb(var(--v-theme-primary));
  color: #000;
  font-weight: 900;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
}

.pdf-body {
  background-color: rgba(var(--v-theme-surface-variant), 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  text-align: left;
}

.pdf-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.pdf-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
}

.pdf-value-primary {
  font-size: 15px;
  font-weight: 900;
  color: rgb(var(--v-theme-primary));
}

.pdf-value-white {
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
}

.pdf-badge-sec {
  background-color: rgb(var(--v-theme-secondary));
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

.pdf-avatar {
  background-color: rgb(var(--v-theme-primary));
  color: #000;
  font-weight: 900;
  font-size: 12px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.pdf-success {
  font-size: 11px;
  font-weight: bold;
  color: #4caf50;
}

.pdf-footer-text {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 12px;
  line-height: 1.3;
}
</style>