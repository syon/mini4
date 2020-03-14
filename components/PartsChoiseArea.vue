<template>
  <div>
    <select v-model="ingItem" class="text-lg border m-4">
      <option value="">選択なし</option>
      <option v-for="(x, key) of ingDataset" :key="key" :value="key">{{
        key
      }}</option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part
    }),
    ...mapState('catalog', {
      dataset: (state) => state.dataset
    }),
    ingItem: {
      get() {
        const partRecipe = this.$store.state.recipe[this.ingPart]
        return partRecipe ? partRecipe.key : ''
      },
      set(v) {
        const part = this.ingPart
        const item = v
        this.$store.dispatch('recipe/change', { part, item })
      }
    },
    ingDataset() {
      return this.dataset[this.ingPart]
    }
  }
}
</script>
