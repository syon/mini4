<template>
  <div v-if="isBarrier" class="BlackBarrier" @click="handleClick"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      isBarrier: (state) => state.isBarrier,
    }),
  },
  methods: {
    handleClick() {
      this.$store.dispatch('ing/hideBarrier')
    },
  },
}
</script>

<style lang="less" scoped>
.BlackBarrier {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
