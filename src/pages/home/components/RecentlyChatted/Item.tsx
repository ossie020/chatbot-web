import { HiChatAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { ChattedCharacter } from '@/api/character'
import { useCharacterStore } from '@/stores/character'
import { useChatStore } from '@/stores/chat'

export function Item({ character_id, chat_key, character }: ChattedCharacter) {
  const { avatar, name, introduction } = character

  const navigate = useNavigate()
  const { setChatKey } = useChatStore()
  const { setCharacter } = useCharacterStore()

  function toChat() {
    setChatKey(chat_key)
    setCharacter({ id: character_id })
    navigate('/chat')
  }

  return (
    <div
      onClick={toChat}
      className="flex w-full items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <img src={avatar} className="h-12 w-12 rounded-full" />
      <div className="ml-2.5 flex-1">
        <div className="flex items-center">
          <p className="text-sm dark:text-white">{name}</p>
          <HiChatAlt className="ml-1 h-4 w-4 text-pink-500" />
        </div>
        <p className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">{introduction}</p>
      </div>
    </div>
  )
}
