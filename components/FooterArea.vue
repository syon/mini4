<template>
  <div>
    <about-modal />
    <div class="flex items-center justify-between p-4">
      <div class="flex-1">
        <button class="zzBtn1" @click="handleReset">Reset</button>
      </div>
      <div class="flex-1 text-center">
        <button class="zzBtn1" @click="handleAbout">About</button>
      </div>
      <div class="flex-1">
        <access-counter class="flex-1 ml-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import AboutModal from '@/components/AboutModal'
import AccessCounter from '@/components/AccessCounter'

export default {
  components: {
    AboutModal,
    AccessCounter,
  },
  methods: {
    handleReset() {
      if (window.confirm('Reset?')) {
        window.localStorage.clear()
        window.location.reload()
      }
    },
    handleAbout() {
      this.$store.commit('ing/setAbout', true)
      this.$ga.screenview('About')
    },
  },
}
</script>
