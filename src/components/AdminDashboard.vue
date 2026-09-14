<template>
  <v-container fluid class="py-8 px-md-8 px-4">
    <div class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6">
      <div>
        <h2 class="text-h4 font-weight-black text-white d-flex align-center ga-2">
          <v-icon color="primary">mdi-shield-crown</v-icon> Panel de Administración FRIKI-CON
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-0">
          Gestión integral de inscritos, reservación de stands y configuración del evento.
        </p>
      </div>

      <div class="d-flex align-center ga-3">
        <v-btn color="error" variant="outlined" prepend-icon="mdi-logout" @click="logout">
          Cerrar Sesión
        </v-btn>
      </div>
    </div>

    <!-- Alert / Banner Message -->
    <v-alert v-if="alertMessage" :type="alertType" variant="tonal" closable class="mb-6" @click:close="alertMessage = ''">
      {{ alertMessage }}
    </v-alert>

    <v-card color="#2b1b14" class="rounded-xl border-gold shadow-xl">
      <v-tabs v-model="currentTab" bg-color="surface-bright" color="primary" grow>
        <v-tab value="participants" class="font-weight-bold" prepend-icon="mdi-account-group">
          Participantes ({{ participants.length }})
        </v-tab>
        <v-tab value="stands" class="font-weight-bold" prepend-icon="mdi-storefront">
          Stands Registrados ({{ stands.length }})
        </v-tab>
        <v-tab value="config" class="font-weight-bold" prepend-icon="mdi-cog">
          Configuración Evento
        </v-tab>
      </v-tabs>

      <v-divider></v-divider>

      <v-card-text class="pa-6">
        <!-- TAB 1: PARTICIPANTES -->
        <div v-if="currentTab === 'participants'">
          <div class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6">
            <div class="d-flex flex-wrap ga-2 align-center">
              <v-btn-toggle v-model="selectedCategory" color="primary" density="comfortable" mandatory>
                <v-btn value="" class="font-weight-bold">TODOS</v-btn>
                <v-btn value="COSPLAY" class="font-weight-bold">COSPLAY</v-btn>
                <v-btn value="KARAOKE" class="font-weight-bold">KARAOKE</v-btn>
                <v-btn value="DRAWING" class="font-weight-bold">DIBUJO</v-btn>
              </v-btn-toggle>

              <v-btn icon="mdi-refresh" variant="text" color="primary" title="Recargar Lista" @click="loadParticipants"></v-btn>
            </div>

            <!-- Botones PDF por categoría -->
            <div class="d-flex flex-wrap ga-2 align-center">
              <v-btn
                prepend-icon="mdi-file-pdf-box"
                color="#e09f3e"
                variant="outlined"
                size="small"
                class="font-weight-bold"
                title="Exportar lista Cosplay a PDF"
                @click="exportParticipantsPDF('COSPLAY')"
              >
                PDF Cosplay
              </v-btn>
              <v-btn
                prepend-icon="mdi-file-pdf-box"
                color="secondary"
                variant="outlined"
                size="small"
                class="font-weight-bold"
                title="Exportar lista Karaoke a PDF"
                @click="exportParticipantsPDF('KARAOKE')"
              >
                PDF Karaoke
              </v-btn>
              <v-btn
                prepend-icon="mdi-file-pdf-box"
                color="success"
                variant="outlined"
                size="small"
                class="font-weight-bold"
                title="Exportar lista Dibujo a PDF"
                @click="exportParticipantsPDF('DRAWING')"
              >
                PDF Dibujo
              </v-btn>
            </div>

            <div class="w-100 max-w-300">
              <v-text-field
                v-model="searchQuery"
                label="Buscar participante..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                hide-details
              ></v-text-field>
            </div>
          </div>

          <v-progress-linear v-if="loadingParticipants" indeterminate color="primary" class="mb-4"></v-progress-linear>

          <v-table v-else hover class="bg-transparent border rounded-lg">
            <thead>
              <tr>
                <th class="text-left font-weight-bold">Turno</th>
                <th class="text-left font-weight-bold">Participante</th>
                <th class="text-left font-weight-bold">Contacto</th>
                <th class="text-left font-weight-bold">Categoría</th>
                <th class="text-left font-weight-bold">Detalle Concurso</th>
                <th class="text-left font-weight-bold">Archivos</th>
                <th class="text-center font-weight-bold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in filteredParticipants" :key="p.id">
                <td>
                  <v-chip size="small" color="primary" class="font-weight-black text-black">
                    #{{ p.stageOrder || '-' }}
                  </v-chip>
                </td>
                <td>
                  <div class="font-weight-bold text-white">{{ p.fullName }}</div>
                  <div class="text-caption text-medium-emphasis">{{ p.age }} años</div>
                </td>
                <td>
                  <div class="text-body-2">{{ p.phone }}</div>
                </td>
                <td>
                  <v-chip
                    size="small"
                    :color="p.category === 'COSPLAY' ? 'primary' : p.category === 'KARAOKE' ? 'secondary' : 'accent'"
                    class="font-weight-bold"
                  >
                    {{ p.category }}
                  </v-chip>
                </td>
                <td>
                  <template v-if="p.category === 'COSPLAY'">
                    <span class="text-body-2 font-weight-medium text-white">
                      {{ p.specificData?.characterName || '-' }}
                    </span>
                  </template>
                  <template v-else-if="p.category === 'KARAOKE'">
                    <span class="text-body-2 font-weight-medium text-white">
                      {{ p.specificData?.songName || '-' }}
                    </span>
                  </template>
                  <template v-else-if="p.category === 'DRAWING'">
                    <div class="text-body-2 font-weight-medium text-white">
                      {{ p.specificData?.drawingName || '-' }}
                    </div>
                    <div class="text-caption text-medium-emphasis truncate max-w-200">
                      {{ p.specificData?.technicalSpec }}
                    </div>
                  </template>
                </td>
                <td>
                  <div class="d-flex ga-1">
                    <v-btn
                      v-if="p.specificData?.photoUrl"
                      icon="mdi-image"
                      size="x-small"
                      color="info"
                      title="Ver Foto / Muestra"
                      @click="previewMedia(p.specificData.photoUrl, 'image')"
                    ></v-btn>
                    <v-btn
                      v-if="p.specificData?.audioUrl"
                      icon="mdi-music-note"
                      size="x-small"
                      color="secondary"
                      title="Escuchar Audio Pista"
                      @click="previewMedia(p.specificData.audioUrl, 'audio')"
                    ></v-btn>
                  </div>
                </td>
                <td class="text-center">
                  <div class="d-flex justify-center ga-1">
                    <v-btn
                      icon="mdi-ticket-account"
                      size="small"
                      color="primary"
                      variant="text"
                      title="Ver Voucher"
                      @click="viewParticipantVoucher(p.id)"
                    ></v-btn>
                    <v-btn
                      icon="mdi-delete"
                      size="small"
                      color="error"
                      variant="text"
                      title="Eliminar Registro"
                      @click="confirmDeleteParticipant(p)"
                    ></v-btn>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredParticipants.length === 0">
                <td colspan="7" class="text-center text-medium-emphasis pa-6">
                  No se encontraron participantes inscritos.
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!-- TAB 2: STANDS -->
        <div v-if="currentTab === 'stands'">
          <div class="d-flex justify-space-between align-center mb-6">
            <h3 class="text-h6 font-weight-bold text-white">Lista de Stands Reservados</h3>
            <div class="d-flex align-center ga-2">
              <v-btn
                prepend-icon="mdi-file-pdf-box"
                color="info"
                variant="outlined"
                size="small"
                class="font-weight-bold"
                title="Exportar lista de Stands a PDF"
                @click="exportStandsPDF()"
              >
                PDF Stands
              </v-btn>
              <v-btn icon="mdi-refresh" variant="text" color="primary" title="Recargar Stands" @click="loadStands"></v-btn>
            </div>
          </div>

          <v-progress-linear v-if="loadingStands" indeterminate color="secondary" class="mb-4"></v-progress-linear>

          <v-table v-else hover class="bg-transparent border rounded-lg">
            <thead>
              <tr>
                <th class="text-left font-weight-bold">Stand #</th>
                <th class="text-left font-weight-bold">Negocio / Marca</th>
                <th class="text-left font-weight-bold">Encargado</th>
                <th class="text-left font-weight-bold">Rep. Legal</th>
                <th class="text-left font-weight-bold">Área</th>
                <th class="text-left font-weight-bold">Ubicación Mapas</th>
                <th class="text-center font-weight-bold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in stands" :key="s.id">
                <td>
                  <v-chip color="secondary" class="font-weight-black">
                    Stand #{{ s.standNumber }}
                  </v-chip>
                </td>
                <td class="font-weight-bold text-white">{{ s.businessName }}</td>
                <td>{{ s.participantName }}</td>
                <td>{{ s.legalRepresentative }}</td>
                <td>
                  <v-chip size="small" color="primary" variant="tonal" class="font-weight-bold">
                    {{ s.area }}
                  </v-chip>
                </td>
                <td>
                  <a :href="s.googleMapsUrl" target="_blank" class="text-secondary text-decoration-none d-flex align-center ga-1">
                    <v-icon size="18">mdi-map-marker</v-icon> Abrir Mapa
                  </a>
                </td>
                <td class="text-center">
                  <v-btn
                    icon="mdi-delete"
                    size="small"
                    color="error"
                    variant="text"
                    title="Eliminar Stand"
                    @click="confirmDeleteStand(s)"
                  ></v-btn>
                </td>
              </tr>
              <tr v-if="stands.length === 0">
                <td colspan="7" class="text-center text-medium-emphasis pa-6">
                  No hay stands registrados actualmente.
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!-- TAB 3: CONFIGURACIÓN EVENTO -->
        <div v-if="currentTab === 'config'" class="max-w-600 mx-auto py-4">
          <h3 class="text-h6 font-weight-bold text-white mb-4">Ajustes de Fecha Límite e Inscripciones</h3>
          
          <v-card variant="outlined" border color="surface-bright" class="pa-6 rounded-xl">
            <v-switch
              v-model="eventConfig.isRegistrationOpen"
              color="success"
              label="¿Inscripciones Abiertas para el Evento?"
              class="mb-4 font-weight-bold"
              hide-details
            ></v-switch>

            <v-text-field
              v-model="eventConfig.registrationDeadLine"
              label="Fecha y Hora Límite de Inscripciones"
              type="datetime-local"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-clock-outline"
              class="mb-6"
            ></v-text-field>

            <v-btn
              color="primary"
              size="large"
              block
              prepend-icon="mdi-content-save"
              class="font-weight-bold text-black"
              :loading="savingConfig"
              @click="saveEventConfig"
            >
              Guardar Configuración
            </v-btn>
          </v-card>
        </div>
      </v-card-text>
    </v-card>

    <!-- MEDIA PREVIEW DIALOG -->
    <v-dialog v-model="mediaDialog" max-width="600">
      <v-card color="#2b1b14" class="pa-4 rounded-xl border-gold">
        <v-card-title class="d-flex justify-space-between align-center mb-2">
          <span>Vista Previa de Archivo</span>
          <v-btn icon="mdi-close" variant="text" density="compact" @click="mediaDialog = false"></v-btn>
        </v-card-title>
        <v-card-text class="text-center">
          <img v-if="mediaType === 'image'" :src="mediaUrl" alt="Preview" class="w-100 rounded-lg shadow-lg" style="max-height: 450px; object-fit: contain;" />
          <audio v-else-if="mediaType === 'audio'" :src="mediaUrl" controls class="w-100 mt-4"></audio>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useParticipantStore } from '@/stores/participants';
import { useStandStore } from '@/stores/stands';
import { useEventConfigStore } from '@/stores/eventConfig';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const emit = defineEmits(['logout', 'show-voucher']);

const authStore = useAuthStore();
const participantStore = useParticipantStore();
const standStore = useStandStore();
const eventConfigStore = useEventConfigStore();

const { participants, loading: loadingParticipants } = storeToRefs(participantStore);
const { stands, loading: loadingStands } = storeToRefs(standStore);
const { eventConfig, loading: savingConfig } = storeToRefs(eventConfigStore);

const currentTab = ref('participants');
const selectedCategory = ref('');
const searchQuery = ref('');

const alertMessage = ref('');
const alertType = ref('success');

// Media Dialog
const mediaDialog = ref(false);
const mediaUrl = ref('');
const mediaType = ref('image');

onMounted(() => {
  loadParticipants();
  loadStands();
  loadConfig();
});

watch(selectedCategory, () => {
  loadParticipants();
});

const filteredParticipants = computed(() => {
  if (!searchQuery.value) return participants.value;
  const q = searchQuery.value.toLowerCase();
  return participants.value.filter((p) => {
    const nameMatch = p.fullName?.toLowerCase().includes(q);
    const phoneMatch = p.phone?.includes(q);
    const charMatch = p.specificData?.characterName?.toLowerCase().includes(q);
    const songMatch = p.specificData?.songName?.toLowerCase().includes(q);
    const drawMatch = p.specificData?.drawingName?.toLowerCase().includes(q);
    return nameMatch || phoneMatch || charMatch || songMatch || drawMatch;
  });
});

async function loadParticipants() {
  try {
    await participantStore.fetchParticipants(selectedCategory.value);
  } catch (err) {
    showAlert('Error al cargar la lista de participantes.', 'error');
  }
}

async function loadStands() {
  try {
    await standStore.fetchStands();
  } catch (err) {
    showAlert('Error al cargar la lista de stands.', 'error');
  }
}

async function loadConfig() {
  try {
    await eventConfigStore.fetchConfig();
  } catch (err) {
    console.error(err);
  }
}

async function saveEventConfig() {
  try {
    const res = await eventConfigStore.updateConfig(eventConfig.value);
    if (res.success) {
      showAlert(res.message || 'Configuración del evento actualizada con éxito.', 'success');
    } else {
      showAlert(res.message || res.error || 'No se pudo guardar la configuración.', 'error');
    }
  } catch (err) {
    showAlert(eventConfigStore.error || 'Error al guardar la configuración.', 'error');
  }
}

function previewMedia(url, type) {
  mediaUrl.value = url;
  mediaType.value = type;
  mediaDialog.value = true;
}

async function viewParticipantVoucher(id) {
  try {
    const res = await participantStore.getVoucher(id);
    if (res.success && res.data) {
      emit('show-voucher', res.data);
    }
  } catch (err) {
    showAlert('Error al generar comprobante.', 'error');
  }
}

async function confirmDeleteParticipant(p) {
  if (confirm(`¿Eliminar al participante "${p.fullName}" (#${p.stageOrder})?`)) {
    try {
      const res = await participantStore.deleteParticipant(p.id);
      if (res.success) {
        showAlert('Participante eliminado.', 'success');
      }
    } catch (err) {
      showAlert('Error al eliminar participante.', 'error');
    }
  }
}

async function confirmDeleteStand(s) {
  if (confirm(`¿Eliminar Stand #${s.standNumber} (${s.businessName})?`)) {
    try {
      const res = await standStore.deleteStand(s.id);
      if (res.success) {
        showAlert('Stand eliminado correctamente.', 'success');
      }
    } catch (err) {
      showAlert('Error al eliminar stand.', 'error');
    }
  }
}

function showAlert(msg, type) {
  alertMessage.value = msg;
  alertType.value = type;
}

function logout() {
  authStore.logout();
  emit('logout');
}

// ─── PDF EXPORT ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS = {
  COSPLAY: 'Cosplay',
  KARAOKE: 'Karaoke',
  DRAWING: 'Dibujo',
};

const CATEGORY_COLORS = {
  COSPLAY: [224, 159, 62],
  KARAOKE: [138, 43, 226],
  DRAWING: [30, 150, 100],
};

function exportParticipantsPDF(category) {
  const label = CATEGORY_LABELS[category] || category;
  const color = CATEGORY_COLORS[category] || [33, 150, 243];

  const list = participants.value.filter((p) => p.category === category);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  doc.setFillColor(...color);
  doc.rect(0, 0, 210, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`FRIKI-CON — Lista ${label}`, 14, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 240, 240);
  const now = new Date().toLocaleString('es-ES');
  doc.text(`Generado: ${now}  |  Total: ${list.length}`, 14, 20);

  const detailHeader = category === 'COSPLAY' ? 'Personaje' : category === 'KARAOKE' ? 'Canción' : 'Nombre Dibujo';

  const rows = list.map((p, i) => {
    let detalle = '-';
    if (category === 'COSPLAY') detalle = p.specificData?.characterName || '-';
    else if (category === 'KARAOKE') detalle = p.specificData?.songName || '-';
    else if (category === 'DRAWING') detalle = p.specificData?.drawingName || '-';
    return [i + 1, p.stageOrder ? `#${p.stageOrder}` : '-', p.fullName || '-', p.age ? `${p.age} años` : '-', p.phone || '-', detalle];
  });

  autoTable(doc, {
    startY: 28,
    head: [['#', 'Turno', 'Participante', 'Edad', 'Teléfono', detailHeader]],
    body: rows,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: color, textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 248, 248] },
    margin: { left: 14, right: 14 },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Página ${i} de ${pageCount}`, 196, 290, { align: 'right' });
  }

  doc.save(`friki-con_lista_${label.toLowerCase()}.pdf`);
}

function exportStandsPDF() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const color = [41, 128, 185];

  doc.setFillColor(...color);
  doc.rect(0, 0, 210, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('FRIKI-CON — Lista de Stands', 14, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(240, 240, 240);
  const now = new Date().toLocaleString('es-ES');
  doc.text(`Generado: ${now}  |  Total: ${stands.value.length}`, 14, 20);

  const rows = stands.value.map((s, i) => [
    i + 1,
    s.standNumber ? `Stand #${s.standNumber}` : '-',
    s.businessName || '-',
    s.participantName || '-',
    s.legalRepresentative || '-',
    s.area || '-',
  ]);

  autoTable(doc, {
    startY: 28,
    head: [['#', 'Stand', 'Negocio / Marca', 'Encargado', 'Rep. Legal', 'Área']],
    body: rows,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: color, textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 248, 248] },
    margin: { left: 14, right: 14 },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Página ${i} de ${pageCount}`, 196, 290, { align: 'right' });
  }

  doc.save('friki-con_lista_stands.pdf');
}
</script>

<style scoped>
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}
.max-w-300 {
  max-width: 300px;
}
.max-w-200 {
  max-width: 200px;
}
.max-w-600 {
  max-width: 600px;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
