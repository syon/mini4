<template>
  <div v-if="isAbout" class="AboutModal" @click.self="handleModal">
    <div class="AboutModal-Panel zzBg-gray2">
      <div class="AboutModal-Head zzBg-black">
        ミニ四駆 超速グランプリ 改造シミュレータ
      </div>
      <div class="AboutModal-Body">
        <div>
          当サイトの提供コンテンツは個人による制作物であり、公式とは一切関係ありません。
          また、シミュレーション結果を保証するものではありませんのでご了承ください。
        </div>
        <hr class="AboutModal-Divider" />
        <div>
          <a href="https://mini4wd-app.bn-ent.net/" about="_blank">
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
        'ミニ四駆 超速グランプリ | バンダイナムコエンターテインメント公式サイト'
    }
  },
  computed: {
    ...mapState('ing', {
      isAbout: (state) => state.isAbout
    })
  },
  methods: {
    handleModal() {
      this.$store.commit('ing/setAbout', false)
    }
  }
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
  color: red;
  background-color: rgba(0, 0, 0, 0.4);
}

.AboutModal-Panel {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80%;
  font-size: 0.8rem;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
}

.AboutModal-Head {
  padding: 0.2rem 0.5rem;
}

.AboutModal-Body {
  flex: 1;
  overflow: auto;
  padding: 0.2rem 0.5rem;
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
</style>
