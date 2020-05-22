<template>
  <div v-if="isSupport" class="SupportModal" @click.self="handleModal">
    <div class="SupportModal-Panel zzBg-gray3 br-1">
      <div class="SupportModal-Head zzBg-black brt-1 px-1">
        Support
      </div>
      <div class="SupportModal-Body p-1">
        <div class="zzCategoryHeaderBig">
          開発継続のため、支援をお願い致します
        </div>
        <div class="p-1">
          ご支援いただき、ありがとうございます。本サービスの開発のため、大切に使用させていただきます。
        </div>
        <div class="zzCategoryHeaderShort">支援の方法</div>
        <ol class="list-decimal list-inside px-2 py-1">
          <li class="relative">
            受取人<code class="zz-text06 tracking-tighter mx-1"
              >tarolnetg+amzg@gmail.com</code
            >を<button class="zzBtnRect1 br-1 mx-1 px-1" @click="handleCopy">
              コピー</button
            >します
          </li>
          <li>
            <a
              href="https://www.amazon.co.jp/dp/B06X982RQ9/"
              target="_blank"
              class="zz-hashtag"
              >Amazonギフト券(Eメールタイプ)</a
            >
            を開きます
          </li>
          <li>
            支援したい金額を入力します
          </li>
          <li>宛先(受取人)にコピーしたアドレスを貼り付けます</li>
          <li>
            レジに進みます
          </li>
        </ol>
        <div class="zzCategoryHeaderShort">ご注意ください</div>
        <ul class="list list-inside px-2 py-1">
          <li>・ 返金はできませんので、金額の再確認をお願い致します。</li>
          <li>
            ・
            贈り主に連絡先(Eメール、Twitter等)の記入がありましたら、受け取り確認時にメッセージを送信させていただきます。未記入の場合は匿名となります。
          </li>
          <li>・ 支援したことでサポートが優先的に行われることはありません。</li>
          <li>・ トラブルを避けるため、返金は行っていません。</li>
        </ul>
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
  },
}
</script>

<style lang="less" scoped>
.SupportModal {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.67);
}

.SupportModal-Panel {
  display: flex;
  flex-direction: column;
  width: 315px;
  height: 76%;
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.SupportModal-Body {
  flex: 1;
  overflow: auto;
}
</style>
