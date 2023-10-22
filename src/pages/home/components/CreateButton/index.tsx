import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import Magic from '@/assets/svg/magic.svg'

export function CreateButton() {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate('/character')}
      className="h-16 w-full flex-center rounded-full border-none from-#E74694 to-#FFCD83 bg-gradient-to-r"
    >
      <img src={Magic} />
      <p className="ml-2 text-18px font-bold text-white">Create New Character</p>
    </Button>
  )
}
