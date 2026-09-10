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
        const response = await http.get('/participant/list', { params });
        if (response.data.success) {
          this.participants = response.data.data || [];
        }
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al cargar los participantes.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async registerParticipant(data) {
      this.loading = true;
      this.error = null;
      try {
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('age', data.age.toString());
        formData.append('phone', data.phone);
        formData.append('category', data.category);
        formData.append('categoryData', JSON.stringify(data.categoryData || {}));

        if (data.photoFile) {
          formData.append('photoUrl', data.photoFile);
        }
        if (data.audioFile) {
          formData.append('audioUrl', data.audioFile);
        }

        const response = await http.post('/participant/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al registrar participante.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async deleteParticipant(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.delete(`/participant/delete/${id}`);
        if (response.data.success) {
          this.participants = this.participants.filter((p) => p.id !== id);
        }
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al eliminar participante.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async getVoucher(id) {
      try {
        const response = await http.get(`/participant/voucher/${id}`);
        return response.data;
      } catch (err) {
        throw err;
      }
    },
  },
});
