import { Button, Space } from 'antd'
import { HiUserCircle } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'
import { LoginModalState } from '@/utils/enums'

export function LoginButton() {
  const { setLoginModalState } = useAppStore()

  return (
    <Button
      ghost
      type="primary"
      shape="round"
      className="flex h-12 items-center"
      onClick={() => setLoginModalState(LoginModalState.LOGIN)}
    >
      <Space>
        <HiUserCircle className="h-6 w-6" />
        <p className="font-bold">Login</p>
      </Space>
    </Button>
  )
}
