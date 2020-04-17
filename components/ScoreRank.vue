<template>
  <div :class="classOfRank" class="ScoreRank zzAnton">
    <div class="xx-alphabet">
      {{ alphabet }}
    </div>
    <div class="gradient-wrapper"></div>
  </div>
</template>

<script>
import Mini4 from '@/models/Mini4'

export default {
  props: {
    mode: { type: String, required: true },
    affect: { type: String, required: true },
    score: { type: Number, default: 0 },
  },
  computed: {
    alphabet() {
      const { mode, affect, score } = this
      return Mini4.resolveRank({ mode, affect, score })
    },
    classOfRank() {
      return `rank-${this.alphabet}`
    },
  },
}
</script>

<style lang="less" scoped>
.ScoreRank {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  line-height: 1;
}
.gradient-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    0deg,
    hsla(0, 0%, 0%, 0.25) 0%,
    hsla(0, 0%, 0%, 0) 33%,
    hsla(0, 0%, 0%, 0) 67%,
    hsla(0, 0%, 0%, 0.25) 100%
  );
}
.rank-A {
  color: #816e1a;
  background-color: #f8e56d;
}
.rank-B {
  color: #699b36;
  background-color: #d0ffa4;
}
.rank-C {
  color: #5c859a;
  background-color: #c7eeff;
}
.rank-D {
  color: #6276b4;
  background-color: #d6dffe;
}
.rank-E {
  color: #727292;
  background-color: #ddd9fe;
}
.rank-F {
  color: #3d3d3d;
  background-color: #b8b6b9;
}
.rank-G {
  color: #333333;
  background-color: #939393;
}
.rank-H {
  color: #242424;
  background-color: #5e5d5d;
}
.rank-\? {
  background-color: transparent;
}
</style>
