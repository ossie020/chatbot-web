import { HiArrowCircleUp } from 'react-icons/hi'
import { Input } from 'antd'

export function SendBar() {
  return (
    <div className="h-60px w-full flex-between py-4">
      <Input placeholder="Type your message" className="h-9 rounded-full" />
      <HiArrowCircleUp className="ml-3 h-11 w-11 text-pink-500" />
    </div>
  )
}
