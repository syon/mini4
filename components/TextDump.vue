<template>
  <div class="TextDump pt-2 px-2 pb-6">
    <div class="TextDump-inner rounded">
      <pre class="whitespace-pre-wrap">{{ textDump }}</pre>
      <button class="zzBtn1 m-auto" @click="handleCopy">
        クリップボードにコピー
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'
import Util from '@/models/Util'

export default {
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
    }),
    ...mapState('recipe', {
      allRecipe: (state) => state,
    }),
    ...mapState('craft', {
      craftMaster: (state) => state.craft,
    }),
    ...mapGetters({
      getItemInfo: 'catalog/getItemInfo',
    }),
    equips() {
      const machineRecipe = this.allRecipe[this.tab]
      const entries = Object.entries(machineRecipe).map(([k, v]) => {
        const partJp = Mini4.resolvePartJp(k)
        const item = this.getItemInfo(partJp, v.key) || {}
        const craftSummary = this.getCraftSummary(item.改造カテゴリ, v.crafts)
        return [k, { part: k, ...v, 略称: item.略称, craftSummary }]
      })
      return Object.fromEntries(entries)
    },
    textDump() {
      const eq = this.equips
      let txt = ''
      txt += 'B:'
      txt += this.printLine([eq.body])
      txt += 'M:'
      txt += this.printLine([eq.motor, eq.gear, eq.chassis])
      txt += 'FW:'
      txt += this.printLine([eq.frontWheel, eq.frontTire])
      txt += 'RW:'
      txt += this.printLine([eq.rearWheel, eq.rearTire])
      txt += 'F:'
      txt += this.printLine([
        eq.frontStay,
        eq.frontRollerHigh,
        eq.frontRollerMiddle,
        eq.frontStabilizer,
      ])
      txt += 'S:'
      txt += this.printLine([
        eq.sideStay,
        eq.sideRollerHigh,
        eq.sideRollerMiddle,
        eq.sideStabilizer,
      ])
      txt += 'R:'
      txt += this.printLine([
        eq.rearStay,
        eq.rearRollerHigh,
        eq.rearRollerMiddle,
        eq.rearRollerLow,
        eq.rearStabilizer,
      ])
      txt += 'W:'
      txt += this.printLine([eq.bodyOption, eq.wingRoller])
      txt += 'WT:'
      txt += this.printLine([eq.frontSettingWeight, eq.rearSettingWeight])
      txt += 'A:'
      txt += this.printLine([
        eq.accessory1,
        eq.accessory2,
        eq.accessory3,
        eq.accessory4,
      ])
      return txt
    },
  },
  methods: {
    getCraftSummary(craftCategory, crafts) {
      if (!crafts) return ''
      const master = this.craftMaster[craftCategory]
      const hash = {}
      for (const c of crafts) {
        if (!c || !c.action) continue
        const m = master.find((x) => x.action === c.action)
        hash[m.別名] = (hash[m.別名] || 0) + 1
      }
      const list = Object.entries(hash).map(([k, v]) => {
        return `${k}${v}`
      })
      return list.join('')
    },
    print(obj) {
      if (!obj || !obj.略称) return ''
      if (obj.part === 'frontSettingWeight') {
        return `前${obj.略称}(${obj.craftSummary})`
      }
      if (obj.part === 'rearSettingWeight') {
        return `後${obj.略称}(${obj.craftSummary})`
      }
      return `${obj.略称}(${obj.craftSummary})`
    },
    printLine(partArray) {
      return (
        partArray
          .map((x) => this.print(x))
          .filter(Boolean)
          .join('、') + '\n'
      )
    },
    handleCopy() {
      Util.copyToClipboard(this.textDump)
      window.alert('クリップボードにコピーしました。')
    },
  },
}
</script>

<style lang="less" scoped>
.TextDump {
  position: relative;
  font-size: 0.75em;
  .TextDump-inner {
    padding: 0.5em;
    background-color: rgba(0, 0, 0, 0.2);
  }
  button {
    position: relative;
    top: 15px;
  }
}
</style>
