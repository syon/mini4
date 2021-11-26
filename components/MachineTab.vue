<template>
  <a
    :id="tab"
    href="#"
    class="MachineTab m-05 br-1"
    @click="handleClickTab($event, tab)"
  >
    <machine-icon :tab="tab" />
    <div class="ActiveEffect" :class="{ active }">
      <div class="ActiveEffect-inner br-1"></div>
    </div>
  </a>
</template>

<script>
import { mapState } from 'vuex'
import MachineIcon from '@/components/MachineIcon'

export default {
  components: {
    MachineIcon,
  },
  props: {
    tab: { type: String, required: true },
  },
  computed: {
    ...mapState('ing', {
      ingTab: (state) => state.tab,
    }),
    active() {
      return this.tab === this.ingTab
    },
  },
  methods: {
    handleClickTab($event, tab) {
      $event.preventDefault()
      this.$store.commit('ing/setTab', tab)
    },
  },
}
</script>

<style lang="less" scoped>
.MachineTab {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  height: 36px;
  background: rgb(37, 37, 37);
  background: linear-gradient(
    0deg,
    rgba(37, 37, 37, 1) 0%,
    rgba(20, 23, 23, 1) 35%,
    rgba(0, 0, 0, 1) 70%,
    rgba(40, 41, 40, 1) 100%
  );
  border: 1px solid #0e1111;

  .ActiveEffect {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: center;
    z-index: 0;

    &.active {
      opacity: 1;
    }
    .ActiveEffect-inner {
      width: 100%;
      background: rgb(94, 93, 54);
      background: linear-gradient(
        180deg,
        rgba(94, 93, 54, 0.3) 0%,
        rgba(73, 66, 22, 0.3) 35%,
        rgba(152, 120, 6, 0.3) 70%,
        rgba(209, 180, 37, 0.3) 100%
      );
      border: 1px solid rgba(186, 174, 33, 0.9);
      box-shadow: 0 0 3px 2px rgba(255, 242, 127, 0.6),
        0 0 9px 4px rgba(255, 235, 59, 0.4);
    }
  }
}
</style>
