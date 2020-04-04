<template>
  <div class="TotalArea zzBg-gray1 pt-3">
    <div class="flex p-2 zzBg-gray2 justify-between">
      <div class="xx-total flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div>総合評価</div>
          <div class="xx-totalscore text-2xl">{{ showInt(totalScore) }}</div>
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
                  :score="gAllPartScoresSum.スピード"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="パワー"
                  :score="gAllPartScoresSum.パワー"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="コーナー安定"
                  :score="gAllPartScoresSum.コーナー安定"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="スタミナ耐久"
                  :score="gAllPartScoresSum.スタミナ耐久"
                />
              </td>
              <td class="px-2 text-center">
                <score-rank
                  mode="TOTAL"
                  affect="重さ"
                  :score="gAllPartScoresSum.重さ"
                />
              </td>
            </tr>
          </tbody>
          <tfoot class="xx-scores">
            <tr>
              <td class="px-2 text-center">
                {{ showInt(gAllPartScoresSum.スピード, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(gAllPartScoresSum.パワー, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(gAllPartScoresSum.コーナー安定, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(gAllPartScoresSum.スタミナ耐久, 2) }}
              </td>
              <td class="px-2 text-center">
                {{ showInt(gAllPartScoresSum.重さ, 2) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div v-if="isDetailOpen" class="mt-3 py-2 px-8 zzBg-gray2 text-xs">
      <table class="w-full">
        <tr
          v-for="(s, key) in gAllPartScoresSum"
          :key="key"
          class="border-b border-gray-600 leading-tight"
        >
          <td>{{ key }}</td>
          <td class="text-right">{{ fixedNum(s, 3) }}</td>
        </tr>
      </table>
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

export default {
  components: {
    ScoreRank
  },
  data() {
    return {
      isDetailOpen: false
    }
  },
  computed: {
    ...mapState('ing', {
      ingPartRecipe: (state) => state.partRecipe,
      ingItem: (state) => state.item,
      ingCrafts: (state) => state.crafts
    }),
    ...mapState('craft', {
      craftMaster: (state) => state.craft
    }),
    ...mapGetters({
      gAllPartScoresSum: 'recipe/gAllPartScoresSum'
    }),
    totalScore() {
      let score = 0
      const basics = [
        'スピード',
        'パワー',
        'コーナー安定',
        'スタミナ耐久',
        '重さ'
      ]
      for (const key of Object.keys(this.gAllPartScoresSum)) {
        if (basics.includes(key)) {
          score = score + this.gAllPartScoresSum[key]
        }
      }
      return score
    }
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
          '重さ'
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
    }
  }
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
    font-family: 'Anton', sans-serif;
  }

  .xx-affects {
    flex: 5;

    .xx-scores {
      font-size: 0.8rem;
      font-family: 'Anton', sans-serif;
    }

    table {
      table-layout: fixed;
    }
  }
}

thead th {
  font-weight: normal;
}
</style>
