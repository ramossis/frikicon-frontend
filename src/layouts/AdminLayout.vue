<template>
  <div class="admin-layout bg-background text-white min-h-screen">
    <!-- Admin Top Navbar -->
    <v-app-bar color="#291a13" class="px-4 border-b border-gold" elevation="4" height="64">
      <div class="d-flex align-center cursor-pointer ga-3" @click="goHome">
        <v-img
          src="/images/LOGO PRINCIPAL.png"
          alt="FRIKIKON ORURO"
          max-height="45"
          max-width="120"
          contain
        ></v-img>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center ga-3">
        <v-btn
          variant="text"
          color="white"
          prepend-icon="mdi-home"
          class="d-none d-sm-flex font-weight-bold"
          @click="goHome"
        >
          Sitio Principal
        </v-btn>

        <v-chip color="primary" variant="flat" size="small" class="font-weight-bold d-none d-md-flex">
          <v-icon start size="16">mdi-shield-crown</v-icon> Modo Administración
        </v-chip>

        <v-btn
          color="error"
          variant="outlined"
          size="small"
          prepend-icon="mdi-logout"
          class="font-weight-bold"
          @click="handleLogout"
        >
          Cerrar Sesión
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Main Content Container -->
    <v-main class="pt-16">
      <router-view />
    </v-main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}

function handleLogout() {
  localStorage.removeItem('adminToken');
  router.push('/login');
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: transparent;
}
.border-gold {
  border-bottom: 1px solid rgba(224, 159, 62, 0.5) !important;
}
</style>
