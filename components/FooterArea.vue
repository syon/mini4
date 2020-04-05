<template>
  <div>
    <about-modal />
    <div class="text-center py-2 px-4">
      <button class="zzBtn1" @click="handleAbout">About</button>
    </div>
  </div>
</template>

<script>
import AboutModal from '@/components/AboutModal'

export default {
  components: {
    AboutModal
  },
  methods: {
    handleAbout() {
      this.$store.commit('ing/setAbout', true)
    }
  }
}
</script>
