<template>
  <div class="ItemIcon" :style="style" />
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    color: { type: String, default: 'silver' },
  },
  computed: {
    style() {
      return {
        backgroundColor: this.color,
        maskImage: `url(/item-icon/${this.name}.svg)`,
      }
    },
  },
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
