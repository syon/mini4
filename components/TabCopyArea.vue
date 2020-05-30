<template>
  <div v-if="isTabCopy" class="zz-floatingRight">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingSubArea flex-1">
        <div class="zzCategoryHeaderLong">タブコピー</div>
        <div>
          <a
            href="#"
            class="xx-machine m-1"
            :class="{ current: tab === 'M1' }"
            @click="handleMachine($event, 'M1')"
          >
            <div class="zzAnton mx-2">M1</div>
            <machine-icon tab="M1" />
          </a>
          <a
            href="#"
            class="xx-machine m-1"
            :class="{ current: tab === 'M2' }"
            @click="handleMachine($event, 'M2')"
          >
            <div class="zzAnton mx-2">M2</div>
            <machine-icon tab="M2" />
          </a>
          <a
            href="#"
            class="xx-machine m-1"
            :class="{ current: tab === 'M3' }"
            @click="handleMachine($event, 'M3')"
          >
            <div class="zzAnton mx-2">M3</div>
            <machine-icon tab="M3" />
          </a>
          <a
            href="#"
            class="xx-machine m-1"
            :class="{ current: tab === 'M4' }"
            @click="handleMachine($event, 'M4')"
          >
            <div class="zzAnton mx-2">M4</div>
            <machine-icon tab="M4" />
          </a>
          <a
            href="#"
            class="xx-machine m-1"
            :class="{ current: tab === 'M5' }"
            @click="handleMachine($event, 'M5')"
          >
            <div class="zzAnton mx-2">M5</div>
            <machine-icon tab="M5" />
          </a>
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
  methods: {
    handleMachine($event, tabFrom) {
      $event.preventDefault()
      const tabTo = this.tab
      this.$store.dispatch('recipe/copyMachineTab', { tabFrom, tabTo })
    },
  },
}
</script>

<style lang="less" scoped>
.xx-machine {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(37, 37, 37);
  background: linear-gradient(
    0deg,
    rgba(37, 37, 37, 1) 0%,
    rgba(20, 23, 23, 1) 35%,
    rgba(0, 0, 0, 1) 70%,
    rgba(40, 41, 40, 1) 100%
  );
  border: 1px solid #0e1111;
  border-radius: 0.25rem;

  &.current {
    background-color: #505657;
    background-image: url(/bg_grid_w.svg);
    border: 1px solid #b5babd;
  }
}

.xx-tips {
  font-size: 0.6rem;
  line-height: 1.2;
}
</style>
