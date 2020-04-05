<template>
  <div class="xx-RemodelArea">
    <template v-for="(x, idx) in remodelSlots">
      <remodel-slot :key="idx" :arg="x" :craft-index="idx" class="flex my-1" />
    </template>
    <div class="flex flex-col p-2">
      <button class="zzBtn1 my-1" @click="toggleCraftTune">
        一括調整
      </button>
      <button class="zzBtn1 my-1" @click="removeAllCrafts">
        改造をすべて取り消す
      </button>
      <button class="zzBtn1 my-1" @click="dump">export</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RemodelSlot from '@/components/RemodelSlot'

export default {
  components: {
    RemodelSlot,
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      ingPartRecipe: (state) => state.partRecipe,
      ingCrafts: (state) => state.crafts,
    }),
    remodelSlots() {
      const remodels = Array.from(this.ingPartRecipe.crafts || [])
      ;[...Array(6)].map((_, i) => {
        if (!remodels[i]) {
          remodels[i] = {
            action: '',
            quality: '',
            level: 0,
          }
        }
      })
      return remodels.map((x) => this.getRemodel(x))
    },
  },
  methods: {
    getRemodel(recipeCraft) {
      const { action, quality, level } = recipeCraft
      const c = this.ingCrafts.find((x) => x.action === action)
      const remodel = {
        action,
        effects: c ? c.effects : [],
        quality,
        level,
      }
      return remodel
    },
    toggleCraftTune() {
      this.$store.dispatch('ing/toggleCraftTune')
    },
    removeAllCrafts() {
      this.$store.dispatch('recipe/removeAllCrafts', this.ingPart)
      this.$store.dispatch('ing/transIngPart', this.ingPart)
    },
    dump() {
      this.$store.dispatch('recipe/dump', this.ingPart)
    },
  },
}
</script>

<style lang="less" scoped>
.xx-RemodelArea {
  background-color: #838888;
}
</style>
