import { useAppStore } from '@/stores/app'

import { LoginButton } from './LoginButton'
import { UserDropdown } from './UserDropdown'

export function UserDesktop() {
  const { user } = useAppStore()

  return user.uid ? <UserDropdown /> : <LoginButton />
}
