<template>
  <a
    href="#"
    :class="{ active: isActive, isSlot7: slot7 }"
    class="zz-selectBox my-1 flex-col flex"
    @click="handleClick"
  >
    <div class="zz-headblack flex justify-between color7">
      <div class="zz-headblack-name">{{ x.action || '&nbsp;' }}</div>
    </div>
    <div class="zz-footwhite flex flex-1">
      <div
        v-if="x.action && (x.quality || x.level)"
        class="zz-footwhite-name flex-auto flex items-center justify-between"
      >
        <div>{{ x.quality }}</div>
        <div class="zzAnton">Lv.{{ x.level }}</div>
      </div>
      <div v-else class="flex">
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    </div>
  </a>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    arg: { type: Object, default: () => {} },
    craftIndex: { type: Number, required: true },
    slot7: { type: Boolean, default: false },
  },
  computed: {
    ...mapState('ing', {
      isCrafting: (state) => state.isCrafting,
      ingCraftIndex: (state) => state.craftIndex,
    }),
    x() {
      return this.arg || {}
    },
    isActive() {
      return this.craftIndex === this.ingCraftIndex && this.isCrafting
    },
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      const payload = {
        craftIndex: this.craftIndex,
        craftAction: this.x.action || '',
        craftQuality: this.x.quality || '職人技',
        craftLevel: this.x.level || 50,
      }
      this.$store.dispatch('ing/changeCraftIndex', payload)
    },
  },
}
</script>

<style lang="less" scoped>
.xx-RemodelSlot {
  background-color: #f0f4f4;
  border: 1px solid #b5babd;
  &.active {
    background-color: #fffca0;
    border: 1px solid #f1f658;
  }
}
.isSlot7 {
  .color7 {
    background: linear-gradient(-45deg, rgb(0, 192, 128), rgb(218, 0, 163));
  }
}
</style>
