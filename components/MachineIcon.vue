<template>
  <span :id="tab" class="MachineIcon">
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
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import MachineSvg from '@/assets/machine-icon/machine.svg'

export default {
  components: {
    MachineSvg,
  },
  props: {
    tab: { type: String, required: true },
  },
  computed: {
    ...mapGetters({
      getEquipByPart: 'recipe/getEquipByPart',
    }),
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
}
</script>

<style lang="less" scoped>
.MachineIcon {
  overflow: hidden;
  align-items: center;
  display: flex;
  padding-top: 5px;

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
}
</style>
