<template>
  <div class="ScoreCell flex justify-between">
    <div class="tracking-tighter">{{ label }}</div>
    <div :class="{ isZero }" class="ScoreCell-score text-right">
      {{ fixedNum(score, 3) }}
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
  .ScoreCell-score {
    font-family: 'Anton', sans-serif;
  }
  .isZero {
    color: #888;
  }
}
</style>
