import { useRef } from 'react'
import { HiOutlineFire, HiOutlineHeart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { type Character, getChatKey } from '@/api/character'
import { createChatKey } from '@/api/chat'
import { formatLargeNumber } from '@/utils'

export function CharacterCard(character: Character) {
  const { id, avatar, name, likes_count, talks_count, introduction, user } =
    character
  const navigate = useNavigate()
  const loadingRef = useRef(false)

  async function toChat() {
    if (loadingRef.current) {
      return
    }

    loadingRef.current = true
    let result = await getChatKey(id)
    if (!result.chat_key) {
      result = await createChatKey(id)
    }
    loadingRef.current = false
    navigate(`/character/${id}/chat/${result.chat_key}`)
  }

  return (
    <div
      onClick={toChat}
      style={{
        boxShadow:
          '0px 2px 4px -2px rgba(0, 0, 0, 0.05), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
      }}
      className="lg:h-112px lg:w-560px border-1 flex rounded-xl border-solid border-gray-200 hover:cursor-pointer dark:border-gray-700"
    >
      <img
        src={avatar}
        className="h-112px w-112px rounded-bl-xl rounded-tl-xl object-cover"
      />
      <div className="flex-1 px-5 py-1 flex flex-col">
        <div className="text-18px font-700">{name}</div>
        <div className="text-14px font-400 line-clamp-2 text-gray-500 flex-1">
          {introduction}
        </div>
        <div className="flex-between h-32px">
          <div className="flex items-center text-pink-500">
            <div className="border-1 flex items-center rounded-full border-solid border-pink-500 px-1">
              <HiOutlineFire className="h-3 w-3" />
              <p className="text-10px ml-1">{formatLargeNumber(talks_count)}</p>
            </div>
            <div className="border-1 ml-1 flex items-center rounded-full border-solid border-pink-500 px-1">
              <HiOutlineHeart className="h-3 w-3" />
              <p className="text-10px ml-1">{formatLargeNumber(likes_count)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <img src={user?.avatar} className="h-4 w-4 rounded-full" />
            <p className="text-10px ml-1 font-medium">{user?.user_name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
