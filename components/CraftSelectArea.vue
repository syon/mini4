<template>
  <div class="xx-CraftLelectArea">
    <h3>craftIndex: {{ craftIndex }}</h3>
    <hr />
    <input v-model="quarity" type="text" class="m-2" />
    <hr />
    <input v-model="level" type="number" class="m-2" />
    <hr />
    <template v-for="(x, idx) in ingCrafts">
      <div :key="idx" class="flex m-2">
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
      quarity: '至高',
      level: 22
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
      return this.craft[this.ingPart]
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
