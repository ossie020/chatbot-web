import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import Magic from '@/assets/svg/magic.svg'

export function CreateButton() {
  const navigate = useNavigate()

  function toCreate() {
    navigate('/character')
  }

  return (
    <Button
      onClick={toCreate}
      className="flex-center from-#E74694 to-#FFCD83 h-16 w-full rounded-full border-none bg-gradient-to-r"
    >
      <img src={Magic} />
      <p className="text-18px ml-2 font-bold text-white">Create New Character</p>
    </Button>
  )
}
