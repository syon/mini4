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
