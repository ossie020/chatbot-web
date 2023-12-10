import { HiOutlineFire, HiOutlineHeart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { useCharacterStore } from '@/stores/character'

import type { Character } from '@/api/character'

export function CharacterCard(character: Character) {
  const { avatar, name, likes_count, talks_count, introduction, user } = character
  const navigate = useNavigate()
  const { setCharacter } = useCharacterStore()

  function toChat() {
    setCharacter(character)
    navigate(`/chat`)
  }

  return (
    <div
      onClick={toChat}
      style={{ backgroundImage: `url(${avatar})` }}
      className="lg:h-335px lg:w-310px sm:h-229px sm:w-172px xl:w-251px flex h-full w-full flex-col justify-between rounded-xl bg-cover bg-center bg-no-repeat p-2 hover:cursor-pointer"
    >
      <div className="flex-between">
        <div className="flex items-center text-pink-500">
          <div className="flex items-center rounded-full bg-white px-1">
            <HiOutlineFire className="h-3 w-3" />
            <p className="text-10px ml-1">{talks_count}</p>
          </div>
          <div className="ml-6px flex items-center rounded-full bg-white px-1">
            <HiOutlineHeart className="h-3 w-3" />
            <p className="text-10px ml-1">{likes_count}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={user?.avatar} className="h-4 w-4 rounded-full" />
          <p className="text-10px ml-1 font-medium text-white">{user?.nickname}</p>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold text-white">{name}</p>
        <div
          style={{ backdropFilter: 'blur(12px)' }}
          className="h-61px text-10px rounded-bl-20px rounded-br-20px rounded-tr-20px mt-2 flex items-center border border-pink-500 bg-black/10 px-3 py-2 font-medium text-white"
        >
          <span className="line-clamp-3">{introduction}</span>
        </div>
      </div>
    </div>
  )
}
