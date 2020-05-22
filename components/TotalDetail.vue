<template>
  <div class="TotalDetail">
    <div class="flex items-center justify-between mt-4">
      <div class="flex-1 flex justify-between mx-1">
        <div v-for="a in aptSet" :key="a" class="flex items-center mx-1">
          <apti-hex :type="a" />
          <span class="zzAnton px-1">{{ totalAptitude[a] }}</span>
        </div>
      </div>
      <div class="zzBodyFeature mx-2">
        <div class="zzBodyFeature-Floor">
          <div class="zzBodyFeature-Content">
            <div class="zzBodyFeature-Label">ボディ<br />特性</div>
            <div class="zzBodyFeature-Text">{{ bodyInfo.ボディ特性 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-4">
      <div class="flex-1 mx-2">
        <score-cell label="スピード" :score="scores.スピード" />
        <score-cell label="パワー" :score="scores.パワー" />
        <score-cell label="コーナー安定" :score="scores.コーナー安定" />
        <score-cell label="スタミナ耐久" :score="scores.スタミナ耐久" />
        <score-cell label="重さ" :score="scores.重さ" />
        <score-cell label="ギヤ比" :score="scores.ギヤ比" />
        <score-cell label="ギヤ負荷" :score="scores.ギヤ負荷" />
        <score-cell label="パワーロス" :score="scores.パワーロス" />
        <score-cell label="スピードロス" :score="scores.スピードロス" />
        <score-cell label="消費電流" :score="scores.消費電流" />
        <score-cell label="節電" :score="scores.節電" />
        <score-cell label="制振" :score="scores.制振" />
        <score-cell
          label="エアロダウンフォース"
          :score="scores.エアロダウンフォース"
        />
      </div>
      <div class="flex-1 mx-2">
        <score-cell label="タイヤ摩擦" :score="scores.タイヤ摩擦" />
        <score-cell label="タイヤ旋回" :score="scores.タイヤ旋回" />
        <score-cell label="タイヤ反発" :score="scores.タイヤ反発" />
        <score-cell label="タイヤ径・フロント" :score="frontTireSize" />
        <score-cell label="タイヤ径・リヤ" :score="rearTireSize" />
        <score-cell label="ローラー摩擦" :score="scores.ローラー摩擦" />
        <score-cell label="ローラー抵抗" :score="scores.ローラー抵抗" />
        <score-cell label="スラスト角" :score="scores.スラスト角" />
        <score-cell label="スタビ減速" :score="scores.スタビ減速" />
        <score-cell label="ブレーキ減速" :score="scores.ブレーキ減速" />
        <score-cell label="ウェーブ" :score="scores.ウェーブ" />
        <score-cell label="オフロード" :score="scores.オフロード" />
        <score-cell label="デジタル" :score="scores.デジタル" />
      </div>
    </div>
    <div class="flex justify-center mt-1 relative">
      <button class="zzBtnRect1 z-10" @click="handleCopy">コピー</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Util from '@/models/Util'
import ScoreCell from '@/components/ScoreCell'
import AptiHex from '@/components/AptiHex'

export default {
  components: {
    ScoreCell,
    AptiHex,
  },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
    }),
    ...mapGetters({
      gAllEquips: 'recipe/gAllEquips',
      getEquipByPart: 'recipe/getEquipByPart',
      scores: 'recipe/gAllPartScoresSum',
    }),
    bodyInfo() {
      return this.getEquipByPart(this.tab, 'ボディ')
    },
    frontTireSize() {
      const info = this.getEquipByPart(this.tab, 'フロント・タイヤ')
      return info.性能.タイヤ径
    },
    rearTireSize() {
      const info = this.getEquipByPart(this.tab, 'リヤ・タイヤ')
      return info.性能.タイヤ径
    },
    aptSet() {
      return ['St', 'U', 'Co', 'Kp', 'J']
    },
    totalAptitude() {
      const apts = this.gAllEquips
        .map((x) => x.item.コース適性)
        .filter((x) => this.aptSet.includes(x))
      const result = {}
      for (const a of apts) {
        result[a] = (result[a] || 0) + 1
      }
      return result
    },
  },
  methods: {
    handleCopy() {
      const s = this.scores
      const data = []
      data.push({ label: 'スピード', score: s.スピード })
      data.push({ label: 'パワー', score: s.パワー })
      data.push({ label: 'コーナー安定', score: s.コーナー安定 })
      data.push({ label: 'スタミナ耐久', score: s.スタミナ耐久 })
      data.push({ label: '重さ', score: s.重さ })
      data.push({ label: 'ギヤ比', score: s.ギヤ比 })
      data.push({ label: 'ギヤ負荷', score: s.ギヤ負荷 })
      data.push({ label: 'パワーロス', score: s.パワーロス })
      data.push({ label: 'スピードロス', score: s.スピードロス })
      data.push({ label: '消費電流', score: s.消費電流 })
      data.push({ label: '節電', score: s.節電 })
      data.push({ label: '制振', score: s.制振 })
      data.push({
        label: 'エアロダウンフォース',
        score: s.エアロダウンフォース,
      })
      data.push({ label: 'タイヤ摩擦', score: s.タイヤ摩擦 })
      data.push({ label: 'タイヤ旋回', score: s.タイヤ旋回 })
      data.push({ label: 'タイヤ反発', score: s.タイヤ反発 })
      data.push({ label: 'タイヤ径・フロント', score: this.frontTireSize })
      data.push({ label: 'タイヤ径・リヤ', score: this.rearTireSize })
      data.push({ label: 'ローラー摩擦', score: s.ローラー摩擦 })
      data.push({ label: 'ローラー抵抗', score: s.ローラー抵抗 })
      data.push({ label: 'スラスト角', score: s.スラスト角 })
      data.push({ label: 'スタビ減速', score: s.スタビ減速 })
      data.push({ label: 'ブレーキ減速', score: s.ブレーキ減速 })
      data.push({ label: 'ウェーブ', score: s.ウェーブ })
      data.push({ label: 'デジタル', score: s.デジタル })
      data.push({ label: 'オフロード', score: s.オフロード })
      const lines = data.map((o) => {
        return `${o.label}\t${Util.fixedNum(o.score, 3)}`
      })
      Util.copyToClipboard(lines.join('\n'))
      window.alert('コピーしました。')
    },
  },
}
</script>

<style lang="less" scoped>
.TotalDetail {
  .isZero {
    color: #888;
  }
}
</style>
