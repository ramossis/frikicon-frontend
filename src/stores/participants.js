import { defineStore } from 'pinia';
import { http } from '@/utils/axios';
import { dataURLtoFile } from "../utils/dataURLtoFile";
import imageCompression from 'browser-image-compression'; // <--- Importamos la librería

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
          // 1. Convertimos el dataURL a File
          let photoFileConverted = dataURLtoFile(payload.photoFile, 'photo.jpg');

          // 2. Configuramos la compresión para celulares
          try {
            const options = {
              maxSizeMB: 1,           // Queremos que pese máximo 1 MB
              maxWidthOrHeight: 1280, // Resolución adecuada para web
              useWebWorker: true      // Para que no congele la interfaz móvil
            };
            
            // 3. Comprimimos el archivo
            photoFileConverted = await imageCompression(photoFileConverted, options);
          } catch (compError) {
            console.warn('No se pudo comprimir la imagen, enviando original:', compError);
          }

          formData.append('photoUrl', photoFileConverted);
        }
        
        if (payload.audioFile) {
          const audioFileConverted = dataURLtoFile(payload.audioFile, 'audio.mp3');
          formData.append('audioUrl', audioFileConverted);
        }

        // Axios pondrá el multipart/form-data y boundary automáticamente
        const { data } = await http.post('/participant/register', formData);
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