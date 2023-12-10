import { Input } from 'antd'
import { HiSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export function SearchInput() {
  const navigate = useNavigate()

  return (
    <Input
      placeholder="Search"
      prefix={<HiSearch className="h-5 w-5 text-gray-500" />}
      className="lg:w-360px h-full rounded-full bg-gray-50 dark:border-gray-500 dark:bg-gray-700"
      onFocus={() => navigate('/search')}
    />
  )
}
