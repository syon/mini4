<template>
  <div class="PartsDetailArea p-1 zzBg-gray1">
    <template v-if="ingItem.ボディ特性">
      <div class="BodyFeature mb-1">
        <div class="BodyFeature-Floor">
          <div class="BodyFeature-Content">
            <div>
              <div class="BodyFeature-Label leading-tight">
                ボディ<br />特性
              </div>
            </div>
            <div class="BodyFeature-Text">{{ ingItem.ボディ特性 }}</div>
          </div>
        </div>
      </div>
    </template>
    <table class="speclist">
      <tbody>
        <tr>
          <th>スピード</th>
          <td class="zzAnton">{{ score.basic.スピード }}</td>
        </tr>
        <tr>
          <th>パワー</th>
          <td class="zzAnton">{{ score.basic.パワー }}</td>
        </tr>
        <tr>
          <th>コーナー安定</th>
          <td class="zzAnton">{{ score.basic.コーナー安定 }}</td>
        </tr>
        <tr>
          <th>スタミナ耐久</th>
          <td class="zzAnton">{{ score.basic.スタミナ耐久 }}</td>
        </tr>
        <tr>
          <th>重さ</th>
          <td class="zzAnton">{{ score.basic.重さ }}</td>
        </tr>
      </tbody>
    </table>

    <hr />
    <table class="speclist">
      <tbody>
        <template v-for="(sVal, sKey) in score.skill">
          <tr :key="sKey">
            <th>{{ sKey }}</th>
            <td class="zzAnton">{{ sVal }}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <hr />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mini4 from '@/models/Mini4'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      ingPartCatalog: (state) => state.partCatalog,
      ingPartRecipe: (state) => state.partRecipe,
      ingItem: (state) => state.item,
      ingCrafts: (state) => state.crafts,
    }),
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
  },
  methods: {
    fixedNum(x, n) {
      if (isNaN(x)) return ''
      const base = 10 ** n
      const num = Math.round(x * base) / base
      return num.toFixed(n)
    },
    showInt(x) {
      if (!x) return 0
      return Math.trunc(x)
    },
    getPartScore(part) {
      const defaultItem = this.ingItem
      const r = Mini4.calcCraftResult(
        part,
        defaultItem,
        this.ingPartRecipe,
        this.ingCrafts
      )
      return r
    },
  },
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
