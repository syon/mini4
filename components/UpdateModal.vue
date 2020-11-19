<template>
  <div v-if="isUpdate" class="zz-modal" @click.self="handleModal">
    <div class="zz-modalPanel zzBg-gray3">
      <div class="zz-headblack px-1">
        Update
      </div>
      <div class="zz-modalBody p-2">
        <div class="pb-4">
          <div class="zzCategoryHeaderBig">
            更新履歴
          </div>
          <table class="p-2 zz-text06">
            <tbody>
              <tr v-for="(line, i) in changeLog" :key="i">
                <td class="align-top">{{ line.date }}</td>
                <td>{{ line.text }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import changeLog from '@/store/changeLog.json'

export default {
  computed: {
    ...mapState('ing', {
      isUpdate: (state) => state.isUpdate,
    }),
    changeLog() {
      return changeLog
    },
  },
  methods: {
    handleModal() {
      this.$store.commit('ing/setUpdate', false)
    },
  },
}
</script>

<style lang="less" scoped></style>
