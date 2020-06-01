import debug from 'debug'
import FirebaseClient from '@/models/FirebaseClient'

const dg = debug('@:user')
const firebase = FirebaseClient.firebase
const firebaseAuth = FirebaseClient.auth

export const state = () => ({
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
})

export const getters = {}

export const mutations = {
  SET_Ready(state, bool) {
    state.ready = bool
  },
  SET_User(state, { uid, displayName, email, photoURL }) {
    state.uid = uid
    state.displayName = displayName
    state.email = email
    state.photoURL = photoURL
  },
  RESET_User(state) {
    state.uid = ''
    state.displayName = ''
    state.email = ''
    state.photoURL = ''
  },
}

export const actions = {
  async prepare({ commit, dispatch, state }) {
    dg('#prepare')
    await firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch('login', user)
      } else {
        dispatch('prepareFirebaseAuth')
      }
    })
  },
  prepareFirebaseAuth({ dispatch }) {
    return new Promise((resolve) => {
      dg('#prepareFirebaseAuth')
      const firebaseui = require('firebaseui-ja')
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebaseAuth)
      ui.start('#firebaseui-auth-container', {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        signInFlow: 'popup',
        signInSuccessUrl: process.env.BASE_URL,
        callbacks: {
          signInSuccessWithAuthResult(authResult, redirectUrl) {
            dg('#signInSuccessWithAuthResult')
            dg('REDIRECT', redirectUrl)
            dispatch('login', authResult.user)
            return true // whether redirect
          },
          uiShown() {
            resolve()
          },
        },
      })
    })
  },
  login({ commit }, payload) {
    dg('#login', payload)
    commit('SET_User', payload)
  },
  logout({ commit, dispatch }) {
    dg('#logout')
    firebaseAuth
      .signOut()
      .then(() => {
        dg('ログアウトしました')
        commit('RESET_User')
        dispatch('prepare')
      })
      .catch((error) => {
        dg(`ログアウト時にエラーが発生しました (${error})`)
      })
  },
}
