<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner
      @open-participant-register="$emit('open-participant-register')"
      @open-stand-register="$emit('open-stand-register')"
    />

    <!-- MAIN CONTROL PANEL -->
    <v-container id="concursos" fluid class="py-6 px-md-8">
      
      <!-- Header Title of Control Panel -->
      <div class="d-flex align-center justify-center ga-3 mb-6">
        <h2 class="text-h4 text-md-h3 font-weight-bold text-white text-center">
          Informacion General Frikicon
        </h2>
        <v-chip color="primary" variant="flat" class="font-weight-bold cursor-pointer" size="small">
        </v-chip>
      </div>

      <!-- Image Gallery: Día 1, Día 2, Mapa -->
      <v-row class="mb-2">
        <!-- Día 1 -->
        <v-col cols="12" md="4">
          <v-card
            class="friki-panel-box overflow-hidden cursor-pointer gallery-card"
            @click="openLightbox('/images/dia1.png', 'Programa Día 1')"
          >
            <v-img
              src="/images/dia1.png"
              height="320"
              cover
              class="gallery-img"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary" />
                </div>
              </template>
              <div class="gallery-overlay d-flex flex-column align-center justify-end pa-3">
                <v-icon size="36" color="white" class="mb-1">mdi-magnify-plus-outline</v-icon>
                <span class="text-subtitle-2 font-weight-bold text-white">Día 1</span>
              </div>
            </v-img>
          </v-card>
        </v-col>

        <!-- Día 2 -->
        <v-col cols="12" md="4">
          <v-card
            class="friki-panel-box overflow-hidden cursor-pointer gallery-card"
            @click="openLightbox('/images/dia2.png', 'Programa Día 2')"
          >
            <v-img
              src="/images/dia2.png"
              height="320"
              cover
              class="gallery-img"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary" />
                </div>
              </template>
              <div class="gallery-overlay d-flex flex-column align-center justify-end pa-3">
                <v-icon size="36" color="white" class="mb-1">mdi-magnify-plus-outline</v-icon>
                <span class="text-subtitle-2 font-weight-bold text-white">Día 2</span>
              </div>
            </v-img>
          </v-card>
        </v-col>

        <!-- Mapa (placeholder para imagen futura) -->
        <v-col cols="12" md="4" id="mapa">
          <v-card
            class="friki-panel-box overflow-hidden cursor-pointer gallery-card"
            height="320"
            @click="mapImageSrc ? openLightbox(mapImageSrc, 'Mapa del Evento') : null"
          >
               <v-img
              src="/images/mapa_frikicon.png"
              height="320"
              cover
              class="gallery-img"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary" />
                </div>
              </template>
              <div class="gallery-overlay d-flex flex-column align-center justify-end pa-3">
                <v-icon size="36" color="white" class="mb-1">mdi-magnify-plus-outline</v-icon>
                <span class="text-subtitle-2 font-weight-bold text-white">Día 2</span>
              </div>
            </v-img>
            <div class="d-flex flex-column align-center justify-center fill-height ga-3 pa-4" style="height: 320px;">
              <v-icon size="64" color="secondary">mdi-map-marker-path</v-icon>
              <span class="text-h6 font-weight-bold text-white text-center">Mapa del Evento</span>
              <span class="text-caption text-medium-emphasis text-center">Próximamente</span>
              <v-chip color="amber" size="small" variant="tonal">Disponible pronto</v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Lightbox Dialog -->
      <v-dialog v-model="lightboxOpen" max-width="95vw" max-height="95vh" @click:outside="lightboxOpen = false">
        <v-card class="bg-black position-relative pa-0" style="max-height: 95vh;">
          <v-btn
            icon
            variant="text"
            color="white"
            class="lightbox-close-btn"
            @click="lightboxOpen = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="text-subtitle-2 font-weight-bold text-white text-center pt-3 pb-1">{{ lightboxTitle }}</div>
          <v-img
            :src="lightboxSrc"
            contain
            style="max-height: calc(95vh - 60px); width: 100%;"
          />
        </v-card>
      </v-dialog>
    </v-container>

    <!-- Stands Banner Showcase -->

    <!-- Rules & Regulations Section -->
    <RulesSection
      @open-participant-register="$emit('open-participant-register')"
      @open-stand-register="$emit('open-stand-register')"
    />
  </div>
</template>
Día 2
<script setup>
import { ref } from 'vue';
import HeroBanner from '@/components/HeroBanner.vue';
import RulesSection from '@/components/RulesSection.vue';

defineEmits(['open-participant-register', 'open-stand-register', 'show-voucher']);

// Gallery lightbox
const lightboxOpen = ref(false);
const lightboxSrc = ref('');
const lightboxTitle = ref('');

// Placeholder: when the map image is ready, set this to the image path
const mapImageSrc = ref('');

function openLightbox(src, title) {
  lightboxSrc.value = src;
  lightboxTitle.value = title;
  lightboxOpen.value = true;
}
</script>

<style scoped>
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}
.bg-surface-dark {
  background-color: #180d09;
}

/* Gallery cards */
.gallery-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 180, 216, 0.3) !important;
}
.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.25s ease;
}
.gallery-card:hover .gallery-overlay {
  opacity: 1;
}

/* Lightbox */
.lightbox-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}
</style>



