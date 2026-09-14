<template>
  <v-container id="reglas" class="py-12">
    <div class="text-center mb-8">
      <v-chip color="secondary" variant="tonal" class="mb-2 font-weight-bold">
        INFORMACIÓN Y REGLAMENTOS
      </v-chip>
      <h2 class="text-h3 font-weight-bold text-white mb-2">
        Bases y Reglas de los Concursos
      </h2>
      <p class="text-subtitle-1 text-medium-emphasis max-w-600 mx-auto">
        Consulta las normativas oficiales para participar en Cosplay, Karaoke y Dibujo
      </p>
    </div>

    <v-tabs v-model="activeTab" center-active align-tabs="center" color="primary" class="mb-8">
      <v-tab value="COSPLAY" prepend-icon="mdi-masks-theater" class="font-weight-bold">Cosplay</v-tab>
      <v-tab value="KARAOKE" prepend-icon="mdi-microphone-variant" class="font-weight-bold">Karaoke</v-tab>
      <v-tab value="DRAWING" prepend-icon="mdi-palette" class="font-weight-bold">Dibujo</v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <v-window-item v-for="(rule, key) in RULES_DATA" :key="key" :value="key">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-card color="#2b1b14" class="pa-6 rounded-xl rule-card border-gold">
              <div class="d-flex align-center mb-4 ga-3">
                <v-avatar color="primary" size="56" variant="tonal">
                  <v-icon size="32">{{ rule.icon }}</v-icon>
                </v-avatar>
                <div>
                  <h3 class="text-h5 font-weight-bold text-white">{{ rule.title }}</h3>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ rule.description }}</p>
                </div>
              </div>

              <v-divider class="my-4"></v-divider>

              <div class="rules-list">
                <div v-for="(item, idx) in rule.rulesList" :key="idx" class="d-flex align-start ga-3 mb-3">
                  <v-icon color="primary" size="20" class="mt-1">mdi-check-circle</v-icon>
                  <span class="text-body-1 text-high-emphasis">{{ item }}</span>
                </div>
              </div>

              <div class="mt-6 text-center">
                <v-btn
                  v-if="key !== 'STAND'"
                  color="primary"
                  size="large"
                  prepend-icon="mdi-file-document-edit"
                  rounded="lg"
                  class="font-weight-bold text-black"
                  @click="$emit('open-participant-register', key)"
                >
                  Inscribirme en {{ key === 'COSPLAY' ? 'Cosplay' : key === 'KARAOKE' ? 'Karaoke' : 'Dibujo' }}
                </v-btn>
                <v-btn
                  v-else
                  color="secondary"
                  size="large"
                  prepend-icon="mdi-storefront"
                  rounded="lg"
                  class="font-weight-bold"
                  @click="$emit('open-stand-register')"
                >
                  Solicitar Stand
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { RULES_DATA } from '@/data/rules';

defineEmits(['open-participant-register', 'open-stand-register']);

const activeTab = ref('COSPLAY');
</script>

<style scoped>
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}
.max-w-600 {
  max-width: 600px;
}
.rule-card {
  background: rgba(43, 27, 20, 0.9);
  backdrop-filter: blur(10px);
}
</style>
