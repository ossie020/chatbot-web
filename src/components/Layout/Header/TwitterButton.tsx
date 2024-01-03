import { Button } from 'antd'
import { FaTwitter } from 'react-icons/fa'

export function TwitterButton() {
  return (
    <Button
      ghost
      type="primary"
      shape="circle"
      className="flex-center !dark:border-gray-500 h-12 w-12 !border-gray-200 p-3 sm:hidden lg:flex"
      href="https://twitter.com/JuicyAI2024"
      target="_blank"
    >
      <FaTwitter className="h-6 w-6" />
    </Button>
  )
}
