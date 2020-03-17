<template>
  <div class="xx-RemodelArea flex flex-col">
    <template v-for="(x, idx) in ingCrafts">
      <div :key="idx" class="flex m-2">
        <remodel-slot :arg="x" :craft-index="idx" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RemodelSlot from '@/components/RemodelSlot'

export default {
  components: {
    RemodelSlot
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part
    }),
    ...mapState('craft', {
      craftMaster: (state) => state.craft
    }),
    ...mapGetters({
      getRecipeByPart: 'recipe/getRecipeByPart'
    }),
    ingCrafts() {
      const partRecipe = this.getRecipeByPart(this.ingPart)
      if (!partRecipe) return []
      this.prepareCrafts(partRecipe)
      return (partRecipe.crafts || []).map((x) => this.getRemodel(x))
    }
  },
  methods: {
    // TODO: Original Class
    prepareCrafts(partRecipe) {
      if (!partRecipe.crafts) {
        partRecipe.crafts = []
      }
      ;[...Array(6)].map((_, i) => {
        if (!partRecipe.crafts[i]) {
          partRecipe.crafts[i] = {
            action: '',
            quarity: '',
            level: 0
          }
        }
      })
    },
    getRemodel(recipeCraft) {
      const { action, quarity, level } = recipeCraft
      const category = this.resolveCategoryByPart(this.ingPart)
      const partCrafts = this.craftMaster[category]
      const c = partCrafts.find((x) => x.action === action)
      const remodel = {
        action,
        effects: c ? c.effects : [],
        quarity,
        level
      }
      return remodel
    },
    resolveCategoryByPart(part) {
      let category = part
      switch (true) {
        case /ホイール/.test(part):
          category = 'ホイール'
          break
        case /タイヤ/.test(part):
          category = 'タイヤ'
          break
        case /ローラー/.test(part):
          category = 'ローラー'
          break
        default:
          break
      }
      return category
    }
  }
}
</script>

<style lang="less" scoped>
.xx-RemodelArea {
  background-color: #838888;
}
</style>
