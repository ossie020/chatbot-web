import { HiChevronLeft, HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { dislikeCharacter, likeCharacter } from '@/api/user'
import { useCharacterStore } from '@/stores/character'
import { useChatStore } from '@/stores/chat'

export function Header() {
  const navigate = useNavigate()
  const { character, setCharacter } = useCharacterStore()
  const { reset } = useChatStore()

  function toggleStar() {
    if (character.is_liked) {
      setCharacter({ ...character, is_liked: 0 })
      dislikeCharacter(character.id!)
      return
    }

    likeCharacter(character.id!)
    setCharacter({ ...character, is_liked: 1 })
  }

  function toHome() {
    reset()
    navigate(-1)
  }

  return (
    <div className="h-full w-full rounded-tl-xl rounded-tr-xl border-b border-b-gray-200 bg-white px-4 py-2.5 dark:border-b-gray-500 dark:bg-gray-800">
      <div className="flex-between max-w-540px mx-auto h-full">
        <HiChevronLeft
          onClick={toHome}
          className="h-7 w-7 hover:cursor-pointer"
        />
        <div className="text-center">
          <div className="font-600">{character.name}</div>
          <div className="font-500 text-12px text-gray-500">
            by {character.creator?.name}
          </div>
        </div>
        <div onClick={toggleStar} className="h-7 w-7 hover:cursor-pointer">
          {character.is_liked ? (
            <HiHeart className="h-full w-full text-pink-500" />
          ) : (
            <HiOutlineHeart className="h-full w-full" />
          )}
        </div>
      </div>
    </div>
  )
}
