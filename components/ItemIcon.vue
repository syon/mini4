<template>
  <div ref="icon" class="ItemIcon" :style="styles">
    <component :is="theIcon" />
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    color1: { type: String, default: 'white' },
    color2: { type: String, default: 'white' },
  },
  computed: {
    theIcon() {
      return () => import(`@/assets/item-icon/${this.name}.svg`)
    },
    styles() {
      return {
        '--color1': this.color1,
        '--color2': this.color2,
        '--color3': '#85898a',
      }
    },
  },
}
</script>

<style lang="less" scoped>
.ItemIcon {
  width: 100%;
  height: 100%;
  --color1: white;
  --color2: white;
  --color3: white;

  .icon-col1 {
    fill: var(--color1);
  }
  .icon-col2 {
    fill: var(--color2);
  }
  .icon-col3 {
    fill: var(--color3);
  }
}
</style>
