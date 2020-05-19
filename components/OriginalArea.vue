<template>
  <div v-if="isOriginal" class="floating">
    <div class="xx-OriginalArea flex flex-col">
      <div class="OriginalList flex-1 zzBg-gray1 br-1">
        <h1>Original Area</h1>
        <div>{{ part }}</div>
        <div>{{ item.key }}</div>
        <div>
          <button class="zzBtn1" @click="handleRegister">handleRegister</button>
        </div>

        <hr class="m-4" />

        <div>
          <div v-for="(o, i) of theList" :key="i">
            <button class="zzBtn2 p-1" @click="handlePick(o)">
              <span>{{ i }}</span>
              <span>{{ o.key }}</span>
              <span>[{{ o.levelSum }}]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      isOriginal: (state) => state.isOriginal,
      tab: (state) => state.tab,
      part: (state) => state.part,
      item: (state) => state.item,
      recipe: (state) => state.partRecipe,
    }),
    ...mapGetters({
      gPartOwns: 'owns/gPartOwns',
    }),
    theList() {
      return this.gPartOwns(this.part).map((x) => {
        const levels = x.crafts.map((c) => c.level)
        const levelSum = levels.reduce((acc, crr) => acc + crr, 0)
        return { ...x, levelSum }
      })
    },
  },
  methods: {
    handleRegister() {
      const payload = {
        part: this.part,
        item: this.item,
        recipe: this.recipe,
      }
      this.$store.dispatch('owns/add', payload)
    },
    handlePick(recipe) {
      const tab = this.tab
      const part = this.part
      const name = recipe.key
      const crafts = recipe.crafts
      this.$store.dispatch('recipe/change', { part, name })
      this.$store.dispatch('recipe/changeCraftSet', { tab, part, crafts })
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

.xx-OriginalArea {
  // width: 58vw;
  height: calc(100% - 100px);
}

.OriginalList {
  position: relative;
  overflow: auto;
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}
</style>
