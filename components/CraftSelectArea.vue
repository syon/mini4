<template>
  <div v-if="isCrafting" class="xx-CraftSelectArea w-7/12 zzBg-gray1 shadow-md">
    <button class="w-full border my-4" @click="closeDialog">閉じる</button>
    <div class="quarityChoise my-2">
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
    <div class="flex items-center justify-center text-black my-2">
      <button class="border bg-gray-200 w-8" @click="handleLevel('One')">
        1
      </button>
      <button class="border bg-gray-200 w-8" @click="handleLevel('Minus')">
        ー
      </button>
      <input
        v-model="level"
        type="number"
        class="text-black w-10 text-center"
      />
      <button class="border bg-gray-200 w-8" @click="handleLevel('Plus')">
        ＋
      </button>
      <button class="border bg-gray-200 w-8" @click="handleLevel('Now')">
        37
      </button>
      <button class="border bg-gray-200 w-8" @click="handleLevel('Max')">
        50
      </button>
    </div>
    <hr />
    <template v-for="(x, idx) in ingCraftsWithBlank">
      <div :key="idx" class="flex m-2" @click="handleClickSlot(x)">
        <craft-edit-slot :arg="x" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CraftEditSlot from '@/components/CraftEditSlot'
import Mini4 from '@/models/Mini4'

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
      isCrafting: (state) => state.isCrafting,
      craftIndex: (state) => state.craftIndex,
      craftAction: (state) => state.craftAction,
      craftQuality: (state) => state.craftQuality,
      craftLevel: (state) => state.craftLevel
    }),
    ...mapState('craft', {
      craftMaster: (state) => state.craft
    }),
    ...mapGetters({
      getRecipeByPart: 'recipe/getRecipeByPart'
    }),
    ingCrafts() {
      const category = Mini4.resolveCategoryByPart(this.ingPart)
      const partCrafts = this.craftMaster[category]
      return partCrafts || []
    },
    crrRecipeCrafts() {
      const recipe = this.getRecipeByPart(this.ingPart) || {}
      return recipe.crafts || []
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
      switch (sub) {
        case 'One':
          this.level = 1
          break
        case 'Minus':
          this.level = this.level - 1
          break
        case 'Plus':
          this.level = this.level + 1
          break
        case 'Now':
          this.level = 37
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
        quarity: isNone ? '' : this.quarity,
        level: isNone ? 0 : this.level
      }
      this.$store.dispatch('recipe/changeCraft', arg)
      this.closeDialog()
    },
    closeDialog() {
      this.$store.commit('ing/setCrafting', false)
    }
  }
}
</script>

<style lang="less" scoped>
.xx-CraftSelectArea {
  position: absolute;
  top: 100px;
  left: 0;
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
</style>
