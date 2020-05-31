<template>
  <div class="UserArea m-2">
    <pre>{{ user }}</pre>
    <div v-if="user.uid" class="zzBg-checker rounded p-2">
      <div class="UserArea-inner">
        <div class="flex items-center">
          <img class="h-8 w-8 rounded-full" :src="user.photoURL" alt="avatar" />
          <span>{{ user.displayName }}</span>
          <button class="border rounded" @click="handleLogout">logout</button>
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
