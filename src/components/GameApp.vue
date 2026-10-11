<script lang="ts">
import { defineComponent } from 'vue'
import { Stratagems } from '@/assets/stratagems/helldivers-stratagems-data-sample.js'
import { Arrows } from '@/assets/stratagems/helldivers-stratagems-arrows.js'

interface Stratagem {
  name: string
  code: string[]
  category_id: string
  path: string
}

interface Arrow {
  name: string
  path: string
}

export default defineComponent({
  data() {
    return {
      player_name: 'pilot',
      score: 0,
      modifier: 3.0,
      level: 1,
      time: 60000,
      all_stratagems: Stratagems as Stratagem[],
      all_arrows: Arrows as Arrow[],
      strata_sequence: [] as Stratagem[],
      sequence_index: 0,
      arrow_index: 0,
      isShaking: false,
    }
  },
  computed: {
    currentStratagem(): Stratagem | null {
      if (this.strata_sequence.length === 0) return null
      return this.strata_sequence[this.sequence_index]
    },
  },
  mounted() {
    this.rndStrataSequence()
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    rndStrataSequence() {
      this.strata_sequence = []
      this.sequence_index = 0
      this.arrow_index = 0

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * this.all_stratagems.length)
        this.strata_sequence.push(this.all_stratagems[randomIndex])
      }
    },
    getArrowPath(arrowName: string): string {
      const found = this.all_arrows.find((a) => a.name.toLowerCase() === arrowName.toLowerCase())
      return found.path
    },
    handleKeyDown(event: KeyboardEvent) {
      if (!this.currentStratagem) return

      const keyMap: Record<string, string> = {
        arrowup: 'up',
        w: 'up',
        arrowdown: 'down',
        s: 'down',
        arrowleft: 'left',
        a: 'left',
        arrowright: 'right',
        d: 'right',
      }

      const pressedKey = event.key.toLowerCase()
      const mappedDirection = keyMap[pressedKey]
      const expectedDirection = this.currentStratagem.code[this.arrow_index]

      if (mappedDirection === expectedDirection) {
        this.arrow_index++
      } else {
        if (this.modifier > 1.0) {
          this.modifier = this.modifier - 0.25
        }
        this.arrow_index = 0
        this.triggerShake()
      }
    },
    triggerShake() {
      this.isShaking = true
      setTimeout(() => {
        this.isShaking = false
      }, 820)
    },
  },
})
</script>

<template>
  <main class="game-main">
    <div class="game-container">
      <div v-if="strata_sequence.length > 0" class="sequence-display">
        <h3>Level: {{ level }} | Modifier: {{ modifier }}x</h3>
        <h2 class="strat-name">{{ currentStratagem?.name }}</h2>
        <img :src="currentStratagem?.path" class="strata-picture" />
        <div class="arrows-container" :class="{ shake: isShaking }">
          <img
            v-for="(arrow, a) in currentStratagem?.code"
            :key="a"
            :src="getArrowPath(arrow)"
            class="arrow-icon"
            :class="{ 'arrow-passed': a < arrow_index }"
          />
        </div>
      </div>
      <p v-else class="placeholder-text">SYSTEM READY. WAITING FOR PILOT...</p>
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

.sequence-display {
  text-align: center;
}

.strat-name {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffc72c;
}

.strata-picture {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 1.5rem;
}

.arrows-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.arrow-icon {
  width: 35px;
  height: 35px;
  object-fit: contain;
  opacity: 0.5;
}

.arrow-passed {
  opacity: 1;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
