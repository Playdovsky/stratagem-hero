<script setup lang="ts">
import Leaderboard from '../components/LeaderBoard.vue'
import Footer from '../components/SuperFooter.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="game-wrapper">
    <header class="super-header">
      <div class="header-left"></div>
      <h3>SUPER EARTH ARMED FORCES - STRATAGEM HERO</h3>
      <div class="header-right">
        <RouterLink class="view-redirect" to="/">
          <input type="image" class="header-buttons" src="src/assets/icons/helldivers-icon.svg"
        /></RouterLink>
      </div>
    </header>
    <main class="game-main">
      <Leaderboard />
    </main>
    <Footer />
  </div>
</template>

<style></style>
