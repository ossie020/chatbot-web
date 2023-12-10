import { Button, Space } from 'antd'
import { HiUserCircle } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'

export function LoginButton() {
  const { setOpen } = useAppStore()

  return (
    <Button
      ghost
      type="primary"
      shape="round"
      className="flex h-12 items-center"
      onClick={() => setOpen(true)}
    >
      <Space>
        <HiUserCircle className="h-6 w-6" />
        <p className="font-bold">Login</p>
      </Space>
    </Button>
  )
}
