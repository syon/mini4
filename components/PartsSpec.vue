<template>
  <div class="PartsSpec flex justify-between">
    <div class="PartsSpecType">{{ specType }}</div>
    <div class="zzAnton" :class="specStyle">
      {{ theScore }}
    </div>
  </div>
</template>

<script>
import Mini4 from '@/models/Mini4'

export default {
  props: {
    specType: { type: String, required: true },
    beforeScore: { type: [Number, String], default: '' },
    afterScore: { type: [Number, String], default: '' },
    isHold: { type: Boolean, default: false },
  },
  computed: {
    isPositive() {
      return Mini4.isPositiveParameter(this.specType)
    },
    theScore() {
      const diff = this.afterScore - this.beforeScore
      const v = this.isHold ? diff : this.afterScore
      const prefix = this.isHold && v > 0 ? '+' : ''
      return `${prefix}${this.fixedNum(v, 3)}`
    },
    theColorClass() {
      const diff = this.afterScore - this.beforeScore
      if (diff > 0) {
        return this.isPositive ? 'isGreen' : 'isRed'
      }
      return this.isPositive ? 'isRed' : 'isGreen'
    },
    specStyle() {
      if (Number(this.theScore) === 0) {
        return 'isZero'
      }
      if (this.isHold) {
        return this.theColorClass
      }
      return 'inherit'
    },
  },
  methods: {
    fixedNum(x, n) {
      if (isNaN(x)) return ''
      const base = 10 ** n
      const num = Math.round(x * base) / base
      return num.toFixed(n)
    },
  },
}
</script>

<style lang="less" scoped>
.PartsSpec {
  font-size: 0.75rem;
  line-height: 1.5;

  .PartsSpecType {
    letter-spacing: -0.05em;
  }

  .isZero {
    color: #888;
  }

  .isGreen {
    color: #67f621;
    text-shadow: rgb(22, 81, 34) 1px 0px 1px,
      rgb(22, 81, 34) 0.540302px 0.841471px 1px,
      rgb(22, 81, 34) -0.416148px 0.909297px 1px,
      rgb(22, 81, 34) -0.989992px 0.14112px 1px,
      rgb(22, 81, 34) -0.653644px -0.756802px 1px,
      rgb(22, 81, 34) 0.283662px -0.958924px 1px,
      rgb(22, 81, 34) 0.96017px -0.279415px 1px;
  }

  .isRed {
    color: #f06542;
    text-shadow: rgb(97, 34, 14) 1px 0px 1px,
      rgb(97, 34, 14) 0.540302px 0.841471px 1px,
      rgb(97, 34, 14) -0.416148px 0.909297px 1px,
      rgb(97, 34, 14) -0.989992px 0.14112px 1px,
      rgb(97, 34, 14) -0.653644px -0.756802px 1px,
      rgb(97, 34, 14) 0.283662px -0.958924px 1px,
      rgb(97, 34, 14) 0.96017px -0.279415px 1px;
  }
}
</style>
