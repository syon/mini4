<template>
  <div
    v-if="isTune"
    class="CraftTuneArea zz-floatingLeft"
    @click.self="closeDialog"
  >
    <div class="zz-floatingArea flex">
      <div class="zz-floatingArea-inner flex-1">
        <div class="zzCategoryHeaderLong">改造プリセット</div>
        <template v-for="(cp, i) of ingCraftPreset">
          <a
            :key="i"
            href="#"
            class="zz-selectBox flex m-1"
            @click="handleCraftPreset($event, cp)"
          >
            <div class="p-1">{{ cp.タイトル }}</div>
          </a>
        </template>
        <div class="h-6 flex m-1"></div>
      </div>
      <div class="zz-floatingArea-inner relative">
        <div class="zzQualityChoise my-1">
          <label class="" @click="handleQuality('イイ感じ')">
            <input v-model="quality" type="radio" value="イイ感じ" />
            <span>イイ感じ</span>
          </label>
          <label class="" @click="handleQuality('職人技')">
            <input v-model="quality" type="radio" value="職人技" />
            <span>職人技</span>
          </label>
          <label class="" @click="handleQuality('至高の逸品')">
            <input v-model="quality" type="radio" value="至高の逸品" />
            <span style="letter-spacing: -0.05em;">至高の逸品</span>
          </label>
        </div>
        <div class="zzAnton flex items-center justify-around text-black my-1">
          <button class="zzBtnRect2 flex-1" @click="handleLevel('Min')">
            1
          </button>
          <button class="zzBtnRect2 flex-1" @click="handleLevel('Minus10')">
            -10
          </button>
          <button class="zzBtnRect2 flex-1" @click="handleLevel('Minus1')">
            -
          </button>
          <input
            v-model="level"
            type="number"
            class="levelVal flex-1 text-white bg-gray-800 text-center"
            style="width: 2.5rem; height: 1.5rem;"
          />
          <button class="zzBtnRect2 flex-1" @click="handleLevel('Plus1')">
            +
          </button>
          <button class="zzBtnRect2 flex-1" @click="handleLevel('Plus10')">
            +10
          </button>
          <button class="zzBtnRect2 flex-1" @click="handleLevel('Max')">
            50
          </button>
        </div>
        <hr class="zz-hr-gray my-2" />
        <div class="flex justify-center my-1">
          <button class="zzBtnRounded1" @click="removeAllCrafts">
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
      tab: (state) => state.tab,
      isTune: (state) => state.isTune,
      ingPart: (state) => state.part,
      ingRecipe: (state) => state.partRecipe,
      ingCraftPreset: (state) => state.partCraftPreset,
      ownsIndex: (state) => state.ownsIndex,
    }),
  },
  methods: {
    handleCraftPreset($event, cp) {
      $event.preventDefault()
      for (let i = 0; i < cp.改造.length; i++) {
        const action = cp.改造[i]
        const isNone = action === ''
        const arg = {
          tab: this.tab,
          part: this.ingPart,
          craftIndex: i,
          action,
          quality: isNone ? '' : this.quality || 'イイ感じ',
          level: isNone ? 0 : this.level || 1,
        }
        this.$store.dispatch('recipe/changeCraft', arg)
        this.$store.dispatch('owns/changeCraft', {
          index: this.ownsIndex,
          ...arg,
        })
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
          this.$store.dispatch('owns/changeCraft', {
            index: this.ownsIndex,
            ...payload,
          })
        }
      }
    },
    applyLevels(level) {
      const crafts = this.ingRecipe.crafts || []
      for (let i = 0; i < crafts.length; i++) {
        if (crafts[i] && crafts[i].action) {
          const payload = {
            tab: this.tab,
            part: this.ingPart,
            craftIndex: i,
            level,
          }
          this.$store.dispatch('recipe/changeCraftLevel', payload)
          this.$store.dispatch('owns/changeCraft', {
            index: this.ownsIndex,
            ...payload,
          })
        }
      }
    },
    closeDialog() {
      this.$store.dispatch('ing/toggleCraftTune')
    },
    removeAllCrafts() {
      const payload = { tab: this.tab, part: this.ingPart }
      this.$store.dispatch('recipe/removeAllCrafts', payload)
      this.$store.dispatch('ing/transIngPart', payload)
    },
  },
}
</script>

<style lang="less" scoped></style>
