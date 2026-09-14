import { defineStore } from 'pinia';
import { http } from '@/utils/axios';

export const useParticipantStore = defineStore('participants', {
  state: () => ({
    participants: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchParticipants(category = '') {
      this.loading = true;
      this.error = null;
      try {
        const params = category ? { category } : {};
        const { data } = await http.get('/participant/list', { params });
        if (data.success) {
          this.participants = data.data || [];
        }
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al cargar los participantes.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async registerParticipant(payload) {
      this.loading = true;
      this.error = null;
      try {
        const formData = new FormData();
        formData.append('fullName', payload.fullName);
        formData.append('age', payload.age.toString());
        formData.append('phone', payload.phone);
        formData.append('category', payload.category);
        formData.append('categoryData', JSON.stringify(payload.categoryData || {}));

        if (payload.photoFile) {
          formData.append('photoUrl', payload.photoFile);
        }
        if (payload.audioFile) {
          formData.append('audioUrl', payload.audioFile);
        }

        const { data } = await http.post('/participant/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al registrar participante.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteParticipant(id) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await http.delete(`/participant/delete/${id}`);
        if (data.success) {
          this.participants = this.participants.filter((p) => p.id !== id);
        }
        return data;
      } catch (err) {
        this.error = err.response?.data?.message || err.response?.data?.error || 'Error al eliminar participante.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async getVoucher(id) {
      try {
        const { data } = await http.get(`/participant/voucher/${id}`);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
});
