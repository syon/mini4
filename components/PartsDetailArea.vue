<template>
  <div class="PartsDetailArea m-1">
    <template v-if="ingItem.ボディ特性">
      <a
        href="#"
        class="zzBodyFeature mb-1"
        @click.prevent="handleClickFeature('bodyFeature')"
      >
        <div class="zzBodyFeature-Floor">
          <div class="zzBodyFeature-Content">
            <div class="zzBodyFeature-Label">ボディ<br />特性</div>
            <div class="zzBodyFeature-Text">{{ sBodyFeature.key }}</div>
          </div>
        </div>
      </a>
      <a
        href="#"
        class="zzBodyAssist mb-1"
        @click.prevent="handleClickFeature('bodyAssist1')"
      >
        <div class="zzBodyAssist-Floor">
          <div class="zzBodyAssist-Content">
            <div class="zzBodyAssist-Label">アシスト<br />効果</div>
            <div class="zzBodyAssist-Text">{{ sBodyAssist1.key }}</div>
          </div>
        </div>
      </a>
      <a
        href="#"
        class="zzBodyAssist mb-1"
        @click.prevent="handleClickFeature('bodyAssist2')"
      >
        <div class="zzBodyAssist-Floor">
          <div class="zzBodyAssist-Content">
            <div class="zzBodyAssist-Label">アシスト<br />効果</div>
            <div class="zzBodyAssist-Text">{{ sBodyAssist2.key }}</div>
          </div>
        </div>
      </a>
    </template>

    <a href="#" class="PartsSpecList zzBg-checker p-1 br-1" @click="toggleSpec">
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

      <hr class="zz-hr-white my-1" />
      <template v-for="(sVal, sKey) in score.skill">
        <parts-spec
          :key="sKey"
          :spec-type="sKey"
          :before-score="beforeSpec[sKey]"
          :after-score="sVal"
          :is-hold="isHold"
        />
      </template>
    </a>
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
      tab: (state) => state.tab,
      ingPart: (state) => state.part,
      ingPartCatalog: (state) => state.partCatalog,
      ingPartRecipe: (state) => state.partRecipe,
      ingItem: (state) => state.item,
      ingCrafts: (state) => state.crafts,
    }),
    ...mapState('recipe', {
      sBodyFeature(state) {
        return state[this.tab].bodyFeature
      },
      sBodyAssist1(state) {
        return state[this.tab].bodyAssist1
      },
      sBodyAssist2(state) {
        return state[this.tab].bodyAssist2
      },
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
    toggleSpec(e) {
      e.preventDefault()
      this.isHold = !this.isHold
    },
    handleClickFeature(b) {
      this.$store.commit('ing/setFeature', b) // ボディ特性選択状態
      this.$store.dispatch('ing/toggleBodyFeature') // ウィンドウ
    },
  },
}
</script>

<style lang="less" scoped>
.PartsSpecList {
  display: block;
  position: relative;
  z-index: 30;
  border: 1px solid #b5babd;
}

.speclist {
  width: 100%;
  letter-spacing: -0.025em;
  th {
    text-align: left;
  }
  td {
    text-align: right;
  }
}
</style>
