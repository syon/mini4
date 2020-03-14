<template>
  <div>
    <div>
      Body: {{ stateBody }}
      <button @click="handleTrans('body')">trans</button>
    </div>
    <div>
      Motor: {{ stateMotor.key }}
      <button @click="handleTrans('motor')">trans</button>
    </div>
    <div>Gear: {{ stateGear }}</div>
    <hr />
    <div>ingPart: {{ ingPart }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part
    }),
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
    handleTrans(part) {
      this.$store.dispatch('ing/trans', part)
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
