<template>
  <div class="MachineTabArea">
    <div class="flex">
      <button class="flex-1 center" @click="handleClickTab('M1')">M1</button>
      <button class="flex-1 center" @click="handleClickTab('M2')">M2</button>
      <button class="flex-1 center" @click="handleClickTab('M3')">M3</button>
      <button class="flex-1 center" @click="handleClickTab('M4')">M4</button>
      <button class="flex-1 center" @click="handleClickTab('M5')">M5</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClickTab(tab) {
      this.$store.commit('ing/setTab', tab)
    },
  },
}
</script>
