<template>
  <div class="container flex flex-col">
    <div class="w-full flex flex-col">
      <div class="row flex-auto">
        <total-area />
      </div>
    </div>
    <div class="flex-1 flex overflow-hidden">
      <div class="w-7/12 overflow-auto">
        <setting-area />
      </div>
      <div class="w-5/12 overflow-auto flex flex-col">
        <div class="flex justify-between">
          <button class="flex-auto border" @click="handleSwitchTab('付替')">
            付替
          </button>
          <button class="flex-auto border" @click="handleSwitchTab('改造')">
            改造
          </button>
          <button class="flex-auto border" @click="handleSwitchTab('強化')">
            強化
          </button>
        </div>
        <div class="migisita">
          <template v-if="mode === '付替'">
            <parts-choise-area />
            <parts-detail-area />
          </template>
          <template v-if="mode === '改造'">
            <craft-select-area />
          </template>
          <template v-if="mode === '強化'">
            <remodel-area />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TotalArea from '@/components/TotalArea'
import SettingArea from '@/components/SettingArea'
import PartsChoiseArea from '@/components/PartsChoiseArea'
import PartsDetailArea from '@/components/PartsDetailArea'
import RemodelArea from '@/components/RemodelArea'
import CraftSelectArea from '@/components/CraftSelectArea'

export default {
  components: {
    TotalArea,
    SettingArea,
    PartsChoiseArea,
    PartsDetailArea,
    RemodelArea,
    CraftSelectArea
  },
  data() {
    return {
      mode: '付替'
    }
  },
  computed: {
    ...mapState('ing', {
      isCrafting: (state) => state.isCrafting
    })
  },
  methods: {
    handleSwitchTab(mode) {
      this.mode = mode
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  height: 100vh;
  min-height: 100vh;
}
.migisita {
  width: 300px;
}
</style>
