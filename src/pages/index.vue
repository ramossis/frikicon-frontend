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
          Panel de Control de la FrikiKon
        </h2>
        <v-chip color="primary" variant="flat" class="font-weight-bold cursor-pointer" size="small">
          Explora &raquo;
        </v-chip>
      </div>

      <v-row>
        <!-- Left & Center: Two Grouped Modules -->
        <v-col cols="12" lg="9">
          <v-row>
            <!-- MODULE 1: Gestión de Stands (Rutas Creativas) -->
            <v-col cols="12" md="6">
              <div class="friki-panel-box pa-4 fill-height d-flex flex-column justify-space-between">
                <div>
                  <!-- Header -->
                  <div class="d-flex align-center ga-3 mb-3">
                    <v-avatar size="48" class="bg-transparent">
                      <v-img src="/images/LOGO PRINCIPAL.png" contain></v-img>
                    </v-avatar>
                    <div>
                      <h3 class="text-h6 font-weight-bold text-white line-height-1">Gestión de Stands</h3>
                      <span class="text-caption text-amber-lighten-2">(Rutas Creativas)</span>
                    </div>
                  </div>

                  <!-- Category Pills -->
                  <div class="d-flex ga-1 mb-4 flex-wrap">
                    <v-btn
                      size="x-small"
                      :color="activeStandCategory === 'artesanos' ? 'primary' : 'grey-darken-3'"
                      class="font-weight-bold text-none rounded-pill"
                      @click="activeStandCategory = 'artesanos'"
                    >
                      Artesanos y Creadores
                    </v-btn>
                    <v-btn
                      size="x-small"
                      :color="activeStandCategory === 'tiendas' ? 'primary' : 'grey-darken-3'"
                      class="font-weight-bold text-none rounded-pill"
                      @click="activeStandCategory = 'tiendas'"
                    >
                      Tiendas Geek
                    </v-btn>
                    <v-btn
                      size="x-small"
                      :color="activeStandCategory === 'zonas' ? 'primary' : 'grey-darken-3'"
                      class="font-weight-bold text-none rounded-pill"
                      @click="activeStandCategory = 'zonas'"
                    >
                      Zonas de Juegos
                    </v-btn>
                  </div>

                  <!-- Cards Grid -->
                  <v-row dense>
                    <v-col cols="4">
                      <v-card
                        class="friki-card-item rounded-lg overflow-hidden cursor-pointer"
                        @click="$emit('open-stand-register')"
                      >
                        <v-img src="/images/logo marcha friki.png" height="90" cover class="bg-surface-dark"></v-img>
                        <div class="pa-2 text-center text-caption font-weight-bold text-truncate">
                          Artesanos y Creadores
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="4">
                      <v-card
                        class="friki-card-item rounded-lg overflow-hidden cursor-pointer"
                        @click="$emit('open-stand-register')"
                      >
                        <v-img src="/images/LOGO FC BASE.png" height="90" cover class="bg-surface-dark"></v-img>
                        <div class="pa-2 text-center text-caption font-weight-bold text-truncate">
                          Tiendas Geek
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="4">
                      <v-card
                        class="friki-card-item rounded-lg overflow-hidden cursor-pointer"
                        @click="$emit('open-stand-register')"
                      >
                        <v-img src="/images/LOGO FC fondo oscuro.png" height="90" cover class="bg-surface-dark"></v-img>
                        <div class="pa-2 text-center text-caption font-weight-bold text-truncate">
                          Zonas de Juegos
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>

            <!-- MODULE 2: Control de Asistencias (Eventos Especiales) -->
            <v-col cols="12" md="6">
              <div class="friki-panel-box pa-4 fill-height d-flex flex-column justify-space-between">
                <div>
                  <!-- Header -->
                  <div class="d-flex align-center ga-3 mb-3">
                    <v-avatar size="48" class="bg-transparent">
                      <v-img src="/images/Oficial con epigrafe bicentenario y sombra paralela.png" contain></v-img>
                    </v-avatar>
                    <div>
                      <h3 class="text-h6 font-weight-bold text-white line-height-1">Control de Asistencias</h3>
                      <span class="text-caption text-amber-lighten-2">(Eventos Especiales)</span>
                    </div>
                  </div>

                  <!-- Category Pills -->
                  <div class="d-flex ga-1 mb-4 flex-wrap">
                    <v-btn
                      size="x-small"
                      :color="activeAssistCategory === 'cosplay' ? 'secondary' : 'grey-darken-3'"
                      class="font-weight-bold text-none rounded-pill"
                      @click="activeAssistCategory = 'cosplay'"
                    >
                      Registro de Cosplayers
                    </v-btn>
                    <v-btn
                      size="x-small"
                      :color="activeAssistCategory === 'paneles' ? 'secondary' : 'grey-darken-3'"
                      class="font-weight-bold text-none rounded-pill"
                      @click="activeAssistCategory = 'paneles'"
                    >
                      Conferencias y Paneles
                    </v-btn>
                    <v-btn
                      size="x-small"
                      :color="activeAssistCategory === 'boletos' ? 'secondary' : 'grey-darken-3'"
                      class="font-weight-bold text-none rounded-pill"
                      @click="activeAssistCategory = 'boletos'"
                    >
                      Venta de Boletos
                    </v-btn>
                  </div>

                  <!-- Cards Grid -->
                  <v-row dense>
                    <v-col cols="4">
                      <v-card
                        class="friki-card-item rounded-lg overflow-hidden cursor-pointer"
                        @click="$emit('open-participant-register', 'COSPLAY')"
                      >
                        <v-img src="/images/LOGO blanco.png" height="90" contain class="bg-surface-dark pa-2"></v-img>
                        <div class="pa-2 text-center text-caption font-weight-bold text-truncate">
                          Registro de Cosplayers
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="4">
                      <v-card
                        class="friki-card-item rounded-lg overflow-hidden cursor-pointer"
                        @click="$emit('open-participant-register', 'KARAOKE')"
                      >
                        <div class="d-flex align-center justify-center bg-surface-dark" style="height: 90px;">
                          <v-icon size="42" color="primary">mdi-microphone-variant</v-icon>
                        </div>
                        <div class="pa-2 text-center text-caption font-weight-bold text-truncate">
                          Conferencias y Paneles
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="4">
                      <v-card
                        class="friki-card-item rounded-lg overflow-hidden cursor-pointer"
                        @click="$emit('open-participant-register', 'DRAWING')"
                      >
                        <div class="d-flex align-center justify-center bg-surface-dark" style="height: 90px;">
                          <v-icon size="42" color="secondary">mdi-ticket-confirmation</v-icon>
                        </div>
                        <div class="pa-2 text-center text-caption font-weight-bold text-truncate">
                          Venta de Boletos
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <!-- Right Column: Interactive Map Widget -->
        <v-col cols="12" lg="3" id="mapa">
          <div class="friki-panel-box pa-4 fill-height position-relative overflow-hidden">
            <div class="d-flex align-center justify-space-between mb-3">
              <span class="text-subtitle-2 font-weight-bold text-white d-flex align-center ga-1">
                <v-icon size="18" color="secondary">mdi-map-marker-path</v-icon> Map
              </span>
              <v-icon size="18" color="amber">mdi-chevron-down</v-icon>
            </div>

            <!-- Interactive Department / Stand Map Graphics -->
            <div class="map-container position-relative rounded-lg overflow-hidden border pa-2 bg-surface-dark text-center">
              <svg viewBox="0 0 300 240" class="w-100 h-auto map-svg">
                <!-- Department shape silhouette -->
                <path d="M 50 20 L 150 10 L 220 50 L 280 120 L 240 210 L 120 230 L 40 180 Z" fill="#4a3728" stroke="#00b4d8" stroke-width="2" />
                
                <!-- Stand Interactive Zones -->
                <g class="map-zones">
                  <rect x="60" y="50" width="45" height="30" rx="4" fill="#ef4444" opacity="0.85" class="zone-rect" @click="selectMapZone('STAND A1', 'Zona Comercial A1')" />
                  <text x="82" y="68" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">STAND A1</text>

                  <rect x="180" y="40" width="45" height="30" rx="4" fill="#8b5cf6" opacity="0.85" class="zone-rect" @click="selectMapZone('STAND B15', 'Callejón del Artista B15')" />
                  <text x="202" y="58" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">STAND B15</text>

                  <rect x="110" y="100" width="80" height="40" rx="6" fill="#10b981" opacity="0.85" class="zone-rect" @click="selectMapZone('STAND 104-120', 'Área de Juegos Indie')" />
                  <text x="150" y="124" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">STAND 104-120</text>

                  <rect x="70" y="160" width="55" height="35" rx="4" fill="#ec4899" opacity="0.85" class="zone-rect" @click="selectMapZone('STAND B1', 'Zona Coleccionistas B1')" />
                  <text x="97" y="181" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">STAND B1</text>

                  <rect x="180" y="165" width="55" height="35" rx="4" fill="#3b82f6" opacity="0.85" class="zone-rect" @click="selectMapZone('STAND BT2', 'Zona Gastronómica BT2')" />
                  <text x="207" y="186" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">STAND BT2</text>
                </g>
              </svg>

              <!-- Tooltip Popup over Map -->
              <div class="map-tooltip-badge pa-2 rounded-lg elevation-4">
                <div class="text-caption font-weight-bold text-white">
                  {{ activeMapTitle }}
                </div>
                <div class="text-caption text-amber-lighten-2">
                  {{ activeMapStand }}
                </div>
              </div>
            </div>

            <v-btn
              color="secondary"
              size="small"
              block
              class="mt-3 font-weight-bold text-none"
              prepend-icon="mdi-map-search"
              @click="$emit('open-stand-register')"
            >
              Ver Mapa Completo
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Stands Banner Showcase -->
    <v-container id="stands" class="py-8">
      <v-card color="#2b1b14" class="pa-8 rounded-2xl border-gold position-relative overflow-hidden">
        <v-row align="center">
          <v-col cols="12" md="7">
            <v-chip color="secondary" class="mb-3 font-weight-bold">ZONA DE EXPOSITORES</v-chip>
            <h2 class="text-h3 font-weight-bold text-white mb-3">
              &iquest;Tienes una Tienda o Ilustras Ilustraciones?
            </h2>
            <p class="text-body-1 text-medium-emphasis mb-6">
              Reserva tu espacio en la Zona Comercial, Artística o Coleccionista. Asegura tu stand numerado para interactuar con miles de fanáticos del anime y los videojuegos.
            </p>
            <div class="d-flex flex-wrap ga-4">
              <v-chip prepend-icon="mdi-check" color="success">Área Comercial</v-chip>
              <v-chip prepend-icon="mdi-check" color="success">Callejón del Artista</v-chip>
              <v-chip prepend-icon="mdi-check" color="success">Zona Coleccionistas</v-chip>
            </div>
            <v-btn
              color="secondary"
              size="large"
              class="mt-6 font-weight-bold px-8"
              rounded="xl"
              prepend-icon="mdi-storefront-outline"
              @click="$emit('open-stand-register')"
            >
              Reservar un Stand Ahora
            </v-btn>
          </v-col>
          <v-col cols="12" md="5" class="text-center">
            <v-img
              src="/images/logo marcha friki.png"
              alt="Marcha Friki"
              max-height="260"
              contain
              class="mx-auto"
            ></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Rules & Regulations Section -->
    <RulesSection
      @open-participant-register="$emit('open-participant-register')"
      @open-stand-register="$emit('open-stand-register')"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeroBanner from '@/components/HeroBanner.vue';
import RulesSection from '@/components/RulesSection.vue';

defineEmits(['open-participant-register', 'open-stand-register', 'show-voucher']);

const activeStandCategory = ref('artesanos');
const activeAssistCategory = ref('cosplay');

const activeMapTitle = ref('Área de Juegos Indie');
const activeMapStand = ref('Stand 104-120');

function selectMapZone(stand, title) {
  activeMapStand.value = stand;
  activeMapTitle.value = title;
}
</script>

<style scoped>
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}
.bg-surface-dark {
  background-color: #180d09;
}
.map-tooltip-badge {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(26, 14, 10, 0.92);
  border: 1px solid #00b4d8;
  white-space: nowrap;
}
.zone-rect {
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.zone-rect:hover {
  opacity: 1 !important;
  stroke: #fff;
  stroke-width: 1.5;
}
</style>
