<template>
  <v-container id="inicio" fluid class="hero-section py-8 px-4 position-relative text-center">
    <div class="mx-auto max-w-1000">
      
      <!-- Main Logo Display -->
      <div class="mb-4 d-flex justify-center">
        <v-img
          src="/images/LOGO FC fondo oscuro.png"
          alt="FRIKI-CON ORURO"
          max-height="180"
          max-width="380"
          contain
          class="hero-logo-img drop-shadow-glow"
        ></v-img>
      </div>

      <!-- Main Title Header Banner matching images -->
      <h1 class="gold-title-banner text-h3 text-md-h2 mb-4">
        FRIKICON 2026: EL PUNTO DE ENCUENTRO GEEK
      </h1>

      <p class="text-subtitle-1 text-md-h6 text-amber-lighten-4 mb-6 max-w-700 mx-auto">
        El mega evento de la Cultura Anime, Gaming, Cosplay & Arte Pop en Oruro. ¡Inscríbete en los concursos o asegura tu Stand comercial!
      </p>

      <div class="d-flex flex-wrap ga-4 justify-center mb-8">
        <v-btn
          size="x-large"
          color="primary"
          elevation="6"
          rounded="xl"
          class="font-weight-black px-8 text-none"
          prepend-icon="mdi-pencil-box-multiple"
          @click="$emit('open-participant-register')"
        >
          Inscribirse a Concursos
        </v-btn>
      </div>

    </div>
  </v-container>
</template>

<script setup>
defineEmits(['open-participant-register', 'open-stand-register']);
</script>

<style scoped>
.hero-section {
  background: radial-gradient(circle at 50% 20%, rgba(224, 159, 62, 0.18) 0%, rgba(26, 14, 10, 1) 70%);
}

.hero-logo-img {
  filter: drop-shadow(0 0 20px rgba(224, 159, 62, 0.4));
  transition: filter 0.3s ease, transform 0.3s ease;
}
.hero-logo-img:hover {
  filter: drop-shadow(0 0 30px rgba(255, 170, 29, 0.7));
  transform: scale(1.03);
}

.max-w-1000 {
  max-width: 1000px;
}

.max-w-700 {
  max-width: 700px;
}
</style>
