import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/storage'

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
}

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()

const auth = firebase.auth()
const firestore = firebase.firestore()
// const storage = firebase.storage()

export default {
  firebase,
  app,
  auth,
  firestore,
  // storage,
}
