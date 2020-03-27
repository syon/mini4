<template>
  <div v-if="isShowcase" class="xx-ShowcaseArea zzBg-gray1">
    <div class="xx-close">
      <button class="w-full" @click="closeDialog">閉じる</button>
    </div>
    <div class="CraftEditSlotList">
      <template v-for="(categorySet, key) in sortedCatalog">
        <div :key="key" class="mx-1 my-1">
          <div class="xx-category mt-4 px-2">{{ key }}</div>
          <template v-for="(item, name) in categorySet">
            <div
              :key="name"
              :class="{ active: name === ingItem.key }"
              class="xx-item m-1 px-2 py-1"
              @click="handleSelectItem(name, item)"
            >
              {{ name }}
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mini4 from '../models/Mini4'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      ingPartCatalog: (state) => state.partCatalog,
      ingItem: (state) => state.item,
      isShowcase: (state) => state.isShowcase
    }),
    sortedCatalog() {
      const entries = Object.entries(this.ingPartCatalog)
      const cates = entries.map(([k, v]) => v.表示カテゴリ)
      const categories = this.uniq(cates)
      const catalog = Object.fromEntries(categories.map((x) => [x, {}]))
      for (const cate of categories) {
        const arr = entries.filter(([k, v]) => v.表示カテゴリ === cate)
        for (const [k, v] of arr) {
          catalog[cate][k] = v
        }
      }
      return catalog
    }
  },
  methods: {
    handleSelectItem(name, item) {
      const basePart = this.ingPart
      this.checkPair(basePart, item.ペアカテゴリ)
      this.$store.dispatch('recipe/change', { part: basePart, name })
      this.closeDialog()
    },
    checkPair(basePart, basePairCategory) {
      const { part, category } = Mini4.resolvePair(basePart, basePairCategory)
      const r = this.$store.getters['recipe/getRecipeByPart'](part)
      const i = this.$store.getters['catalog/getItemInfo'](part, r.key)
      if (i.ペアカテゴリ !== category) {
        this.$store.dispatch('recipe/detach', { part })
      }
    },
    closeDialog() {
      this.$store.dispatch('ing/toggleShowcase')
    },
    uniq(array) {
      return Array.from(new Set(array))
    }
  }
}
</script>

<style lang="less" scoped>
.xx-ShowcaseArea {
  position: absolute;
  top: 75px;
  left: 0;
  width: 58vw;
  border: 1px solid #c8c8c8;
  border-radius: 0.4rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.xx-close {
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.CraftEditSlotList {
  height: 64vh;
  overflow: auto;
  padding: 0 0 30px;
}

.xx-category {
  font-size: 0.6rem;
  background-color: rgb(76, 79, 80);
}

.xx-item {
  color: black;
  font-size: 0.8rem;
  background-color: #f0f4f4;
  border: 1px solid #b5babd;
  border-radius: 0.2rem;
  &.active {
    background-color: #fffca0;
    border: 1px solid #f1f658;
  }
}
</style>
