<template>
  <div class="UserArea">
    <div v-if="user.uid" class="zzBg-checker rounded p-2">
      <div class="UserArea-inner">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img
              class="h-8 w-8 rounded-full mr-2"
              :src="user.photoURL"
              alt="avatar"
            />
            <span>{{ user.displayName }}</span>
          </div>
          <button class="border rounded px-2" @click="handleLogout">
            logout
          </button>
        </div>
      </div>
    </div>

    <firebase-login v-if="!user.uid" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FirebaseLogin from '@/components/FirebaseLogin'

export default {
  components: {
    FirebaseLogin,
  },
  computed: {
    ...mapState('user', {
      user: (state) => state,
    }),
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('user/logout')
      this.$store.commit('ing/reset')
      window.location.reload()
    },
  },
}
</script>

<style lang="less" scoped>
.UserArea {
  .zzBg-checker {
    border: 1px solid #b5babd;
  }

  .UserArea-inner {
    position: relative;
    z-index: 5;
  }
}
</style>
