<template>
  <div class="flex flex-col">
    <div class="w-full flex flex-col">
      <div class="row flex-auto">
        <total-area />
      </div>
    </div>
    <div class="flex">
      <setting-area class="w-7/12" />
      <div class="w-5/12 migisita zzBg-gray1 p-1">
        <parts-choise-area />
        <parts-detail-area />
        <craft-select-area />
        <remodel-area />
      </div>
    </div>
    <div class="zzBg-gray2 h-64">
      テキストコピペエリア
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
  min-height: 100vh;
}
.migisita {
  overflow: hidden;
}
</style>
