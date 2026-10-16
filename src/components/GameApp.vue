<script lang="ts">
import { defineComponent } from 'vue'
import { Stratagems } from '@/assets/stratagems/helldivers-stratagems-data-sample.js'
import { Arrows } from '@/assets/stratagems/helldivers-stratagems-arrows.js'
import TimerBar from '@/components/TimerBar.vue'

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
  components: {
    TimerBar,
  },
  data() {
    return {
      player_name: '',
      score: 0,
      round_bonus: 100,
      perfect_bonus: 100,
      level: 1,
      time: 40000,
      time_bonus: 0,
      isTimerRunning: true,
      all_stratagems: Stratagems as Stratagem[],
      all_arrows: Arrows as Arrow[],
      strata_sequence: [] as Stratagem[],
      sequence_index: 0,
      arrow_index: 0,
      isShaking: false,
      levelStats: false,
      gameStart: true,
      gameOver: false,
    }
  },
  computed: {
    currentStratagem(): Stratagem | null {
      if (this.strata_sequence.length === 0) return null
      return this.strata_sequence[this.sequence_index]
    },
    nextStratagem(): Stratagem | null {
      if (this.strata_sequence.length === 0) return null
      return this.strata_sequence[this.sequence_index + 1]
    },
    previousStratagem(): Stratagem | null {
      if (this.strata_sequence.length === 0) return null
      return this.strata_sequence[this.sequence_index - 1]
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    start() {
      if (!this.player_name.trim()) {
        this.player_name = 'Super Earth Pilot'
      }

      this.score = 0
      this.level = 1
      this.sequence_index = 0
      this.arrow_index = 0
      this.time = 40000

      this.gameStart = false
      this.gameOver = false
      this.isTimerRunning = true

      this.rndStrataSequence()
    },
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
        if (this.round_bonus > 0) {
          this.round_bonus -= 25
        }
        this.perfect_bonus = 0
        this.arrow_index = 0
        this.triggerShake()
      }

      if (this.arrow_index + 1 > this.currentStratagem.code.length) {
        this.sequence_index++
        this.arrow_index = 0
        if (this.sequence_index + 1 > this.strata_sequence.length) {
          this.endLevel()
        }
      }
    },
    endLevel() {
      this.levelStats = true
      this.level++
      this.time_bonus = (this.level * (60000 - this.time)) / 1000
      this.score = Math.floor(this.score + this.time_bonus + this.perfect_bonus + this.round_bonus)
      setTimeout(() => {
        this.levelStats = false
        this.perfect_bonus = 100
        this.round_bonus = 100
        this.time = Math.max(10000, 40000 - (this.level - 1) * 5000)
        this.rndStrataSequence()
      }, 6000)
    },
    triggerShake() {
      this.isShaking = true
      setTimeout(() => {
        this.isShaking = false
      }, 420)
    },
    handleTimeout() {
      console.log('Timeout! Game over.')
      this.isTimerRunning = false
      this.gameOver = true
      this.saveScoreToLocalStorage()
    },
    saveScoreToLocalStorage() {
      const storageKey = 'stratagem-hero_leaderboard'
      const savedData = localStorage.getItem(storageKey)
      let leaderboard: { name: string; score: number }[] = savedData ? JSON.parse(savedData) : []

      const existingPlayerIndex = leaderboard.findIndex(
        (p) => p.name.toLowerCase() === this.player_name.toLowerCase(),
      )

      if (existingPlayerIndex !== -1) {
        if (this.score > leaderboard[existingPlayerIndex].score) {
          leaderboard[existingPlayerIndex].score = this.score
        }
      } else {
        leaderboard.push({ name: this.player_name, score: this.score })
      }

      leaderboard.sort((a, b) => b.score - a.score)
      localStorage.setItem(storageKey, JSON.stringify(leaderboard))
    },
    changePilot() {
      this.gameOver = false
      this.gameStart = true
      this.player_name = ''
    },
  },
})
</script>

<template>
  <main class="game-main">
    <div class="game-container">
      <div v-if="levelStats && !gameOver">
        <h1>LEVEL {{ level }}</h1>
        <div class="stats"></div>
        <table>
          <tbody>
            <tr>
              <td class="stat-name">Round bonus</td>
              <td class="table-space"></td>
              <td class="stat-score">{{ round_bonus }}</td>
            </tr>
            <tr>
              <td class="stat-name">Time Bonus</td>
              <td class="table-space"></td>
              <td class="stat-score">{{ time_bonus }}</td>
            </tr>
            <tr>
              <td class="stat-name">Perfect Bonus</td>
              <td class="table-space"></td>
              <td class="stat-score">{{ perfect_bonus }}</td>
            </tr>
            <tr>
              <td class="stat-name">Total Score</td>
              <td class="table-space"></td>
              <td class="stat-score">{{ score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="gameStart" class="screen-box">
        <h2>Enter your name, pilot!</h2>
        <input
          type="text"
          v-model="player_name"
          placeholder="Citizen Name..."
          class="name-input"
          @keyup.enter="start()"
        />
        <button class="submit-btn" @click="start()">enlist & do your part!</button>
      </div>
      <div v-if="gameOver" class="screen-box">
        <h1>GAME OVER</h1>
        <h2 class="stat-name">total score</h2>
        <h1 class="stat-score">{{ score }}</h1>
        <div class="game-over-buttons">
          <button class="submit-btn" @click="start()">FIGHT AGAIN!</button>
          <button class="submit-btn" @click="changePilot()">CHANGE PILOT</button>
        </div>
      </div>
      <div v-if="!gameStart && !gameOver && !levelStats" class="sequence-display">
        <h2>Level: {{ level }}</h2>
        <TimerBar :time="time" :running="isTimerRunning" @timeout="handleTimeout" />
        <h2 class="strat-name">{{ currentStratagem?.name }}</h2>
        <div class="strata-pictures">
          <img
            v-if="previousStratagem"
            :src="previousStratagem?.path"
            class="side-strata-picture"
          />
          <div v-else class="side-strata-placeholder"></div>
          <img :src="currentStratagem?.path" class="strata-picture" />
          <img v-if="nextStratagem" :src="nextStratagem?.path" class="side-strata-picture" />
          <div v-else class="side-strata-placeholder"></div>
        </div>
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
      <!-- <p v-else class="placeholder-text">SYSTEM READY. WAITING FOR PILOT...</p> -->
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
  max-width: 50rem;
  height: 35rem;
  background-color: #1a1d23;
  border: 3px solid #ffc72c;
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.strat-name {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffc72c;
}

.strata-pictures {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.strata-picture {
  width: 8rem;
  object-fit: contain;
  opacity: 1;
}

.side-strata-picture {
  width: 7rem;
  object-fit: contain;
  opacity: 0.5;
}

.side-strata-placeholder {
  width: 7rem;
  visibility: hidden;
}

.arrows-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.arrow-icon {
  width: 2.5rem;
  object-fit: contain;
  opacity: 0.5;
}

.arrow-passed {
  opacity: 1;
}

table {
  border: none;
  font-size: 24px;
  width: 100%;
  font-weight: bold;
}

.table-space {
  width: 6rem;
}

.stat-name {
  text-align: left;
}

.stat-score {
  text-align: right;
  color: #ffc72c;
}

h2 {
  text-align: center !important;
}

h1 {
  text-align: center !important;
  letter-spacing: 0.75rem;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

.screen-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
}

.name-input {
  background-color: #111315;
  border: 2px solid #ffc72c;
  color: #ffffff;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  width: 280px;
  outline: none;
}

.submit-btn {
  background-color: #ffc72c;
  color: #121417;
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s ease;
  font-family: 'Courier New', Courier, monospace;
  margin-top: 0.5rem;
}

.submit-btn:hover {
  background-color: #ffd859;
}

.game-over-buttons {
  display: flex;
  gap: 1rem;
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
