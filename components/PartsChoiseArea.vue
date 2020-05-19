<template>
  <div class="PartsChoiseArea m-1">
    <div class="PartsHeader px-2 py-1 brt-1">{{ ingPart }}</div>
    <div class="PartsName flex brb-1" @click="handleShowcase">
      <div class="flex">
        <div class="w-1 brbl-1" :style="{ backgroundColor: ingItem.色 }"></div>
        <div class="w-1" :style="{ backgroundColor: ingItem.色2 }"></div>
      </div>
      <div class="p-1">
        {{ ingItem.key || '&nbsp;' }}
      </div>
      <apti-hex :type="ingItem.コース適性" class="PartsApti" />
    </div>
    <div
      v-if="ingPart === 'ボディ'"
      class="flex items-center justify-center mt-1"
    >
      <template v-if="drillAvailable">
        <label class="flex items-center">
          <input v-model="isDrill" type="checkbox" class="mx-1" />
          <span>肉抜きする({{ ingItem.肉抜き }}箇所)</span>
        </label>
      </template>
      <template v-else>
        <span>(肉抜き情報なし)</span>
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

<style lang="less" scoped>
.PartsHeader {
  color: black;
  font-size: 0.6rem;
  background: linear-gradient(
    0deg,
    rgba(178, 178, 171, 1) 0%,
    rgba(211, 212, 208, 1) 100%
  );
  border: 1px solid #b5babd;
  line-height: 1;
}
.PartsName {
  color: black;
  font-size: 0.9rem;
  background-color: #f0f4f4;
  border: 1px solid #b5babd;
  border-top: 0;
  line-height: 1.2;
  position: relative;
  cursor: pointer;
}
.PartsApti {
  position: absolute;
  bottom: -1px;
  right: -1px;
}
</style>
