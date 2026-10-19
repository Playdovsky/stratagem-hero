<script lang="ts">
import { defineComponent } from 'vue'

interface LeaderboardEntry {
  name: string
  score: number
}

export default defineComponent({
  data() {
    return {
      leaderboard: [] as LeaderboardEntry[],
    }
  },
  mounted() {
    this.loadLeaderboard()
  },
  methods: {
    loadLeaderboard() {
      const storageKey = 'stratagem-hero_leaderboard'
      const savedData = localStorage.getItem(storageKey)

      if (savedData) {
        this.leaderboard = JSON.parse(savedData)
      } else {
        this.leaderboard = []
      }
    },
  },
})
</script>

<template>
  <div class="leaderboard-container">
    <h2>Leaderboard</h2>
    <table v-if="leaderboard.length > 0">
      <thead>
        <tr>
          <td>RANK</td>
          <td>PILOT</td>
          <td>SCORE</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in leaderboard" :key="index">
          <td class="rank">#{{ index + 1 }}</td>
          <td class="pilot-name">{{ entry.name }}</td>
          <td class="score">{{ entry.score }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-scores">NO RECORDS FOUND IN ARCHIVES. ENLIST AND SET A NEW RECORD!</p>
  </div>
</template>

<style scoped>
.leaderboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  color: #ffffff;
}

h2 {
  color: #ffc72c;
  margin-bottom: 1.5rem;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Courier New', Courier, monospace;
}

thead {
  color: #ffc72c;
  border-bottom: 2px solid #ffc72c;
  padding: 10px;
  text-align: left;
}

td {
  padding: 12px 10px;
  border-bottom: 2px dotted #444;
}

.rank {
  color: #ffc72c;
  font-weight: bold;
  width: 12%;
}

.pilot-name {
  text-transform: uppercase;
}

.score {
  text-align: right;
  color: #ffc72c;
  font-weight: bold;
}

.no-scores {
  color: #a0a0a0;
  font-style: italic;
  margin-top: 2rem;
}
</style>
