<script lang="ts">
import { defineComponent } from 'vue'
import Game from '../components/GameApp.vue'
import SuperFooter from '../components/SuperFooter.vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  components: {
    Game,
    SuperFooter,
    RouterLink,
  },
  data() {
    return {
      audio: null as HTMLAudioElement | null,
      timerId: null as number | null,
      audioStatus: true,
    }
  },
  mounted() {
    this.timerId = window.setTimeout(() => {
      this.audio = new Audio('/src/assets/sound/helldivers2_8bit.webm')
      this.audio.loop = true
      this.audio.volume = 0.5
      this.playMusic()
    }, 3000)
  },
  methods: {
    toggleMusic() {
      if (!this.audio) return

      if (this.audio.paused) {
        this.audioStatus = true
        this.playMusic()
      } else {
        this.audioStatus = false
        this.pauseMusic()
      }
    },
    playMusic() {
      if (!this.audio) return

      this.audio.play()
    },
    pauseMusic() {
      if (!this.audio) return

      this.audio.pause()
    },
  },
  beforeUnmount() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId)
      this.timerId = null
    }

    if (this.audio) {
      this.audio.pause()
      this.audio = null
    }
  },
})
</script>

<template>
  <div class="game-wrapper">
    <header class="super-header">
      <div class="header-left">
        <input
          type="image"
          class="header-buttons"
          src="src/assets/icons/music-icon.svg"
          @click="toggleMusic()"
          :class="{ muted: !audioStatus }"
        />
      </div>
      <h3>SUPER EARTH ARMED FORCES - STRATAGEM HERO</h3>
      <div class="header-right">
        <RouterLink class="view-redirect" to="/">
          <input type="image" class="header-buttons" src="src/assets/icons/helldivers-icon.svg"
        /></RouterLink>
        <RouterLink class="view-redirect" to="/leaderboard">
          <RouterLink class="view-redirect" to="/strata-academy">
            <input
              type="image"
              class="header-buttons"
              src="src/assets/icons/pawn-icon.svg"
              @click="pauseMusic()"
          /></RouterLink>
          <input
            type="image"
            class="header-buttons"
            src="src/assets/icons/trophy-icon.svg"
            @click="pauseMusic()"
        /></RouterLink>
        <RouterLink class="view-redirect" to="/credits">
          <input
            type="image"
            class="header-buttons"
            src="src/assets/icons/medal-icon.svg"
            @click="pauseMusic()"
        /></RouterLink>
      </div>
    </header>
    <main class="game-main">
      <Game />
    </main>
    <SuperFooter />
  </div>
</template>

<style scoped>
.muted {
  opacity: 0.5;
}
</style>
