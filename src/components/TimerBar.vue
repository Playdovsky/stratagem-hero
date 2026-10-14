<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps<{
  time: number
  running: boolean
}>()

const emit = defineEmits<{
  (e: 'timeout'): void
}>()

const timeoutId = ref<number | null>(null)
const isRunning = ref(false)

const startTimer = () => {
  if (isRunning.value) return
  isRunning.value = true
}

timeoutId.value = window.setTimeout(() => {
  isRunning.value = false
  emit('timeout')
}, props.time)

const stopTimer = () => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId.value)
    timeoutId.value = null
  }
  isRunning.value = false
}

watch(
  () => props.running,
  (newValue) => {
    if (newValue) {
      startTimer()
    } else {
      stopTimer()
    }
  },
)

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div v-if="running" class="c-timer">
    <div class="c-timebar">
      <div class="c-timebar__background"></div>
      <div class="c-timebar__remaining" :style="{ animationDuration: `${props.time}ms` }"></div>
    </div>
  </div>
</template>

<style scoped>
.c-timer {
  width: 50%;
  max-width: 300px;
  height: 8px;
  position: relative;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
}

.c-timebar {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #111315;
  border: 1px solid #ffc72c;
  overflow: hidden;
}

.c-timebar__background {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #fff8c4;
  opacity: 0.15;
}

.c-timebar__remaining {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #ffc72c;
  transform-origin: 0 50%;
  animation-name: timebar_progress_x;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes timebar_progress_x {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
