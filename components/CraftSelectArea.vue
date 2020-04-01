<template>
  <div v-if="isCrafting" class="xx-CraftSelectArea zzBg-gray1">
    <div class="quarityChoise mt-2">
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
        <div :key="idx" class="flex mx-1 my-1" @click="handleClickSlot(x)">
          <craft-edit-slot :arg="x" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CraftEditSlot from '@/components/CraftEditSlot'

export default {
  components: {
    CraftEditSlot
  },
  data() {
    return {
      quarity: null,
      level: null
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
      const payload = {
        part: this.ingPart,
        craftIndex: this.craftIndex,
        quarity
      }
      this.$store.dispatch('recipe/changeCraftquarity', payload)
    },
    level(level) {
      const payload = {
        part: this.ingPart,
        craftIndex: this.craftIndex,
        level
      }
      this.$store.dispatch('recipe/changeCraftLevel', payload)
    }
  },
  methods: {
    handleLevel(sub) {
      const lv = Number(this.level)
      switch (sub) {
        case 'Minus10':
          if (lv - 10 <= 1) {
            this.level = 1
            break
          }
          this.level = lv - 10
          break
        case 'Minus1':
          if (lv === 1) {
            break
          }
          this.level = lv - 1
          break
        case 'Plus1':
          if (lv === 50) {
            break
          }
          this.level = lv + 1
          break
        case 'Plus10':
          if (lv + 10 >= 50) {
            this.level = 50
            break
          }
          this.level = lv + 10
          break
        case 'Max':
          this.level = 50
          break
      }
    },
    handleClickSlot(x) {
      const isNone = x.action === ''
      const arg = {
        part: this.ingPart,
        craftIndex: this.craftIndex,
        action: x.action,
        quarity: isNone ? '' : this.quarity || 'イイ感じ',
        level: isNone ? 0 : this.level || 1
      }
      this.$store.dispatch('recipe/changeCraft', arg)
      this.closeDialog()
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

.quarityChoise {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: bold;
  > label {
    flex: 1;
    text-align: center;
    color: #000;
    background-color: #f0f4f4;
    border: 1px solid #b4b4b4;
    border-radius: 0.2rem;
    padding: 5px 0;
    margin: 2px;
    &.active {
      background-color: #fffca0;
      border: 1px solid #f1f658;
    }
  }
  input[type='radio'] {
    display: none;
    appearance: none;
  }
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
