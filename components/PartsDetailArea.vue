<template>
  <div class="PartsDetailArea p-1 zzBg-gray1">
    <hr />
    <table class="speclist">
      <tr>
        <th>コース適性</th>
        <td>{{ ingItem.コース適性 }}</td>
      </tr>
      <tr>
        <th>ボディ特性</th>
        <td>{{ ingItem.ボディ特性 }}</td>
      </tr>
    </table>

    <hr />
    <table class="speclist">
      <tr>
        <th>スピード</th>
        <td>{{ score.basic.スピード }}</td>
      </tr>
      <tr>
        <th>パワー</th>
        <td>{{ score.basic.パワー }}</td>
      </tr>
      <tr>
        <th>コーナー安定</th>
        <td>{{ score.basic.コーナー安定 }}</td>
      </tr>
      <tr>
        <th>スタミナ耐久</th>
        <td>{{ score.basic.スタミナ耐久 }}</td>
      </tr>
      <tr>
        <th>重さ</th>
        <td>{{ score.basic.重さ }}</td>
      </tr>
    </table>

    <hr />
    <table class="speclist">
      <template v-for="(sVal, sKey) in score.skill">
        <tr :key="sKey">
          <th>{{ sKey }}</th>
          <td>{{ sVal }}</td>
        </tr>
      </template>
    </table>
    <hr />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part
    }),
    ...mapState('catalog', {
      dataset: (state) => state.dataset
    }),
    ...mapState('craft', {
      craftMaster: (state) => state.craft
    }),
    ...mapGetters({
      getCatalogByPart: 'catalog/getCatalogByPart',
      getRecipeByPart: 'recipe/getRecipeByPart'
    }),
    ingItem() {
      const partCatalog = this.getCatalogByPart(this.ingPart) || {}
      const partRecipe = this.getRecipeByPart(this.ingPart) || {}
      const item = partCatalog[partRecipe.key] || {}
      return item
    },
    score() {
      const r = this.getPartScore(this.ingPart)
      const basic = {}
      const skill = {}
      for (const [k, v] of Object.entries(r)) {
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
  },
  methods: {
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
    }
  }
}
</script>

<style lang="less" scoped>
.speclist {
  width: 100%;
  font-size: 0.7em;
  letter-spacing: -0.025em;
  th {
    text-align: left;
    font-weight: normal;
  }
  td {
    text-align: right;
  }
}
</style>
