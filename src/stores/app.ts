import { useState } from 'react'
import { createGlobalStore } from 'hox'

export const [useAppStore, getAppStore] = createGlobalStore(() => {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return {
    loginModalOpen,
    setLoginModalOpen,
  }
})
