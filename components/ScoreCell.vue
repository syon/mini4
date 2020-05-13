<template>
  <div class="ScoreCell flex justify-between">
    <div class="tracking-tighter">{{ label }}</div>
    <div :class="{ isZero }" class="ScoreCell-score zzAnton text-right">
      {{ theScore }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    score: { type: Number, required: true },
  },
  computed: {
    isZero() {
      return this.fixedNum(this.score, 3) === '0.000'
    },
    theScore() {
      return this.fixedNum(this.score, 3)
    },
  },
  methods: {
    fixedNum(x, n) {
      if (isNaN(x)) return ''
      return x.toFixed(n)
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
