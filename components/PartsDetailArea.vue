<template>
  <div>
    <div class="flex">
      <div class="w-16 h-16 bg-gray-300"></div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>スピード</div>
        <div class="text-lg">{{ ingItem.params.速度 }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>パワー</div>
        <div class="text-lg">{{ ingItem.params.馬力 }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>コーナー安定</div>
        <div class="text-lg">{{ ingItem.params.安定 }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>スタミナ耐久</div>
        <div class="text-lg">{{ ingItem.params.耐久 }}</div>
      </div>
      <div class="flex-auto flex flex-col items-center justify-center text-xs">
        <div>重さ</div>
        <div class="text-lg">{{ ingItem.params.重量 }}g</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      ingPart: (state) => state.part
    }),
    ...mapState('catalog', {
      dataset: (state) => state.dataset
    }),
    ingItem() {
      const partCatalog = this.dataset[this.ingPart]
      const partRecipe = this.$store.state.recipe[this.ingPart]
      const key = partRecipe // TODO
      return partCatalog[key] || { params: {} }
    },
    ingDataset() {
      return this.dataset[this.ingPart]
    }
  }
}
</script>
