<template>
  <a
    href="#"
    :class="{ active: isActive }"
    class="xx-RemodelSlot w-full flex flex-col text-sm"
    @click="handleClick"
  >
    <div class="xx-titlebar flex justify-between">
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
  border-radius: 0.25rem;
  &.active {
    background-color: #fffca0;
    border: 1px solid #f1f658;
  }
}

.xx-titlebar {
  padding: 2px 4px;
  color: #fff;
  font-size: 0.75rem;
  letter-spacing: -0.05em;
  background-color: #20272a;
  line-height: 1.2;
  border-radius: 0.25rem 0.25rem 0 0;
}

.xx-quality {
  padding: 2px 4px;
  .xx-quality-label {
    font-size: 0.75rem;
    font-weight: normal;
    line-height: 1.2;
    letter-spacing: -0.05em;
  }
  .xx-quality-level {
    font-size: 0.75rem;
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
