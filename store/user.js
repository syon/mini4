import debug from 'debug'
import firebase from 'firebase/app'

const dg = debug('@:user')

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
  prepare({ commit, dispatch, state }) {
    dg('#prepare')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch('login', user)
      } else {
        dispatch('prepareFirebaseAuth')
      }
    })

    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result) {
          if (result.user) {
            alert('#getRedirectResult' + result.user.displayName)
          }
        }
      })
      .catch(function (error) {
        // // Handle Errors here.
        // const errorCode = error.code
        // const errorMessage = error.message
        // // The email of the user's account used.
        // const email = error.email
        // // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential
        // // ...
        console.log({ error })
        alert('error:' + error.message)
      })
  },
  prepareFirebaseAuth({ dispatch }) {
    return new Promise((resolve) => {
      dg('#prepareFirebaseAuth')
      require('firebaseui-ja/dist/firebaseui.css')
      const firebaseui = require('firebaseui-ja')
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(firebase.auth())
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
    firebase
      .auth()
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
