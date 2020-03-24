<template>
  <div class="xx-RemodelArea">
    <template v-for="(x, idx) in ingCrafts">
      <remodel-slot :key="idx" :arg="x" :craft-index="idx" class="flex my-1" />
    </template>
    <button @click="dump">export</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RemodelSlot from '@/components/RemodelSlot'
import Mini4 from '@/models/Mini4'

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
      const category = Mini4.resolveCategoryByPart(this.ingPart)
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
    dump() {
      this.$store.dispatch('recipe/dump', this.ingPart)
    }
  }
}
</script>

<style lang="less" scoped>
.xx-RemodelArea {
  background-color: #838888;
}
</style>
