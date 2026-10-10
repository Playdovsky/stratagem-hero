<script setup lang="ts">
import Game from '../components/GameApp.vue'
</script>

<template>
  <div class="game-wrapper">
    <header class="super-header">
      <h3>SUPER EARTH ARMED FORCES - STRATAGEM HERO</h3>
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
}

.super-header h3 {
  margin: 0;
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
