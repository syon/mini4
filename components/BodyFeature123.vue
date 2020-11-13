<template>
  <div>
    <a
      href="#"
      class="zzBodyFeature mb-1"
      @click.prevent="handleClickFeature('bodyFeature')"
    >
      <div class="zzBodyFeature-Floor">
        <div class="zzBodyFeature-Content">
          <div class="zzBodyFeature-Label">ボディ<br />特性</div>
          <div class="zzBodyFeature-Text">{{ sBodyFeature.key }}</div>
        </div>
      </div>
    </a>
    <a
      href="#"
      class="zzBodyAssist mb-1"
      @click.prevent="handleClickFeature('bodyAssist1')"
    >
      <div class="zzBodyAssist-Floor">
        <div class="zzBodyAssist-Content">
          <div class="zzBodyAssist-Label">アシスト<br />効果</div>
          <div class="zzBodyAssist-Text">{{ sBodyAssist1.key }}</div>
        </div>
      </div>
    </a>
    <a
      href="#"
      class="zzBodyAssist mb-1"
      @click.prevent="handleClickFeature('bodyAssist2')"
    >
      <div class="zzBodyAssist-Floor">
        <div class="zzBodyAssist-Content">
          <div class="zzBodyAssist-Label">アシスト<br />効果</div>
          <div class="zzBodyAssist-Text">{{ sBodyAssist2.key }}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
    }),
    ...mapState('recipe', {
      sBodyFeature(state) {
        return state[this.tab].bodyFeature
      },
      sBodyAssist1(state) {
        return state[this.tab].bodyAssist1
      },
      sBodyAssist2(state) {
        return state[this.tab].bodyAssist2
      },
    }),
  },
  methods: {
    handleClickFeature(b) {
      this.$store.commit('ing/setFeature', b) // ボディ特性選択状態
      this.$store.dispatch('ing/toggleBodyFeature') // ウィンドウ
    },
  },
}
</script>
