<template>
  <div>
    <div class="flex">
      <div class="w-16 h-16 bg-gray-300"></div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>スピード</div>
        <div class="text-lg">{{ showInt(score.basic.スピード) }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>パワー</div>
        <div class="text-lg">{{ showInt(score.basic.パワー) }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>コーナー安定</div>
        <div class="text-lg">{{ showInt(score.basic.コーナー安定) }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>スタミナ耐久</div>
        <div class="text-lg">{{ showInt(score.basic.スタミナ耐久) }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>重さ</div>
        <div class="text-lg">{{ showInt(score.basic.重さ) }}g</div>
      </div>
    </div>
    <div class="flex">
      <template v-for="(sVal, sKey) in score.skill">
        <div
          :key="sKey"
          class="flex-auto flex flex-col items-center justify-center tracking-tighter"
        >
          <div class="text-xs">{{ sKey }}</div>
          <div class="text-sm">{{ sVal }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part
    }),
    ...mapState('catalog', {
      dataset: (state) => state.dataset
    }),
    ...mapState('craft', {
      craftMaster: (state) => state.craft
    }),
    ...mapGetters({
      getCatalogByPart: 'catalog/getCatalogByPart',
      getRecipeByPart: 'recipe/getRecipeByPart'
    }),
    ingItem() {
      const partCatalog = this.getCatalogByPart(this.ingPart)
      const partRecipe = this.getRecipeByPart(this.ingPart) || {}
      const item = partCatalog[partRecipe.key] || {}
      return item
    },
    score() {
      const r = this.getPartScore(this.ingPart)
      const basic = {}
      const skill = {}
      for (const [k, v] of Object.entries(r)) {
        const basicKeys = [
          'スピード',
          'パワー',
          'コーナー安定',
          'スタミナ耐久',
          '重さ'
        ]
        if (basicKeys.includes(k)) {
          basic[k] = this.fixedNum(v, 3)
        } else {
          skill[k] = this.fixedNum(v, 3)
        }
      }
      return { basic, skill }
    }
  },
  methods: {
    fixedNum(x, n) {
      if (isNaN(x)) return ''
      return x.toFixed(n)
    },
    showInt(x) {
      if (!x) return 0
      return Math.trunc(x)
    },
    getPartScore(part) {
      const partCatalog = this.getCatalogByPart(part)
      const partRecipe = this.getRecipeByPart(part) || {}
      const item = partCatalog[partRecipe.key] || {}
      const defaultItemSpec = item.性能 || {}
      const category = Mini4.resolveCategoryByPart(part)
      const partCrafts = this.craftMaster[category]
      const r = Mini4.calcCraftResult(defaultItemSpec, partRecipe, partCrafts)
      return r
    }
  }
}
</script>
