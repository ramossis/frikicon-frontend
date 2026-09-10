import { defineStore } from 'pinia';
import { http } from '@/utils/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('adminToken') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(username, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.post('/admin/login', { username, password });
        if (response.data.success && response.data.token) {
          this.token = response.data.token;
          localStorage.setItem('adminToken', response.data.token);
        }
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al autenticar.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      localStorage.removeItem('adminToken');
    },
  },
});
