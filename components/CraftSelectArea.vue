<template>
  <div class="xx-CraftLelectArea">
    <button @click="closeDialog">×</button>
    <h3>craftIndex: {{ craftIndex }}</h3>
    <hr />
    <label>
      <input v-model="quarity" type="radio" value="イイ" />
      <span>イイ感じ</span>
    </label>
    <label>
      <input v-model="quarity" type="radio" value="職人" />
      <span>職人技</span>
    </label>
    <label>
      <input v-model="quarity" type="radio" value="至高" />
      <span>至高の逸品</span>
    </label>
    <hr />
    <input v-model="level" type="number" class="m-2" />
    <hr />
    <template v-for="(x, idx) in ingCraftsWithBlank">
      <div :key="idx" class="flex m-2" @click="handleClickSlot(x)">
        <craft-edit-slot :arg="x" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CraftEditSlot from '@/components/CraftEditSlot'

export default {
  components: {
    CraftEditSlot
  },
  data() {
    return {
      quarity: '至高の逸品',
      level: 50
    }
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      craftIndex: (state) => state.craftIndex
    }),
    ...mapState('craft', {
      craft: (state) => state.craft
    }),
    ingCrafts() {
      return this.craft[this.ingPart] || []
    },
    ingCraftsWithBlank() {
      const arr = Array.from(this.ingCrafts)
      arr.unshift({ action: '' })
      return arr
    }
  },
  methods: {
    handleClickSlot(x) {
      const isNone = x.action === ''
      const arg = {
        part: this.ingPart,
        craftIndex: this.craftIndex,
        action: x.action,
        quarity: isNone ? '' : this.quarity,
        level: isNone ? 0 : this.level
      }
      this.$store.dispatch('recipe/changeCraft', arg)
    },
    closeDialog() {
      this.$store.commit('ing/setCrafting', false)
    }
  }
}
</script>

<style lang="less" scoped>
.xx-CraftLelectArea {
  position: absolute;
  left: 0;
  background-color: #838888;
}
</style>
