<template>
  <div class="TextDump pt-2 px-4 pb-8">
    <div>
      <div>
        B:
        {{ printLine([equips.body]) }}
      </div>
      <div>
        M:
        {{ printLine([equips.motor, equips.gear, equips.chassis]) }}
      </div>
      <div>
        FW:
        {{ printLine([equips.frontWheel, equips.frontTire]) }}
      </div>
      <div>
        RW:
        {{ printLine([equips.rearWheel, equips.rearTire]) }}
      </div>
      <div>
        F:
        {{
          printLine([
            equips.frontStay,
            equips.frontRollerHigh,
            equips.frontRollerMiddle,
            equips.frontStabilizer,
          ])
        }}
      </div>
      <div>
        S:
        {{
          printLine([
            equips.sideStay,
            equips.sideRollerHigh,
            equips.sideRollerMiddle,
            equips.sideStabilizer,
          ])
        }}
      </div>
      <div>
        R:
        {{
          printLine([
            equips.rearStay,
            equips.rearRollerHigh,
            equips.rearRollerMiddle,
            equips.rearRollerLow,
            equips.rearStabilizer,
          ])
        }}
      </div>
      <div>
        W:
        {{ printLine([equips.bodyOption, equips.wingRoller]) }}
      </div>
      <div>
        WT:
        {{ printLine([equips.frontSettingWeight, equips.rearSettingWeight]) }}
      </div>
      <div>
        A:
        {{
          printLine([
            equips.accessory1,
            equips.accessory2,
            equips.accessory3,
            equips.accessory4,
          ])
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Mini4 from '@/models/Mini4'

export default {
  computed: {
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
      const entries = Object.entries(this.allRecipe).map(([k, v]) => {
        const partJp = Mini4.resolvePartJp(k)
        const item = this.getItemInfo(partJp, v.key) || {}
        const craftSummary = this.getCraftSummary(item.改造カテゴリ, v.crafts)
        return [k, { part: k, ...v, 略称: item.略称, craftSummary }]
      })
      return Object.fromEntries(entries)
    },
    showingRecipe() {
      return Object.entries(this.equips).filter(([k, v]) => v.key)
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
      return partArray
        .map((x) => this.print(x))
        .filter(Boolean)
        .join('、')
    },
  },
}
</script>

<style lang="less" scoped>
.TextDump {
  font-size: 0.75em;
}
</style>
