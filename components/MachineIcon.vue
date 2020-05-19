<template>
  <a
    :id="tab"
    href="#"
    class="MachineIcon m-1 br-1"
    @click="handleClickTab($event, tab)"
  >
    <!-- prettier-ignore -->
    <component :is="'style'">
      #{{ tab }}.MachineIcon {
        --body-color: {{ bodyColor }};
        --chassis-color: {{ chassisColor }};
        --bodyoption-color: {{ bodyoptionColor }};
        --front-tire-color: {{ fronttireColor }};
        --front-wheel-color: {{ frontwheelColor }};
        --rear-tire-color: {{ reartireColor }};
        --rear-wheel-color: {{ rearwheelColor }};
      }
    </component>
    <machine-svg />
    <div class="ActiveEffect" :class="{ active }">
      <div class="ActiveEffect-inner br-1"></div>
    </div>
  </a>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MachineSvg from '@/assets/machine-icon/machine.svg'

export default {
  components: {
    MachineSvg,
  },
  props: {
    tab: { type: String, required: true },
  },
  computed: {
    ...mapState('ing', {
      ingTab: (state) => state.tab,
    }),
    ...mapGetters({
      getEquipByPart: 'recipe/getEquipByPart',
    }),
    active() {
      return this.tab === this.ingTab
    },
    bodyColor() {
      return this.getEquipByPart(this.tab, 'ボディ').色 || '#fff'
    },
    chassisColor() {
      return this.getEquipByPart(this.tab, 'シャーシ').色 || this.bodyColor
    },
    bodyoptionColor() {
      return (
        this.getEquipByPart(this.tab, 'ボディオプション').色 || this.bodyColor
      )
    },
    fronttireColor() {
      return (
        this.getEquipByPart(this.tab, 'フロント・タイヤ').色 || this.bodyColor
      )
    },
    frontwheelColor() {
      return (
        this.getEquipByPart(this.tab, 'フロント・ホイール').色 || this.bodyColor
      )
    },
    reartireColor() {
      return this.getEquipByPart(this.tab, 'リヤ・タイヤ').色 || this.bodyColor
    },
    rearwheelColor() {
      return (
        this.getEquipByPart(this.tab, 'リヤ・ホイール').色 || this.bodyColor
      )
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
.MachineIcon {
  position: relative;
  flex: 1;
  display: flex;
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

  svg {
    height: 63.4px;
    padding: 0.25rem;
    position: relative;
    z-index: 1;
  }
  .icon-machine {
    fill: white;

    &.body {
      fill: var(--body-color);
    }
    &.chassis {
      fill: var(--chassis-color);
    }
    &.bodyoption {
      fill: var(--bodyoption-color);
    }
    &.bodyoption {
      fill: var(--bodyoption-color);
    }
    &.front-tire {
      fill: var(--front-tire-color);
    }
    &.front-wheel {
      fill: var(--front-wheel-color);
    }
    &.rear-tire {
      fill: var(--rear-tire-color);
    }
    &.rear-wheel {
      fill: var(--rear-wheel-color);
    }
  }
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
      box-shadow: 0 1px 3px 2px rgba(255, 242, 127, 0.6),
        0 1px 7px 2px rgba(255, 235, 59, 0.4);
    }
  }
}
</style>
