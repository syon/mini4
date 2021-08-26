<template>
  <div v-if="isNotice" class="zz-modal" @click.self="handleModal">
    <div class="zz-modalPanel zzBg-gray3">
      <div class="zz-headblack px-1">
        Notice
      </div>
      <div class="zz-modalBody p-2">
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">
            注意事項
          </div>
          <div class="zzCategoryHeaderShort">限定公開理由</div>
          <div class="p-2">
            元々自チーム用に用意したもので、公にする予定もなく、紹介制という体裁を取っています。理由の一つはアプリ内で課金アイテムを使用して行う診断をタダでばら撒くのは少々問題だという点です。ですので、不特定多数への紹介や、利用者以外の人がいる場での会話、広めるような行為等はしないように注意いただきたいです。その点留意下さい。
          </div>
          <div class="zzCategoryHeaderShort">紹介したい人がいる場合</div>
          <div class="p-2">
            TwitterのDMで連絡ください。注意事項について、お伝えいただき、同意の上、紹介いただければと思います。その際承認の手順等もお伝えいただけると助かります。
          </div>
          <div class="zzCategoryHeaderShort">診断機能利用方法</div>
          <div class="p-2">
            サイト最下部からGoogleログインして頂き、そのアカウント名orアドレスをDMで連絡ください。その後こちらで承認し、承認後「診断」の機能が使用できるようになります。（捨て垢がオススメ）
          </div>
          <div class="zzCategoryHeaderShort">収集情報</div>
          <div class="p-2">
            利用する予定はありません。
          </div>
          <div class="zzCategoryHeaderShort">質問、要望、不具合報告</div>
          <div class="p-2">
            TwitterのDMでお願いします。のんびり管理してるので、対応に時間がかかる場合や、対応不可の場合もありますが、ご容赦ください。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('ing', {
      isNotice: (state) => state.isNotice,
    }),
  },
  methods: {
    handleModal() {
      this.$store.commit('ing/setNotice', false)
    },
  },
}
</script>

<style lang="less" scoped></style>
