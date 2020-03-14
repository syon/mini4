<template>
  <div class="xx-RemodelArea flex flex-col">
    <template v-for="(x, idx) in ingCrafts">
      <div :key="idx" class="flex m-2">
        <remodel-slot :arg="x" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ingCrafts() {
      const partRecipe = this.$store.state.recipe[this.ingPart]
      if (!partRecipe) return []
      return (partRecipe.crafts || []).map((x) => this.getRemodel(x))
    }
  },
  methods: {
    getRemodel(recipeCraft) {
      const { action, quarity, level } = recipeCraft
      const partCrafts = this.craftMaster[this.ingPart]
      const c = partCrafts.find((x) => x.action === action)
      const remodel = {
        action,
        effects: c ? c.effects : [],
        quarity,
        level
      }
      return remodel
    }
  }
}
</script>

<style lang="less" scoped>
.xx-RemodelArea {
  background-color: #838888;
}
</style>
