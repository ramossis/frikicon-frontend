import { defineStore } from 'pinia';
import { http } from '@/utils/axios';

export const useEventConfigStore = defineStore('eventConfig', {
  state: () => ({
    eventConfig: {
      registrationDeadLine: '',
      isRegistrationOpen: true,
    },
    loading: false,
    error: null,
  }),

  actions: {
    async fetchConfig() {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await http.get('/admin/config');
        if (data.success && data.data) {
          const d = data.data;
          this.eventConfig = {
            isRegistrationOpen: d.isRegistrationOpen ?? true,
            registrationDeadLine: d.registrationDeadLine
              ? new Date(d.registrationDeadLine).toISOString().slice(0, 16)
              : '',
          };
        }
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al cargar configuración.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async updateConfig(config) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await http.put('/admin/config', config);
        if (data.success) {
          this.eventConfig = { ...config };
        }
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al guardar configuración.';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
