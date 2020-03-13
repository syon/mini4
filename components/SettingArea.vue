<template>
  <div>
    <div>{{ stateBody }}</div>
    <div>{{ stateMotor }}</div>
    <div>{{ stateGear }}</div>
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
  }
}
</script>
