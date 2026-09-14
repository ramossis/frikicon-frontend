<template>
  <v-dialog v-model="dialog" max-width="700" persistent scrollable>
    <v-card color="#2b1b14" class="rounded-xl border-gold shadow-2xl">
      <v-card-title class="d-flex align-center justify-space-between pa-4 bg-surface-bright border-b">
        <div class="d-flex align-center ga-2">
          <v-icon color="primary" size="28">mdi-account-edit-outline</v-icon>
          <span class="text-h6 font-weight-bold text-white">Inscripción a Concursos FRIKI-CON</span>
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

        <v-form ref="form" v-model="isFormValid" @submit.prevent="submitRegistration">
          <!-- Categoría Selector -->
          <v-label class="font-weight-bold mb-2 text-white">Selecciona tu Concurso:</v-label>
          <v-btn-toggle
            v-model="formData.category"
            color="primary"
            mandatory
            group
            class="d-flex w-100 mb-6 flex-wrap ga-2"
          >
            <v-btn value="COSPLAY" class="flex-1 font-weight-bold" prepend-icon="mdi-masks-theater">Cosplay</v-btn>
            <v-btn value="KARAOKE" class="flex-1 font-weight-bold" prepend-icon="mdi-microphone-variant">Karaoke</v-btn>
            <v-btn value="DRAWING" class="flex-1 font-weight-bold" prepend-icon="mdi-palette">Dibujo</v-btn>
          </v-btn-toggle>

          <!-- Datos Personales Base -->
          <h4 class="text-subtitle-1 font-weight-bold text-amber-lighten-2 mb-3">1. Datos Personales</h4>
          <v-row dense>
            <v-col cols="12" sm="8">
              <v-text-field
                v-model="formData.fullName"
                label="Nombre Completo *"
                variant="outlined"
                density="comfortable"
                :rules="[v => !!v || 'El nombre es obligatorio']"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="4">
              <v-text-field
                v-model.number="formData.age"
                label="Edad *"
                type="number"
                variant="outlined"
                density="comfortable"
                :rules="[
                  v => !!v || 'Edad requerida',
                  v => (v && v >= 5 && v <= 99) || 'Edad inválida'
                ]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                v-model="formData.phone"
                label="Número de Teléfono / WhatsApp *"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-phone"
                :rules="[v => !!v || 'Teléfono obligatorio']"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Datos Específicos por Categoría -->
          <h4 class="text-subtitle-1 font-weight-bold text-amber-lighten-2 mt-4 mb-3">
            2. Detalles de {{ currentCategoryTitle }}
          </h4>

          <!-- COSPLAY FIELDS -->
          <template v-if="formData.category === 'COSPLAY'">
            <v-text-field
              v-model="categoryData.characterName"
              label="Nombre del Personaje y Serie *"
              placeholder="Ej: Goku (Dragon Ball Z) / Naruto Uzumaki"
              variant="outlined"
              density="comfortable"
              :rules="[v => !!v || 'Ingresa el personaje']"
              required
            ></v-text-field>

            <v-file-input
              v-model="photoFile"
              label="Foto del Personaje / Traje (JPG, PNG) *"
              accept="image/*"
              variant="outlined"
              density="comfortable"
              prepend-icon="mdi-camera"
              show-size
              :rules="[v => !!v || 'Debes subir una foto de referencia']"
              required
            ></v-file-input>

            <v-file-input
              v-model="audioFile"
              label="Pista de Audio MP3/WAV (Máximo 2 Minutos) *"
              accept="audio/*"
              variant="outlined"
              density="comfortable"
              prepend-icon="mdi-music-note"
              show-size
              hint="La pista no debe superar los 120 segundos de duración"
              persistent-hint
              :rules="[v => !!v || 'Debes subir tu pista de audio']"
              required
            ></v-file-input>
          </template>

          <!-- KARAOKE FIELDS -->
          <template v-if="formData.category === 'KARAOKE'">
            <v-text-field
              v-model="categoryData.songName"
              label="Nombre de la Canción -  Serie *"
              placeholder="Ej: Unravel (Tokyo Ghoul) - Blue Bird (Naruto)"
              variant="outlined"
              density="comfortable"
              :rules="[v => !!v || 'Ingresa el nombre de la canción']"
              required
            ></v-text-field>

            <v-file-input
              v-model="audioFile"
              label="Pista Instrumental MP3/WAV (Máximo 2 Minutos) *"
              accept="audio/*"
              variant="outlined"
              density="comfortable"
              prepend-icon="mdi-music"
              show-size
              hint="Pista instrumental de acompañamiento (máximo 120s)"
              persistent-hint
              :rules="[v => !!v || 'Debes cargar la pista instrumental']"
              required
            ></v-file-input>
          </template>

          <!-- DRAWING FIELDS -->
          <template v-if="formData.category === 'DRAWING'">
            <v-text-field
              v-model="categoryData.drawingName"
              label="Título del Dibujo / Obra *"
              placeholder="Ej: El Despertar del Guerrero"
              variant="outlined"
              density="comfortable"
              :rules="[v => !!v || 'Ingresa el título del dibujo']"
              required
            ></v-text-field>

            <v-textarea
              v-model="categoryData.technicalSpec"
              label="Especificaciones Técnicas / Descripción *"
              placeholder="Ej: Dibujo Digital realizado en Photoshop / Lápiz de grafito y acuarela sobre papel Guarro."
              variant="outlined"
              density="comfortable"
              rows="3"
              :rules="[v => !!v || 'Especifica la técnica utilizada']"
              required
            ></v-textarea>

            <v-file-input
              v-model="photoFile"
              label="Imagen de la Obra / Boceto (JPG, PNG) *"
              accept="image/*"
              variant="outlined"
              density="comfortable"
              prepend-icon="mdi-image"
              show-size
              :rules="[v => !!v || 'Adjunta una vista previa de tu obra']"
              required
            ></v-file-input>
          </template>

          <!-- ESPACIO DE REGLAS ESPECÍFICAS Y CHECKBOX -->
          <h4 class="text-subtitle-1 font-weight-bold text-amber-lighten-2 mt-4 mb-2">
            3. Reglas y Condiciones del Concurso
          </h4>

          <v-card variant="tonal" color="surface-bright" class="pa-4 rounded-lg border mb-4">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon color="secondary">mdi-file-document-check-outline</v-icon>
              <span class="font-weight-bold text-white">
                Bases Oficiales - {{ currentRule.title }}
              </span>
            </div>

            <div class="rules-scrollable border pa-3 rounded bg-surface" style="max-height: 180px; overflow-y: auto;">
              <ul class="pl-4 text-body-2 text-white font-weight-medium">
                <li v-for="(ruleItem, i) in currentRule.rulesList" :key="i" class="mb-2">
                  {{ ruleItem }}
                </li>
              </ul>
            </div>

            <v-checkbox
              v-model="acceptedRules"
              color="success"
              class="mt-3 text-high-emphasis font-weight-bold"
              hide-details
            >
              <template #label>
                <span class="text-white font-weight-medium">
                  He leído, comprendo y acepto las reglas y normas del concurso {{ formData.category }} *
                </span>
              </template>
            </v-checkbox>
          </v-card>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4 bg-surface-bright border-t d-flex justify-space-between">
        <v-btn variant="outlined" color="grey" @click="close">Cancelar</v-btn>
        <v-btn
          color="primary"
          variant="elevation"
          size="large"
          class="font-weight-bold px-6"
          :loading="loading"
          :disabled="!acceptedRules || !isFormValid"
          @click="submitRegistration"
        >
          Confirmar e Inscribirme
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { RULES_DATA } from '@/data/rules';
import { useParticipantStore } from '@/stores/participants';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  initialCategory: { type: String, default: 'COSPLAY' }
});

const emit = defineEmits(['update:modelValue', 'registered']);
const participantStore = useParticipantStore();

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const isFormValid = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const acceptedRules = ref(false);

const formData = ref({
  fullName: '',
  age: null,
  phone: '',
  category: props.initialCategory || 'COSPLAY'
});

const categoryData = ref({
  characterName: '',
  songName: '',
  drawingName: '',
  technicalSpec: ''
});

const photoFile = ref(null);
const audioFile = ref(null);

watch(() => props.initialCategory, (newCat) => {
  if (newCat) {
    formData.value.category = newCat;
  }
});

watch(() => formData.value.category, () => {
  acceptedRules.value = false;
  errorMessage.value = '';
});

const currentRule = computed(() => RULES_DATA[formData.value.category] || RULES_DATA.COSPLAY);
const currentCategoryTitle = computed(() => {
  return formData.value.category === 'COSPLAY' ? 'Cosplay' :
         formData.value.category === 'KARAOKE' ? 'Karaoke' : 'Dibujo';
});

function getFileObject(fileInput) {
  if (!fileInput) return null;
  if (Array.isArray(fileInput)) return fileInput[0] || null;
  return fileInput;
}

function close() {
  dialog.value = false;
  resetForm();
}

function resetForm() {
  formData.value = {
    fullName: '',
    age: null,
    phone: '',
    category: props.initialCategory || 'COSPLAY'
  };
  categoryData.value = {
    characterName: '',
    songName: '',
    drawingName: '',
    technicalSpec: ''
  };
  photoFile.value = null;
  audioFile.value = null;
  acceptedRules.value = false;
  errorMessage.value = '';
}

async function submitRegistration() {
  if (!acceptedRules.value) {
    errorMessage.value = 'Debes aceptar las reglas del concurso para continuar.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const photo = getFileObject(photoFile.value);
    const audio = getFileObject(audioFile.value);

    const payload = {
      fullName: formData.value.fullName,
      age: Number(formData.value.age),
      phone: formData.value.phone,
      category: formData.value.category,
      categoryData: categoryData.value,
      photoFile: photo,
      audioFile: audio
    };

    const res = await participantStore.registerParticipant(payload);
    if (res.success) {
      emit('registered', res.data);
      close();
    } else {
      errorMessage.value = res.message || res.error || 'Ocurrió un error al procesar el registro.';
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = participantStore.error || 'Error al conectar con el servidor. Verifica el archivo cargado y los datos.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}
.rules-scrollable::-webkit-scrollbar {
  width: 6px;
}
.rules-scrollable::-webkit-scrollbar-thumb {
  background: rgba(224, 159, 62, 0.5);
  border-radius: 4px;
}
</style>
