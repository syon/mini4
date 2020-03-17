<template>
  <div
    :class="{ active: isActive }"
    class="xx-RemodelSlot w-full flex flex-col text-sm"
    @click="handleClick"
  >
    <div class="xx-titlebar flex justify-between">
      <div>{{ x.action }}</div>
      <div>詳細</div>
    </div>
    <div class="flex flex-1">
      <div class="flex w-24">
        <div
          class="xx-quarity flex-auto flex flex-col items-center justify-center h-24"
        >
          <div class="xx-quarity-label">{{ x.quarity }}</div>
          <div class="xx-quarity-level">Lv.{{ x.level }}</div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <template v-for="(e, idx) in x.effects">
          <div
            :key="idx"
            :class="{ isMerit: e.メリデメ === 'メリット' }"
            class="xx-merideme flex"
          >
            <div class="xx-merideme-label w-20">{{ e.メリデメ }}</div>
            <div class="xx-merideme-topic flex-1 flex justify-between">
              <div>{{ e.影響 }}</div>
              <div class="xx-merideme-marks">{{ e.表示 }}</div>
            </div>
          </div>
        </template>
      </div>
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
      this.$store.dispatch('ing/changeCraftIndex', this.craftIndex)
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
}

.xx-quarity {
  .xx-quarity-label {
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.2;
  }
  .xx-quarity-level {
    font-size: 1rem;
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
