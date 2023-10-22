import { Button, Space } from 'antd'
import { HiUserCircle } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'

export function LoginButton() {
  const { setLoginModalOpen } = useAppStore()

  return (
    <Button ghost type="primary" shape="round" className="h-12 flex items-center" onClick={() => setLoginModalOpen(true)}>
      <Space>
        <HiUserCircle className="h-6 w-6" />
        <p className="font-bold">Login</p>
      </Space>
    </Button>
  )
}
