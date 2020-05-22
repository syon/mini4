<template>
  <div v-if="isAbout" class="AboutModal" @click.self="handleModal">
    <div class="AboutModal-Panel zzBg-gray3 br-1">
      <div class="zz-headblack">
        About
      </div>
      <div class="AboutModal-Body p-1">
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">
            ミニ四駆 超速グランプリ 改造シミュレータ
          </div>
          <div class="p-1">
            当サイトの提供コンテンツは個人による制作物であり、公式とは一切関係ありません。
            また、シミュレーション結果を保証するものではありませんのでご了承ください。
          </div>
          <div>
            <div class="zzCategoryHeaderShort">ソースコード</div>
            <ul class="list list-inside px-2 py-1">
              <li>GitHubにて公開を予定しています（準備中）。</li>
            </ul>
          </div>
          <div>
            <div class="zzCategoryHeaderShort">情報提供</div>
            <ul class="list list-inside px-2 py-1">
              <li>
                Twitter ハッシュタグ<a
                  href="https://twitter.com/intent/tweet?hashtags=%E8%B6%85%E9%80%9F%E3%82%B7%E3%83%9F%E3%83%A5"
                  target="_blank"
                  ><span class="zz-hashtag mx-1">#超速シミュ</span></a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">公式</div>
          <div class="p-1">
            <a href="https://mini4wd-app.bn-ent.net/" target="_blank">
              <img src="/mini4wd-og.jpg" :alt="officialSite" />
              <div class="py-1">{{ officialSite }}</div>
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
  width: 300px;
  height: 80%;
  border: 1px solid #c8c8c8;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
  border-radius: 0.25rem;
}

.AboutModal-Body {
  flex: 1;
  overflow: auto;
}
</style>
