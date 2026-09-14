<template>
  <v-dialog v-model="dialog" max-width="750" persistent scrollable>
    <v-card color="#2b1b14" class="rounded-xl border-gold shadow-2xl">
      <v-card-title class="d-flex align-center justify-space-between pa-4 bg-surface-bright border-b">
        <div class="d-flex align-center ga-2">
          <v-icon color="secondary" size="28">mdi-storefront-outline</v-icon>
          <span class="text-h6 font-weight-bold text-white">Solicitud de Reserva de Stand</span>
        </div>
        <v-btn icon="mdi-close" variant="text" density="compact" @click="close"></v-btn>
      </v-card-title>

      <v-card-text class="pa-6">
        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          closable
          class="mb-4"
          @click:close="errorMessage = ''"
        >
          {{ errorMessage }}
        </v-alert>

        <v-form ref="form" v-model="isFormValid" @submit.prevent="submitStand">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.businessName"
                label="Nombre del Negocio / Stand *"
                variant="outlined"
                density="comfortable"
                :rules="[v => !!v || 'Campo obligatorio']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.participantName"
                label="Nombre del Encargado *"
                variant="outlined"
                density="comfortable"
                :rules="[v => !!v || 'Campo obligatorio']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.legalRepresentative"
                label="Representante Legal *"
                variant="outlined"
                density="comfortable"
                :rules="[v => !!v || 'Campo obligatorio']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formData.contact"
                label="Teléfono / Contacto *"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-phone"
                :rules="[v => !!v || 'Campo obligatorio']"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="formData.area"
                label="Área Asignada *"
                :items="['COMERCIAL', 'ARTISTICO', 'COLECCIONISTA']"
                variant="outlined"
                density="comfortable"
                :rules="[v => !!v || 'Selecciona un área']"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="formData.standNumber"
                label="Número de Stand *"
                type="number"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-numeric"
                :rules="[
                  v => !!v || 'Número de stand requerido',
                  v => v > 0 || 'Debe ser mayor a 0'
                ]"
                required
              ></v-text-field>
            </v-col>

            <!-- SELECCIONADOR DE UBICACIÓN INTERACTIVO (MAPA) -->
            <v-col cols="12">
              <div class="d-flex align-center justify-space-between mb-1">
                <span class="text-subtitle-2 font-weight-bold text-amber-lighten-2 d-flex align-center ga-1">
                  <v-icon size="18" color="secondary">mdi-map-marker-radius</v-icon>
                  Selecciona la ubicación en el mapa *
                </span>
                <span class="text-caption text-amber-lighten-3 font-weight-medium">Haz clic en el mapa para fijar el punto</span>
              </div>

              <!-- Contenedor del Mapa Interactivo (OpenStreetMap / Leaflet integrable o selector visual) -->
              <div class="map-picker-container rounded-lg overflow-hidden border mb-3 position-relative">
                <div id="select-map" class="interactive-map"></div>
                <div v-if="mapLoading" class="map-loading-overlay">
                  <v-progress-circular indeterminate color="secondary" size="32"></v-progress-circular>
                </div>
              </div>
            </v-col>

            <!-- ENLACE GENERADO AUTOMÁTICAMENTE -->
            <v-col cols="12">
              <v-text-field
                v-model="formData.googleMapsUrl"
                label="Enlace de Google Maps (Automático) *"
                placeholder="Selecciona un punto en el mapa de arriba"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-map-marker-check"
                readonly
                :rules="[v => !!v || 'Debes seleccionar una ubicación en el mapa']"
                required
              >
                <template #append-inner>
                  <v-btn
                    v-if="formData.googleMapsUrl"
                    icon="mdi-open-in-new"
                    variant="text"
                    size="small"
                    color="secondary"
                    target="_blank"
                    :href="formData.googleMapsUrl"
                    title="Ver en Google Maps"
                  ></v-btn>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <!-- REGLAS DE STAND Y CHECKBOX -->
          <h4 class="text-subtitle-1 font-weight-bold text-amber-lighten-2 mt-4 mb-2">
            Normativa y Reglamento para Expositores
          </h4>

          <v-card variant="tonal" color="surface-bright" class="pa-4 rounded-lg border mb-2">
            <div class="rules-scrollable border pa-3 rounded bg-surface mb-3" style="max-height: 140px; overflow-y: auto;">
              <ul class="pl-4 text-body-2 text-white font-weight-medium">
                <li v-for="(ruleItem, i) in standRules.rulesList" :key="i" class="mb-2">
                  {{ ruleItem }}
                </li>
              </ul>
            </div>

            <v-checkbox
              v-model="acceptedRules"
              color="secondary"
              class="text-high-emphasis font-weight-bold"
              hide-details
            >
              <template #label>
                <span class="text-white font-weight-medium">
                  Acepto el reglamento y normas de operación para Stands en FRIKI-CON *
                </span>
              </template>
            </v-checkbox>
          </v-card>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4 bg-surface-bright border-t d-flex justify-space-between">
        <v-btn variant="outlined" color="grey" @click="close">Cancelar</v-btn>
        <v-btn
          color="secondary"
          variant="elevation"
          size="large"
          class="font-weight-bold px-6"
          :loading="loading"
          :disabled="!acceptedRules || !isFormValid"
          @click="submitStand"
        >
          Registrar Stand
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { RULES_DATA } from '@/data/rules';
import { useStandStore } from '@/stores/stands';

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'registered']);
const standStore = useStandStore();

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const standRules = RULES_DATA.STAND;
const isFormValid = ref(false);
const loading = ref(false);
const mapLoading = ref(false);
const errorMessage = ref('');
const acceptedRules = ref(false);

const formData = ref({
  businessName: '',
  participantName: '',
  legalRepresentative: '',
  contact: '',
  googleMapsUrl: '',
  standNumber: 1,
  area: 'COMERCIAL'
});

let mapInstance = null;
let markerInstance = null;

// Inicializar mapa cuando se abre el diálogo
watch(dialog, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    initMap();
  } else {
    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
      markerInstance = null;
    }
  }
});

function initMap() {
  if (mapInstance) return;
  mapLoading.value = true;

  // Cargar dinámicamente Leaflet si no está cargado (ideal para integrarse sin configuraciones pesadas previas)
  if (!window.L) {
    const leafletCSS = document.createElement('link');
    leafletCSS.rel = 'stylesheet';
    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCSS);

    const leafletJS = document.createElement('script');
    leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    leafletJS.onload = () => createMapInstance();
    document.head.appendChild(leafletJS);
  } else {
    createMapInstance();
  }
}

function createMapInstance() {
  mapLoading.value = false;
  const container = document.getElementById('select-map');
  if (!container) return;

  // Coordenadas por defecto (ej. Oruro, Bolivia o centro referencial)
  const defaultLat = -17.9647;
  const defaultLng = -67.1060;

  mapInstance = window.L.map('select-map').setView([defaultLat, defaultLng], 14);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);

  mapInstance.on('click', (e) => {
    const { lat, lng } = e.latlng;
    
    if (markerInstance) {
      markerInstance.setLatLng([lat, lng]);
    } else {
      markerInstance = window.L.marker([lat, lng]).addTo(mapInstance);
    }

    // Rellena automáticamente el input con el enlace oficial de Google Maps basado en las coordenadas seleccionadas
    formData.value.googleMapsUrl = `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
  });
}

function close() {
  dialog.value = false;
  resetForm();
}

function resetForm() {
  formData.value = {
    businessName: '',
    participantName: '',
    legalRepresentative: '',
    contact: '',
    googleMapsUrl: '',
    standNumber: 1,
    area: 'COMERCIAL'
  };
  acceptedRules.value = false;
  errorMessage.value = '';
  if (markerInstance && mapInstance) {
    mapInstance.removeLayer(markerInstance);
    markerInstance = null;
  }
}

async function submitStand() {
  if (!acceptedRules.value) {
    errorMessage.value = 'Debes aceptar los términos y normas para stands.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const res = await standStore.registerStand(formData.value);
    if (res.success) {
      emit('registered', res.data);
      close();
    } else {
      errorMessage.value = res.message || res.error || 'No se pudo registrar el stand.';
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = standStore.error || 'Error al procesar el registro del stand.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}
.map-picker-container {
  height: 220px;
  border: 1px solid rgba(224, 159, 62, 0.4);
  background: #1a120e;
}
.interactive-map {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.map-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(43, 27, 20, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.rules-scrollable::-webkit-scrollbar {
  width: 6px;
}
.rules-scrollable::-webkit-scrollbar-thumb {
  background: rgba(0, 180, 216, 0.5);
  border-radius: 4px;
}
</style>