<template>
  <div>
    <div>Body: {{ stateBody }}</div>
    <div>
      Motor: {{ stateMotor }} <button @click="handleChange">change</button>
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
    handleChange() {
      this.$store.dispatch('ing/change', 'motor')
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
