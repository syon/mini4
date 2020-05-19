<template>
  <div v-if="isCrafting" class="floating">
    <div class="xx-CraftSelectArea flex flex-col">
      <div class="CraftEditSlotList flex-1 zzBg-gray1 br-1 p-1">
        <craft-edit-slot :hit="0" class="flex my-1" @go="handleClickSlot({})" />
        <template v-for="(obj, idx) in showingCrafts">
          <craft-edit-slot
            :key="idx"
            :arg="obj.arg"
            :hit="obj.hit"
            class="flex my-1"
            @go="handleClickSlot(obj.arg)"
          />
        </template>
      </div>
      <div class="CraftControls zzBg-gray1 relative br-1 p-1">
        <div class="zzQualityChoise my-1">
          <label :class="{ active: quality === 'イイ感じ' }">
            <input v-model="quality" type="radio" value="イイ感じ" />
            <span>イイ感じ</span>
          </label>
          <label :class="{ active: quality === '職人技' }">
            <input v-model="quality" type="radio" value="職人技" />
            <span>職人技</span>
          </label>
          <label :class="{ active: quality === '至高の逸品' }">
            <input v-model="quality" type="radio" value="至高の逸品" />
            <span style="letter-spacing: -0.05em;">至高の逸品</span>
          </label>
        </div>
        <div
          class="levelChoise zzAnton flex items-center justify-around text-black my-1"
        >
          <button
            class="zzBtn2 flex-1 border bg-gray-200 tracking-tighter"
            @click="handleLevel('Min')"
          >
            1
          </button>
          <button
            class="zzBtn2 flex-1 border bg-gray-200 tracking-tighter"
            @click="handleLevel('Minus10')"
          >
            -10
          </button>
          <button
            class="zzBtn2 flex-1 border bg-gray-200 tracking-tighter"
            @click="handleLevel('Minus1')"
          >
            -
          </button>
          <input
            v-model="level"
            type="number"
            class="levelVal flex-1 text-white bg-gray-800 text-center tracking-tighter"
            style="width: 42px;"
          />
          <button
            class="zzBtn2 flex-1 border bg-gray-200 tracking-tighter"
            @click="handleLevel('Plus1')"
          >
            +
          </button>
          <button
            class="zzBtn2 flex-1 border bg-gray-200 tracking-tighter"
            @click="handleLevel('Plus10')"
          >
            +10
          </button>
          <button
            class="zzBtn2 flex-1 border bg-gray-200 tracking-tighter"
            @click="handleLevel('Max')"
          >
            50
          </button>
        </div>
        <hr class="xxHr-gray my-2" />
        <div class="flex justify-center my-1">
          <button class="zzBtn1" @click="handleFlood">
            選択スロット以下をまとめて改造
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mini4 from '../models/Mini4'
import CraftEditSlot from '@/components/CraftEditSlot'

export default {
  components: {
    CraftEditSlot,
  },
  data() {
    return {
      quality: null,
      level: null,
    }
  },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
      ingPart: (state) => state.part,
      ingPartRecipe: (state) => state.partRecipe,
      ingItem: (state) => state.item,
      ingCrafts: (state) => state.crafts,
      isCrafting: (state) => state.isCrafting,
      craftIndex: (state) => state.craftIndex,
      craftAction: (state) => state.craftAction,
      craftQuality: (state) => state.craftQuality,
      craftLevel: (state) => state.craftLevel,
    }),
    showingCrafts() {
      const crafts = this.ingPartRecipe.crafts || []
      return this.ingCrafts.map((c) => {
        const hit = crafts.filter(Boolean).filter((x) => x.action === c.action)
        return { arg: c, hit: hit.length }
      })
    },
  },
  watch: {
    craftIndex() {
      this.quality = this.craftQuality
      this.level = this.craftLevel
    },
    quality(quality) {
      this.applyQuality(quality)
    },
    level(level) {
      this.applyLevel(level)
    },
  },
  methods: {
    handleLevel(theCase) {
      this.level = Mini4.controlLevel(theCase, this.level)
    },
    applyQuality(quality) {
      const { ingPart: part } = this
      if (!this.isNumber(this.craftIndex)) return
      const payload = { part, craftIndex: this.craftIndex, quality }
      this.$store.dispatch('recipe/changeCraftQuality', payload)
    },
    applyLevel(level) {
      const { tab, ingPart: part } = this
      if (!this.isNumber(this.craftIndex)) return
      const payload = { tab, part, craftIndex: this.craftIndex, level }
      this.$store.dispatch('recipe/changeCraftLevel', payload)
    },
    handleClickSlot(x) {
      const { ingPart: part, quality, level } = this
      const action = x.action
      this.changeCraft({
        part,
        craftIndex: this.craftIndex,
        action,
        quality,
        level,
      })
      const payload = {
        craftIndex: this.craftIndex,
        craftAction: x.action || '',
        craftQuality: x.quality || 'イイ感じ',
        craftLevel: x.level || 1,
      }
      this.$store.dispatch('ing/refresh')
      this.$store.dispatch('ing/updateCraft', payload)
      this.$ga.event('Remodel', this.ingItem.key, action, this.craftIndex)
    },
    handleFlood() {
      const { ingPart: part, quality, level } = this
      const cIdx = this.craftIndex
      const cAct = this.craftAction
      const crafts = this.ingPartRecipe.crafts || []
      const sc = this.showingCrafts.find((x) => x.arg.action === cAct)
      const limit = sc ? sc.arg.回数制限 || 6 : 6
      // Count over current
      const keep = crafts.filter((x, i) => {
        if (!x) return false
        return i < cIdx && x.action === cAct
      }).length
      const remain = limit - keep
      // Clear under current
      for (let i = cIdx + 1; i < crafts.length; i++) {
        const c = crafts[i] || {}
        if (c.action === cAct) {
          this.$store.dispatch('recipe/clearCraft', { part, craftIndex: i })
        }
      }
      for (let i = cIdx; i < cIdx + remain && i < 6; i++) {
        this.changeCraft({
          part,
          craftIndex: i,
          action: cAct,
          quality,
          level,
        })
      }
      this.$ga.event('RemodelFlood', this.ingItem.key, cAct, cIdx)
    },
    changeCraft({ part, craftIndex, action, quality, level }) {
      const { tab } = this
      const isNone = action === ''
      const arg = {
        tab,
        part,
        craftIndex,
        action,
        quality: isNone ? '' : quality || 'イイ感じ',
        level: isNone ? 0 : level || 1,
      }
      this.$store.dispatch('recipe/changeCraft', arg)
    },
    closeDialog() {
      this.$store.dispatch('ing/toggleCrafting')
    },
    isNumber(value) {
      return typeof value === 'number' && isFinite(value)
    },
  },
}
</script>

<style lang="less" scoped>
.floating {
  position: fixed;
  top: 50px; // do not set left property for inner fixed
  z-index: 9;
  width: 218px;
  height: 100%;
}

.xx-CraftSelectArea {
  height: calc(100% - 100px);
}

.CraftEditSlotList {
  position: relative;
  overflow: auto;
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.CraftControls {
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}
</style>
