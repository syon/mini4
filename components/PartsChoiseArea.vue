<template>
  <div class="PartsChoiseArea m-1">
    <div class="zz_headgray">{{ ingPart }}</div>
    <div class="zz-selectBoxBottom flex" @click="handleShowcase">
      <div class="flex">
        <div class="w-1 brbl-1" :style="{ backgroundColor: ingItem.色 }"></div>
        <div class="w-1" :style="{ backgroundColor: ingItem.色2 }"></div>
      </div>
      <div class="px-1 py-2">
        {{ ingItem.key || '&nbsp;' }}
      </div>
      <apti-hex :type="ingItem.コース適性" class="PartsApti" />
    </div>
    <div v-if="ingPart === 'ボディ'" class="flex items-center mt-1 ml-4">
      <template v-if="drillAvailable">
        <label class="flex items-center">
          <input v-model="isDrill" type="checkbox" />
          <span class="ml-1">肉抜きする({{ ingItem.肉抜き }}箇所)</span>
        </label>
      </template>
      <template v-else>
        <span class="ml-4">(肉抜き情報なし)</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AptiHex from '@/components/AptiHex'

export default {
  components: {
    AptiHex,
  },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      ingPart: (state) => state.part,
      ingItem: (state) => state.item,
      ingPartRecipe: (state) => state.partRecipe,
    }),
    isDrill: {
      get() {
        return this.ingPartRecipe.肉抜き
      },
      set(bool) {
        const payload = { tab: this.tab, bool }
        this.$store.dispatch('recipe/changeDrill', payload)
      },
    },
    drillAvailable() {
      return this.ingItem.肉抜き > 0
    },
  },
  watch: {
    ingItem(v) {
      if (!this.drillAvailable && this.isDrill) {
        const payload = { tab: this.tab, bool: false }
        this.$store.dispatch('recipe/changeDrill', payload)
      }
    },
  },
  methods: {
    handleShowcase() {
      this.$store.dispatch('ing/toggleShowcase')
    },
  },
}
</script>

<style lang="less" scoped></style>
