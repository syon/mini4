<template>
  <div>
    <about-modal />
    <div class="flex items-center justify-between p-4">
      <div class="flex-1"></div>
      <div class="flex-1 text-center">
        <button class="flex-1 zzBtn1" @click="handleAbout">About</button>
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
    handleAbout() {
      this.$store.commit('ing/setAbout', true)
      this.$ga.screenview('About')
    },
  },
}
</script>
