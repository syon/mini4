<template>
  <div v-if="isSupport" class="SupportModal" @click.self="handleModal">
    <div class="SupportModal-Panel zzBg-gray3">
      <div class="SupportModal-Head zzBg-black">
        Support
      </div>
      <div class="SupportModal-Body">
        <div class="zzCategoryHeader my-2">
          開発継続のため、支援をお願い致します
        </div>
        <div>
          ご支援いただき、ありがとうございます。本サービスの開発のため、大切に使用させていただきます。
        </div>
        <div class="SupportModal-SubHeader">支援の方法</div>
        <ol class="list-decimal list-inside pl-1">
          <li class="relative">
            受取人<code class="text-xxs tracking-tighter px-1"
              >tarolnetg+amzg@gmail.com</code
            >を<button class="zzBtn1 tapToCopy" @click="handleCopy">
              コピー</button
            >します
          </li>
          <li>
            <a
              href="https://www.amazon.co.jp/dp/B06X982RQ9/"
              target="_blank"
              class="hashtag"
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
        <div class="SupportModal-SubHeader">ご注意ください</div>
        <ul class="list-disc text-xxs pl-5">
          <li>返金はできませんので、金額の再確認をお願い致します。</li>
          <li>
            贈り主に連絡先(Eメール、Twitter等)の記入がありましたら、受け取り確認時にメッセージを送信させていただきます。未記入の場合は匿名となります。
          </li>
          <li>支援したことでサポートが優先的に行われることはありません。</li>
          <li>トラブルを避けるため、返金は行っていません。</li>
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
  width: 84%;
  height: 76%;
  font-size: 0.8rem;
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
}

.SupportModal-Head {
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem 0.25rem 0 0;
}

.SupportModal-Body {
  flex: 1;
  overflow: auto;
  padding: 0.2rem 0.5rem 2rem;

  .SupportModal-SubHeader {
    display: inline-block;
    margin: 0.75em 0 0.25em;
    padding: 0.1rem 0.5rem;
    font-size: 0.6rem;
    background-color: #747272;
  }
}

.SupportModal-Divider {
  border-color: #85898a;
  margin: 1em 0;
}

.zzCategoryHeader {
  font-size: 0.8rem;
}

.copyright {
  margin-top: 0.5em;
  font-size: 0.6rem;
  line-height: 1.2;
}

.hashtag {
  font-size: 0.9em;
  padding: 0 0.5em;
  color: black;
  background-color: #5fcffa;
  border-radius: 0.25rem;
}

.tapToCopy {
  display: inline-block;
  font-size: 0.6rem;
  color: black;
  background-color: rgba(95, 207, 250, 0.5);
  border-radius: 0.25rem;
  margin: 0 0.3em;
  padding: 0 0.5em;
}
</style>
