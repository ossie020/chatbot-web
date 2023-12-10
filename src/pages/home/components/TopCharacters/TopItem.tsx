import { HiFire, HiHeart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Character } from '@/api/character'
import Star from '@/assets/svg/star.svg'
import { useCharacterStore } from '@/stores/character'

type Props = Character & {
  rank: number
}

function bgRank(rank: number) {
  switch (rank) {
    case 1:
      return 'linear-gradient(180deg, #fff3b4 0%, rgba(255, 243, 180, 0) 100%)'
    case 2:
      return 'linear-gradient(180deg, #e5e7eb 0%, rgba(229, 231, 235, 0) 100%)'
    case 3:
      return 'linear-gradient(180deg, #f8e1ce 0%, rgba(248, 225, 206, 0) 100%)'
    default:
      return ''
  }
}

export function TopItem(character: Props) {
  const { avatar, name, talks_count, likes_count, rank } = character

  const navigate = useNavigate()
  const { setCharacter } = useCharacterStore()

  function toChat() {
    setCharacter(character)
    navigate(`/chat`)
  }

  return (
    <div
      onClick={toChat}
      style={{ background: bgRank(rank) }}
      className="flex w-full items-center rounded-lg pr-3 hover:cursor-pointer"
    >
      <img src={avatar} className="h-14 w-14 rounded" />
      <div className="flex-between ml-2.5 h-14 flex-1">
        <div className="flex-1">
          <p className="text-sm">{name}</p>
          <div className="mt-1 flex items-center gap-x-1 text-xs text-pink-500">
            <HiFire />
            <p>{talks_count}</p>
            <HiHeart />
            <p>{likes_count}</p>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${Star})` }}
          className="flex h-8 w-8 items-center justify-center bg-contain bg-center bg-no-repeat text-sm text-white"
        >
          #{rank}
        </div>
      </div>
    </div>
  )
}
