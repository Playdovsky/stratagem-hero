<script lang="ts">
import { defineComponent } from 'vue'
import { Stratagems } from '@/assets/stratagems/helldivers-stratagems-data'
import { Arrows } from '@/assets/stratagems/helldivers-stratagems-arrows'

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
      all_stratagems: Stratagems as Stratagem[],
      all_arrows: Arrows as Arrow[],
    }
  },
  methods: {
    getArrowPath(arrowName: string): string {
      const found = this.all_arrows.find((a) => a.name.toLowerCase() === arrowName.toLowerCase())
      return found?.path || ''
    },
  },
})
</script>

<template>
  <div class="stratagem-table-container">
    <h2>Stratagems academy</h2>
    <table>
      <thead>
        <tr>
          <td>Icon</td>
          <td>Name</td>
          <td>Code</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(stratagem, index) in all_stratagems" :key="index">
          <td>
            <img :src="stratagem.path" class="strata-picture" />
          </td>
          <td>
            <p>{{ stratagem.name }}</p>
          </td>
          <td class="code-col">
            <img
              v-for="(arrow, a) in stratagem.code"
              :key="a"
              :src="getArrowPath(arrow)"
              class="arrow-icon"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.stratagem-table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
}

table {
  width: 100%;
  border-collapse: collapse;
}

p {
  font-size: 1rem;
}

td {
  padding: 12px 10px;
  border-bottom: 2px dotted #333;
  vertical-align: middle;
}

.icon-col {
  width: 80px;
  text-align: center;
}

.strata-picture {
  width: 3rem;
  object-fit: contain;
}

.name-col {
  font-weight: bold;
  color: #ffffff;
}

.stratagem-name {
  text-transform: uppercase;
  letter-spacing: 1px;
}

.code-col {
  width: 250px;
}

.arrows-wrapper {
  display: flex;
  align-items: center;
}

.arrow-icon {
  width: 1.25rem;
  object-fit: contain;
  padding-left: 0.5rem;
}
</style>
