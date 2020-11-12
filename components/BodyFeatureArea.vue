<template>
  <div v-if="isBodyFeature" class="zz-floatingLeft" @click.self="closeDialog">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingArea-inner flex-1">
        <div class="m-1 flex justify-center">
          <button class="zzBtnRounded1" @click="handleDetach">外す</button>
        </div>
        <hr class="zz-hr-gray my-2" />
        <div class="zzCategoryHeaderLong">スペシャルボディ特性</div>
        <template v-for="(item, key) of specialFeatureList">
          <a
            :key="key"
            class="zz-selectBox flex m-1"
            :class="{ active: key === ingItem.key, disabled: isDisabled(item) }"
            @click.prevent="handleSelectBodyFeature(key, item)"
          >
            <div class="p-1">{{ key }}</div>
          </a>
        </template>
        <div class="zzCategoryHeaderLong">ボディ特性</div>
        <template v-for="(item, key) of featureList">
          <a
            :key="key"
            class="zz-selectBox flex m-1"
            :class="{ active: key === ingItem.key, disabled: isDisabled(item) }"
            @click.prevent="handleSelectBodyFeature(key, item)"
          >
            <div class="p-1">{{ key }}</div>
          </a>
        </template>
        <div class="h-6 flex m-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      ingFeature: (state) => state.feature,
      ingPartCatalog: (state) => state.partCatalog,
      ingItem: (state) => state.item,
      isBodyFeature: (state) => state.isBodyFeature,
    }),
    ...mapState('features', {
      dataset: (state) => state.dataset,
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
      specialFeatureList() {
        return Object.fromEntries(
          Object.entries(this.dataset).filter(([name, attrs]) => {
            return attrs['スペシャル']
          })
        )
      },
      featureList() {
        return Object.fromEntries(
          Object.entries(this.dataset).filter(([name, attrs]) => {
            return !attrs['スペシャル']
          })
        )
      },
    }),
  },
  methods: {
    handleSelectBodyFeature(name, item) {
      const feature = this.ingFeature
      if (feature !== 'bodyFeature' && item['スペシャル']) {
        return
      }
      if (feature !== 'bodyFeature' && this.sBodyFeature.key === name) {
        this.$store.dispatch('recipe/detachFeature', 'bodyFeature')
      }
      if (feature !== 'bodyAssist1' && this.sBodyAssist1.key === name) {
        this.$store.dispatch('recipe/detachFeature', 'bodyAssist1')
      }
      if (feature !== 'bodyAssist2' && this.sBodyAssist2.key === name) {
        this.$store.dispatch('recipe/detachFeature', 'bodyAssist2')
      }
      this.$store.dispatch('recipe/changeFeature', { feature, name })
      this.$ga.event('Catalog', 'Equip', feature, name)
    },
    handleDetach() {
      this.$store.dispatch('recipe/detach', {
        tab: this.tab,
        part: this.ingFeature,
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
    isDisabled(item) {
      if (this.ingFeature === 'bodyFeature') return false
      return item['スペシャル']
    },
  },
}
</script>

<style lang="less" scoped></style>
