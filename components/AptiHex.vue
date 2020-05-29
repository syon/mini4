<template>
  <div class="AptiHex">
    <svg v-if="color" :fill="color" viewBox="0 0 110 120">
      <path
        d="M105.047 32.369L56.155 4.43a2.323 2.323 0 00-2.31 0L4.953 32.369a2.328 2.328 0 00-1.173 2.02V85.61c0 .834.447 1.607 1.173 2.021l48.892 27.938a2.319 2.319 0 002.31 0l48.892-27.938a2.328 2.328 0 001.173-2.02V34.39a2.328 2.328 0 00-1.173-2.021z"
      />
    </svg>
    <div class="xx-type zzAnton relative">{{ type }}</div>
  </div>
</template>

<script>
export default {
  props: { type: { type: String, default: '' } },
  computed: {
    color() {
      switch (this.type) {
        case 'St':
          return '#ea4339'
        case 'U':
          return '#f5ec57'
        case 'Co':
          return '#54a9ed'
        case 'Kp':
          return '#8ef153'
        case 'J':
          return '#d23ef0'
      }
      return null
    },
  },
}
</script>

<style lang="less" scoped>
.AptiHex {
  // position: relative;
  width: 16px;
  height: 16px;
  svg {
    position: absolute;
    z-index: 0;
    width: 16px;
    height: 16px;
    stroke: black;
    stroke-width: 5px;
  }
  .xx-type {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: black;
    font-size: 0.6rem;
    letter-spacing: 0;
    line-height: 1;
  }
}
</style>
