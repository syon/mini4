import debug from 'debug'
import axios from 'axios'
import FirebaseClient from '@/models/FirebaseClient'
import DB from '@/models/DB'

const dg = debug('@:user')
const firebase = FirebaseClient.firebase
const firebaseAuth = FirebaseClient.auth
const LOGIN_WEBHOOK_URL = process.env.LOGIN_WEBHOOK_URL

dg('LOGIN_WEBHOOK_URL', LOGIN_WEBHOOK_URL)

export const state = () => ({
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  diagnosis: false,
})

export const getters = {
  isLogin(state) {
    return !!state.uid
  },
  isDiagnosis(state) {
    return !!state.uid && state.diagnosis
  },
}

export const mutations = {
  SET_Ready(state, bool) {
    state.ready = bool
  },
  SET_User(state, { uid, displayName, email, photoURL, diagnosis }) {
    state.uid = uid
    state.displayName = displayName
    state.email = email
    state.photoURL = photoURL
    state.diagnosis = diagnosis
  },
  RESET_User(state) {
    state.uid = ''
    state.displayName = ''
    state.email = ''
    state.photoURL = ''
  },
}

export const actions = {
  async prepare({ dispatch, getters }) {
    dg('#prepare')
    await firebaseAuth.onAuthStateChanged((user) => {
      dg('#prepare/onAuthStateChanged', user)
      if (user) {
        dispatch('login', user)
      }
    })
    if (!getters.isLogin) {
      await dispatch('prepareFirebaseAuth')
    }
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
        // signInSuccessUrl: process.env.BASE_URL,
        callbacks: {
          async signInSuccessWithAuthResult(authResult, redirectUrl) {
            dg('#signInSuccessWithAuthResult')
            dg('REDIRECT', redirectUrl)
            const user = extractUserSchema(authResult.user)
            dispatch('login', user)
            await emitLoginWebhook(user)
            return false // whether redirect
          },
          uiShown() {
            resolve()
          },
        },
      })
    })
  },
  async login({ commit }, payload) {
    dg('#login', payload)
    const { uid } = payload
    const doc = await DB.getDoc(`users/${uid}`)
    if (doc) {
      payload.diagnosis = doc.diagnosis
    }
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

function extractUserSchema(arg) {
  const { uid, displayName, email, photoURL, diagnosis } = arg
  return { uid, displayName, email, photoURL, diagnosis }
}

async function emitLoginWebhook(user) {
  if (!LOGIN_WEBHOOK_URL || !user) return
  const data = {
    embeds: [
      {
        title: user.displayName,
        thumbnail: {
          url: user.photoURL,
        },
        fields: [
          {
            name: 'Email',
            value: user.email,
          },
          {
            name: 'UID',
            value: user.uid,
          },
        ],
      },
    ],
  }
  await axios.post(LOGIN_WEBHOOK_URL, data)
}
