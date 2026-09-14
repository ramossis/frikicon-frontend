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
        const { data } = await http.get('/stand');
        if (data.success) {
          this.stands = data.data || [];
        }
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al cargar los stands.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async registerStand(payload) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await http.post('/stand/register', payload);
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al registrar stand.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteStand(id) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await http.delete(`/stand/${id}`);
        if (data.success) {
          this.stands = this.stands.filter((s) => s.id !== id);
        }
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al eliminar stand.';
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
