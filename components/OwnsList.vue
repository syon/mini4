<template>
  <div>
    <div v-for="(r, i) of theList" :key="i" class="m-1">
      <div class="flex">
        <div class="zz-selectBox flex-1" @click="handlePick(r)">
          <div class="flex">
            <div class="flex">
              <div
                class="zz-itemColor1A"
                :style="{ backgroundColor: r.色 }"
              ></div>
              <div
                class="zz-itemColor2"
                :style="{ backgroundColor: r.色2 }"
              ></div>
            </div>
            <div class="p-1 flex-col">
              <div class="">{{ r.key }}</div>
              <div class="zz-text06">
                {{ r.craftSummary }}／Lv.{{ r.levelSum }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      part: (state) => state.part,
      item: (state) => state.item,
      recipe: (state) => state.partRecipe,
    }),
    ...mapGetters({
      gPartOwns: 'owns/gPartOwns',
      getItemInfo: 'catalog/getItemInfo',
      getCraftSummary: 'craft/getCraftSummary',
    }),
    theList() {
      return this.gPartOwns(this.part).map((r) => {
        if (!r) return {}
        const item = this.getItemInfo(this.part, r.key) || {}
        const craftSummary = this.getCraftSummary(item.改造カテゴリ, r.crafts)
        const levels = r.crafts.map((c) => c.level)
        const levelSum = levels.reduce((acc, crr) => acc + crr, 0)
        return { ...r, ...item, craftSummary, levelSum }
      })
    },
  },
  methods: {
    handlePick(r) {
      //
    },
  },
}
</script>
