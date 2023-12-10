import { HiMenu, HiUserCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { useAppStore } from '@/stores/app'

export function UserMobile() {
  const navigate = useNavigate()
  const { user, setOpen } = useAppStore()

  function open() {
    setOpen(true)
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
