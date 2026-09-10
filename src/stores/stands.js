import { defineStore } from 'pinia';
import { http } from '@/utils/axios';

export const useStandStore = defineStore('stands', {
  state: () => ({
    stands: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchStands() {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.get('/stand');
        if (response.data.success) {
          this.stands = response.data.data || [];
        }
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al cargar los stands.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async registerStand(data) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.post('/stand/register', data);
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al registrar stand.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteStand(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.delete(`/stand/${id}`);
        if (response.data.success) {
          this.stands = this.stands.filter((s) => s.id !== id);
        }
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al eliminar stand.';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
