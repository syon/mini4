<template>
  <div class="ToolbarArea">
    <div class="ToolbarArea-inner">
      <button class="zzBtnRectGreen" @click="handleTabCopy">タブコピー</button>
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
  position: relative;
  height: 1rem;

  .ToolbarArea-inner {
    width: 100%;
    position: absolute;
    top: -10px;
    z-index: 2;
    display: flex;
    justify-content: center;
  }

  .zzBtnRectGreen {
    padding-left: 1em;
    padding-right: 1em;
  }
}
</style>
