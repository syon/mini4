<template>
  <div class="IndexPage" :class="{ isMobile, isDesktop: !isMobile }">
    <div class="flex">
      <div class="Simulator-Frame">
        <simulator />
      </div>
      <div class="Extra flex-1">
        <div class="p-4">
          Extra Content
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Simulator from '@/components/Simulator'

export default {
  components: {
    Simulator,
  },
  asyncData(context) {
    const deviceType = context.$ua.deviceType()
    console.log({ deviceType })
    const isMobile = deviceType === 'smartphone'
    context.store.commit('ing/setMobile', isMobile)
    return { isMobile }
  },
  mounted() {
    this.$ga.screenview('Index')
  },
}
</script>

<style lang="less" scoped>
.IndexPage {
  margin: auto;
  .Simulator-Frame {
    min-width: 320px;
    max-width: 375px;
    min-height: 100vh;
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.5);
  }
}

// Mobile
@media screen and (max-width: 480px) {
  .IndexPage {
    .Simulator-Frame {
      margin: auto;
    }
    .Extra {
      display: none;
    }
  }
}

// Mobile & Landscape
@media screen and (max-width: 896px) and (orientation: landscape) {
  .IndexPage {
    .Simulator-Frame {
      margin: auto;
    }
    .Extra {
      display: none;
    }
  }
}
</style>
