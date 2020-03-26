<template>
  <div class="xx-RemodelArea">
    <template v-for="(x, idx) in remodelSlots">
      <remodel-slot :key="idx" :arg="x" :craft-index="idx" class="flex my-1" />
    </template>
    <button @click="dump">export</button>
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
      ingPart: (state) => state.part,
      ingPartRecipe: (state) => state.partRecipe,
      ingCrafts: (state) => state.crafts
    }),
    remodelSlots() {
      const remodels = Array.from(this.ingPartRecipe.crafts || [])
      ;[...Array(6)].map((_, i) => {
        if (!remodels[i]) {
          remodels[i] = {
            action: '',
            quarity: '',
            level: 0
          }
        }
      })
      return remodels.map((x) => this.getRemodel(x))
    }
  },
  methods: {
    getRemodel(recipeCraft) {
      const { action, quarity, level } = recipeCraft
      const c = this.ingCrafts.find((x) => x.action === action)
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
