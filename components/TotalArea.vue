<template>
  <div class="TotalArea p-2">
    <div class="TotalWindow">
      <div class="TotalWindowPanel">
        <div class="zz-headgray"></div>
        <div class="zzBg-checker px-2 py-3">
          <div class="relative z-10">
            <div class="flex items-stretch justify-center">
              <div class="xx-total flex flex-col items-center">
                <div>総合評価</div>
                <div
                  class="xx-totalscore flex-1 flex items-center zzAnton tracking-tight"
                >
                  {{ showInt(totalScore) }}
                </div>
              </div>
              <div class="xx-affects flex items-center">
                <table class="w-full">
                  <thead class="tracking-tighter whitespace-no-wrap">
                    <tr>
                      <th class="text-center p-0">スピード</th>
                      <th class="text-center p-0">パワー</th>
                      <th class="text-center p-0">ｺｰﾅｰ安定</th>
                      <th class="text-center p-0">ｽﾀﾐﾅ耐久</th>
                      <th class="text-center p-0">重さ</th>
                    </tr>
                  </thead>
                  <tbody class="xx-ranks whitespace-no-wrap">
                    <tr>
                      <td class="text-center">
                        <score-rank
                          mode="TOTAL"
                          affect="スピード"
                          :score="scores.スピード"
                        />
                      </td>
                      <td class="text-center">
                        <score-rank
                          mode="TOTAL"
                          affect="パワー"
                          :score="scores.パワー"
                        />
                      </td>
                      <td class="text-center">
                        <score-rank
                          mode="TOTAL"
                          affect="コーナー安定"
                          :score="scores.コーナー安定"
                        />
                      </td>
                      <td class="text-center">
                        <score-rank
                          mode="TOTAL"
                          affect="スタミナ耐久"
                          :score="scores.スタミナ耐久"
                        />
                      </td>
                      <td class="text-center">
                        <score-rank
                          mode="TOTAL"
                          affect="重さ"
                          :score="scores.重さ"
                        />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot class="xx-scores zzAnton whitespace-no-wrap">
                    <tr>
                      <td class="text-center">
                        {{ showInt(scores.スピード) }}
                      </td>
                      <td class="text-center">
                        {{ showInt(scores.パワー) }}
                      </td>
                      <td class="text-center">
                        {{ showInt(scores.コーナー安定) }}
                      </td>
                      <td class="text-center">
                        {{ showInt(scores.スタミナ耐久) }}
                      </td>
                      <td class="text-center">
                        {{ showInt(scores.重さ)
                        }}<span class="mx-025 zz-text06">g</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div v-if="isDetailOpen" class="">
              <total-detail />
            </div>
          </div>
        </div>
        <button class="zz-footgray text-center" @click="toggleDetail">
          <span v-if="isDetailOpen">詳細 ▲</span>
          <span v-else>詳細 ▼</span>
        </button>
        <div v-if="isDiagnosis">
          <div v-if="isDiagnosisOpen && isDiagnosis">
            <diagnosis-area />
          </div>
          <button class="zz-footblue text-center" @click="toggleDiagnosis">
            <span v-if="isDiagnosisOpen">診断 ▲</span>
            <span v-else>診断 ▼</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ScoreRank from '@/components/ScoreRank'
import TotalDetail from '@/components/TotalDetail'
import DiagnosisArea from '@/components/DiagnosisArea'

export default {
  components: {
    ScoreRank,
    TotalDetail,
    DiagnosisArea,
  },
  data() {
    return {
      isDetailOpen: false,
      isDiagnosisOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      scores: 'recipe/gAllPartScoresSum',
      isDiagnosis: 'user/isDiagnosis',
    }),
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
          basic[k] = this.fixedNum(v, 4)
        } else {
          skill[k] = this.fixedNum(v, 4)
        }
      }
      return { basic, skill }
    },
    toggleDetail() {
      this.isDetailOpen = !this.isDetailOpen
      if (this.isDetailOpen) {
        this.$ga.screenview('TotalDetail')
      }
    },
    toggleDiagnosis() {
      this.isDiagnosisOpen = !this.isDiagnosisOpen
      if (this.isDiagnosisOpen) {
        this.$ga.screenview('DiagnosisArea')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.TotalArea {
  background: rgb(170, 177, 178);
  background: linear-gradient(
    180deg,
    rgba(170, 177, 178, 1) 0%,
    rgba(241, 244, 242, 1) 50%
  );
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/bg_grid_w.svg');
    background-size: 32px;
    z-index: 2;
  }

  .TotalWindow {
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 5;
    border: 1px solid #b5babd;
    border-radius: 0.25rem;
  }

  .xx-total {
    flex: 2;
    line-height: 1;
  }

  .xx-totalscore {
    font-size: 1.75rem;
  }

  .xx-affects {
    flex: 5;
    line-height: 1;

    table {
      table-layout: fixed;
    }
  }
}
</style>
