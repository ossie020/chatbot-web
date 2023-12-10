import { HiChevronLeft, HiOutlineStar, HiStar } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { dislikeCharacter, likeCharacter } from '@/api/user'
import { useCharacterStore } from '@/stores/character'

export function Header() {
  const navigate = useNavigate()
  const { character, setCharacter } = useCharacterStore()

  function toggleStar() {
    if (character.is_liked) {
      setCharacter({ ...character, is_liked: 0 })
      dislikeCharacter(character.id!)
      return
    }

    likeCharacter(character.id!)
    setCharacter({ ...character, is_liked: 1 })
  }

  return (
    <div className="flex-between border-1px border-#D1D5DB h-full w-full rounded-tl-xl rounded-tr-xl bg-white px-4 py-2.5 dark:bg-gray-800">
      <HiChevronLeft onClick={() => navigate(-1)} className="h-7 w-7 hover:cursor-pointer" />
      <div className="font-600">{character.name}</div>
      <div onClick={toggleStar} className="h-7 w-7 hover:cursor-pointer">
        {character.is_liked ? (
          <HiStar className="h-full w-full text-pink-500" />
        ) : (
          <HiOutlineStar className="h-full w-full" />
        )}
      </div>
    </div>
  )
}
