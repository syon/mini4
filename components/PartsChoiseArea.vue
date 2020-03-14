<template>
  <div>
    <div>ingPart: {{ ingPart }}</div>
    <div>ingItem: {{ ingItem }}</div>
    <select v-model="ingItem">
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
        const ingRecipe = this.$store.state.recipe[this.ingPart]
        return ingRecipe.key
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
