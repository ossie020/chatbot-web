import { Button } from 'antd'
import { HiMoon, HiSun } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'

export function ThemeButton() {
  const { darkMode, toggleDark } = useAppStore()

  return (
    <Button
      ghost
      type="primary"
      shape="circle"
      className="flex-center !dark:border-gray-500 h-12 w-12 !border-gray-200 p-3 sm:hidden lg:flex"
      onClick={toggleDark}
    >
      {darkMode ? (
        <HiMoon className="h-6 w-6" />
      ) : (
        <HiSun className="h-6 w-6" />
      )}
    </Button>
  )
}
