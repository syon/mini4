<template>
  <div class="TextDump pt-2 px-4 pb-8">
    <div>
      <div>
        {{
          printLine([equips.body, equips.motor, equips.gear, equips.chassis])
        }}
      </div>
      <div>
        前輪:
        {{ printLine([equips.frontWheel, equips.frontTire]) }}
      </div>
      <div>
        後輪:
        {{ printLine([equips.rearWheel, equips.rearTire]) }}
      </div>
      <div>
        F:
        {{
          printLine([
            equips.frontStay,
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
            equips.rearRollerMiddle,
            equips.rearStabilizer,
          ])
        }}
      </div>
      <div>
        W:
        {{ printLine([equips.bodyOption, equips.wingRoller]) }}
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
      if (!obj.略称) return ''
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
