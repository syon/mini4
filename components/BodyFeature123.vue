<template>
  <div :class="{ horizontal }">
    <a
      href="#"
      class="zzBodyFeature color1 mb-1"
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
      class="zzBodyFeature color2 mb-1"
      @click.prevent="handleClickFeature('bodyAssist1')"
    >
      <div class="zzBodyFeature-Floor">
        <div class="zzBodyFeature-Content">
          <div v-if="!horizontal" class="zzBodyFeature-Label">
            アシスト<br />効果
          </div>
          <div class="zzBodyFeature-Text">
            {{ sBodyAssist1.key || '&nbsp;' }}
          </div>
        </div>
      </div>
    </a>
    <a
      href="#"
      class="zzBodyFeature color2 mb-1"
      @click.prevent="handleClickFeature('bodyAssist2')"
    >
      <div class="zzBodyFeature-Floor">
        <div class="zzBodyFeature-Content">
          <div v-if="!horizontal" class="zzBodyFeature-Label">
            アシスト<br />効果
          </div>
          <div class="zzBodyFeature-Text">
            {{ sBodyAssist2.key || '&nbsp;' }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    horizontal: { type: Boolean, default: false },
  },
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

<style lang="less" scoped>
.horizontal {
  display: flex;
  .color1 {
    width: 143px;
  }
  .color2 {
    width: 103px;
  }
}
</style>
