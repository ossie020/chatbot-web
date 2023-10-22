import { Input } from 'antd'
import { HiSearch } from 'react-icons/hi'

export function SearchInput() {
  return (
    <Input
      prefix={<HiSearch className="h-5 w-5 text-gray-500" />}
      className="h-full w-360px rounded-full"
    />
  )
}
