import { HiOutlineFire, HiOutlineHeart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Character } from '@/api/character'
import { useAppStore } from '@/stores/app'
import { useCharacterStore } from '@/stores/character'
import { LoginModalState } from '@/utils/enums'

type Props = Character & {
  rank: number
}

export function RestItem(character: Props) {
  const { user, setLoginModalState } = useAppStore()
  const { id, avatar, name, talks_count, likes_count, rank } = character

  const navigate = useNavigate()
  const { setCharacter } = useCharacterStore()

  function toChat() {
    if (!user.uid) {
      setLoginModalState(LoginModalState.LOGIN)
      return
    }

    setCharacter(character)
    navigate(`/character/${id}/chat`)
  }

  return (
    <div
      onClick={toChat}
      className="flex-between w-full rounded-lg hover:cursor-pointer"
    >
      <div className="flex items-center">
        <p className="text-sm font-bold text-pink-500">#{rank}</p>
        <img src={avatar} className="ml-3 h-5 w-5 object-cover" />
        <p className="ml-1 line-clamp-1 text-xs dark:text-white">{name}</p>
      </div>
      <div className="flex items-center gap-x-1 text-xs text-pink-500">
        <HiOutlineFire />
        <p>{talks_count}</p>
        <HiOutlineHeart />
        <p>{likes_count}</p>
      </div>
    </div>
  )
}
