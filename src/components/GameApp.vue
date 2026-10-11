<script lang="ts">
import { defineComponent } from 'vue'
import { Stratagems } from '@/assets/stratagems/helldivers-stratagems-data-sample.js'

interface Stratagem {
  name: string
  code: string[]
  category_id: string
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
      strata_sequence: [] as Stratagem[],
      sequence_index: 0,
      arrow_index: 0,
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
  },
  methods: {
    rndStrataSequence() {
      this.strata_sequence = []

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * this.all_stratagems.length)
        this.strata_sequence.push(this.all_stratagems[randomIndex])
      }
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
        <div class="arrows-container">
          <span v-for="(arrow, a) in currentStratagem?.code" :key="a" class="arrow-placeholder">
            {{ arrow }}
          </span>
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
</style>
