<template>
  <div>
    <div>ingPart: {{ ingPart }}</div>
    <div>ingItem: {{ ingItem }}</div>
    <select v-model="ingItem">
      <option value="">選択なし</option>
      <option value="TorqueTune">トルクチューン</option>
      <option value="RevTune">レブチューン</option>
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
    ingItem: {
      get() {
        return this.$store.state.recipe[this.ingPart]
      },
      set(v) {
        const part = this.ingPart
        const item = v
        this.$store.dispatch('recipe/change', { part, item })
      }
    }
  }
}
</script>
