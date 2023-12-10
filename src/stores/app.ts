import * as firebase from 'firebase/auth'
import { createGlobalStore } from 'hox'
import { useState } from 'react'

import { getUser, type User } from '@/api/user'
import { initDarkMode, toggleDarkMode } from '@/utils'
import { KEYS } from '@/utils/constants'
import { auth, googleProvider } from '@/utils/firebase'
import { createCookie } from '@/utils/request'

export const [useAppStore, getAppStore] = createGlobalStore(() => {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<Partial<User>>({})
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  async function init() {
    try {
      const _user = await getUser()

      if (_user.uid) {
        setUser(_user)
      }
    } finally {
      const currentMode = initDarkMode()
      setDarkMode(currentMode)
    }
  }

  function toggleDark() {
    toggleDarkMode(darkMode)
    setDarkMode(!darkMode)
  }

  async function signInByGoogle() {
    setLoading(true)

    const { user } = await firebase.signInWithPopup(auth, googleProvider)
    const idToken = await firebase.getIdToken(user)

    const cookie = await createCookie(idToken)
    localStorage.setItem(KEYS.COOKIE, cookie)

    const _user = await getUser()
    setUser(_user)

    setLoading(false)
    setOpen(false)

    window.location.reload()
  }

  async function signInByPassword(email: string, password: string) {
    setLoading(true)

    const { user } = await firebase.signInWithEmailAndPassword(auth, email, password)
    const idToken = await firebase.getIdToken(user)

    const cookie = await createCookie(idToken)
    localStorage.setItem(KEYS.COOKIE, cookie)

    const _user = await getUser()
    setUser(_user)

    setLoading(false)
    setOpen(false)

    window.location.reload()
  }

  async function signOut() {
    localStorage.removeItem(KEYS.COOKIE)
    setUser({})

    firebase.signOut(auth)
  }

  return {
    darkMode,
    toggleDark,
    open,
    setOpen,
    user,
    init,
    signInByGoogle,
    signInByPassword,
    signOut,
    loading,
  }
})
