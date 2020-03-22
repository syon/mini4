<template>
  <div class="PartsChoiseArea zzBg-gray1">
    <select v-model="ingItem" class="text-lg border m-4 text-black">
      <option value="">選択なし</option>
      <option v-for="(x, key) of ingCatalog" :key="key" :value="key">{{
        key
      }}</option>
    </select>
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
    ingItem: {
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
    ingCatalog() {
      return this.getCatalogByPart(this.ingPart)
    }
  }
}
</script>
