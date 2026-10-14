<script setup lang="ts">
import Game from '../components/GameApp.vue'

import { ref, onMounted, onUnmounted } from 'vue'

const audio = ref(null)
const isBlocked = ref(false)

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

  audio.value
    .play()
    .then(() => {
      isBlocked.value = false
    })
    .catch((error: any) => {
      console.warn('Autoplay was blocked by the browser. Awaiting user interaction.', error)
      isBlocked.value = true
    })
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
      <h3>SUPER EARTH ARMED FORCES - STRATAGEM HERO</h3>
      <input
        type="image"
        class="header-buttons"
        src="src/assets/icons/music-icon.svg"
        @click="toggleMusic()"
      />
    </header>
    <Game />
    <footer class="super-footer">
      <div class="marquee-container">
        <div class="marquee-content">
          <span>BUY WARBONDS TO SUPPORT WAR EFFORT!</span>
          <span>HAVE A TASTE OF LIBER-TEA!</span>
          <span>ENLIST TODAY!</span>
          <!-- Duplicate for seamless loop -->
          <span>BUY WARBONDS TO SUPPORT WAR EFFORT!</span>
          <span>HAVE A TASTE OF LIBER-TEA!</span>
          <span>ENLIST TODAY!</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.game-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121417;
  color: #e0e0e0;
  font-family: 'Courier New', Courier, monospace;
}

.super-header {
  background-color: #ffc72c;
  color: #121417;
  text-align: center;
  padding: 0.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  border-bottom: 4px solid #b38b1e;
  text-transform: uppercase;
  box-shadow: 0 4px 10px #b38b1e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.super-header h3 {
  margin: 0;
  flex: 1;
  text-align: center;
  font-size: 1.25rem;
}

.super-footer {
  background-color: #ffc72c;
  color: #121417;
  border-top: 4px solid #b38b1e;
  padding: 0.5rem 0;
  font-weight: bold;
  box-shadow: 4px 0px 10px #b38b1e;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-content {
  display: flex;
  width: max-content;
  animation: scroll-right 90s linear infinite;
}

.marquee-content span {
  padding-right: 60rem;
}

.header-buttons {
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: transform 0.1s ease;
}

@keyframes scroll-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
