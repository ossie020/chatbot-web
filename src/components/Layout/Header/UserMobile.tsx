import { HiMenu, HiUserCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { useAppStore } from '@/stores/app'
import { LoginModalState } from '@/utils/enums'

export function UserMobile() {
  const navigate = useNavigate()
  const { user, setLoginModalState } = useAppStore()

  function open() {
    setLoginModalState(LoginModalState.LOGIN)
  }

  function toUserPage() {
    navigate('')
  }

  return (
    <div className="h-7 w-7 text-pink-500">
      {user.uid ? (
        <HiMenu className="h-full w-full" onClick={toUserPage} />
      ) : (
        <HiUserCircle className="h-full w-full" onClick={open} />
      )}
    </div>
  )
}
