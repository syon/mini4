<template>
  <div class="ItemIcon">
    <component :is="theIcon" />
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'silver' },
  },
  computed: {
    theIcon() {
      return () => import(`@/assets/item-icon/${this.name}.svg`)
    },
  },
}
</script>

<style scoped>
.ItemIcon {
  width: 100%;
  height: 100%;
}
</style>
