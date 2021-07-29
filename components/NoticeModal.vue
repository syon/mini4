<template>
  <div v-if="isNotice" class="zz-modal" @click.self="handleModal">
    <div class="zz-modalPanel zzBg-gray3">
      <div class="zz-headblack px-1">
        Notice
      </div>
      <div class="zz-modalBody p-2">
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">
            サイトについて その２
          </div>
          <div class="p-2">
            超速グランプリの改造シミュレーターです。使いやすいUIを目指して用意しました。数値や計算式は、ネットに落ちてたものや自分で調べたものです。間違ってたら報告いただけると助かります。
          </div>
          <div class="p-2">
            ログインについて。診断については限定公開とさせていただいてます。ページ下部からGoogleアカウントでログインいただき、管理人側で承認することで、見れるようになります。一度ログインしていただいた後、ご連絡ください。（捨て垢がオススメ）
          </div>
          <div class="p-2">
            質問、要望、不具合報告は、TwitterのDMでください。のんびり管理してるので対応に時間がかかる場合や、対応不可の場合もありますが、ご容赦ください。
          </div>
          <div class="p-2">
            【よくある？質問】
          </div>
          <div class="px-2">
            Q.診断をなぜログイン方式にしているの？
          </div>
          <div class="px-2">
            A.公式がお金を取っている（課金アイテムの）サービスを勝手にタダでばら撒いて良いものか分からないので、なんとなく紹介制みたいにしてます。
          </div>
          <div class="px-2">
            Q.ログイン情報どうなっちゃうの？
          </div>
          <div class="px-2">
            A.特に何も使ってません、そこは信じてもらうしかないです。捨て垢推奨です。
          </div>
          <div class="px-2">
            Q.他に収集されてる情報は？
          </div>
          <div class="px-2">
            A.実はどんなパーツが人気なのかとか、多い改造は何かとか、収集してます。何か使えるかなとか思って仕組みを作ったけど、超速GPの性質上、使い道は特にないですね笑
          </div>
          <div class="px-2">
            Q.こんな便利なツールなんでもっと前から教えてくれなかったの！
          </div>
          <div class="px-2">
            A.もともとはチーム専用のツールでした。なんとなく紹介制で広め始めたのは最近です。ちなみに、2020年11月ごろに5chにも貼られてしまいました。
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
