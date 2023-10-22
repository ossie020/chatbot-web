import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { HoxRoot } from 'hox'

import { theme } from './utils/antd'
import { router } from './routes'

export default function App() {
  return (
    <HoxRoot>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </HoxRoot>
  )
}
