<template>
  <div v-if="isAbout" class="AboutModal" @click.self="handleModal">
    <div class="AboutModal-Panel zzBg-gray3">
      <div class="AboutModal-Head zzBg-black">
        About
      </div>
      <div class="AboutModal-Body">
        <div class="zzCategoryHeader my-2">
          ミニ四駆 超速グランプリ 改造シミュレータ
        </div>
        <div>
          当サイトの提供コンテンツは個人による制作物であり、公式とは一切関係ありません。
          また、シミュレーション結果を保証するものではありませんのでご了承ください。
        </div>
        <div>
          <div class="AboutModal-SubHeader">ソースコード</div>
          <div>GitHubにて公開を予定しています（準備中）。</div>
        </div>
        <div>
          <div class="AboutModal-SubHeader">情報提供</div>
          <div>
            Twitter ハッシュタグ
            <a
              href="https://twitter.com/intent/tweet?hashtags=%E8%B6%85%E9%80%9F%E3%82%B7%E3%83%9F%E3%83%A5"
              target="_blank"
              ><span class="hashtag">#超速シミュ</span></a
            >
          </div>
        </div>

        <div class="zzCategoryHeader mt-4 mb-2">
          開発継続のため、支援をお願い致します
        </div>
        <div>
          ご支援いただき、ありがとうございます。本サービスの開発のため、大切に使用させていただきます。
        </div>
        <div class="AboutModal-SubHeader">支援の方法</div>
        <div>
          <input
            id="copyTarget"
            class="opacity-0 bg-transparent select-auto absolute top-0 right-0"
            type="text"
            value="tarolnetg+amzg@gmail.com"
          />
          <ol class="list-decimal list-inside pl-1">
            <li>
              受取人<code class="text-xxs underline px-1" @click="handleCopy"
                >tarolnetg+amzg@gmail.com</code
              >をコピーします（アドレスをタップするとコピーできます）
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
            <li>
              レジに進みます
            </li>
          </ol>
          <div class="AboutModal-SubHeader">ご注意ください</div>
          <ul class="list-disc text-xxs pl-5">
            <li>返金はできませんので、金額の再確認をお願い致します。</li>
            <li>
              贈り主に連絡先(Eメール、Twitter等)の記入がありましたら、受け取り時確認時にメッセージを送信させていただきます。未記入の場合は匿名となります。
            </li>
            <li>支援したことでサポートが優先的に行われることはありません。</li>
            <li>トラブルを避けるため、返金は行っていません。</li>
          </ul>
        </div>

        <div class="zzCategoryHeader mt-4 mb-2">公式</div>
        <div>
          <a href="https://mini4wd-app.bn-ent.net/" target="_blank">
            <img src="/mini4wd-og.jpg" :alt="officialSite" />
            <div class="leading-tight py-1">{{ officialSite }}</div>
          </a>
        </div>
        <div class="copyright">
          <div>©小学館 ©ShoPro ©TAMIYA</div>
          <div>©BANDAI NAMCO Entertainment Inc.</div>
          <div>※ミニ四駆は株式会社タミヤの登録商標です。</div>
          <div>
            青木たかお・おちよしひこ・こしたてつひろ・武井宏之・たなかてつお・徳田ザウルス・姫川明
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      officialSite:
        'ミニ四駆 超速グランプリ | バンダイナムコエンターテインメント公式サイト',
    }
  },
  computed: {
    ...mapState('ing', {
      isAbout: (state) => state.isAbout,
    }),
  },
  methods: {
    handleModal() {
      this.$store.commit('ing/setAbout', false)
    },
    handleCopy() {
      const copyTarget = document.getElementById('copyTarget')
      copyTarget.select()
      document.execCommand('copy')
      alert('コピーしました:\n' + copyTarget.value)
    },
  },
}
</script>

<style lang="less" scoped>
.AboutModal {
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

.AboutModal-Panel {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  font-size: 0.8rem;
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.AboutModal-Head {
  padding: 0.2rem 0.5rem;
  border-radius: 4px 4px 0 0;
}

.AboutModal-Body {
  flex: 1;
  overflow: auto;
  padding: 0.2rem 0.5rem 2rem;

  .AboutModal-SubHeader {
    display: inline-block;
    margin: 0.75em 0 0.25em;
    padding: 0.1rem 0.5rem;
    font-size: 0.6rem;
    background-color: #747272;
  }
}

.AboutModal-Divider {
  border-color: #85898a;
  margin: 1em 0;
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
  border-radius: 4px;
}
</style>
