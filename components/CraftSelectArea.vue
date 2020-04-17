<template>
  <div v-if="isCrafting" class="floating">
    <div class="xx-CraftSelectArea flex flex-col">
      <div class="CraftEditSlotList flex-1 zzBg-gray1">
        <div class="px-1 pb-6">
          <craft-edit-slot
            :hit="0"
            class="flex my-1"
            @go="handleClickSlot({})"
          />
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
      </div>
      <div class="mt-1"></div>
      <div class="CraftControls zzBg-gray1 relative">
        <!-- <div class="zzScrollShadow"></div> -->
        <div class="zzQualityChoise pt-2">
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
          class="levelChoise zzAnton flex items-center justify-around text-black mt-1 mb-2"
        >
          <button
            class="zzBtn2 border bg-gray-200 w-8 h-8 rounded tracking-wider text-sm"
            @click="handleLevel('Minus10')"
          >
            -10
          </button>
          <button
            class="zzBtn2 border bg-gray-200 w-8 h-8 rounded tracking-tighter"
            @click="handleLevel('Minus1')"
          >
            ー
          </button>
          <input
            v-model="level"
            type="number"
            class="text-white bg-gray-800 w-8 h-8 text-center tracking-wider text-sm"
          />
          <button
            class="zzBtn2 border bg-gray-200 w-8 h-8 rounded tracking-tighter"
            @click="handleLevel('Plus1')"
          >
            ＋
          </button>
          <button
            class="zzBtn2 border bg-gray-200 w-8 h-8 rounded tracking-wider text-sm"
            @click="handleLevel('Plus10')"
          >
            +10
          </button>
          <button
            class="zzBtn2 border bg-gray-200 w-8 h-8 rounded tracking-tighter"
            @click="handleLevel('Max')"
          >
            最大
          </button>
        </div>
        <hr class="xxHr my-1" />
        <div class="text-center pb-2">
          <button class="zzBtn1" @click="handleFlood">
            選択スロット以下をまとめて改造
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    ...mapGetters({
      getRecipeByPart: 'recipe/getRecipeByPart',
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
      const { ingPart: part } = this
      if (!this.isNumber(this.craftIndex)) return
      const payload = { part, craftIndex: this.craftIndex, level }
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
      this.$store.dispatch('ing/refresh', part)
      this.$store.dispatch('ing/updateCraft', payload)
    },
    handleFlood() {
      // eslint-disable-next-line no-unused-vars
      const { ingPart: part, quality, level } = this
      const cIdx = this.craftIndex
      const cAct = this.craftAction
      const crafts = this.ingPartRecipe.crafts || []
      const sc = this.showingCrafts.find((x) => x.arg.action === cAct)
      const limit = sc ? sc.arg.回数制限 || 6 : 6
      const remain = limit - (sc ? sc.hit : 0)
      const reset = crafts.filter((x, i) => {
        if (!x) return false
        return cIdx <= i && i <= cIdx + remain && x.action === cAct
      }).length
      for (let i = cIdx; i < cIdx + reset + remain && i < 6; i++) {
        this.changeCraft({
          part,
          craftIndex: i,
          action: cAct,
          quality,
          level,
        })
      }
    },
    changeCraft({ part, craftIndex, action, quality, level }) {
      const isNone = action === ''
      const arg = {
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
  top: 50px;
  left: 0;
  z-index: 9;
  width: 58vw;
  height: 100%;
}

.xx-CraftSelectArea {
  width: 58vw;
  height: calc(100% - 100px);
}

.xx-close {
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.levelChoise {
  font-size: 0.8rem;
}

.xxHr {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.CraftEditSlotList {
  position: relative;
  overflow: auto;
  border: 1px solid #c8c8c8;
  border-radius: 0.2rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.CraftControls {
  border: 1px solid #c8c8c8;
  border-radius: 0.2rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.zzScrollShadow {
  position: absolute;
  top: -7px;
  height: 6px;
  width: 100%;
  opacity: 0.25;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.595) 50%,
    rgba(0, 0, 0, 0.7225) 65%,
    rgba(0, 0, 0, 0.78625) 75.5%,
    rgba(0, 0, 0, 0.81855) 82.85%,
    rgba(0, 0, 0, 0.83385) 88%,
    rgba(0, 0, 0, 0.85)
  );
  border-bottom: 1px solid rgba(0, 0, 0, 0.9);
}
</style>
