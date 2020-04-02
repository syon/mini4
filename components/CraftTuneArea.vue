<template>
  <div v-if="isTune" class="xx-CraftTuneArea zzBg-gray1">
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Mini4 from '../models/Mini4'

export default {
  data() {
    return {
      quarity: null,
      level: null
    }
  },
  computed: {
    ...mapState('ing', {
      isTune: (state) => state.isTune,
      ingPart: (state) => state.part,
      ingRecipe: (state) => state.partRecipe
    })
  },
  watch: {
    isTune() {
      this.quarity = null
      this.level = null
    },
    quarity(quarity) {
      if (!quarity) return
      const crafts = this.ingRecipe.crafts || []
      for (let i = 0; i < crafts.length; i++) {
        if (crafts[i].action) {
          const payload = {
            part: this.ingPart,
            craftIndex: i,
            quarity
          }
          this.$store.dispatch('recipe/changeCraftquarity', payload)
        }
      }
    },
    level(level) {
      if (!level) return
      const crafts = this.ingRecipe.crafts || []
      for (let i = 0; i < crafts.length; i++) {
        if (crafts[i].action) {
          const payload = {
            part: this.ingPart,
            craftIndex: i,
            level
          }
          this.$store.dispatch('recipe/changeCraftLevel', payload)
        }
      }
    }
  },
  methods: {
    handleLevel(theCase) {
      this.level = Mini4.controlLevel(theCase, this.level)
    },
    closeDialog() {
      this.$store.dispatch('ing/toggleCraftTune')
    }
  }
}
</script>

<style lang="less" scoped>
.xx-CraftTuneArea {
  position: fixed;
  bottom: 10px;
  left: 0;
  z-index: 9;
  width: 58vw;
  border: 1px solid #c8c8c8;
  border-radius: 0.4rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.levelChoise {
  font-size: 0.8rem;
}

.xx-close {
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
