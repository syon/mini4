<template>
  <div class="TotalArea">
    <div class="TotalWindow rounded-md">
      <div class="TotalWindowPanel">
        <div class="xx-panelhead rounded-t-md"></div>
        <div class="xx-panelbody p-2 zzBg-gray2">
          <div class="flex items-center justify-center">
            <div class="xx-total">
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
                      <score-rank
                        mode="TOTAL"
                        affect="重さ"
                        :score="scores.重さ"
                      />
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
          <div v-if="isDetailOpen" class="mt-2 p-1 text-xs">
            <total-detail />
          </div>
        </div>
        <div class="xx-panelfoot rounded-b-md">
          <button
            class="xx-toggle w-full text-gray-700 text-center"
            @click="toggleDetail"
          >
            <span v-if="isDetailOpen">▲</span>
            <span v-else>▼</span>
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

export default {
  components: {
    ScoreRank,
    TotalDetail,
  },
  data() {
    return {
      isDetailOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      scores: 'recipe/gAllPartScoresSum',
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
          basic[k] = this.fixedNum(v, 3)
        } else {
          skill[k] = this.fixedNum(v, 3)
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
  },
}
</script>

<style lang="less" scoped>
.TotalArea {
  font-size: 0.7rem;
  font-weight: normal;
  padding: 15px;
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
    .TotalWindowPanel {
      .xx-panelhead {
        height: 1rem;
        background: linear-gradient(
          0deg,
          rgba(178, 178, 171, 1) 0%,
          rgba(211, 212, 208, 1) 100%
        );
      }
      .xx-panelbody {
        background: linear-gradient(
          180deg,
          hsla(144, 3%, 27%, 1) 0%,
          hsla(168, 5%, 18%, 1) 30%,
          hsla(168, 5%, 18%, 1) 70%,
          hsla(144, 3%, 27%, 1) 100%
        );
        border-left: 1px solid #d3d4d0;
        border-right: 1px solid #d3d4d0;
        position: relative;

        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/bg_check_w.svg');
          background-size: 42px;
          z-index: 2;
        }
      }
      .xx-panelfoot {
        // height: 1rem;
        background: #b9bab6;
      }
    }
  }

  .xx-total {
    flex: 2;
  }

  .xx-totalscore {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .xx-affects {
    flex: 5;
    line-height: 1;

    .xx-scores {
      font-size: 0.8rem;
    }

    table {
      table-layout: fixed;
    }
  }

  .xx-toggle {
    &:focus {
      outline: none;
    }
  }
}

thead th {
  font-weight: normal;
}
</style>
