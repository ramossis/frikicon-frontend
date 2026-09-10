<template>
  <div>
    <AdminDashboard
      @logout="handleLogout"
      @show-voucher="handleShowVoucher"
    />

    <VoucherModal
      v-model="voucherModalOpen"
      :voucher-data="activeVoucherData"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AdminDashboard from '@/components/AdminDashboard.vue';
import VoucherModal from '@/components/VoucherModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const voucherModalOpen = ref(false);
const activeVoucherData = ref(null);

function handleLogout() {
  authStore.logout();
  router.push('/login');
}

function handleShowVoucher(data) {
  activeVoucherData.value = data;
  voucherModalOpen.value = true;
}
</script>
