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
        <showcase-area />
        <parts-detail-area />
        <craft-select-area />
        <craft-tune-area />
        <remodel-area />
      </div>
    </div>
    <div class="zzBg-gray2 h-64">
      テキストコピペエリア
    </div>
    <black-barrier />
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
import CraftTuneArea from '@/components/CraftTuneArea'
import ShowcaseArea from '@/components/ShowcaseArea'
import BlackBarrier from '@/components/BlackBarrier'

export default {
  components: {
    TotalArea,
    SettingArea,
    PartsChoiseArea,
    PartsDetailArea,
    RemodelArea,
    CraftSelectArea,
    CraftTuneArea,
    ShowcaseArea,
    BlackBarrier
  },
  computed: {
    ...mapState('ing', {
      isCrafting: (state) => state.isCrafting
    })
  }
}
</script>

<style>
.migisita {
  overflow: hidden;
}
</style>
