import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import Magic from '@/assets/svg/magic.svg'
import { useAppStore } from '@/stores/app'
import { useCharacterStore } from '@/stores/character'
import { LoginModalState } from '@/utils/enums'

export function CreateButton() {
  const navigate = useNavigate()
  const { user, setLoginModalState } = useAppStore()
  const { setCharacter } = useCharacterStore()

  function toCreate() {
    if (!user.uid) {
      setLoginModalState(LoginModalState.LOGIN)
      return
    }

    setCharacter({})
    navigate('/character')
  }

  return (
    <Button
      onClick={toCreate}
      className="flex-center from-#E74694 to-#FFCD83 h-16 w-full rounded-full border-none bg-gradient-to-r"
    >
      <img src={Magic} />
      <p className="text-18px ml-2 font-bold text-white">
        Create New Character
      </p>
    </Button>
  )
}
