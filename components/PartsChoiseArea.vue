<template>
  <div class="PartsChoiseArea zzBg-gray1">
    <div class="PartsHeader px-2 py-1">{{ ingPart }}</div>
    <div class="PartsName mb-4 px-2 py-2" @click="handleShowcase">
      {{ ingItem.key || '&nbsp;' }}
    </div>
    <div v-if="ingPart === 'ボディ'" class="flex items-center justify-center">
      <label class="flex items-center text-xs">
        <input v-model="isDrill" type="checkbox" class="mr-1" />
        <span>肉抜きする({{ ingItem.肉抜き }}箇所)</span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      ingItem: (state) => state.item,
      ingPartRecipe: (state) => state.partRecipe,
    }),
    ...mapState('catalog', {
      catalog: (state) => state.dataset,
    }),
    isDrill: {
      get() {
        return this.ingPartRecipe.肉抜き
      },
      set(bool) {
        this.$store.dispatch('recipe/changeDrill', bool)
      },
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
  border-radius: 0.2rem 0.2rem 0 0;
  line-height: 1;
}
.PartsName {
  color: black;
  font-size: 0.8rem;
  background-color: #f0f4f4;
  border: 1px solid #b5babd;
  border-top: 0;
  border-radius: 0 0 0.2rem 0.2rem;
  line-height: 1.2;
}
</style>
