<template>
  <div>
    <about-modal />
    <div class="flex items-center justify-center p-4">
      <button class="zzBtn1" @click="handleAbout">About</button>
    </div>
  </div>
</template>

<script>
import AboutModal from '@/components/AboutModal'

export default {
  components: {
    AboutModal,
  },
  methods: {
    handleAbout() {
      this.$store.commit('ing/setAbout', true)
      this.$ga.screenview('About')
    },
  },
}
</script>
