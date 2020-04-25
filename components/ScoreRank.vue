<template>
  <div :class="classOfRank" class="ScoreRank">
    <rank-icon-a v-if="alphabet === 'A'" />
    <rank-icon-b v-if="alphabet === 'B'" />
    <rank-icon-c v-if="alphabet === 'C'" />
    <rank-icon-d v-if="alphabet === 'D'" />
    <rank-icon-e v-if="alphabet === 'E'" />
    <rank-icon-f v-if="alphabet === 'F'" />
    <rank-icon-g v-if="alphabet === 'G'" />
    <rank-icon-h v-if="alphabet === 'H'" />
  </div>
</template>

<script>
import Mini4 from '@/models/Mini4'
import RankIconA from '@/assets/rank-icon/a.svg'
import RankIconB from '@/assets/rank-icon/b.svg'
import RankIconC from '@/assets/rank-icon/c.svg'
import RankIconD from '@/assets/rank-icon/d.svg'
import RankIconE from '@/assets/rank-icon/e.svg'
import RankIconF from '@/assets/rank-icon/f.svg'
import RankIconG from '@/assets/rank-icon/g.svg'
import RankIconH from '@/assets/rank-icon/h.svg'

export default {
  components: {
    RankIconA,
    RankIconB,
    RankIconC,
    RankIconD,
    RankIconE,
    RankIconF,
    RankIconG,
    RankIconH,
  },
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
    theIcon() {
      if (/A-H/.test(this.alphabet)) {
        return `RankIcon${this.alphabet}`
      }
      return `RankIconH`
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
  width: 32px;
  height: 32px;
  line-height: 1;

  > svg {
    width: 32px;
    height: 32px;
  }
}
</style>
