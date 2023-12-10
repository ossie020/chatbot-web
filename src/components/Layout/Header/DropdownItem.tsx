import { Space } from 'antd'

import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  text: string
}

export function DropdownItem({ icon, text }: Props) {
  return (
    <div className="flex h-9 items-center text-gray-500 hover:text-pink-500">
      <Space className="svg-h-5 svg-w-5">
        {icon}
        <p>{text}</p>
      </Space>
    </div>
  )
}
