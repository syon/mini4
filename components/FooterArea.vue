<template>
  <div class="FooterArea zzBg-checker2">
    <div class="relative z-10">
      <about-modal />
      <support-modal />
      <div class="p-4">
        <div class="flex justify-between">
          <div class="leftNavs">
            <button class="" @click="handleAbout">
              このサイトについて
            </button>
            <button class="" @click="handleSupport">
              支援する
            </button>
            <!-- <button class="zzBtnRounded1" @click="hendleError">
              Error
            </button> -->
          </div>
          <div class="rightNavs flex flex-col">
            <button class="zzBtnRounded1" @click="handleSoftReset">
              リロード
            </button>
            <button class="zzBtnRounded1" @click="handleReset">リセット</button>
            <div>
              <access-counter class="flex-1 m-2" />
            </div>
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
    flex: 1;
    margin: 0 2rem 0 0;
    > button {
      display: block;
      width: 100%;
      background: linear-gradient(
        0deg,
        #252525 0%,
        #141717 35%,
        #000000 70%,
        #282928 100%
      );
      border: 1px solid #0e1111;
      // box-shadow: inset 1px 1px 2px -0.4px #e5e4e5;
      // border-radius: 9999px;
      border-radius: 0.25rem;
      padding: 0.25rem;
      margin: 0.5rem 0;
    }
  }
  .rightNavs {
    display: flex;
    align-items: flex-end;
    > button {
      margin: 0.5rem 0;
    }
  }
}
</style>
