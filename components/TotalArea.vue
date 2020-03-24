<template>
  <div class="TotalArea zzBg-gray1 pt-3">
    <div class="flex p-2 zzBg-gray2 justify-between">
      <div class="flex-1 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <div class="text-xs">総合評価</div>
          <div class="text-2xl">{{ showInt(totalScore) }}</div>
        </div>
      </div>
      <div class="flex items-center">
        <table class="w-full text-xs">
          <thead>
            <tr>
              <th class="px-2 text-center">スピード</th>
              <th class="px-2 text-center">パワー</th>
              <th class="px-2 text-center">ｺｰﾅｰ安定</th>
              <th class="px-2 text-center">ｽﾀﾐﾅ耐久</th>
              <th class="px-2 text-center">重さ</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th class="px-2 text-center">
                {{ showInt(allPartScoresSum.スピード, 2) }}
              </th>
              <th class="px-2 text-center">
                {{ showInt(allPartScoresSum.パワー, 2) }}
              </th>
              <th class="px-2 text-center">
                {{ showInt(allPartScoresSum.コーナー安定, 2) }}
              </th>
              <th class="px-2 text-center">
                {{ showInt(allPartScoresSum.スタミナ耐久, 2) }}
              </th>
              <th class="px-2 text-center">
                {{ showInt(allPartScoresSum.重さ, 2) }}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div v-if="isDetailOpen" class="mt-3 py-2 px-8 zzBg-gray2 text-xs">
      <table class="w-full">
        <tr
          v-for="(s, key) in allPartScoresSum"
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
import Mini4 from '@/models/Mini4'

export default {
  data() {
    return {
      isDetailOpen: false
    }
  },
  computed: {
    ...mapState('craft', {
      craftMaster: (state) => state.craft
    }),
    ...mapGetters({
      getCatalogByPart: 'catalog/getCatalogByPart',
      getRecipeByPart: 'recipe/getRecipeByPart'
    }),
    allPartScores() {
      const parts = Mini4.getAllPartNames()
      return parts.map((x) => this.getPartScore(x))
    },
    allPartScoresSum() {
      const result = {}
      for (const b of this.allPartScores) {
        for (const key of Object.keys(b)) {
          result[key] = (result[key] || 0) + Number(b[key] || 0)
        }
      }
      return result
    },
    totalScore() {
      let score = 0
      const basics = [
        'スピード',
        'パワー',
        'コーナー安定',
        'スタミナ耐久',
        '重さ'
      ]
      for (const key of Object.keys(this.allPartScoresSum)) {
        if (basics.includes(key)) {
          score = score + this.allPartScoresSum[key]
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
    getPartScore(part) {
      const partCatalog = this.getCatalogByPart(part) || {}
      const partRecipe = this.getRecipeByPart(part) || {}
      const item = partCatalog[partRecipe.key] || {}
      const defaultItemSpec = item.性能 || {}
      const category = Mini4.resolveCategoryByPart(part)
      const partCrafts = this.craftMaster[category]
      const r = Mini4.calcCraftResult(defaultItemSpec, partRecipe, partCrafts)
      return r
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
thead th {
  font-weight: normal;
}
</style>
