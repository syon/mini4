<template>
  <div class="FooterArea zzBg-checker2">
    <div class="relative z-50">
      <about-modal />
      <notice-modal />
      <update-modal />
      <support-modal />
    </div>
    <div class="relative z-1">
      <div class="p-2">
        <div class="flex mb-1">
          <button class="zzBtnRounded1 w-full mr-05" @click="handleSoftReset">
            設定を残してリロード
          </button>
          <button class="zzBtnRounded1 w-full ml-05" @click="handleReset">
            オールリセット
          </button>
        </div>
        <div class="mb-1">
          <button class="zzBtnRectBlack w-full mb-1" @click="handleAbout">
            サイトについて
          </button>
          <div v-if="isDiagnosis">
            <button class="zzBtnRectBlack2 w-full mb-1" @click="handleNotice">
              ログインメニュー： 注意事項
            </button>
            <button class="zzBtnRectBlack2 w-full mb-1" @click="handleUpdate">
              ログインメニュー： 更新履歴
            </button>
            <button class="zzBtnRectBlack2 w-full mb-1" @click="handleSupport">
              ログインメニュー： 支援する ★★★★★★★
            </button>
          </div>
          <!-- <button class="zzBtnRounded1" @click="hendleError">
              Error
            </button> -->
        </div>
        <div class="mb-2">
          <user-area />
        </div>
        <div class="mb-8">
          <div class="flex justify-center">
            <access-counter class="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AboutModal from '@/components/AboutModal'
import NoticeModal from '@/components/NoticeModal'
import UpdateModal from '@/components/UpdateModal'
import SupportModal from '@/components/SupportModal'
import UserArea from '@/components/UserArea'
import AccessCounter from '@/components/AccessCounter'

export default {
  components: {
    AboutModal,
    NoticeModal,
    UpdateModal,
    SupportModal,
    AccessCounter,
    UserArea,
  },
  computed: {
    ...mapGetters({
      isDiagnosis: 'user/isDiagnosis',
    }),
  },
  methods: {
    hendleError() {
      throw new Error('Test Error.')
    },
    handleSoftReset() {
      this.$store.commit('ing/reset')
      window.location.reload()
    },
    handleReset() {
      if (
        window.confirm('リセットして最初からやり直します。よろしいですか？')
      ) {
        window.localStorage.clear()
        window.location.reload()
      }
    },
    handleAbout() {
      this.$store.commit('ing/setAbout', true)
      this.$ga.screenview('About')
    },
    handleNotice() {
      this.$store.commit('ing/setNotice', true)
      this.$ga.screenview('Notice')
    },
    handleUpdate() {
      this.$store.commit('ing/setUpdate', true)
      this.$ga.screenview('Update')
    },
    handleSupport() {
      this.$store.commit('ing/setSupport', true)
      this.$ga.screenview('Support')
    },
  },
}
</script>

<style lang="less" scoped>
.FooterArea {
  .leftNavs {
  }
  .rightNavs {
    > button {
    }
  }
}
</style>
