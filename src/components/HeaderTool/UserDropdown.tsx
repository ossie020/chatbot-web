import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'
import { HiChevronDown, HiClock, HiLogout, HiStar, HiUserCircle, HiUserGroup } from 'react-icons/hi'
import { DropdownItem } from './DropdownItem'

const items: MenuProps['items'] = [
  {
    label: <DropdownItem icon={<HiUserCircle />} text="Account" />,
    key: 'account',
  },
  {
    label: <DropdownItem icon={<HiUserGroup />} text="My Characters" />,
    key: 'characters',
  },
  {
    label: <DropdownItem icon={<HiClock />} text="Recently" />,
    key: 'recently',
  },
  {
    label: <DropdownItem icon={<HiStar />} text="Favourite" />,
    key: 'favourite',
  },
  {
    type: 'divider',
  },
  {
    label: <DropdownItem icon={<HiLogout />} text="Sign Out" className="hover:text-red-500" />,
    key: 'signout',
  },
]

export function UserDropdown() {
  return (
    <Dropdown menu={{ items }}>
      <Button ghost type="primary" shape="round" className="h-12">
        <Space>
          <p className="font-bold">Yilang</p>
          <HiChevronDown className="h-6 w-6" />
        </Space>
      </Button>
    </Dropdown>
  )
}
