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
import { mapState } from 'vuex'

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
    ingItem() {
      const partCatalog = this.dataset[this.ingPart]
      const partRecipe = this.$store.state.recipe[this.ingPart]
      const key = partRecipe.key
      return partCatalog[key] || { 性能: {} }
    },
    craftResult() {
      const defaultItemSpec = this.ingItem.性能
      const partRecipe = this.$store.state.recipe[this.ingPart]
      if (!partRecipe) return {}
      const r = this.calcCraftResult(defaultItemSpec, partRecipe)
      return {
        スピード: this.showNum(r.スピード, 2),
        パワー: this.showNum(r.パワー, 2),
        コーナー安定: r.コーナー安定,
        スタミナ耐久: r.スタミナ耐久,
        重さ: r.重さ,
        消費電力: r.消費電力,
        ギヤ負荷: r.ギヤ負荷
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
      const partCrafts = this.craftMaster[this.ingPart]
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
