import { SearchInput } from './SearchInput'
import { ThemeButton } from './ThemeButton'
import { VersionButton } from './VersionButton'
import { LoginButton } from './LoginButton'
import { UserDropdown } from './UserDropdown'
import { LoginModal } from './LoginModal'
import { Logo } from '@/components/Logo'

export function Header() {
  return (
    <div className="h-full flex-between border border-b-gray-200 bg-white px-4 py-3">
      <Logo />

      <div className="h-full flex items-center gap-x-3">
        <SearchInput />
        <ThemeButton />
        <VersionButton />
        <LoginButton />
        <UserDropdown />
      </div>

      <LoginModal />
    </div>
  )
}
