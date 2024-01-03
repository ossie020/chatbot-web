import { Button } from 'antd'
import { FaDiscord } from 'react-icons/fa'

export function DiscordButton() {
  return (
    <Button
      ghost
      type="primary"
      shape="circle"
      className="flex-center !dark:border-gray-500 h-12 w-12 !border-gray-200 p-3 sm:hidden lg:flex"
      href="https://discord.com/invite/DvttVEuJbA"
      target="_blank"
    >
      <FaDiscord className="h-6 w-6" />
    </Button>
  )
}
