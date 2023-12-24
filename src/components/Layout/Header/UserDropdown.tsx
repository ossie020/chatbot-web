import { Button, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import { HiChevronDown, HiLogout, HiUserCircle } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'

import { AccountModal } from './AccountModal'
import { DropdownItem } from './DropdownItem'
import { SignoutModal } from './SignoutModal'

export function UserDropdown() {
  const { signOut, user } = useAppStore()
  const [signOutModalOpen, setSignOutModalOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const items: MenuProps['items'] = [
    {
      label: <DropdownItem icon={<HiUserCircle />} text="Account" />,
      key: 'account',
      onClick: () => setAccountOpen(true),
    },
    {
      type: 'divider',
    },
    {
      label: <DropdownItem icon={<HiLogout />} text="Sign Out" />,
      key: 'signout',
      onClick: () => setSignOutModalOpen(true),
    },
  ]

  return (
    <>
      <Dropdown menu={{ items }}>
        <Button ghost type="primary" shape="round" className="h-12">
          <Space>
            <p className="text-16px font-bold">
              {user.user_name && user.user_name.length <= 10
                ? user.user_name
                : `${user.user_name?.toString().substring(0, 8)}...`}
            </p>
            <HiChevronDown className="h-6 w-6" />
          </Space>
        </Button>
      </Dropdown>

      <SignoutModal
        open={signOutModalOpen}
        onCancle={() => setSignOutModalOpen(false)}
        onConfirm={() => {
          signOut()
          setSignOutModalOpen(false)
        }}
      />

      <AccountModal open={accountOpen} close={() => setAccountOpen(false)} />
    </>
  )
}
