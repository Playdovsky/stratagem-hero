<template>
  <main class="game-main">
    <div class="game-container">
      <p class="placeholder-text">SYSTEM READY. WAITING FOR PILOT...</p>
    </div>
  </main>
</template>

<style scoped>
.game-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.game-container {
  width: 100%;
  max-width: 1000px;
  height: 600px;
  background-color: #1a1d23;
  border: 3px solid #ffc72c;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px #b38b1e;
}

.placeholder-text {
  color: #ffc72c;
  letter-spacing: 1px;
  animation: blink 1.5s infinite;
}
</style>
