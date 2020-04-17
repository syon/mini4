<template>
  <div class="TotalArea zzBg-gray1">
    <div class="flex p-2 zzBg-gray2 justify-between">
      <div class="xx-total flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div>総合評価</div>
          <div class="xx-totalscore zzAnton text-2xl">
            {{ showInt(totalScore) }}
          </div>
        </div>
      </div>
      <div class="xx-affects flex items-center">
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-center">スピード</th>
              <th class="text-center">パワー</th>
              <th class="text-center">ｺｰﾅｰ安定</th>
              <th class="text-center">ｽﾀﾐﾅ耐久</th>
              <th class="text-center">重さ</th>
            </tr>
          </thead>
          <tbody class="xx-ranks">
            <tr>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="スピード"
                  :score="scores.スピード"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="パワー"
                  :score="scores.パワー"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="コーナー安定"
                  :score="scores.コーナー安定"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="スタミナ耐久"
                  :score="scores.スタミナ耐久"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank mode="TOTAL" affect="重さ" :score="scores.重さ" />
              </td>
            </tr>
          </tbody>
          <tfoot class="xx-scores zzAnton">
            <tr>
              <td class="px-2 text-center">
                {{ showInt(scores.スピード, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(scores.パワー, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(scores.コーナー安定, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(scores.スタミナ耐久, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(scores.重さ, 2) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div
      v-if="isDetailOpen"
      class="TotalArea-Detail py-2 px-4 zzBg-gray2 text-xs"
    >
      <div class="BodyFeature mb-2 mx-2">
        <div class="BodyFeature-Floor">
          <div class="BodyFeature-Content">
            <div class="BodyFeature-Label">ボディ特性</div>
            <div class="BodyFeature-Text">{{ bodyInfo.ボディ特性 }}</div>
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
    <button class="w-full text-center border" @click="toggleDetail">
      <span v-if="isDetailOpen">▲</span>
      <span v-else>▼</span>
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ScoreRank from '@/components/ScoreRank'
import ScoreCell from '@/components/ScoreCell'

export default {
  components: {
    ScoreRank,
    ScoreCell,
  },
  data() {
    return {
      isDetailOpen: false,
    }
  },
  computed: {
    ...mapState('ing', {
      ingPartRecipe: (state) => state.partRecipe,
      ingItem: (state) => state.item,
      ingCrafts: (state) => state.crafts,
    }),
    ...mapState('craft', {
      craftMaster: (state) => state.craft,
    }),
    ...mapGetters({
      getEquipByPart: 'recipe/getEquipByPart',
      scores: 'recipe/gAllPartScoresSum',
    }),
    bodyInfo() {
      return this.getEquipByPart('ボディ')
    },
    totalScore() {
      let score = 0
      const basics = [
        'スピード',
        'パワー',
        'コーナー安定',
        'スタミナ耐久',
        '重さ',
      ]
      for (const key of Object.keys(this.scores)) {
        if (basics.includes(key)) {
          score = score + this.scores[key]
        }
      }
      return score
    },
  },
  methods: {
    calcScoreSum(acc, crr) {
      for (const key in Object.keys(crr.basic)) {
        acc.basic[key] = acc.basic[key] + crr.basic[key]
      }
      return acc
    },
    fixedNum(x, n) {
      if (isNaN(x)) return ''
      return x.toFixed(n)
    },
    showInt(x) {
      if (!x) return 0
      return Math.trunc(x)
    },
    scoreFormat(score) {
      const basic = {}
      const skill = {}
      for (const [k, v] of Object.entries(score)) {
        const basicKeys = [
          'スピード',
          'パワー',
          'コーナー安定',
          'スタミナ耐久',
          '重さ',
        ]
        if (basicKeys.includes(k)) {
          basic[k] = this.fixedNum(v, 3)
        } else {
          skill[k] = this.fixedNum(v, 3)
        }
      }
      return { basic, skill }
    },
    toggleDetail() {
      this.isDetailOpen = !this.isDetailOpen
    },
  },
}
</script>

<style lang="less" scoped>
.TotalArea {
  font-size: 0.7rem;
  font-weight: normal;

  .xx-total {
    flex: 2;
  }

  .xx-totalscore {
    font-size: 1.5rem;
  }

  .xx-affects {
    flex: 5;

    .xx-scores {
      font-size: 0.8rem;
    }

    table {
      table-layout: fixed;
    }
  }
}

.TotalArea-Detail {
  .isZero {
    color: #888;
  }
}

thead th {
  font-weight: normal;
}
</style>
