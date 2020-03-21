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
        <template v-if="isCrafting">
          <craft-select-area />
        </template>
        <div class="row">
          <parts-choise-area />
        </div>
        <div class="row">
          <parts-detail-area />
        </div>
        <div class="row flex-auto">
          <remodel-area />
        </div>
        <div class="row">その他</div>
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
  computed: {
    ...mapState('ing', {
      isCrafting: (state) => state.isCrafting
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  height: 100vh;
  min-height: 100vh;
}
</style>
