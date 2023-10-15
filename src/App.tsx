import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'

import { theme } from './utils/antd'
import { router } from './routes'

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
