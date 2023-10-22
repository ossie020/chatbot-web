import { Space } from 'antd'
import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  text: string
}

export function DropdownItem({ icon, text }: Props) {
  return (
    <div className="h-9 flex items-center text-gray-500 hover:text-pink-500">
      <Space className="svg-h-5 svg-w-5">
        {icon}
        <p>{text}</p>
      </Space>
    </div>
  )
}
