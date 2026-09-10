<template>
  <div class="header-container px-2 px-md-4 py-2">
    <v-card color="#291a13" class="mx-auto border-gold rounded-xl px-3 px-md-4 py-2 shadow-2xl">
      <div class="d-flex align-center justify-space-between flex-nowrap ga-2">
        
        <!-- Left Logo & Branding -->
        <div class="d-flex align-center cursor-pointer flex-shrink-0" @click="scrollTo('inicio')">
          <v-img
            src="/images/LOGO PRINCIPAL.png"
            alt="FRIKIKON ORURO"
            max-height="42"
            max-width="120"
            contain
          ></v-img>
        </div>

        <!-- Center Bicentenario Emblem -->
        <div class="d-none d-lg-flex align-center justify-center cursor-pointer flex-shrink-0" @click="scrollTo('inicio')">
          <v-img
            src="/images/Oficial con epigrafe bicentenario y sombra paralela.png"
            alt="ORURO 200 ANIVERSARIO"
            max-height="48"
            max-width="120"
            contain
          ></v-img>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="d-none d-md-flex align-center ga-2 font-weight-medium">
          <a class="nav-link" @click="scrollTo('inicio')">Organización</a>
          <a class="nav-link" @click="scrollTo('stands')">Stands</a>
          <a class="nav-link" @click="scrollTo('concursos')">Asistencias</a>
          <a class="nav-link" @click="scrollTo('mapa')">Mapa del Evento</a>
          <a class="nav-link" @click="scrollTo('reglas')">Contacto</a>
        </div>

        <!-- Search Bar & Action Buttons -->
        <div class="d-flex align-center ga-1 flex-shrink-0">
          <div class="search-box d-none d-xl-flex align-center">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar"
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch">
              <v-icon size="18">mdi-magnify</v-icon>
            </button>
          </div>

          <v-btn
            color="primary"
            variant="flat"
            size="small"
            class="font-weight-bold text-none rounded-lg px-2 px-sm-3"
            prepend-icon="mdi-pencil-box"
            @click="$emit('open-participant-register')"
          >
            Inscribirse
          </v-btn>

          <v-btn
            color="secondary"
            variant="outlined"
            size="small"
            class="font-weight-bold text-none rounded-lg d-none d-sm-flex"
            prepend-icon="mdi-storefront"
            @click="$emit('open-stand-register')"
          >
            Stand
          </v-btn>

          <v-btn
            icon="mdi-shield-lock"
            variant="text"
            color="primary"
            size="small"
            title="Acceso Admin"
            @click="$emit('open-admin-login')"
          ></v-btn>

          <!-- Hamburger Menu Button for Mobile -->
          <v-btn
            icon="mdi-menu"
            variant="text"
            color="white"
            size="small"
            class="d-md-none"
            @click="mobileMenuOpen = !mobileMenuOpen"
          ></v-btn>
        </div>

      </div>

      <!-- Mobile Dropdown Menu -->
      <v-expand-transition>
        <div v-if="mobileMenuOpen" class="d-md-none pt-3 mt-2 border-top border-gold-subtle">
          <div class="d-flex flex-column ga-2 pb-2">
            <a class="nav-link text-center py-2" @click="scrollToAndClose('inicio')">Organización</a>
            <a class="nav-link text-center py-2" @click="scrollToAndClose('stands')">Stands</a>
            <a class="nav-link text-center py-2" @click="scrollToAndClose('concursos')">Asistencias</a>
            <a class="nav-link text-center py-2" @click="scrollToAndClose('mapa')">Mapa del Evento</a>
            <a class="nav-link text-center py-2" @click="scrollToAndClose('reglas')">Contacto</a>
            <v-btn
              color="secondary"
              variant="outlined"
              size="small"
              class="font-weight-bold text-none rounded-lg mt-1"
              block
              prepend-icon="mdi-storefront"
              @click="$emit('open-stand-register'); mobileMenuOpen = false;"
            >
              Registrar Stand
            </v-btn>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineEmits(['open-participant-register', 'open-stand-register', 'open-admin-login']);

const searchQuery = ref('');
const mobileMenuOpen = ref(false);

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToAndClose(id) {
  scrollTo(id);
  mobileMenuOpen.value = false;
}

function handleSearch() {
  if (searchQuery.value) {
    alert(`Buscando: ${searchQuery.value}`);
  }
}
</script>

<style scoped>
.header-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(26, 14, 10, 0.95);
  backdrop-filter: blur(10px);
}

.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5) !important;
}

.border-gold-subtle {
  border-color: rgba(224, 159, 62, 0.2) !important;
}

.nav-link {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.nav-link:hover {
  color: #ffaa1d;
  background: rgba(255, 170, 29, 0.1);
}

.search-box {
  background: #ffffff;
  border-radius: 6px;
  padding: 2px 4px 2px 10px;
  border: 1px solid #cbd5e1;
  overflow: hidden;
}

.search-input {
  border: none;
  outline: none;
  color: #1e293b;
  font-size: 0.85rem;
  width: 110px;
}

.search-btn {
  background: #f1f5f9;
  border: none;
  color: #64748b;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
}
.search-btn:hover {
  background: #e2e8f0;
  color: #1e293b;
}
</style>