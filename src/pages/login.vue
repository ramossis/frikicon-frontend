<template>
  <v-container class="fill-height d-flex align-center justify-center py-12" style="min-height: 80vh;">
    <v-card color="#2b1b14" max-width="450" class="w-100 rounded-2xl border-gold pa-6 shadow-2xl">
      <div class="text-center mb-6">
        <v-img
          src="/images/LOGO FC PRINCIPAL.png"
          alt="FriKiKon"
          max-height="75"
          contain
          class="mx-auto mb-4"
        ></v-img>
        <h1 class="text-h5 font-weight-bold text-white d-flex align-center justify-center ga-2">
          <v-icon color="primary">mdi-shield-lock</v-icon> Acceso Administrativo
        </h1>
        <p class="text-caption text-medium-emphasis mt-1">
          Ingresa tus credenciales para administrar el evento FriKiKon
        </p>
      </div>

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
          class="mb-3"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña *"
          type="password"
          prepend-inner-icon="mdi-lock"
          variant="outlined"
          density="comfortable"
          class="mb-5"
          required
        ></v-text-field>

        <v-btn
          block
          color="primary"
          size="large"
          class="font-weight-bold text-black rounded-lg py-3 mb-4"
          :loading="loading"
          type="submit"
        >
          Iniciar Sesión
        </v-btn>

        <div class="text-center">
          <v-btn
            variant="text"
            color="grey-lighten-1"
            size="small"
            prepend-icon="mdi-arrow-left"
            @click="goHome"
          >
            Volver al Inicio
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

function goHome() {
  router.push('/');
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
      router.push('/admin');
    } else {
      errorMessage.value = res.message || res.error || 'Credenciales inválidas.';
    }
  } catch (err) {
    console.error(err);
    errorMessage.value = authStore.error || 'Error al conectar con el servidor.';
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
