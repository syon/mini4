<template>
  <div v-if="isOwns" class="zz-floatingLeft">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingArea-inner flex-1">
        <div class="m-1 flex justify-center">
          <button class="zzBtnRounded1" @click="handleRegister">
            今のパーツを登録する
          </button>
        </div>
        <hr class="zz-hr-gray my-2" />
        <div class="">
          <div class="zzCategoryHeaderLong">登録パーツ</div>
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
                    <div
                      v-if="part === 'ボディ'"
                      class="zz-text06 tracking-tighter"
                    >
                      {{ (r.bodyFeature || {}).key }}／{{
                        (r.bodyAssist1 || {}).key
                      }}／{{ (r.bodyAssist2 || {}).key }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center ml-1">
                <button
                  class="zzBtnRect1-vertical zz-text06 leading-tight"
                  @click="handleDelete(i)"
                >
                  削<br />除
                </button>
              </div>
            </div>
          </div>
          <div class="h-6 flex m-1"></div>
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
      isOwns: (state) => state.isOwns,
      tab: (state) => state.tab,
      part: (state) => state.part,
      item: (state) => state.item,
      recipe: (state) => state.partRecipe,
    }),
    ...mapState('recipe', {
      sBodyFeature(state) {
        return state[this.tab].bodyFeature
      },
      sBodyAssist1(state) {
        return state[this.tab].bodyAssist1
      },
      sBodyAssist2(state) {
        return state[this.tab].bodyAssist2
      },
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
    handleRegister() {
      const payload = {
        part: this.part,
        recipe: { ...this.recipe },
      }
      if (this.part === 'ボディ') {
        payload.recipe.bodyFeature = this.sBodyFeature
        payload.recipe.bodyAssist1 = this.sBodyAssist1
        payload.recipe.bodyAssist2 = this.sBodyAssist2
      }
      this.$store.dispatch('owns/add', payload)
    },
    handlePick(recipe) {
      const tab = this.tab
      const part = this.part
      const name = recipe.key
      const crafts = recipe.crafts.slice()
      const 肉抜き = recipe.肉抜き
      const bf = (recipe.bodyFeature || {}).key
      const ba1 = (recipe.bodyAssist1 || {}).key
      const ba2 = (recipe.bodyAssist2 || {}).key
      this.$store.dispatch('recipe/change', { part, name })
      this.$store.dispatch('recipe/changeCraftSet', { tab, part, crafts })
      this.$store.dispatch('recipe/changeDrill', { tab, bool: 肉抜き })
      this.$store.dispatch('recipe/changeFeature', {
        feature: 'bodyFeature',
        name: bf,
      })
      this.$store.dispatch('recipe/changeFeature', {
        feature: 'bodyAssist1',
        name: ba1,
      })
      this.$store.dispatch('recipe/changeFeature', {
        feature: 'bodyAssist2',
        name: ba2,
      })
    },
    handleDelete(index) {
      const part = this.part
      this.$store.dispatch('owns/remove', { part, index })
    },
  },
}
</script>
