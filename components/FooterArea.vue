<template>
  <div>
    <about-modal />
    <support-modal />
    <!-- <button class="zzBtnRounded1 m-auto" @click="hendleError">Error</button> -->
    <div class="flex items-center justify-between p-2">
      <div class="flex">
        <button class="zzBtnRounded1" @click="handleReset">リセット</button>
      </div>
      <div class="flex">
        <button class="zzBtnRounded1" @click="handleAbout">
          このサイトについて
        </button>
      </div>
      <div class="flex">
        <button class="zzBtnRounded1" @click="handleSupport">支援する</button>
      </div>
      <div class="flex">
        <access-counter class="flex-1 m-2" />
      </div>
    </div>
  </div>
</template>

<script>
import AboutModal from '@/components/AboutModal'
import SupportModal from '@/components/SupportModal'
import AccessCounter from '@/components/AccessCounter'

export default {
  components: {
    AboutModal,
    SupportModal,
    AccessCounter,
  },
  methods: {
    hendleError() {
      throw new Error('Test Error.')
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
