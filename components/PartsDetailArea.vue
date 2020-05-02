<template>
  <div class="PartsDetailArea zzCheckerBg p-1 mb-2">
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

    <div class="PartsSpecList" @click="toggleSpec">
      <parts-spec
        spec-type="スピード"
        :before-score="beforeSpec.スピード"
        :after-score="score.basic.スピード"
        :is-hold="isHold"
      />
      <parts-spec
        spec-type="パワー"
        :before-score="beforeSpec.パワー"
        :after-score="score.basic.パワー"
        :is-hold="isHold"
      />
      <parts-spec
        spec-type="コーナー安定"
        :before-score="beforeSpec.コーナー安定"
        :after-score="score.basic.コーナー安定"
        :is-hold="isHold"
      />
      <parts-spec
        spec-type="スタミナ耐久"
        :before-score="beforeSpec.スタミナ耐久"
        :after-score="score.basic.スタミナ耐久"
        :is-hold="isHold"
      />
      <parts-spec
        spec-type="重さ"
        :before-score="beforeSpec.重さ"
        :after-score="score.basic.重さ"
        :is-hold="isHold"
      />

      <hr />
      <template v-for="(sVal, sKey) in score.skill">
        <parts-spec
          :key="sKey"
          :spec-type="sKey"
          :before-score="beforeSpec[sKey]"
          :after-score="sVal"
          :is-hold="isHold"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PartsSpec from '@/components/PartsSpec'
import Mini4 from '@/models/Mini4'

export default {
  components: {
    PartsSpec,
  },
  data() {
    return {
      isHold: false,
    }
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      ingPartCatalog: (state) => state.partCatalog,
      ingPartRecipe: (state) => state.partRecipe,
      ingItem: (state) => state.item,
      ingCrafts: (state) => state.crafts,
    }),
    ...mapGetters({
      getItemInfo: 'catalog/getItemInfo',
    }),
    beforeSpec() {
      const info = this.getItemInfo(this.ingPart, this.ingItem.key)
      return info ? info.性能 : {}
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
    toggleSpec() {
      this.isHold = !this.isHold
    },
  },
}
</script>

<style lang="less" scoped>
.PartsDetailArea {
  border-radius: 0.15rem;
  hr {
    border-color: #c3c3c3;
    margin: 0.25em 0;
  }
}

.PartsSpecList {
  position: relative;
  z-index: 5;
}

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
