<script setup lang="ts">
import Game from '../components/GameApp.vue'
import Footer from '../components/SuperFooter.vue'
import { RouterLink, RouterView } from 'vue-router'

import { ref, onMounted, onUnmounted } from 'vue'

const audio = ref(null)

onMounted(() => {
  setTimeout(() => {
    audio.value = new Audio('/src/assets/sound/helldivers2_8bit.webm')

    audio.value.loop = true
    audio.value.volume = 0.5

    playMusic()
  }, 3000)
})

const toggleMusic = () => {
  if (!audio.value) return

  if (audio.value.paused) {
    audio.value.play()
  } else {
    audio.value.pause()
  }
}

const playMusic = () => {
  if (!audio.value) return

  audio.value.play()
}

const pauseMusic = () => {
  if (!audio.value) return

  audio.value.pause()
}

onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value = null
  }
})
</script>

<template>
  <div class="game-wrapper">
    <header class="super-header">
      <div class="header-left"></div>
      <h3>SUPER EARTH ARMED FORCES - STRATAGEM HERO</h3>
      <div class="header-right">
        <RouterLink class="view-redirect" to="/leaderboard">
          <input
            type="image"
            class="header-buttons"
            src="src/assets/icons/trophy-icon.svg"
            @click="pauseMusic()"
        /></RouterLink>
        <input
          type="image"
          class="header-buttons"
          src="src/assets/icons/music-icon.svg"
          @click="toggleMusic()"
        />
      </div>
    </header>
    <main class="game-main">
      <Game />
    </main>
    <Footer />
  </div>
</template>

<style></style>
