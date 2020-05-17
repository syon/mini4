import debug from 'debug'
import createPersistedState from 'vuex-persistedstate'

const dg = debug('@:localStorage')

export default ({ store }) => {
  window.onNuxtReady(() => {
    dg('[#onNuxtReady] createPersistedState')
    createPersistedState({
      paths: ['ing', 'recipe', 'owns'],
      rehydrated: (store) => {
        store.dispatch('ing/refresh')
      },
    })(store)
  })
}
