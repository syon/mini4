<template>
  <div class="container flex">
    <div class="col3way column flex flex-col">
      <div class="row flex-auto">
        <div class="">マシン</div>
      </div>
      <div class="row flex-auto">総合</div>
      <div class="row flex-auto">スキル</div>
      <div class="row flex-auto">その他</div>
    </div>
    <div class="col3way column flex">
      <template v-if="isCrafting">
        <craft-select-area />
      </template>
      <setting-area />
    </div>
    <div class="col3way column flex flex-col">
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
</template>

<script>
import { mapState } from 'vuex'
import SettingArea from '@/components/SettingArea'
import PartsChoiseArea from '@/components/PartsChoiseArea'
import PartsDetailArea from '@/components/PartsDetailArea'
import RemodelArea from '@/components/RemodelArea'
import CraftSelectArea from '@/components/CraftSelectArea'

export default {
  components: {
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

.col3way {
  width: 420px;
}

.row,
.column {
  border: 1px solid #ddd;
}
</style>
