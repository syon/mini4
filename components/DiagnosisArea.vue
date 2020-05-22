<template>
  <div class="DiagnosisArea m-2">
    <div class="DiagLine">
      <div class="DiagLine-Label">最高速度(時速)</div>
      <div class="DiagLine-Value">{{ diag.最高速度_時速 }}</div>
    </div>
    <div class="DiagLine">
      <div class="DiagLine-Label">最高速度(秒速)</div>
      <div class="DiagLine-Value">{{ diag.最高速度_秒速 }}</div>
    </div>
    <div class="DiagLine">
      <div class="DiagLine-Label">バッテリー消費量</div>
      <div class="DiagLine-Value">{{ diag.バッテリー消費量 }}</div>
    </div>
    <div class="DiagLine">
      <div class="DiagLine-Label">加速度(毎秒)</div>
      <div class="DiagLine-Value">{{ diag.加速度 }}</div>
    </div>
    <div class="DiagLine">
      <div class="DiagLine-Label">最高速到達時間(秒)</div>
      <div class="DiagLine-Value">{{ diag.最高速到達時間 }}</div>
    </div>
    <div class="DiagLine">
      <div class="DiagLine-Label">タイヤグリップ</div>
      <div class="DiagLine-Value">{{ diag.タイヤグリップ }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'

export default {
  computed: {
    ...mapGetters({
      gAllEquips: 'recipe/gAllEquips',
      scores: 'recipe/gAllPartScoresSum',
    }),
    diag() {
      return Mini4.getDiagnosis(this.gAllEquips, this.scores)
    },
  },
}
</script>

<style lang="less" scoped>
.DiagLine {
  display: flex;
  justify-content: space-between;
}
</style>
