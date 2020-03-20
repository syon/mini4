<template>
  <div>
    <table class="w-full text-xs">
      <thead>
        <tr>
          <th class="border px-2 text-right">スピード</th>
          <th class="border px-2 text-right">パワー</th>
          <th class="border px-2 text-right">コーナー安定</th>
          <th class="border px-2 text-right">スタミナ耐久</th>
          <th class="border px-2 text-right">重さ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ps, idx) in allPartScores" :key="idx">
          <td class="border px-2 text-right">
            {{ showInt(ps.basic.スピード) }}
          </td>
          <td class="border px-2 text-right">{{ showInt(ps.basic.パワー) }}</td>
          <td class="border px-2 text-right">
            {{ showInt(ps.basic.コーナー安定) }}
          </td>
          <td class="border px-2 text-right">
            {{ showInt(ps.basic.スタミナ耐久) }}
          </td>
          <td class="border px-2 text-right">{{ showInt(ps.basic.重さ) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th class="border px-2 text-right">
            {{ fixedNum(allPartScoresSum.スピード, 2) }}
          </th>
          <th class="border px-2 text-right">
            {{ fixedNum(allPartScoresSum.パワー, 2) }}
          </th>
          <th class="border px-2 text-right">
            {{ fixedNum(allPartScoresSum.コーナー安定, 2) }}
          </th>
          <th class="border px-2 text-right">
            {{ fixedNum(allPartScoresSum.スタミナ耐久, 2) }}
          </th>
          <th class="border px-2 text-right">
            {{ fixedNum(allPartScoresSum.重さ, 2) }}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'

export default {
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
      return parts
        .map((x) => this.getPartScore(x))
        .map((x) => this.scoreFormat(x))
    },
    allPartScoresSum() {
      const basics = this.allPartScores.map((x) => x.basic)
      const result = {}
      for (const b of basics) {
        for (const key of Object.keys(b)) {
          result[key] = (result[key] || 0) + Number(b[key] || 0)
        }
      }
      return result
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
    }
  }
}
</script>
