<template>
  <div class="MachineTabArea p-1">
    <div
      class="px-2 zz-text06 zz-textblue text-center"
      style="white-space: normal;"
    >
      ※現在ログイン機能が不具合で動作していません。原因は判明していますが、対応には少し時間が掛かりそうです。今回の対応により、セッティングや登録パーツが一度リセットになります。復旧後に改めて登録等行ってください。お手数をおかけして申し訳ありません。
    </div>
    <div class="flex">
      <machine-tab tab="M1" />
      <machine-tab tab="M2" />
      <machine-tab tab="M3" />
      <machine-tab tab="M4" />
      <machine-tab tab="M5" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MachineTab from '@/components/MachineTab'

export default {
  components: {
    MachineTab,
  },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
    }),
  },
  watch: {
    tab() {
      this.$store.dispatch('ing/refresh')
    },
  },
}
</script>

<style lang="less" scoped>
.MachineTabArea {
  background: rgb(46, 52, 54);
  background: linear-gradient(
    180deg,
    rgba(46, 52, 54, 1) 0%,
    rgba(65, 69, 70, 1) 100%
  );
}
</style>
