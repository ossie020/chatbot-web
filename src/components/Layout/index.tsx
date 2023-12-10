import { ConfigProvider } from 'antd'
import { Outlet } from 'react-router-dom'

import { useMount } from '@/hooks'
import { useAppStore } from '@/stores/app'
import { darkTheme, theme } from '@/utils/antd'

import { Header } from './Header'

export function Layout() {
  const { init, darkMode } = useAppStore()

  useMount(init)

  return (
    <ConfigProvider theme={darkMode ? darkTheme : theme}>
      <div className="z-9 lg:h-18 sm:h-15 fixed left-0 right-0 top-0">
        <Header />
      </div>
      <div className="mt-18 lg:w-1024px md:w-768px sm:w-390px xl:w-1440px mx-auto">
        <Outlet />
      </div>
    </ConfigProvider>
  )
}
