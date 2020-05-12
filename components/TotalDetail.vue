<template>
  <div class="TotalDetail">
    <div class="flex items-center justify-between mb-3 mx-2">
      <div class="flex-1 flex justify-between mr-2">
        <div v-for="a in aptSet" :key="a" class="flex items-center">
          <apti-hex :type="a" />
          <span class="zzAnton pl-1">{{ totalAptitude[a] }}</span>
        </div>
      </div>
      <div class="BodyFeature">
        <div class="BodyFeature-Floor">
          <div class="BodyFeature-Content">
            <div class="BodyFeature-Label">ボディ<br />特性</div>
            <div class="BodyFeature-Text">{{ bodyInfo.ボディ特性 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="flex-1 px-2">
        <score-cell label="スピード" :score="scores.スピード" />
        <score-cell label="パワー" :score="scores.パワー" />
        <score-cell label="コーナー安定" :score="scores.コーナー安定" />
        <score-cell label="スタミナ耐久" :score="scores.スタミナ耐久" />
        <score-cell label="重さ" :score="scores.重さ" />
        <score-cell label="ギヤ負荷" :score="scores.ギヤ負荷" />
        <score-cell label="パワーロス" :score="scores.パワーロス" />
        <score-cell label="スピードロス" :score="scores.スピードロス" />
        <score-cell
          label="エアロダウンフォース"
          :score="scores.エアロダウンフォース"
        />
        <score-cell label="節電" :score="scores.節電" />
        <score-cell label="制振" :score="scores.制振" />
        <score-cell label="スラスト角" :score="scores.スラスト角" />
      </div>
      <div class="flex-1 px-2">
        <score-cell label="タイヤ摩擦" :score="scores.タイヤ摩擦" />
        <score-cell label="タイヤ旋回" :score="scores.タイヤ旋回" />
        <score-cell label="タイヤ反発" :score="scores.タイヤ反発" />
        <score-cell label="タイヤ径" :score="scores.タイヤ径" />
        <score-cell label="ローラー摩擦" :score="scores.ローラー摩擦" />
        <score-cell label="ローラー抵抗" :score="scores.ローラー抵抗" />
        <score-cell label="ウェーブ" :score="scores.ウェーブ" />
        <score-cell label="オフロード" :score="scores.オフロード" />
        <score-cell label="ギヤ比" :score="scores.ギヤ比" />
        <score-cell label="消費電流" :score="scores.消費電流" />
        <score-cell label="ブレーキ減速" :score="scores.ブレーキ減速" />
        <score-cell label="スタビ減速" :score="scores.スタビ減速" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
}
</script>

<style lang="less" scoped>
.TotalDetail {
  .isZero {
    color: #888;
  }
}
</style>
