<template>
  <div v-if="isTabCopy" class="zz-floatingRight">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingSubArea flex-1">
        <div class="zzCategoryHeaderLong">タブコピー</div>
        <div>
          <machine-icon tab="M1" />
          <machine-icon tab="M2" />
          <machine-icon tab="M3" />
          <machine-icon tab="M4" />
          <machine-icon tab="M5" />
        </div>
        <div class="xx-tips m-1">
          ※ 選択したマシンの内容で上書きします。
          現在表示中のセッティングは失われますのでご注意ください。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MachineIcon from '@/components/MachineIcon'

export default {
  components: {
    MachineIcon,
  },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      isTabCopy: (state) => state.isTabCopy,
    }),
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.xx-tips {
  font-size: 0.6rem;
  line-height: 1.2;
}
</style>
