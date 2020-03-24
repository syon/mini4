<template>
  <div class="PartsChoiseArea zzBg-gray1">
    <div class="m-4">
      <select v-model="ingItemKey" class="text-lg border text-black">
        <option value="">選択なし</option>
        <option v-for="(x, key) of ingCatalog" :key="key" :value="key">{{
          key
        }}</option>
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
      ingPart: (state) => state.part
    }),
    ...mapState('catalog', {
      catalog: (state) => state.dataset
    }),
    ...mapGetters({
      getRecipeByPart: 'recipe/getRecipeByPart',
      getCatalogByPart: 'catalog/getCatalogByPart'
    }),
    ...mapGetters({
      getCatalogByPart: 'catalog/getCatalogByPart',
      getRecipeByPart: 'recipe/getRecipeByPart'
    }),
    ingItem() {
      const partCatalog = this.getCatalogByPart(this.ingPart) || {}
      const partRecipe = this.getRecipeByPart(this.ingPart) || {}
      const item = partCatalog[partRecipe.key] || {}
      return item
    },
    ingItemKey: {
      get() {
        const partRecipe = this.getRecipeByPart(this.ingPart)
        return partRecipe ? partRecipe.key : ''
      },
      set(v) {
        const part = this.ingPart
        const item = v
        this.$store.dispatch('recipe/change', { part, item })
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
