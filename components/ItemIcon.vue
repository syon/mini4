<template>
  <div ref="icon" class="ItemIcon">
    <style>
      .ItemIcon .icon-{{ name }}.icon-col1 {
        fill: {{ color1 }};
      }
      .ItemIcon .icon-{{ name }}.icon-col2 {
        fill: {{ color2 }};
      }
      .ItemIcon .icon-{{ name }}.icon-col3 {
        fill: {{ color3 }};
      }
    </style>
    <component :is="theIcon" />
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    color1: { type: String, default: 'white' },
    color2: { type: String, default: 'white' },
    color3: { type: String, default: 'white' },
  },
  computed: {
    theIcon() {
      return () => import(`@/assets/item-icon/${this.name}.svg`)
    },
  },
  mounted() {
    if (this.$refs.icon) {
      for (const el of this.$el.querySelectorAll('.color1')) {
        el.setAttribute('fill', this.color1)
        el.style.fill = this.color1
        console.log(el)
      }
      for (const el of this.$el.querySelectorAll('.color2')) {
        el.setAttribute('fill', this.color2)
        el.style.fill = this.color2
        console.log(el)
      }
      for (const el of this.$el.querySelectorAll('.color3')) {
        el.setAttribute('fill', this.color3)
        el.style.fill = this.color3
        console.log(el)
      }
    }
  },
}
</script>

<style scoped>
.ItemIcon {
  width: 100%;
  height: 100%;
}
</style>
