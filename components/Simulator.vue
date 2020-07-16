<template>
  <div class="flex flex-col txt-base">
    <machine-tab-area />
    <div class="w-full flex flex-col">
      <div class="row flex-auto">
        <total-area />
      </div>
    </div>
    <div class="GarageArea overflow-x-auto">
      <div class="Garage flex zzBg-grid p-1">
        <div class="Garage-Left">
          <toolbar-area />
          <setting-area :tab="tab" />
        </div>
        <div class="Garage-Middle">
          <parts-detail-area />
          <owns-area />
        </div>
        <div class="Garage-Right flex flex-col justify-end">
          <parts-choise-area />
          <remodel-area />
        </div>
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
    <wear-label-area />
    <tab-copy-area />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MachineTabArea from '@/components/MachineTabArea'
import TotalArea from '@/components/TotalArea'
import ToolbarArea from '@/components/ToolbarArea'
import SettingArea from '@/components/SettingArea'
import PartsChoiseArea from '@/components/PartsChoiseArea'
import PartsDetailArea from '@/components/PartsDetailArea'
import RemodelArea from '@/components/RemodelArea'
import CraftSelectArea from '@/components/CraftSelectArea'
import CraftTuneArea from '@/components/CraftTuneArea'
import OwnsArea from '@/components/OwnsArea'
import WearLabelArea from '@/components/WearLabelArea'
import ShowcaseArea from '@/components/ShowcaseArea'
import TabCopyArea from '@/components/TabCopyArea'
import BlackBarrier from '@/components/BlackBarrier'
import TextDump from '@/components/TextDump'
import FooterArea from '@/components/FooterArea'

export default {
  components: {
    MachineTabArea,
    TotalArea,
    ToolbarArea,
    SettingArea,
    PartsChoiseArea,
    PartsDetailArea,
    RemodelArea,
    CraftSelectArea,
    CraftTuneArea,
    OwnsArea,
    WearLabelArea,
    ShowcaseArea,
    TabCopyArea,
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

<style lang="less" scoped>
.Garage {
  width: 527px;

  .Garage-Left {
    width: 215px;
  }
  .Garage-Middle {
    width: 152px;
    height: 622px;
    overflow: auto;
  }
  .Garage-Right {
    width: 152px;
  }
}
</style>
