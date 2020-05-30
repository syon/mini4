<template>
  <div class="ToolbarArea pb-2">
    <div class="ToolbarArea-inner">
      <button class="zzBtnRectGreen" @click="handleTabCopy">
        マシンコピー
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleTabCopy() {
      this.$store.dispatch('ing/toggleTabCopy', true)
      this.$ga.screenview('TabCopy')
    },
  },
}
</script>

<style lang="less" scoped>
.ToolbarArea {
  // position: relative;
  // height: 1rem;
  background: rgb(46, 52, 54);
  background: linear-gradient(
    0deg,
    rgba(46, 52, 54, 1) 0%,
    rgba(65, 69, 70, 1) 100%
  );

  .ToolbarArea-inner {
    width: 100%;
    // position: absolute;
    z-index: 2;
    display: flex;
    justify-content: center;
  }
}
</style>
