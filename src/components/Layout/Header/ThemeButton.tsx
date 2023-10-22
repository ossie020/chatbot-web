import { Button } from 'antd'
import { HiSun } from 'react-icons/hi'

export function ThemeButton() {
  return (
    <Button shape="circle" className="flex-center h-12 w-12 p-3">
      <HiSun className="h-5 w-5" />
    </Button>
  )
}
