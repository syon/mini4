<template>
  <div v-if="isTune" class="floating">
    <div class="xx-CraftTuneArea flex flex-col">
      <div class="CraftTuneList flex-1 zzBg-gray1">
        <template v-for="(cp, i) of ingCraftPreset">
          <div
            :key="i"
            class="CraftPreset p-1 m-2 rounded"
            @click="handleCraftPreset(cp)"
          >
            <span>{{ cp.タイトル }}</span>
          </div>
        </template>
      </div>
      <div class="CraftControls zzBg-gray1">
        <div class="zzQualityChoise mt-2">
          <label
            :class="{ active: quality === 'イイ感じ' }"
            @click="handleQuality('イイ感じ')"
          >
            <input v-model="quality" type="radio" value="イイ感じ" />
            <span>イイ感じ</span>
          </label>
          <label
            :class="{ active: quality === '職人技' }"
            @click="handleQuality('職人技')"
          >
            <input v-model="quality" type="radio" value="職人技" />
            <span>職人技</span>
          </label>
          <label
            :class="{ active: quality === '至高の逸品' }"
            @click="handleQuality('至高の逸品')"
          >
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
            class="text-white bg-gray-800 w-10 h-8 text-center tracking-wider text-sm"
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
          <button class="zzBtn1 my-1" @click="removeAllCrafts">
            改造をすべて取り消す
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mini4 from '../models/Mini4'

export default {
  data() {
    return {
      quality: '職人技',
      level: 50,
    }
  },
  computed: {
    ...mapState('ing', {
      isTune: (state) => state.isTune,
      ingPart: (state) => state.part,
      ingRecipe: (state) => state.partRecipe,
      ingCraftPreset: (state) => state.partCraftPreset,
    }),
  },
  methods: {
    handleCraftPreset(cp) {
      for (let i = 0; i < cp.改造.length; i++) {
        const action = cp.改造[i]
        const isNone = action === ''
        const arg = {
          part: this.ingPart,
          craftIndex: i,
          action,
          quality: isNone ? '' : this.quality || 'イイ感じ',
          level: isNone ? 0 : this.level || 1,
        }
        this.$store.dispatch('recipe/changeCraft', arg)
      }
    },
    handleQuality(quality) {
      this.applyQualities(quality)
    },
    handleLevel(theCase) {
      this.level = Mini4.controlLevel(theCase, this.level)
      this.applyLevels(this.level)
    },
    applyQualities(quality) {
      const crafts = this.ingRecipe.crafts || []
      for (let i = 0; i < crafts.length; i++) {
        if (crafts[i] && crafts[i].action) {
          const payload = {
            part: this.ingPart,
            craftIndex: i,
            quality,
          }
          this.$store.dispatch('recipe/changeCraftQuality', payload)
        }
      }
    },
    applyLevels(level) {
      const crafts = this.ingRecipe.crafts || []
      for (let i = 0; i < crafts.length; i++) {
        if (crafts[i] && crafts[i].action) {
          const payload = {
            part: this.ingPart,
            craftIndex: i,
            level,
          }
          this.$store.dispatch('recipe/changeCraftLevel', payload)
        }
      }
    },
    closeDialog() {
      this.$store.dispatch('ing/toggleCraftTune')
    },
    removeAllCrafts() {
      this.$store.dispatch('recipe/removeAllCrafts', this.ingPart)
      this.$store.dispatch('ing/transIngPart', this.ingPart)
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

.xx-CraftTuneArea {
  width: 58vw;
  height: calc(100% - 100px);
}

.CraftTuneList {
  position: relative;
  overflow: auto;
  border: 1px solid #c8c8c8;
  border-radius: 0.4rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.CraftControls {
  border: 1px solid #c8c8c8;
  border-radius: 0.4rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.CraftPreset {
  color: black;
  font-size: 0.8rem;
  background-color: #f0f4f4;
  border: 1px solid #b5babd;
  border-radius: 0.2rem;
}

.levelChoise {
  font-size: 0.8rem;
}

.xx-close {
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
