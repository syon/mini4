<template>
  <div class="container flex">
    <div class="column flex-auto flex flex-col">
      <div class="row flex-auto">
        <div class="">マシン</div>
      </div>
      <div class="row flex-auto">総合</div>
      <div class="row flex-auto">スキル</div>
      <div class="row flex-auto">パーツ</div>
      <div class="row flex-auto">その他</div>
    </div>
    <div class="column flex-auto">
      セッティング
    </div>
    <div class="column flex-auto flex flex-col">
      <div class="row">
        <parts-choise-area />
      </div>
      <div class="row">
        <parts-detail-area />
      </div>
      <div class="row">スキル</div>
      <div class="row flex-auto">
        <remodel-area />
      </div>
      <div class="row">その他</div>
    </div>
  </div>
</template>

<script>
import PartsChoiseArea from '@/components/PartsChoiseArea'
import PartsDetailArea from '@/components/PartsDetailArea'
import RemodelArea from '@/components/RemodelArea'

export default {
  components: {
    PartsChoiseArea,
    PartsDetailArea,
    RemodelArea
  },
  computed: {}
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}

.row,
.column {
  border: 1px solid #ddd;
}
</style>
