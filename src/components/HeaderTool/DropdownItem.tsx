import { Space } from 'antd'
import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  text: string
  className?: string
}

export function DropdownItem({ icon, text, className }: Props) {
  return (
    <div className={`h-9 flex items-center text-gray-500 hover:text-black ${className}`}>
      <Space className="svg-h-5 svg-w-5">
        {icon}
        <p>{text}</p>
      </Space>
    </div>
  )
}
