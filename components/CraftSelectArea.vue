<template>
  <div v-if="isCrafting" class="xx-CraftSelectArea zzBg-gray1">
    <div class="text-center pt-2">
      <label class="inline-flex items-center">
        <input v-model="isFlood" type="checkbox" />
        <span class="ml-1 text-xs">選択スロット以下をまとめて改造</span>
      </label>
    </div>
    <hr class="my-1" />
    <div class="zzQualityChoise mt-2">
      <label :class="{ active: quarity === 'イイ感じ' }">
        <input v-model="quarity" type="radio" value="イイ感じ" />
        <span>イイ感じ</span>
      </label>
      <label :class="{ active: quarity === '職人技' }">
        <input v-model="quarity" type="radio" value="職人技" />
        <span>職人技</span>
      </label>
      <label :class="{ active: quarity === '至高の逸品' }">
        <input v-model="quarity" type="radio" value="至高の逸品" />
        <span style="letter-spacing: -0.05em;">至高の逸品</span>
      </label>
    </div>
    <div
      class="levelChoise flex items-center justify-around text-black mt-1 mb-2"
    >
      <button
        class="border bg-gray-200 w-8 h-6 rounded tracking-tighter"
        @click="handleLevel('Minus10')"
      >
        -10
      </button>
      <button
        class="border bg-gray-200 w-8 h-6 rounded tracking-tighter"
        @click="handleLevel('Minus1')"
      >
        ー
      </button>
      <input
        v-model="level"
        type="number"
        class="text-white bg-gray-800 w-10 h-6 text-center"
      />
      <button
        class="border bg-gray-200 w-8 h-6 rounded tracking-tighter"
        @click="handleLevel('Plus1')"
      >
        ＋
      </button>
      <button
        class="border bg-gray-200 w-8 h-6 rounded tracking-tighter"
        @click="handleLevel('Plus10')"
      >
        +10
      </button>
      <button
        class="border bg-gray-200 w-8 h-6 rounded tracking-tighter"
        @click="handleLevel('Max')"
      >
        最大
      </button>
    </div>
    <hr class="my-1" />
    <div class="CraftEditSlotList">
      <template v-for="(x, idx) in ingCraftsWithBlank">
        <div :key="idx" class="flex mx-1 my-1">
          <craft-edit-slot :arg="x" @go="handleClickSlot(x)" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Mini4 from '../models/Mini4'
import CraftEditSlot from '@/components/CraftEditSlot'

export default {
  components: {
    CraftEditSlot
  },
  data() {
    return {
      quarity: null,
      level: null,
      isFlood: false
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
      craftLevel: (state) => state.craftLevel
    }),
    ...mapGetters({
      getRecipeByPart: 'recipe/getRecipeByPart'
    }),
    crrRecipeCrafts() {
      return this.ingPartRecipe.crafts || []
    },
    ingCraftsWithBlank() {
      const arr = Array.from(this.ingCrafts)
      arr.unshift({ action: '' })
      for (const a of arr) {
        const hit = this.crrRecipeCrafts.filter((x) => x.action === a.action)
        a.craftedCount = hit.length
      }
      return arr
    }
  },
  watch: {
    craftIndex() {
      this.quarity = this.craftQuality
      this.level = this.craftLevel
    },
    quarity(quarity) {
      const { ingPart: part } = this
      if (this.isFlood) {
        for (let i = this.craftIndex; i < 6; i++) {
          const payload = {
            part,
            craftIndex: i,
            quarity
          }
          this.$store.dispatch('recipe/changeCraftquarity', payload)
        }
      } else {
        const payload = {
          part,
          craftIndex: this.craftIndex,
          quarity
        }
        this.$store.dispatch('recipe/changeCraftquarity', payload)
      }
    },
    level(level) {
      const { ingPart: part } = this
      if (this.isFlood) {
        for (let i = this.craftIndex; i < 6; i++) {
          const payload = {
            part,
            craftIndex: i,
            level
          }
          this.$store.dispatch('recipe/changeCraftLevel', payload)
        }
      } else {
        const payload = {
          part,
          craftIndex: this.craftIndex,
          level
        }
        this.$store.dispatch('recipe/changeCraftLevel', payload)
      }
    }
  },
  methods: {
    handleLevel(theCase) {
      this.level = Mini4.controlLevel(theCase, this.level)
    },
    handleClickSlot(x) {
      const { ingPart: part, quarity, level } = this
      const action = x.action
      if (this.isFlood) {
        for (let i = this.craftIndex; i < 6; i++) {
          this.changeCraft({
            part,
            craftIndex: i,
            action,
            quarity,
            level
          })
        }
      } else {
        this.changeCraft({
          part,
          craftIndex: this.craftIndex,
          action,
          quarity,
          level
        })
        this.closeDialog()
      }
    },
    changeCraft({ part, craftIndex, action, quarity, level }) {
      const isNone = action === ''
      const arg = {
        part,
        craftIndex,
        action,
        quarity: isNone ? '' : quarity || 'イイ感じ',
        level: isNone ? 0 : level || 1
      }
      this.$store.dispatch('recipe/changeCraft', arg)
    },
    closeDialog() {
      this.$store.dispatch('ing/toggleCrafting')
    }
  }
}
</script>

<style lang="less" scoped>
.xx-CraftSelectArea {
  position: fixed;
  bottom: 10px;
  left: 0;
  z-index: 9;
  width: 58vw;
  border: 1px solid #c8c8c8;
  border-radius: 0.4rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.xx-close {
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.2);
}

.levelChoise {
  font-size: 0.8rem;
}

.CraftEditSlotList {
  height: 64vh;
  overflow: auto;
  padding: 0 0 30px;
}
</style>
