<template>
  <v-dialog v-model="dialog" max-width="420" persistent>
    <v-card color="#2b1b14" class="rounded-xl border-gold pa-4">
      <v-card-title class="d-flex align-center justify-space-between pb-2 border-b">
        <div class="d-flex align-center ga-2">
          <v-icon color="primary">mdi-shield-lock</v-icon>
          <span class="text-h6 font-weight-bold text-white">Acceso Administrativo</span>
        </div>
        <v-btn icon="mdi-close" variant="text" density="compact" @click="close"></v-btn>
      </v-card-title>

      <v-card-text class="pt-6">
        <v-alert
          v-if="errorMessage"
          type="error"
          variant="tonal"
          closable
          class="mb-4 text-caption"
          @click:close="errorMessage = ''"
        >
          {{ errorMessage }}
        </v-alert>

        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="username"
            label="Usuario Admin *"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            density="comfortable"
            class="mb-2"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña *"
            type="password"
            prepend-inner-icon="mdi-lock"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            required
          ></v-text-field>

          <v-btn
            block
            color="primary"
            size="large"
            class="font-weight-bold text-black"
            :loading="loading"
            type="submit"
          >
            Iniciar Sesión
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'authenticated']);
const authStore = useAuthStore();

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const username = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

function close() {
  dialog.value = false;
  username.value = '';
  password.value = '';
  errorMessage.value = '';
}

async function handleLogin() {
  if (!username.value || !password.value) {
    errorMessage.value = 'Completa los campos de usuario y contraseña.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const res = await authStore.login(username.value, password.value);
    if (res.success && res.token) {
      emit('authenticated');
      close();
    } else {
      errorMessage.value = res.error || 'Credenciales inválidas.';
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = authStore.error || err.response?.data?.error || 'Error al autenticar.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.border-gold {
  border: 1px solid rgba(224, 159, 62, 0.5);
}
</style>
