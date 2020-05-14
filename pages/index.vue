<template>
  <div class="IndexPage">
    <div class="flex">
      <div class="Simulator-Frame">
        <simulator />
      </div>
      <!-- <div class="Extra flex-1">
        <div class="p-4">
          Extra Content
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Simulator from '@/components/Simulator'

export default {
  components: {
    Simulator,
  },
  mounted() {
    this.$store.dispatch('ing/refresh')
    this.$ga.screenview('Index')
  },
}
</script>

<style lang="less" scoped>
.IndexPage {
  margin: auto;
  .Simulator-Frame {
    margin: auto;
    width: 375px;
    min-width: 375px;
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
