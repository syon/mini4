<template>
  <div class="ScoreCell flex justify-between">
    <div class="tracking-tighter">{{ label }}</div>
    <div :class="{ isZero }" class="ScoreCell-score zzAnton text-right">
      {{ theScore }}
    </div>
  </div>
</template>

<script>
import Util from '@/models/Util'

export default {
  props: {
    label: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  computed: {
    isZero() {
      return Util.fixedNum(this.score, 4) === '0.0000'
    },
    theScore() {
      return Util.fixedNum(this.score, 4)
    },
  },
}
</script>

<style lang="less" scoped>
.ScoreCell {
  .isZero {
    color: #888;
  }
}
</style>
