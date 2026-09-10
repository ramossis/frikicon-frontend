<template>
  <div class="friki-app bg-background text-white min-h-screen">
    <!-- Floating Social Bar on Left -->
    <div class="social-side-bar d-none d-md-flex flex-column ga-2">
      <a href="https://facebook.com" target="_blank" class="social-icon fb" title="Facebook">
        <v-icon size="20">mdi-facebook</v-icon>
      </a>
      <a href="https://instagram.com" target="_blank" class="social-icon ig" title="Instagram">
        <v-icon size="20">mdi-instagram</v-icon>
      </a>
    </div>

    <!-- Main Top Navbar -->
    <Navbar
      @open-participant-register="openParticipantModal"
      @open-stand-register="openStandModal"
      @open-admin-login="navigateToLogin"
    />

    <!-- PAGE CONTENT -->
    <main>
      <router-view
        @open-participant-register="openParticipantModal"
        @open-stand-register="openStandModal"
        @show-voucher="openVoucher"
      />
    </main>

    <!-- Branding Footer Showcase (Logos from /images) -->
    <v-container class="py-12 text-center border-t">
      <h3 class="text-h6 font-weight-bold text-amber-lighten-2 mb-6">INSTITUCIONES Y AUSPICIADORES OFICIALES</h3>
      <div class="d-flex flex-wrap align-center justify-center ga-8">
        <v-img src="/images/ESCUDO-LETRAS-BLANCAS.png" max-height="70" max-width="160" contain></v-img>
        <v-img src="/images/Oficial con epigrafe bicentenario y sombra paralela.png" max-height="70" max-width="180" contain></v-img>
        <v-img src="/images/Popular con epígrafe blanco y amarillo.png" max-height="70" max-width="180" contain></v-img>
        <v-img src="/images/LOGO FC alternativo.png" max-height="70" max-width="160" contain></v-img>
      </div>
    </v-container>

    <!-- Footer -->
    <footer class="py-8 text-center text-medium-emphasis text-body-2 bg-surface-variant border-t">
      <v-container>
        <div class="d-flex align-center justify-center ga-3 mb-4">
          <v-img src="/images/LOGO blanco.png" max-height="45" max-width="130" contain></v-img>
        </div>
        <p class="mb-2">&copy; 2024 FriKiKon Oruro - Todos los derechos reservados. Un evento de Cultura y Turismo.</p>
        <p class="text-caption text-amber-lighten-2">Cultura Anime, Manga, Cosplay, Gaming & Arte Pop.</p>
      </v-container>
    </footer>

    <!-- SHARED MODALS -->
    <ParticipantRegisterModal
      v-model="participantModalOpen"
      :initial-category="selectedParticipantCategory"
      @registered="handleParticipantRegistered"
    />

    <StandRegisterModal
      v-model="standModalOpen"
      @registered="handleStandRegistered"
    />

    <VoucherModal
      v-model="voucherModalOpen"
      :voucher-data="activeVoucherData"
    />
  </div>
</template>

<script setup>
import {  } from "@/utils/axios.js";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import ParticipantRegisterModal from '@/components/ParticipantRegisterModal.vue';
import StandRegisterModal from '@/components/StandRegisterModal.vue';
import VoucherModal from '@/components/VoucherModal.vue';

const router = useRouter();

const participantModalOpen = ref(false);
const selectedParticipantCategory = ref('COSPLAY');
const standModalOpen = ref(false);
const voucherModalOpen = ref(false);
const activeVoucherData = ref(null);

function navigateToLogin() {
  router.push('/login');
}

function openParticipantModal(category = 'COSPLAY') {
  selectedParticipantCategory.value = category;
  participantModalOpen.value = true;
}

function openStandModal() {
  standModalOpen.value = true;
}

function handleParticipantRegistered(data) {
  activeVoucherData.value = data;
  voucherModalOpen.value = true;
}

function handleStandRegistered(data) {
  alert(`¡Stand #${data.standNumber} (${data.businessName}) registrado con éxito!`);
}

function openVoucher(data) {
  activeVoucherData.value = data;
  voucherModalOpen.value = true;
}
</script>

<style scoped>
.friki-app {
  min-height: 100vh;
  background-color: transparent;
}
.social-side-bar {
  position: fixed;
  left: 12px;
  top: 40%;
  z-index: 99;
}
.social-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: transform 0.2s ease;
}
.social-icon:hover {
  transform: scale(1.1);
}
.social-icon.fb {
  background: #1877f2;
}
.social-icon.ig {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
</style>
