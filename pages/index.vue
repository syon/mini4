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
      <div class="row flex-auto">
        パーツ選択
        <hr />
      </div>
      <div class="row flex-auto">パーツ詳細</div>
      <div class="row flex-auto">総合</div>
      <div class="row flex-auto">スキル</div>
      <div class="row flex-auto">改造</div>
      <div class="row flex-auto">その他</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
