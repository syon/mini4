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
    <div class="flex mt-4 mb-1">
      <div class="flex-1 mx-2">
        <template v-for="o of leftItems">
          <score-cell
            :key="o.label"
            :label="o.label"
            :score="o.score"
            :class="o.class"
          />
        </template>
        <div class="flex mt-4 relative">
          <button class="zzBtnRect1 z-10" @click="handleCopy">
            コピー
          </button>
          <button class="zzBtnRect1 z-10 ml-1" @click="handleCopyNolabel">
            値のみコピー
          </button>
        </div>
      </div>
      <div class="flex-1 mx-2">
        <template v-for="o of rightItems">
          <score-cell
            :key="o.label"
            :label="o.label"
            :score="o.score"
            :class="o.class"
          />
        </template>
      </div>
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
    leftItems() {
      const s = this.scores
      return [
        { label: 'スピード', score: s.スピード },
        { label: 'パワー', score: s.パワー },
        { label: 'コーナー安定', score: s.コーナー安定 },
        { label: 'スタミナ耐久', score: s.スタミナ耐久 },
        { label: '重さ', score: s.重さ },
        { label: 'ギヤ比', score: s.ギヤ比, class: 'zz-textpurple' },
        { label: 'ギヤ負荷', score: s.ギヤ負荷, class: 'zz-textpurple' },
        { label: 'パワーロス', score: s.パワーロス, class: 'zz-textpurple' },
        {
          label: 'スピードロス',
          score: s.スピードロス,
          class: 'zz-textpurple',
        },
        { label: '消費電流', score: s.消費電流, class: 'zz-textpurple' },
        { label: '節電', score: s.節電, class: 'zz-textpurple' },
        { label: '制振', score: s.制振, class: 'zz-textpurple' },
      ]
    },
    rightItems() {
      const s = this.scores
      return [
        { label: 'タイヤ摩擦', score: s.タイヤ摩擦, class: 'zz-textblue' },
        { label: 'タイヤ旋回', score: s.タイヤ旋回, class: 'zz-textblue' },
        { label: 'タイヤ反発', score: s.タイヤ反発, class: 'zz-textblue' },
        {
          label: 'タイヤ径・フロント',
          score: this.frontTireSize,
          class: 'zz-textblue',
        },
        {
          label: 'タイヤ径・リヤ',
          score: this.rearTireSize,
          class: 'zz-textblue',
        },
        { label: 'ローラー摩擦', score: s.ローラー摩擦, class: 'zz-textgreen' },
        { label: 'ローラー抵抗', score: s.ローラー抵抗, class: 'zz-textgreen' },
        { label: 'スラスト角', score: s.スラスト角, class: 'zz-textgreen' },
        { label: 'スタビ減速', score: s.スタビ減速, class: 'zz-textgreen' },
        { label: 'ブレーキ減速', score: s.ブレーキ減速, class: 'zz-textgreen' },
        {
          label: 'エアロダウンフォース',
          score: s.エアロダウンフォース,
          class: 'zz-textgreen',
        },
        { label: 'ウェーブ', score: s.ウェーブ, class: 'zz-textyellow' },
        { label: 'オフロード', score: s.オフロード, class: 'zz-textyellow' },
        { label: 'デジタル', score: s.デジタル, class: 'zz-textyellow' },
      ]
    },
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
      const list = this.leftItems.concat(this.rightItems)
      const lines = list.map((o) => {
        return `${o.label}\t${Util.fixedNum(o.score, 3)}`
      })
      lines.unshift(`ボディ特性\t${this.bodyInfo.ボディ特性}`)
      Util.copyToClipboard(lines.join('\n'))
      window.alert('コピーしました。')
    },
    handleCopyNolabel() {
      const list = this.leftItems.concat(this.rightItems)
      const lines = list.map((o) => {
        return `${Util.fixedNum(o.score, 3)}`
      })
      lines.unshift(this.bodyInfo.ボディ特性)
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
