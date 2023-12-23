import { useNavigate } from 'react-router-dom'

import { Logo } from '@/components/Logo'

import { LoginModal } from './LoginModal'
import { PlanButton } from './PlanButton'
import { SearchInput } from './SearchInput'
import { ThemeButton } from './ThemeButton'
import { UserDesktop } from './UserDesktop'
import { UserMobile } from './UserMobile'

export function Header() {
  const navigate = useNavigate()

  return (
    <div className="flex-between h-full border-b border-b-gray-200 bg-white px-4 py-3 dark:border-b-gray-500 dark:bg-gray-800">
      <div
        className="hover:cursor-pointer sm:mr-6 lg:mr-4"
        onClick={() => navigate('/')}
      >
        <Logo />
      </div>

      <div className="flex h-full items-center sm:gap-x-6 lg:gap-x-3">
        <SearchInput />
        <ThemeButton />
        <PlanButton />

        <div className="sm:hidden lg:inline">
          <UserDesktop />
        </div>
        <div className="lg:hidden">
          <UserMobile />
        </div>
      </div>

      <LoginModal />
    </div>
  )
}
