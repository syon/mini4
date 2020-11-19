<template>
  <div class="xx-RemodelArea m-1">
    <template v-for="(x, idx) in remodelSlots">
      <remodel-slot
        :key="idx"
        :arg="x"
        :craft-index="idx"
        :slot7="slot7(idx)"
      />
    </template>
    <div class="flex flex-col">
      <button class="TuneBtn zzBtnRounded2" @click="toggleCraftTune">
        <!-- まとめて改造 / プリセット -->
        改造プリセット / 一括変更
      </button>
    </div>
    <div class="flex flex-col">
      <button class="TuneBtn zzBtnRounded2" @click="toggleOwns">
        パーツ登録 / 呼出
      </button>
    </div>
    <div class="flex flex-col">
      <button class="TuneBtn zzBtnRounded2" @click="handleDetach">
        外す
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RemodelSlot from '@/components/RemodelSlot'

export default {
  components: {
    RemodelSlot,
  },
  computed: {
    ...mapState('ing', {
      ping: (state) => state.ping,
      tab: (state) => state.tab,
      ingPart: (state) => state.part,
      ingCrafts: (state) => state.crafts,
    }),
    ...mapGetters({
      getRecipeByPart: 'recipe/getRecipeByPart',
    }),
    remodelSlots() {
      if (this.ping);
      const r = this.getRecipeByPart(this.tab, this.ingPart)
      const remodels = Array.from(r.crafts || [])
      ;[...Array(7)].map((_, i) => {
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
      this.$ga.screenview('CraftTune')
    },
    toggleOwns() {
      this.$store.dispatch('ing/toggleOwns')
      this.$ga.screenview('Owns')
    },
    handleDetach() {
      this.$store.dispatch('recipe/detach', {
        tab: this.tab,
        part: this.ingPart,
      })
      this.$store.dispatch('ing/refresh')
    },
    slot7(idx) {
      if (idx === 6) return true
      return false
    },
  },
}
</script>

<style lang="less" scoped>
.TuneBtn {
  font-size: 0.75rem;
}
</style>
