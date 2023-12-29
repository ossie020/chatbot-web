import { HiChatAlt } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { ChattedCharacter } from '@/api/character'

export function Item({
  character_id,
  chat_key,
  content,
  character,
}: ChattedCharacter) {
  const { avatar, name } = character

  const navigate = useNavigate()

  function toChat() {
    navigate(`/character/${character_id}/chat/${chat_key}`)
  }

  return (
    <div
      onClick={toChat}
      className="flex w-full max-h-48px items-center rounded-lg hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <img
        src={avatar}
        className="h-12 w-12 min-w-12 rounded-full object-cover"
      />
      <div className="ml-2.5 flex-1">
        <div className="flex items-center">
          <p className="text-sm dark:text-white">{name}</p>
          <HiChatAlt className="ml-1 h-4 w-4 text-pink-500" />
        </div>
        <p className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
          {content}
        </p>
      </div>
    </div>
  )
}
