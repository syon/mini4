<template>
  <div v-if="isAbout" class="zz-modal" @click.self="handleModal">
    <div class="zz-modalPanel zzBg-gray3">
      <div class="zz-headblack px-1">
        About
      </div>
      <div class="zz-modalBody p-2">
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">
            ミニ四駆 超速グランプリ 改造シミュレータ
          </div>
          <div class="p-2">
            当サイトの提供コンテンツは個人による制作物であり、公式とは一切関係ありません。
            また、シミュレーション結果を保証するものではありませんのでご了承ください。
          </div>
          <div class="p-2">
            サイトの趣旨としましては、セッティングのシミュレーションに対して、
            使いやすいUI（ユーザインタフェース）を提供するといったものです。
          </div>
          <div class="p-2">
            数値については、アプリ内に表示された値を調査、記録したものです。
            計算式については、自身で検証して導き出したもの、協力者による検証、
            SNS等の情報や、ネットの海に落ちてた情報等を元に組み立ててます。
            数値や計算式が間違ってたら教えてくれると助かります。
          </div>
          <div class="zzCategoryHeaderShort">ソースコード</div>
          <ul class="list list-inside p-2">
            <li>GitHubにて公開を予定しています。(準備中)</li>
          </ul>
          <div class="zzCategoryHeaderShort">情報提供</div>
          <ul class="list list-inside p-2">
            <li>
              Twitter ハッシュタグ<a
                href="https://twitter.com/intent/tweet?hashtags=%E8%B6%85%E9%80%9F%E3%82%B7%E3%83%9F%E3%83%A5"
                target="_blank"
                ><span class="zz-hashtag mx-1">#超速シミュ</span></a
              >
            </li>
          </ul>
        </div>
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">公式</div>
          <div class="p-2">
            <a href="https://mini4wd-app.bn-ent.net/" target="_blank">
              <img src="/mini4wd-og.jpg" :alt="officialSite" />
              <div class="zz-text06 py-1">{{ officialSite }}</div>
            </a>
            <div class="zz-text06">
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
  },
}
</script>

<style lang="less" scoped></style>
