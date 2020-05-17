<template>
  <div v-if="isShowcase" class="floating">
    <div class="xx-ShowcaseArea zzBg-gray1">
      <div class="flex justify-center my-2">
        <button class="zzBtn1 w-20" @click="handleDetach">外す</button>
      </div>
      <div class="xx-List">
        <div class="CraftEditSlotList">
          <template v-for="(categorySet, key) in sortedCatalog">
            <div :key="key" class="mx-1 my-1">
              <div class="xx-category mt-4 px-2">{{ key }}</div>
              <template v-for="(item, name) in categorySet">
                <a
                  :key="name"
                  href="#"
                  :class="{ active: name === ingItem.key }"
                  class="ShowcaseBox flex m-1 pr-2"
                  @click="handleSelectItem($event, name, item)"
                >
                  <div class="flex mr-1">
                    <div
                      class="w-1 rounded-l-sm"
                      :style="{ backgroundColor: item.色 }"
                    ></div>
                    <div
                      class="w-1"
                      :style="{ backgroundColor: item.色2 }"
                    ></div>
                  </div>
                  <div class="py-1">{{ name }}</div>
                  <div class="apti"><apti-hex :type="item.コース適性" /></div>
                </a>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mini4 from '../models/Mini4'
import AptiHex from '@/components/AptiHex'

export default {
  components: { AptiHex },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      ingPart: (state) => state.part,
      ingPartCatalog: (state) => state.partCatalog,
      ingItem: (state) => state.item,
      isShowcase: (state) => state.isShowcase,
    }),
    sortedCatalog() {
      const entries = Object.entries(this.ingPartCatalog)
      const cates = entries.map(([k, v]) => v.表示カテゴリ)
      const categories = this.uniq(cates)
      const catalog = Object.fromEntries(categories.map((x) => [x, {}]))
      for (const cate of categories) {
        const arr = entries.filter(([k, v]) => v.表示カテゴリ === cate)
        for (const [k, v] of arr) {
          if (k.startsWith('(ノーマル')) continue
          catalog[cate][k] = v
        }
      }
      return catalog
    },
  },
  methods: {
    handleSelectItem($event, name, item) {
      $event.preventDefault()
      const basePart = this.ingPart
      if (Mini4.isAccessory(basePart)) {
        this.checkAccessory(basePart, item.ペアカテゴリ)
      } else {
        this.checkPair(basePart, item.ペアカテゴリ)
      }
      this.$store.dispatch('recipe/change', { part: basePart, name })
      this.$ga.event('Catalog', 'Equip', basePart, name)
    },
    checkAccessory(basePart, basePairCategory) {
      const others = [
        'アクセサリー・１',
        'アクセサリー・２',
        'アクセサリー・３',
        'アクセサリー・４',
      ].filter((x) => x !== basePart)
      for (const part of others) {
        const r = this.$store.getters['recipe/getRecipeByPart'](this.tab, part)
        if (!r.key) continue
        const i = this.$store.getters['catalog/getItemInfo'](part, r.key)
        if (i.ペアカテゴリ === basePairCategory) {
          this.$store.dispatch('recipe/detach', { tab: this.tab, part })
        }
      }
    },
    checkPair(basePart, basePairCategory) {
      const { part, category } = Mini4.resolvePair(basePart, basePairCategory)
      if (!part) return
      const r = this.$store.getters['recipe/getRecipeByPart'](this.tab, part)
      if (!r.key) return
      const i = this.$store.getters['catalog/getItemInfo'](part, r.key)
      if (i.ペアカテゴリ !== category) {
        this.$store.dispatch('recipe/detach', { tab: this.tab, part })
      }
    },
    handleDetach() {
      this.$store.dispatch('recipe/detach', {
        tab: this.tab,
        part: this.ingPart,
      })
      this.$store.dispatch('ing/refresh')
      this.closeDialog()
    },
    closeDialog() {
      this.$store.dispatch('ing/toggleShowcase')
    },
    uniq(array) {
      return Array.from(new Set(array))
    },
  },
}
</script>

<style lang="less" scoped>
.floating {
  position: fixed;
  top: 50px; // do not set left property for inner fixed
  z-index: 9;
  width: 218px;
  height: 100%;
}

.xx-ShowcaseArea {
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  border: 1px solid #c8c8c8;
  border-radius: 0.25rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.xx-close {
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.xx-List {
  overflow: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.CraftEditSlotList {
  padding: 0 0 30px;
}

.xx-category {
  font-size: 0.6rem;
  background-color: rgb(76, 79, 80);
}

.ShowcaseBox {
  color: black;
  font-size: 0.8rem;
  background-color: #f0f4f4;
  border: 1px solid #b5babd;
  border-radius: 0.25rem;
  position: relative;
  &.active {
    background-color: #fffca0;
    border: 1px solid #f1f658;
  }
  .apti {
    position: absolute;
    bottom: -1px;
    right: -1px;
    z-index: 1;
  }
}
</style>
