<template>
  <div class="TextDump pt-2 px-4 pb-8">
    <div v-for="(r, idx) in showingRecipe" :key="idx" class="mt-1">
      <div>■{{ r.part }} {{ r.key }}</div>
      <div>{{ formatCrafts(r.crafts) }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('recipe', {
      allRecipe: (state) => state
    }),
    showingRecipe() {
      return Object.entries(this.allRecipe)
        .map(([k, v]) => {
          return { part: k, ...v }
        })
        .filter((x) => x.key)
    }
  },
  methods: {
    formatCrafts(crafts) {
      return (crafts || [])
        .filter((x) => x.action)
        .map((c) => {
          const act = (c.action || '').slice(0, 2)
          const qua = (c.quality || '').slice(0, 2)
          const lev = c.level || ''
          return `${act}(${qua}:${lev})`
        })
        .join('/')
    }
  }
}
</script>

<style lang="less" scoped>
.TextDump {
  font-size: 0.7em;
}
</style>
