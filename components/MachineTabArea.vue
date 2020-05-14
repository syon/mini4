<template>
  <div class="MachineTabArea">
    <div class="flex">
      <machine-icon tab="M1" />
      <machine-icon tab="M2" />
      <machine-icon tab="M3" />
      <machine-icon tab="M4" />
      <machine-icon tab="M5" />
    </div>
  </div>
</template>

<script>
import MachineIcon from '@/components/MachineIcon'

export default {
  components: {
    MachineIcon,
  },
}
</script>

<style lang="less" scoped>
.MachineTabArea {
  padding: 0.3rem;
  background: rgb(46, 52, 54);
  background: linear-gradient(
    180deg,
    rgba(46, 52, 54, 1) 0%,
    rgba(65, 69, 70, 1) 100%
  );
}
</style>
