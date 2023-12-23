import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'

import { useMount } from './hooks'
import { router } from './routes'
import { useAppStore } from './stores/app'
import { darkTheme, theme } from './utils/antd'

export default function App() {
  const { init, darkMode } = useAppStore()

  useMount(init)

  return (
    <ConfigProvider theme={darkMode ? darkTheme : theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
