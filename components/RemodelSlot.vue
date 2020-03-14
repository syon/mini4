<template>
  <div class="xx-RemodelSlot w-full flex flex-col text-sm">
    <div class="xx-titlebar flex justify-between">
      <div>{{ x.action }}</div>
      <div>詳細</div>
    </div>
    <div class="flex">
      <div class="flex w-24">
        <div class="flex-auto flex flex-col items-center justify-center">
          <div>{{ x.quarity }}</div>
          <div>Lv.{{ x.level }}</div>
        </div>
      </div>

      <div class="flex-1 flex flex-col">
        <template v-for="(e, idx) in x.effects">
          <div :key="idx" class="flex">
            <div class="w-24">メリット</div>
            <div class="flex-1 flex justify-between">
              <div>{{ e.影響 }}</div>
              <div>{{ e.程度 }}</div>
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
</style>
