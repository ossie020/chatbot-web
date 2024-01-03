import { message } from 'antd'
import { createGlobalStore } from 'hox'
import { useRef, useState } from 'react'

import { Tag, listTag } from '@/api/character'
import { type User, UserPlan, getUser, getUserPlan } from '@/api/user'
import { calcDays, initDarkMode, toggleDarkMode } from '@/utils'
import { KEYS } from '@/utils/constants'
import { LoginModalState, Plan, PlanNameMapping } from '@/utils/enums'
import {
  exit,
  registerOrSignIn,
  sendResetEmail,
  signInByApple,
  signInByGoogle,
} from '@/utils/firebase'
import { createCookie } from '@/utils/request'

export const [useAppStore, getAppStore] = createGlobalStore(() => {
  const allTagsRef = useRef<Tag[]>([])
  const [allTagList, setAllTagList] = useState<Tag[]>([])
  const [user, setUser] = useState<Partial<User>>({})
  const [plan, setPlan] = useState<Partial<UserPlan>>({})
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [loginModalState, setLoginModalState] = useState<LoginModalState>(
    LoginModalState.CLOSED,
  )
  const [planOpen, setPlanOpen] = useState(false)

  const planName = PlanNameMapping[plan?.plan_id || Plan.FREE]
  const planRemainDays =
    plan && plan.plan_id !== Plan.FREE && plan.expired === false
      ? calcDays(Date.now(), new Date(plan!.end_time!).getTime())
      : 0

  async function init() {
    try {
      listTag().then((data) => {
        allTagsRef.current = data
        setAllTagList(data)
      })

      const _user = await getUser()
      setUser(_user)

      getUserPlan().then((data) => setPlan(data))
    } finally {
      const currentMode = initDarkMode()
      setDarkMode(currentMode)
    }
  }

  function toggleDark() {
    toggleDarkMode(darkMode)
    setDarkMode(!darkMode)
  }

  async function signInWithGoogle() {
    setLoading(true)

    try {
      const idToken = await signInByGoogle()
      const cookie = await createCookie(idToken)
      localStorage.setItem(KEYS.COOKIE, cookie)

      const _user = await getUser()
      setUser(_user)
      setLoginModalState(LoginModalState.LOGIN)
      window.location.reload()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithApple() {
    setLoading(true)

    try {
      const idToken = await signInByApple()
      const cookie = await createCookie(idToken)
      localStorage.setItem(KEYS.COOKIE, cookie)

      const _user = await getUser()
      setUser(_user)
      setLoginModalState(LoginModalState.LOGIN)
      window.location.reload()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithEmail(email: string, password: string) {
    setLoading(true)

    try {
      const idToken = await registerOrSignIn(email, password)
      if (!idToken) {
        setLoginModalState(LoginModalState.REGISTER)
        return
      }

      const cookie = await createCookie(idToken)
      localStorage.setItem(KEYS.COOKIE, cookie)

      const _user = await getUser()
      setUser(_user)
      setLoginModalState(LoginModalState.LOGIN)
      window.location.reload()
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function resetPassword(email: string) {
    setLoading(true)

    try {
      await sendResetEmail(email)
      setLoginModalState(LoginModalState.RESET)
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    localStorage.removeItem(KEYS.COOKIE)
    setUser({})
    exit()
  }

  return {
    darkMode,
    toggleDark,
    loginModalState,
    setLoginModalState,
    user,
    setUser,
    plan,
    planName,
    planRemainDays,
    planOpen,
    setPlanOpen,
    init,
    signInWithGoogle,
    signInWithApple,
    signInWithEmail,
    resetPassword,
    signOut,
    loading,
    allTagsRef,
    allTagList,
  }
})
