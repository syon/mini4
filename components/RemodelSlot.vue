<template>
  <div
    :class="{ active: isActive }"
    class="xx-RemodelSlot w-full flex flex-col text-sm"
    @click="handleClick"
  >
    <div class="xx-titlebar flex justify-between">
      <div>{{ x.action || '&nbsp;' }}</div>
    </div>
    <div class="flex flex-1">
      <div
        v-if="x.quarity || x.level"
        class="xx-quarity flex-auto flex items-center justify-between text-black p-2"
      >
        <div class="xx-quarity-label">{{ x.quarity }}</div>
        <div class="xx-quarity-level">Lv.{{ x.level }}</div>
      </div>
      <div v-else class="h-8"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    arg: { type: Object, default: () => {} },
    craftIndex: { type: Number, required: true }
  },
  computed: {
    ...mapState('ing', {
      isCrafting: (state) => state.isCrafting,
      ingCraftIndex: (state) => state.craftIndex
    }),
    x() {
      return this.arg || {}
    },
    isActive() {
      return this.craftIndex === this.ingCraftIndex && this.isCrafting
    }
  },
  methods: {
    handleClick() {
      const payload = {
        craftIndex: this.craftIndex,
        craftAction: this.x.action,
        craftQuality: this.x.quarity,
        craftLevel: this.x.level
      }
      this.$store.dispatch('ing/changeCraftIndex', payload)
    }
  }
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

.xx-titlebar {
  padding: 2px 4px;
  color: #fff;
  background-color: #20272a;
  line-height: 1.2;
  font-size: 0.8rem;
}

.xx-quarity {
  .xx-quarity-label {
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.2;
  }
  .xx-quarity-level {
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.2;
  }
}

.xx-merideme {
  margin: 8px 10px 0 0;
  &:last-child {
    margin-bottom: 8px;
  }
  .xx-merideme-label {
    font-size: 0.8em;
    margin-right: 10px;
    text-align: center;
  }
  .xx-merideme-topic {
    padding-left: 10px;
  }
  &.isMerit {
    .xx-merideme-label {
      background-color: #5cfe5a;
      border: 1px solid #28cb25;
    }
    .xx-merideme-topic {
      background-color: #ceeed0;
    }
    .xx-merideme-marks {
      color: #0d7827;
      font-weight: bold;
    }
  }
}
</style>
