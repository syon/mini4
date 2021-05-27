<template>
  <div class="DiagnosisArea zzBg-grit px-2 py-2">
    <!-- <div class="px-2 zz-text06 zz-textblue text-center">
      -------- 2020.10.21大型アップデート対応済み --------
    </div> -->
    <!-- <div class="px-2 zz-text06 zz-textyellow text-center">
      -------- 最高速が少しずれるバグを確認してます --------
    </div> -->
    <!-- <div class="px-2 zz-text06">
      ※ 現在コーナー減速率が、改造や強化で更新されないバグがあります。
    </div>
    <div class="px-2 zz-text06">
      お手数ですが、都度ページリロードをお願いします。(そのうち直します。)
    </div> -->
    <div class="px-1 zz-text06 zz-textblue">
      ※前輪と後輪の径差がある場合に最高速の診断結果が合わないようです。
    </div>
    <div class="px-1 zz-text06 zz-textblue">
      ※(仮)となっているものは計算式が正確ではないので、参考程度にご使用ください。
    </div>
    <div class="DiagMain flex relative py-05">
      <div class="DiagLeft flex-1 mx-1">
        <div
          v-for="o of leftContents"
          :key="o.label"
          class="DiagLine"
          :class="{
            hatena: o.hatena,
          }"
        >
          <div class="DiagLine-Label">
            {{ o.label }}
          </div>
          <div class="DiagLine-Value zzAnton">{{ o.value }}</div>
          <!-- <div class="DiagLine-Unit zzAnton">{{ o.unit }}</div> -->
        </div>
        <div class="flex relative mt-1 mx-0">
          <button class="zzBtnRect1 z-10" @click="handleCopyDiag">
            コピー
          </button>
          <button class="zzBtnRect1 z-10 ml-1" @click="handleCopyDiagNolabel">
            値のみコピー
          </button>
        </div>
      </div>
      <div class="DiagRight flex-1 mx-1">
        <div
          v-for="o of rightContents"
          :key="o.label"
          class="DiagLine"
          :class="{
            hatena: o.hatena,
          }"
        >
          <div class="DiagLine-Label">{{ o.label }}</div>
          <div class="DiagLine-Value zzAnton">{{ o.value }}</div>
          <!-- <div class="DiagLine-Unit zzAnton">{{ o.unit }}</div> -->
        </div>
      </div>
    </div>
    <hr class="zz-hr-white my-1" />
    <div class="DiagMain flex relative py-05">
      <div class="DiagLeft flex-1 mx-1">
        <div v-for="o of extraLeftContents" :key="o.label" class="DiagLine">
          <div class="DiagLine-Label zz-textorange">{{ o.label }}</div>
          <div class="DiagLine-Value zz-textorange zzAnton">{{ o.value }}</div>
          <div class="DiagLine-Unit zz-textorange zzAnton">{{ o.unit }}</div>
        </div>
        <div class="flex-auto zz-text06 zz-textblue text-right">
          ※100%以上で空転しません。
        </div>
      </div>
      <div class="DiagRight flex-1 mx-1">
        <div v-for="o of extraRightContents" :key="o.label" class="DiagLine">
          <div class="DiagLine-Label zz-textgreen">{{ o.label }}</div>
          <div class="DiagLine-Value zz-textgreen zzAnton">{{ o.value }}</div>
        </div>
      </div>
    </div>
    <hr class="zz-hr-white my-1" />
    <div class="DiagMain flex relative py-05">
      <div class="DiagExtra flex-1 mx-1">
        <div v-for="o of extraContents" :key="o.label" class="DiagLine">
          <div class="">
            <div class="DiagLine-Label zz-textpurple">{{ o.label }}</div>
            <!-- <div class="DiagLine-Label zz-textpurple">{{ o.label2 }}</div> -->
          </div>
          <div class="DiagLine-Value zz-textpurple zzAnton">{{ o.value }}</div>
          <!-- <div class="DiagLine-Unit zzAnton">{{ o.unit }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'
import Util from '@/models/Util'

export default {
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      ping: (state) => state.ping,
    }),
    ...mapGetters({
      gAllEquips: 'recipe/gAllEquips',
      scores: 'recipe/gAllPartScoresSum',
      getRollerFriction: 'recipe/getRollerFriction',
      getRollerRegist: 'recipe/getRollerRegist',
    }),
    frictionRoller() {
      if (this.ping);
      return this.getRollerFriction(this.tab)
    },
    frictionRollerScore() {
      return this.frictionRoller.score.ローラー摩擦 || 0
    },
    registRoller() {
      if (this.ping);
      return this.getRollerRegist(this.tab)
    },
    registRollerScore() {
      return this.registRoller.score.ローラー抵抗 || 0
    },
    diag() {
      const totalScores = {
        ...this.scores,
        有効ローラー摩擦: this.frictionRollerScore,
        有効ローラー抵抗: this.registRollerScore,
      }
      return Mini4.getDiagnosis(this.gAllEquips, totalScores)
    },
    leftContents() {
      return [
        {
          label: '最高速度(時速)',
          value: this.fixedNum(this.diag.最高速度kmh, 4),
          unit: 'km/h',
        },
        {
          label: '最高速度(秒速)',
          value: this.fixedNum(this.diag.最高速度ms, 4),
          unit: 'm/s',
        },
        {
          label: 'バッテリー消費量',
          value: this.fixedNum(this.diag.バッテリー消費量, 4),
          unit: 'mA/h',
        },
        {
          label: '加速度(毎秒)',
          value: this.fixedNum(this.diag.加速度, 4),
          unit: 'm/s²',
        },
        {
          label: '最高速到達時間(秒)',
          value: this.fixedNum(this.diag.最高速到達時間, 4),
          unit: '秒',
        },
        {
          label: 'タイヤグリップ',
          value: this.fixedNum(this.diag.タイヤグリップ, 4),
          unit: '',
        },
      ]
    },
    rightContents() {
      return [
        {
          label: 'コーナー減速率 (仮)',
          value: this.fixedNum(this.diag.コーナー減速率, 4),
          unit: '',
          hatena: true,
        },
        {
          label: 'ジャンプ飛距離 (仮)',
          value: this.fixedNum(this.diag.ジャンプ飛距離, 4),
          unit: 'm',
          hatena: true,
        },
        {
          label: 'バウンド時間 (仮)',
          value: this.fixedNum(this.diag.バウンド時間, 4),
          unit: '秒',
          hatena: true,
        },
        {
          label: '前後の重心',
          value: this.fixedNum(this.diag.前後の重心, 4),
          unit: 'mm',
        },
        {
          label: 'ローラースラスト角',
          value: this.fixedNum(this.diag.ローラースラスト角, 4),
          unit: '',
        },
        {
          label: '重さ',
          value: this.fixedNum(this.diag.重さ, 4),
          unit: '',
        },
        {
          label: 'ブレーキ性能',
          value: this.fixedNum(this.diag.ブレーキ性能, 4),
          unit: '',
        },
      ]
    },
    extraContents() {
      return [
        // {
        //   label: 'ローラー減速参考値',
        //   label2: 'ローラー摩擦×スラスト角+ローラー抵抗÷20.8',
        //   value: this.fixedNum(this.diag.ローラー減速参考値, 4),
        //   unit: '',
        // },
        // {
        //   label: '最高速グリップ比',
        //   label2: '2.7000を下回ると空転するかも？',
        //   value: this.fixedNum(this.diag.最高速グリップ比, 4),
        //   unit: '',
        // },
        {
          label: '空転しない上限速度(時速)',
          value: this.fixedNum(this.diag.グリップ最高速, 4),
          unit: '',
        },
        {
          label: '空転しないために必要なタイヤグリップ',
          value: this.fixedNum(this.diag.最高速グリップ, 4),
          unit: '',
        },
        {
          label: '[耐水]空転しない上限速度(時速)',
          value: this.fixedNum(this.diag.耐水グリップ最高速, 4),
          unit: '',
        },
        {
          label: '[耐水]空転しないために必要なタイヤグリップ',
          value: this.fixedNum(this.diag.耐水最高速グリップ, 4),
          unit: '',
        },
      ]
    },
    extraLeftContents() {
      return [
        // {
        //   label: 'コーナー安定速度',
        //   value: this.fixedNum(this.diag.コーナー安定速度, 4),
        //   unit: '',
        // },
        // {
        //   label: '雨コーナー安定速度',
        //   value: this.fixedNum(this.diag.雨コーナー安定速度, 4),
        //   unit: '',
        // },
        {
          label: 'グリップ率',
          value: this.fixedNum(this.diag.必要グリップ率, 0),
          unit: '%',
        },
        {
          label: '[耐水]グリップ率',
          value: this.fixedNum(this.diag.耐水必要グリップ率, 0),
          unit: '%',
        },
      ]
    },
    extraRightContents() {
      return [
        {
          label: '耐風速度(時速)',
          value: this.fixedNum(this.diag.耐風最高速, 4),
          unit: '',
        },
        {
          label: '芝速度(時速)',
          value: this.fixedNum(this.diag.芝最高速, 4),
          unit: '',
        },
        {
          label: 'ダート速度(時速)',
          value: this.fixedNum(this.diag.ダート最高速, 4),
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
      const list = this.leftContents.concat(this.rightContents)
      const lines = list.map((o) => {
        return `${o.label}\t${o.value}`
      })
      Util.copyToClipboard(lines.join('\n'))
      window.alert('コピーしました。')
    },
    handleCopyDiagNolabel() {
      const list = this.leftContents.concat(this.rightContents)
      const lines = list.map((o) => {
        return o.value
      })
      Util.copyToClipboard(lines.join('\n'))
      window.alert('コピーしました。')
    },
  },
}
</script>

<style lang="less" scoped>
.DiagnosisArea {
  .DiagLine {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 1.2;
    padding: 0.25rem;
    margin: 0.125rem 0;
    border-radius: 0.25rem;
    .DiagLine-Label {
      text-align: left;
      margin-right: 0.25rem;
    }
    .DiagLine-Value {
      flex: auto;
      text-align: right;
      // margin-left: 0.25rem;
    }
    .DiagLine-Unit {
      text-align: left;
      margin-left: 0.25rem;
      font-size: 0.6rem;
      width: 0.9rem;
    }
    &.hatena {
      color: #999;
    }
  }
}
</style>
