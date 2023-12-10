import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, OAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAHOdlvYZ1F6SeBetlKIuzWGTEj1QunmVY',
  authDomain: 'gensoul-e5306.firebaseapp.com',
  projectId: 'gensoul-e5306',
  storageBucket: 'gensoul-e5306.appspot.com',
  messagingSenderId: '731726780006',
  appId: '1:731726780006:web:5f32670f1ba4afbbe7bfa7',
  measurementId: 'G-YR3GBL7CME',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
export const appleProvider = new OAuthProvider('apple.com')
