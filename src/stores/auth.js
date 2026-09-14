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
        const { data } = await http.post('/admin/login', { username, password });
        if (data.success && data.token) {
          this.token = data.token;
          localStorage.setItem('adminToken', data.token);
        }
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al autenticar.';
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
