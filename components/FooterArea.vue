<template>
  <div class="FooterArea zzBg-checker2">
    <div class="relative z-10">
      <about-modal />
      <support-modal />
      <div class="p-4">
        <div class="flex justify-between">
          <div class="leftNavs">
            <button class="zzBtnRounded1" @click="handleSoftReset">
              リロード
            </button>
            <button class="zzBtnRounded1" @click="handleReset">リセット</button>
            <button class="zzBtnRounded1" @click="handleAbout">
              このサイトについて
            </button>
            <button class="zzBtnRounded1" @click="handleSupport">
              支援する
            </button>
            <!-- <button class="zzBtnRounded1" @click="hendleError">
              Error
            </button> -->
          </div>
          <div class="rightNavs">
            <access-counter class="flex-1 m-2" />
          </div>
        </div>
        <user-area />
      </div>
    </div>
  </div>
</template>

<script>
import AboutModal from '@/components/AboutModal'
import SupportModal from '@/components/SupportModal'
import UserArea from '@/components/UserArea'
import AccessCounter from '@/components/AccessCounter'

export default {
  components: {
    AboutModal,
    SupportModal,
    AccessCounter,
    UserArea,
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
    > button {
      margin-bottom: 1rem;
    }
  }
  .rightNavs {
    display: flex;
    align-items: flex-end;
  }
}
</style>
