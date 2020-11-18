<template>
  <div v-if="isCrafting" class="zz-floatingLeft" @click.self="closeDialog">
    <div class="zz-floatingArea flex">
      <div class="zz-floatingArea-inner flex-1">
        <div class="m-1 flex justify-center">
          <button class="zzBtnRounded1" @click="handleClickSlot({})">
            改造なし
          </button>
        </div>
        <hr class="zz-hr-gray my-2" />
        <!-- <craft-edit-slot :hit="0" class="" @go="handleClickSlot({})" /> -->
        <div>
          <div class="zzCategoryHeaderLong2">改造</div>
          <template v-for="(obj, idx) in showingCrafts6">
            <craft-edit-slot
              :key="idx"
              :arg="obj.arg"
              :hit="obj.hit"
              :disabled="disabled(obj)"
              :slot7="false"
              @go="handleClickSlot(obj.arg)"
            />
          </template>
        </div>
        <div>
          <div class="zzCategoryHeaderLong2">☆7改造</div>
          <template v-for="(obj, idx) in showingCrafts7">
            <craft-edit-slot
              :key="idx"
              :arg="obj.arg"
              :hit="obj.hit"
              :disabled="disabled(obj)"
              :slot7="true"
              @go="handleClickSlot(obj.arg)"
            />
          </template>
        </div>
        <div class="h-6 flex m-1"></div>
      </div>
      <div class="zz-floatingArea-inner">
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
            <span>至高の逸品</span>
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
            class="levelVal flex-1"
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
        <!-- <hr class="zz-hr-gray my-2" />
        <div class="flex justify-center my-1">
          <button class="zzBtnRounded1" @click="handleFlood">
            選択スロット以下をまとめて改造
          </button>
        </div> -->
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
      ping: (state) => state.ping,
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
    availableCrafts() {
      if (this.ping);
      const crafts = this.ingPartRecipe.crafts || []
      return this.ingCrafts.map((c) => {
        const hit = crafts.filter(Boolean).filter((x) => x.action === c.action)
        return { arg: c, hit: hit.length }
      })
    },
    showingCrafts6() {
      return this.availableCrafts.filter((c) => {
        return !c.arg['☆7']
      })
    },
    showingCrafts7() {
      return this.availableCrafts.filter((c) => {
        return c.arg['☆7']
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
    disabled(obj) {
      if (!obj.arg.action) return false
      if (this.craftIndex === 6 && !obj.arg['☆7']) return true
      if (this.craftIndex < 6 && obj.arg['☆7']) return true
      return false
    },
  },
}
</script>

<style lang="less" scoped></style>
