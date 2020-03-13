<template>
  <div>
    <div>
      Body: {{ stateBody }}
      <button @click="handleChange('body')">change</button>
    </div>
    <div>
      Motor: {{ stateMotor }}
      <button @click="handleChange('motor')">change</button>
    </div>
    <div>Gear: {{ stateGear }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('recipe', {
      stateBody: (state) => state.body,
      stateMotor: (state) => state.motor,
      stateGear: (state) => state.gear
    })
  },
  async mounted() {
    await this.$store.dispatch('recipe/load')
  },
  methods: {
    handleChange(part) {
      this.$store.dispatch('ing/change', part)
    }
  }
}
</script>

<style lang="less" scoped>
button {
  color: blue;
  text-decoration: underline;
}
</style>
