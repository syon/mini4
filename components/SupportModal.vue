<template>
  <div v-if="isSupport" class="zz-modal" @click.self="handleModal">
    <div class="zz-modalPanel zzBg-gray3">
      <div class="zz-headblack px-1">
        Support
      </div>
      <div class="zz-modalBody p-2">
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">
            開発継続のため、支援をお願い致します
          </div>
          <div class="p-2">
            ご支援いただき、ありがとうございます。<br />本サービスの開発のため、大切に使用させていただきます。
          </div>
          <div class="zzCategoryHeaderShort">支援の方法</div>
          <ol class="list-decimal list-inside p-2">
            <li class="relative">
              受取人<code class="zz-text06 tracking-tighter mx-05"
                >tarolnetg+amzg@gmail.com</code
              >を<button class="zzBtnRect1 mx-05" @click="handleCopy">
                コピー</button
              >します
            </li>
            <li>
              <a
                href="https://www.amazon.co.jp/dp/B06X982RQ9/"
                target="_blank"
                class="zz-hashtag"
                @click="handleGift($event)"
                >Amazonギフト券(Eメールタイプ)</a
              >
              を開きます
            </li>
            <li>宛先(受取人)にコピーしたアドレスを貼り付けます</li>
            <li>
              支援したい金額を選択(もしくは入力)します
            </li>
            <li>
              レジに進みます
            </li>
          </ol>
          <div class="zzCategoryHeaderShort">ご注意ください</div>
          <ul class="list list-inside p-2">
            <li>・ 返金はできませんので、金額の再確認をお願いします。</li>
            <li>
              ・
              贈り主に連絡先(TwitterID)の記載がありましたら、受け取り確認時にDMにて連絡させていただきます。
            </li>
            <li>
              ・
              未記入の場合は匿名となりますが、この場を借りて感謝申し上げます。
            </li>
            <li>
              ・ 支援したことでサポートが優先的に行われることはありません。
            </li>
            <li>・ トラブルを避けるため、返金は行っていません。</li>
          </ul>
          <div class="zzCategoryHeaderShort">モノを送りたい人はこちら！</div>
          <ul class="list list-inside p-2">
            <li>
              <a
                href="https://www.amazon.jp/hz/wishlist/ls/TARENCG8GYXP?ref_=wl_share"
                target="_blank"
                class="zz-hashtag"
                @click="handleGift($event)"
                >Amazon欲しいものリスト</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Util from '@/models/Util'

export default {
  computed: {
    ...mapState('ing', {
      isSupport: (state) => state.isSupport,
    }),
  },
  methods: {
    handleModal() {
      this.$store.commit('ing/setSupport', false)
    },
    handleCopy() {
      Util.copyToClipboard('tarolnetg+amzg@gmail.com')
      alert('コピーしました:\n' + 'tarolnetg+amzg@gmail.com')
    },
    handleGift($event) {
      this.$ga.event('Support', 'Gift')
    },
  },
}
</script>

<style lang="less" scoped></style>
