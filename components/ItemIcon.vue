<template>
  <div class="ItemIcon">
    <component :is="theIcon" />
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    color1: { type: String, default: 'silver' },
    color2: { type: String, default: 'silver' },
  },
  computed: {
    theIcon() {
      return () => import(`@/assets/item-icon/${this.name}.svg`)
    },
    fillColor1() {
      return this.color1
    },
    fillColor2() {
      return this.color2
    },
  },
  watch: {
    theIcon() {
      console.log('watch theIcon.')
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
