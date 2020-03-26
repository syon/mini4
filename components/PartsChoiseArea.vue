<template>
  <div class="PartsChoiseArea zzBg-gray1">
    <div class="PartsName my-4 w-full">
      <div class="PartsName-label h-8">{{ ingItemKey }}</div>
      <select v-model="ingItemKey" class="PartsName-select">
        <optgroup label="">
          <option value="">選択なし</option>
          <option v-for="(x, key) of ingCatalog" :key="key" :value="key">{{
            key
          }}</option>
        </optgroup>
      </select>
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
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      ingItem: (state) => state.item
    }),
    ...mapState('catalog', {
      catalog: (state) => state.dataset
    }),
    ...mapGetters({
      getRecipeByPart: 'recipe/getRecipeByPart',
      getCatalogByPart: 'catalog/getCatalogByPart'
    }),
    ingItemKey: {
      get() {
        const partRecipe = this.getRecipeByPart(this.ingPart)
        return partRecipe ? partRecipe.key : ''
      },
      set(v) {
        const part = this.ingPart
        const item = v
        this.$store.dispatch('recipe/change', { part, item })
        this.$store.dispatch('ing/transIngPart', part)
      }
    },
    isDrill: {
      get() {
        return this.ingItem.肉抜き > 0
      },
      set(bool) {
        const cnt = bool ? this.ingItem.肉抜き : 0
        this.$store.dispatch('recipe/changeDrill', cnt)
      }
    },
    ingCatalog() {
      return this.getCatalogByPart(this.ingPart)
    }
  }
}
</script>

<style lang="less" scoped>
.PartsName {
  position: relative;
}
.PartsName-label {
  line-height: 1;
}
.PartsName-select {
  opacity: 0.01;
  position: absolute;
  top: 0;
  width: inherit;
  height: 100%;
}
</style>
