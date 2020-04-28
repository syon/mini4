<template>
  <div class="TextDump pt-2 px-4 pb-8">
    <!-- <div v-for="(r, idx) in showingRecipe" :key="idx" class="mt-1">
      <div>■{{ r.part }} {{ r.略称 }}</div>
      <div>{{ formatCrafts(r.crafts) }}</div>
    </div> -->
    <div>
      <div>
        {{ equips.body.略称 }}、{{ equips.motor.略称 }}、{{
          equips.gear.略称
        }}、{{ equips.chassis.略称 }}
      </div>
      <div>前輪:{{ equips.frontWheel.略称 }}、{{ equips.frontTire.略称 }}</div>
      <div>後輪:{{ equips.rearWheel.略称 }}、{{ equips.rearTire.略称 }}</div>
      <div>
        F:{{ equips.frontStay.略称 }}、中{{ equips.frontRollerMiddle.略称 }}、{{
          equips.frontStabilizer.略称
        }}
      </div>
      <div>
        S:{{ equips.sideStay.略称 }}、中{{ equips.sideRollerMiddle.略称 }}、{{
          equips.sideStabilizer.略称
        }}
      </div>
      <div>
        R:{{ equips.rearStay.略称 }}、中{{ equips.rearRollerMiddle.略称 }}、{{
          equips.rearStabilizer.略称
        }}
      </div>
      <div>W:{{ equips.bodyOption.略称 }}、{{ equips.wingRoller.略称 }}</div>
      <div>
        A:{{ equips.accessory1.略称 }}、{{ equips.accessory2.略称 }}、{{
          equips.accessory3.略称
        }}、{{ equips.accessory4.略称 }}
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
    ...mapGetters({
      getItemInfo: 'catalog/getItemInfo',
    }),
    equips() {
      const entries = Object.entries(this.allRecipe).map(([k, v]) => {
        const partJp = Mini4.resolvePartJp(k)
        const item = this.getItemInfo(partJp, v.key) || {}
        return [k, { part: k, ...v, 略称: item.略称 }]
      })
      return Object.fromEntries(entries)
    },
    showingRecipe() {
      return Object.entries(this.equips).filter(([k, v]) => v.key)
    },
  },
  methods: {
    formatCrafts(crafts) {
      return (crafts || [])
        .filter(Boolean)
        .filter((x) => x.action)
        .map((c) => {
          const act = (c.action || '').slice(0, 2)
          const qua = (c.quality || '').slice(0, 2)
          const lev = c.level || ''
          return `${act}(${qua}:${lev})`
        })
        .join('/')
    },
  },
}
</script>

<style lang="less" scoped>
.TextDump {
  font-size: 0.7em;
}
</style>
