<template>
  <div class="xx-RemodelArea flex flex-col">
    <div class="flex m-2">
      <remodel-slot />
    </div>
    <div class="flex m-2">
      <remodel-slot />
    </div>
    <div class="flex m-2">
      <remodel-slot />
    </div>
    <div class="flex m-2">
      <remodel-slot />
    </div>
    <div class="flex m-2">
      <remodel-slot />
    </div>
    <div class="flex m-2">
      <remodel-slot />
    </div>
  </div>
</template>

<script>
import RemodelSlot from '@/components/RemodelSlot'

export default {
  components: {
    RemodelSlot
  }
}
</script>

<style lang="less" scoped>
.xx-RemodelArea {
  background-color: #838888;
}
</style>
