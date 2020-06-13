<template>
  <div v-if="isShowcase" class="zz-floatingLeft" @click.self="closeDialog">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingArea-inner flex-1">
        <div class="m-1 flex justify-center">
          <button class="zzBtnRounded1" @click="handleDetach">外す</button>
        </div>
        <hr class="zz-hr-gray my-2" />
        <template v-for="(categorySet, key) in sortedCatalog">
          <div :key="key" class="">
            <div class="zzCategoryHeaderLong">{{ key }}</div>
            <template v-for="(item, name) in categorySet">
              <a
                :key="name"
                href="#"
                :class="{ active: name === ingItem.key }"
                class="zz-selectBox flex m-1"
                @click="handleSelectItem($event, name, item)"
              >
                <div class="flex">
                  <div
                    class="zz-itemColor1A"
                    :style="{ backgroundColor: item.色 }"
                  ></div>
                  <div
                    class="zz-itemColor2"
                    :style="{ backgroundColor: item.色2 }"
                  ></div>
                </div>
                <div class="p-1">{{ name }}</div>
                <apti-hex :type="item.コース適性" class="PartsApti" />
              </a>
            </template>
          </div>
        </template>
        <div class="h-6 flex m-1"></div>
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

<style lang="less" scoped></style>
