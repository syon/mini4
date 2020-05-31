<template>
  <div class="ToolbarArea p-1">
    <div class="ToolbarArea-inner">
      <button class="zzBtnRectGreen" @click="handleTabCopy">
        他のマシンからコピー
      </button>
      <button class="zzBtnRect1 ml-1" @click="handleDetachAll">
        パーツをすべて外す
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
    handleDetachAll() {
      const msg = 'パーツをすべて外します。よろしいですか？'
      if (window.confirm(msg)) {
        this.$store.dispatch('recipe/detachAll')
        this.$ga.event('DetachAll')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.ToolbarArea {
  // position: relative;
  // height: 1rem;
  // background: rgb(46, 52, 54);
  // background: linear-gradient(
  //   0deg,
  //   rgba(46, 52, 54, 1) 0%,
  //   rgba(65, 69, 70, 1) 100%
  // );

  .ToolbarArea-inner {
    width: 100%;
    // position: absolute;
    z-index: 2;
    display: flex;
    // justify-content: center;

    > button {
      // margin: 0 0.25rem;
      display: flex;
      width: 100%;
      // height: 1.2rem;
      // line-height: 1.2rem;
      padding: 0;
      justify-content: center;
    }
  }

  .zzBtnRect1 {
    // padding: 0 0.75rem;
  }

  .zzBtnRectGreen {
    // padding: 0 0.75rem;
  }
}
</style>
