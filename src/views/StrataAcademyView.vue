<script setup lang="ts">
import StratagemList from '../components/StratagemList.vue'
import SuperFooter from '../components/SuperFooter.vue'
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
        <RouterLink class="view-redirect" to="/strata-academy">
          <input type="image" class="header-buttons" src="src/assets/icons/pawn-icon.svg"
        /></RouterLink>
        <RouterLink class="view-redirect" to="/leaderboard">
          <input type="image" class="header-buttons" src="src/assets/icons/trophy-icon.svg"
        /></RouterLink>
        <RouterLink class="view-redirect" to="/credits">
          <input type="image" class="header-buttons" src="src/assets/icons/medal-icon.svg"
        /></RouterLink>
      </div>
    </header>
    <main class="game-main">
      <StratagemList />
    </main>
    <SuperFooter />
  </div>
</template>

<style></style>
