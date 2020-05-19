<template>
  <a
    href="#"
    :class="{ active: isActive }"
    class="xx-RemodelSlot w-full flex flex-col my-1 br-1"
    @click="handleClick"
  >
    <div class="xx-titlebar flex justify-between brt-1">
      <div>{{ x.action || '&nbsp;' }}</div>
    </div>
    <div class="flex flex-1">
      <div
        v-if="x.action && (x.quality || x.level)"
        class="xx-quality flex-auto flex items-center justify-between text-black"
      >
        <div class="xx-quality-label">{{ x.quality }}</div>
        <div class="xx-quality-level zzAnton">Lv.{{ x.level }}</div>
      </div>
      <div v-else class="xx-quality flex">
        <div class="xx-quality-label">&nbsp;</div>
        <div class="xx-quality-level zzAnton">&nbsp;</div>
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

.xx-quality {
  padding: 0.125rem 0.25rem;
  .xx-quality-label {
    letter-spacing: -0.05em;
    line-height: 1.2;
  }
  .xx-quality-level {
    line-height: 1.2;
  }
}
</style>
