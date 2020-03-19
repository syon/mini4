<template>
  <div class="ItemIcon" :src="src" :style="style" />
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'silver' }
  },
  computed: {
    src() {
      return require(`@/assets/item-icon/${this.name}.svg`)
    },
    style() {
      return {
        backgroundColor: this.color,
        maskImage: `url(/${this.name}.svg)`
      }
    }
  }
}
</script>

<style scoped>
.ItemIcon {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  mask-position: 50%;
  mask-repeat: no-repeat;
}
</style>
