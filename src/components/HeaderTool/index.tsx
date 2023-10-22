import { LoginButton } from './LoginButton'
import { LoginModal } from './LoginModal'
import { SearchInput } from './SearchInput'
import { ThemeButton } from './ThemeButton'
import { UserDropdown } from './UserDropdown'
import { VersionButton } from './VersionButton'

export function HeaderTool() {
  return (
    <>
      <div className="h-full flex items-center gap-x-3">
        <SearchInput />
        <ThemeButton />
        <VersionButton />
        <LoginButton />
        <UserDropdown />
      </div>

      <LoginModal />
    </>
  )
}
