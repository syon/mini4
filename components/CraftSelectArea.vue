<template>
  <div v-if="isCrafting" class="xx-CraftSelectArea w-7/12 zzBg-gray1 shadow-md">
    <button class="w-full border my-4" @click="closeDialog">閉じる</button>
    <label>
      <input v-model="quarity" type="radio" value="イイ感じ" />
      <span>イイ感じ</span>
    </label>
    <label>
      <input v-model="quarity" type="radio" value="職人技" />
      <span>職人技</span>
    </label>
    <label>
      <input v-model="quarity" type="radio" value="至高の逸品" />
      <span>至高の逸品</span>
    </label>
    <hr />
    <div class="flex items-center text-black">
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
      quarity: '至高の逸品',
      level: 50
    }
  },
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part,
      isCrafting: (state) => state.isCrafting,
      craftIndex: (state) => state.craftIndex,
      craftAction: (state) => state.craftAction
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
</style>
