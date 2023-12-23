import { initializeApp } from 'firebase/app'
import {
  AuthErrorCodes,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

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
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
const appleProvider = new OAuthProvider('apple.com')

export async function signInByGoogle() {
  try {
    const { user } = await signInWithPopup(auth, googleProvider)
    const idToken = await getIdToken(user)
    return idToken
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function signInByApple() {
  try {
    const { user } = await signInWithPopup(auth, appleProvider)
    const idToken = await getIdToken(user)
    return idToken
  } catch (error: any) {
    throw new Error(error.message)
  }
}

async function singInByEmail(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await getIdToken(user)
    return idToken
  } catch (error: any) {
    if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      throw new Error('invalid username or password')
    } else {
      throw new Error(error.message)
    }
  }
}

async function register(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(user)
  return ''
}

export async function registerOrSignIn(email: string, password: string) {
  try {
    return await register(email, password)
  } catch (error: any) {
    if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
      return await singInByEmail(email, password)
    } else {
      throw new Error(error.message)
    }
  }
}

export async function exit() {
  return await signOut(auth)
}

export async function sendResetEmail(email: string) {
  await sendPasswordResetEmail(auth, email)
}
