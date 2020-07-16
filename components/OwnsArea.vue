<template>
  <div>
    <div>
      <div class="flex flex-col m-1">
        <button class="TuneBtn zzBtnRounded2" @click="handleDetach">
          外す
        </button>
      </div>
      <div class="zzCategoryHeaderLong">登録パーツ</div>
      <div
        v-for="(r, i) of theList"
        :key="i"
        class="m-1 relative"
        :class="{ active: r.isEquip }"
      >
        <div class="flex">
          <div class="zz-selectBox flex-1" @click="handlePick(r, i)">
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
        <div v-if="r.isEquip" class="xx-check">
          <the-check class="the-check" />
        </div>
      </div>
    </div>
    <hr class="zz-hr-gray my-2" />
    <div class="m-1 flex justify-center">
      <button class="zzBtnRounded1" @click="handleShowcase">
        新しいパーツを登録する
      </button>
    </div>
    <div class="h-6 flex m-1"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import equal from 'fast-deep-equal'
import Mini4 from '@/models/Mini4'
import TheCheck from '@/assets/check.svg'

export default {
  components: {
    TheCheck,
  },
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
      const part = this.part
      return this.gPartOwns(part).map((r) => {
        if (!r) return {}
        const item = this.getItemInfo(part, r.key) || {}
        const cc = item.改造カテゴリ
        const craftSummary = this.getCraftSummary(cc, r.crafts)
        const levelSum = Mini4.calcLevelSum(r.crafts)
        const isEquip = equal(this.recipe, r)
        return { ...r, ...item, craftSummary, levelSum, isEquip }
      })
    },
  },
  methods: {
    handleShowcase() {
      this.$store.dispatch('ing/openShowcase', 'add')
    },
    handleRegister() {
      const payload = {
        part: this.part,
        recipe: this.recipe,
      }
      this.$store.dispatch('owns/add', payload)
    },
    handlePick(recipe, index) {
      const tab = this.tab
      const part = this.part
      const name = recipe.key
      const crafts = recipe.crafts.slice()
      this.$store.dispatch('recipe/change', { part, name })
      this.$store.dispatch('recipe/changeCraftSet', { tab, part, crafts })
      this.$store.dispatch('ing/changeOwnsIndex', index)
    },
    handleDetach() {
      this.$store.dispatch('recipe/detach', {
        tab: this.tab,
        part: this.part,
      })
      this.$store.dispatch('ing/refresh')
    },
  },
}
</script>

<style lang="less" scoped>
.xx-check {
  position: absolute;
  top: -18px;
  right: -11px;
  z-index: 5;

  .the-check {
    position: relative;
    width: 38px;
    height: 38px;
  }
}
</style>
