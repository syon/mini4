<template>
  <div class="DiagnosisArea zzBg-grit p-2">
    <div class="DiagMain relative z-10">
      <div class="flex mt-2">
        <div class="DiagLeft flex-1 mx-1">
          <div v-for="o of leftContents" :key="o.label" class="DiagLine">
            <div class="DiagLine-Label">{{ o.label }}</div>
            <div class="DiagLine-Value zzAnton">{{ o.value }}</div>
            <div class="DiagLineUnit zzAnton">{{ o.unit }}</div>
          </div>
        </div>
        <div class="DiagRight ml-1 mr-1">
          <div v-for="o of rightContents" :key="o.label" class="DiagLine">
            <div class="DiagLine-Label">{{ o.label }}</div>
            <div class="DiagLine-Value zzAnton">{{ o.value }}</div>
            <div class="DiagLineUnit zzAnton">{{ o.unit }}</div>
          </div>
        </div>
      </div>
      <div class="flex mt-2 relative">
        <div class="flex-1 mx-2">
          <button class="zzBtnRect1" @click="handleCopyDiag">
            コピー
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'
import Util from '@/models/Util'

export default {
  computed: {
    ...mapGetters({
      gAllEquips: 'recipe/gAllEquips',
      scores: 'recipe/gAllPartScoresSum',
    }),
    diag() {
      return Mini4.getDiagnosis(this.gAllEquips, this.scores)
    },
    leftContents() {
      return [
        {
          label: '最高速度(時速)',
          value: this.fixedNum(this.diag.最高速度_時速, 3),
          unit: 'km/h',
        },
        {
          label: '最高速度(秒速)',
          value: this.fixedNum(this.diag.最高速度_秒速, 3),
          unit: 'm/s',
        },
        {
          label: 'バッテリー消費量',
          value: this.fixedNum(this.diag.バッテリー消費量, 3),
          unit: 'mA/h',
        },
        {
          label: '加速度(毎秒)',
          value: this.fixedNum(this.diag.加速度, 3),
          unit: 'm/s²',
        },
        {
          label: '最高速到達時間(秒)',
          value: '-', // this.fixedNum(this.diag.最高速到達時間, 3),
          unit: '秒',
        },
        {
          label: 'タイヤグリップ',
          value: this.fixedNum(this.diag.タイヤグリップ, 3),
          unit: '',
        },
      ]
    },
    rightContents() {
      return [
        {
          label: 'コーナー減速率',
          value: '-', // this.fixedNum(this.diag.コーナー減速率, 3),
          unit: '',
        },
        {
          label: 'ジャンプ飛距離',
          value: '-', // this.fixedNum(this.diag.ジャンプ飛距離, 3),
          unit: 'm',
        },
        {
          label: 'バウンド時間',
          value: '-', // this.fixedNum(this.diag.バウンド時間, 3),
          unit: '秒',
        },
        {
          label: '前後の重心',
          value: '-', // this.fixedNum(this.diag.前後の重心, 3),
          unit: '㎜',
        },
        {
          label: 'ローラースラスト角',
          value: this.fixedNum(this.diag.ローラースラスト角, 3),
          unit: '',
        },
        {
          label: '重さ',
          value: this.fixedNum(this.diag.重さ, 3),
          unit: '',
        },
        {
          label: 'ブレーキ性能',
          value: this.fixedNum(this.diag.ブレーキ性能, 3),
          unit: '',
        },
      ]
    },
  },
  methods: {
    fixedNum(x, n) {
      return Util.fixedNum(x, n)
    },
    handleCopyDiag() {
      //
    },
  },
}
</script>

<style lang="less" scoped>
.DiagnosisArea {
  .DiagMain {
    .DiagRight {
      flex: 0.9;
      .DiagLineUnit {
        width: 1rem;
      }
    }
  }

  .DiagLine {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 1;
    padding: 0.25rem 0 0.25rem 0.25rem;
    border-radius: 0.25rem;
    margin-bottom: 0.25rem;

    .DiagLine-Value {
      flex: auto;
      text-align: right;
    }
    .DiagLineUnit {
      margin-left: 0.3em;
      width: 1.5rem;
      font-size: 0.6rem;
    }
  }
}
</style>
