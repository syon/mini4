<template>
  <div class="ErrorPage flex items-center justify-center min-h-screen p-8">
    <div class="w-full flex flex-col text-center">
      <div class="text-lg font-bold mb-4">エラーが発生しました...</div>
      <div class="text-sm">
        ごめんなさい。何かおかしいことになってしまいました。ページを更新してみてください。
        どうしても元に戻らないときは、申し訳ないですがリセットして最初からやり直してください。
      </div>
      <div class="text-xs bg-gray-800 p-4 my-4 text-yellow-400 font-mono">
        <pre class="whitespace-normal break-all">{{ error.message }}</pre>
      </div>
      <div class="mt-4">
        <button class="zzBtnRounded1 mr-4" @click="softReset">
          リロード
        </button>
        <button class="zzBtnRounded1 mr-4" @click="clearLocalStorage">
          すべて初期化
        </button>
      </div>
      <div class="mt-4">
        <a
          href="https://twitter.com/intent/tweet?zz-hashtags=%E8%B6%85%E9%80%9F%E3%82%B7%E3%83%9F%E3%83%A5"
          class="zzBtnRounded1 mt-4"
          >ツイートして報告</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { error: { type: Object, default: () => {} } },
  mounted() {
    this.$ga.screenview('Error')
  },
  methods: {
    softReset() {
      this.$store.commit('ing/reset')
      window.location.reload()
    },
    clearLocalStorage() {
      if (
        window.confirm('リセットして最初からやり直します。よろしいですか？')
      ) {
        window.localStorage.clear()
        window.location.reload()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.ErrorPage {
  color: white;

  .zzBtnRounded1 {
    display: inline-block;
  }
}
</style>
