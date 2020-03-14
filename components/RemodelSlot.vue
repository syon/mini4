<template>
  <div class="xx-RemodelSlot w-full h-24 min-h-full flex flex-col text-sm">
    <div class="xx-titlebar flex justify-between">
      <div>{{ x.action }}</div>
      <div>詳細</div>
    </div>
    <div class="flex flex-1">
      <div class="flex w-24">
        <div
          class="xx-quarity flex-auto flex flex-col items-center justify-center"
        >
          <div class="xx-quarity-label">{{ x.quarity }}</div>
          <div class="xx-quarity-level">Lv.{{ x.level }}</div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <template v-for="(e, idx) in x.effects">
          <div :key="idx" :class="{ isMerit: true }" class="xx-merideme flex">
            <div class="xx-merideme-label w-24">メリット</div>
            <div class="xx-merideme-topic flex-1 flex justify-between">
              <div>{{ e.影響 }}</div>
              <div class="xx-merideme-marks">{{ e.程度 }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { arg: { type: Object, default: () => {} } },
  computed: {
    x() {
      return this.arg || {}
    }
  }
}
</script>

<style lang="less" scoped>
.xx-RemodelSlot {
  background-color: #f0f4f4;
}
.xx-titlebar {
  padding: 2px 4px;
  color: #fff;
  background-color: #20272a;
}

.xx-quarity {
  .xx-quarity-label {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1;
  }
  .xx-quarity-level {
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.2;
  }
}

.xx-merideme {
  margin-top: 8px;
  &.isMerit {
    .xx-merideme-label {
      margin-right: 10px;
      background-color: #5cfe5a;
      border: 1px solid #28cb25;
      text-align: center;
    }
    .xx-merideme-topic {
      padding-left: 10px;
      background-color: #ceeed0;
    }
    .xx-merideme-marks {
      color: #0d7827;
      font-weight: bold;
    }
  }
}
</style>
