<template>
  <div class="flex flex-col">
    <machine-tab-area />
    <div class="w-full flex flex-col">
      <div class="row flex-auto">
        <total-area />
      </div>
    </div>
    <div class="GarageArea flex p-1">
      <setting-area class="w-7/12" :tab="tab" />
      <div class="w-5/12 migisita">
        <parts-choise-area />
        <parts-detail-area />
        <remodel-area />
      </div>
    </div>
    <div class="zzBg-gray2">
      <text-dump />
    </div>
    <black-barrier />
    <footer>
      <footer-area />
    </footer>

    <!-- Floatings -->
    <showcase-area />
    <craft-select-area />
    <craft-tune-area />
    <original-area />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MachineTabArea from '@/components/MachineTabArea'
import TotalArea from '@/components/TotalArea'
import SettingArea from '@/components/SettingArea'
import PartsChoiseArea from '@/components/PartsChoiseArea'
import PartsDetailArea from '@/components/PartsDetailArea'
import RemodelArea from '@/components/RemodelArea'
import CraftSelectArea from '@/components/CraftSelectArea'
import CraftTuneArea from '@/components/CraftTuneArea'
import OriginalArea from '@/components/OriginalArea'
import ShowcaseArea from '@/components/ShowcaseArea'
import BlackBarrier from '@/components/BlackBarrier'
import TextDump from '@/components/TextDump'
import FooterArea from '@/components/FooterArea'

export default {
  components: {
    MachineTabArea,
    TotalArea,
    SettingArea,
    PartsChoiseArea,
    PartsDetailArea,
    RemodelArea,
    CraftSelectArea,
    CraftTuneArea,
    OriginalArea,
    ShowcaseArea,
    BlackBarrier,
    TextDump,
    FooterArea,
  },
  computed: {
    ...mapState('ing', {
      tab: (state) => state.tab,
    }),
  },
}
</script>

<style>
.GarageArea {
  color: #eee;
  background-color: #505657;
  background-image: url('/bg_grid_w.svg');
  background-size: 32px;
}

.migisita {
  overflow: hidden;
}
</style>
