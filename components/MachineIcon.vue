<template>
  <a
    :id="tab"
    href="#"
    class="MachineIcon"
    @click="handleClickTab($event, tab)"
  >
    <style>
      #{{ tab }}.MachineIcon {
        --body-color: {{ bodyColor }};
        --chassis-color: {{ chassisColor }};
        --bodyoption-color: {{ bodyoptionColor }};
        --front-tire-color: {{ fronttireColor }};
        --front-wheel-color: {{ frontwheelColor }};
        --rear-tire-color: {{ reartireColor }};
        --rear-wheel-color: {{ rearwheelColor }};
      }
    </style>
    <machine-svg />
  </a>
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
  flex: 1;
  display: flex;
  justify-content: center;
  svg {
    height: 64px;
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
