<template>
  <div>
    <div class="flex">
      <div class="w-16 h-16 bg-gray-300"></div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>スピード</div>
        <div class="text-lg">{{ craftResult.スピード }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>パワー</div>
        <div class="text-lg">{{ craftResult.パワー }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>コーナー安定</div>
        <div class="text-lg">{{ craftResult.コーナー安定 }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>スタミナ耐久</div>
        <div class="text-lg">{{ craftResult.スタミナ耐久 }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>重さ</div>
        <div class="text-lg">{{ craftResult.重さ }}g</div>
      </div>
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
      const partRecipe = this.getRecipeByPart(this.ingPart)
      const key = partRecipe ? partRecipe.key : ''
      if (!key) return { 性能: {} }
      return partCatalog[key] || { 性能: {} }
    },
    craftResult() {
      const defaultItemSpec = this.ingItem.性能
      const partRecipe = this.getRecipeByPart(this.ingPart)
      if (!partRecipe) return {}
      const r = this.calcCraftResult(defaultItemSpec, partRecipe)
      return {
        スピード: this.showNum(r.スピード, 2),
        パワー: this.showNum(r.パワー, 2),
        コーナー安定: this.showNum(r.コーナー安定, 2),
        スタミナ耐久: this.showNum(r.スタミナ耐久, 2),
        重さ: this.showNum(r.重さ, 2),
        消費電力: this.showNum(r.消費電力, 2),
        ギヤ負荷: this.showNum(r.ギヤ負荷, 2)
      }
    }
  },
  methods: {
    calcCraftResult(defaultItemSpec, partRecipe) {
      const crafts = partRecipe.crafts || []
      const args = crafts.map((x) => this.getCalcArgs(x)).flat()
      const resultSpecs = Object.assign({}, defaultItemSpec)
      for (const { affect, benefit, grow, fix } of args) {
        let kaizouVal = 0
        if (fix) {
          kaizouVal = benefit
        } else {
          kaizouVal = defaultItemSpec[affect] * benefit
        }
        const para = resultSpecs[affect]
        const growVal = (para + kaizouVal) * grow
        // 増分 == kaizouVal + growVal
        resultSpecs[affect] = para + kaizouVal + growVal
      }
      return resultSpecs
    },
    getCalcArgs({ action, quarity, level }) {
      const category = Mini4.resolveCategoryByPart(this.ingPart)
      const partCrafts = this.craftMaster[category]
      const c = partCrafts.find((x) => x.action === action)
      if (!c) return []
      return c.effects.map((e) => {
        return {
          affect: e.影響,
          benefit: e[quarity],
          grow: e.強化 * level,
          fix: e.固定
        }
      })
    },
    showNum(x, n) {
      return isNaN(x) ? '' : x.toFixed(n)
    }
  }
}
</script>
