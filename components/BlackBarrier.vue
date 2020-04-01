<template>
  <div v-if="isBarrier" class="BlackBarrier" @click="handleClick"></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      isBarrier: (state) => state.isBarrier
    })
  },
  methods: {
    handleClick() {
      this.$store.dispatch('ing/hideBarrier')
    }
  }
}
</script>

<style lang="less" scoped>
.BlackBarrier {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
