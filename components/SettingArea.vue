<template>
  <div>
    <div>
      ボディ: {{ stateボディ.key }}
      <button @click="handleTrans('ボディ')">trans</button>
    </div>
    <div>
      モーター: {{ stateモーター.key }}
      <button @click="handleTrans('モーター')">trans</button>
    </div>
    <div>
      ギヤ: {{ stateギヤ.key }}
      <button @click="handleTrans('ギヤ')">trans</button>
    </div>
    <div>
      シャーシ: {{ stateシャーシ.key }}
      <button @click="handleTrans('シャーシ')">trans</button>
    </div>
    <div>
      ホイール: {{ stateホイール.key }}
      <button @click="handleTrans('ホイール')">trans</button>
    </div>
    <div>
      タイヤ: {{ stateタイヤ.key }}
      <button @click="handleTrans('タイヤ')">trans</button>
    </div>
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
      stateボディ: (state) => state.ボディ,
      stateモーター: (state) => state.モーター,
      stateギヤ: (state) => state.ギヤ,
      stateシャーシ: (state) => state.シャーシ,
      stateホイール: (state) => state.ホイール,
      stateタイヤ: (state) => state.タイヤ
    })
  },
  async mounted() {
    await this.$store.dispatch('recipe/load')
    this.handleTrans('ボディ')
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
