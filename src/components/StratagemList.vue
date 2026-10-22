<script lang="ts">
import { defineComponent } from 'vue'
import { Stratagems } from '@/assets/stratagems/helldivers-stratagems-data'
import { Arrows } from '@/assets/stratagems/helldivers-stratagems-arrows'
import { Categories } from '@/assets/stratagems/helldivers-stratagems-categories'

interface Stratagem {
  name: string
  code: string[]
  category_id: string
  path: string
  category: string
}

interface Arrow {
  name: string
  path: string
}

interface Category {
  name: string
  category: string
}

export default defineComponent({
  data() {
    return {
      all_stratagems: Stratagems as Stratagem[],
      all_arrows: Arrows as Arrow[],
      all_categories: Categories as Category[],
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
    <div
      class="stratagem-class-container"
      v-for="(category, cindex) in all_categories"
      :key="cindex"
    >
      <h3>{{ category.name }}</h3>
      <table>
        <thead>
          <tr>
            <td>Icon</td>
            <td>Name</td>
            <td>Code</td>
          </tr>
        </thead>
        <tbody v-for="(stratagem, sindex) in all_stratagems" :key="sindex">
          <tr v-if="category.category == stratagem.category">
            <td>
              <img :src="stratagem.path" class="strata-picture" />
            </td>
            <td>
              <p>
                <b>{{ stratagem.name }}</b>
              </p>
            </td>
            <td class="code-col">
              <div class="arrows-wrapper">
                <img
                  v-for="(arrow, a) in stratagem.code"
                  :key="a"
                  :src="getArrowPath(arrow)"
                  class="arrow-icon"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.stratagem-table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 2rem;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
}

.stratagem-table-container > h2 {
  color: #ffc72c;
  letter-spacing: 0.25rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  text-align: center;
}

.stratagem-class-container {
  width: 100%;
  margin-bottom: 2.5rem;
  background-color: #1a1d23;
  border: 2px solid #ffc72c;
  padding: 1.5rem;
  box-sizing: border-box;
}

.stratagem-class-container h3 {
  color: #ffc72c;
  border-bottom: 2px dashed #b38b1e;
  padding-bottom: 0.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

p {
  font-size: 1.25rem;
}

td {
  padding: 12px 10px;
  border-bottom: 2px dotted #333;
  vertical-align: middle;
}

.strata-picture {
  width: 4rem;
  object-fit: contain;
  display: block;
}

.code-col {
  text-align: right;
}

.arrows-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}
.arrow-icon {
  width: 1.5rem;
  object-fit: contain;
}
</style>
