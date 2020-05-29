<template>
  <div v-if="isOriginal" class="zz-floatingLeft">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingSubArea flex-1">
        <div class="m-1 flex justify-center">
          <button class="zzBtnRounded1" @click="handleRegister">
            今のパーツを登録する
          </button>
        </div>
        <hr class="zz-hr-gray my-2" />
        <div class="">
          <div class="zzCategoryHeaderLong">登録パーツ</div>
          <div v-for="(r, i) of theList" :key="i" class="OwnsItem m-1 br-1">
            <div class="flex">
              <div class="OwnsItemBox br-1 flex-1" @click="handlePick(r)">
                <div class="flex">
                  <div class="flex">
                    <div
                      class="w-1 brl-1"
                      :style="{ backgroundColor: r.色 }"
                    ></div>
                    <div class="w-1" :style="{ backgroundColor: r.色2 }"></div>
                  </div>
                  <div class="p-1">
                    <div class="OwnsItemBoxTitle">{{ r.key }}</div>
                    <div class="OwnsItemBoxDesc">
                      {{ r.craftSummary }}／Lv.{{ r.levelSum }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="OwnsItemDelete flex items-center ml-1">
                <button class="zzBtnRect1" @click="handleDelete(i)">
                  削除
                </button>
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
      isOriginal: (state) => state.isOriginal,
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
    handleRegister() {
      const payload = {
        part: this.part,
        recipe: this.recipe,
      }
      this.$store.dispatch('owns/add', payload)
    },
    handlePick(recipe) {
      const tab = this.tab
      const part = this.part
      const name = recipe.key
      const crafts = recipe.crafts
      this.$store.dispatch('recipe/change', { part, name })
      this.$store.dispatch('recipe/changeCraftSet', { tab, part, crafts })
    },
    handleDelete(index) {
      const part = this.part
      this.$store.dispatch('owns/remove', { part, index })
    },
  },
}
</script>

<style lang="less" scoped>
.xx-OwnsArea {
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.OwnsList {
  position: relative;
  overflow: auto;
}

.OwnsItemBox {
  color: black;
  background-color: #f0f4f4;
  border: 1px solid #b5babd;
}

.OwnsItemBoxTitle {
  margin-bottom: 0.25rem;
}

.OwnsItemBoxDesc {
  font-size: 0.6rem;
}
</style>
