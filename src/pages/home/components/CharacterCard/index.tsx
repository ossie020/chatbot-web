import { HiOutlineFire, HiOutlineHeart } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { type Character, getChatKey } from '@/api/character'
import { useAppStore } from '@/stores/app'
import { LoginModalState } from '@/utils/enums'

export function CharacterCard(character: Character) {
  const { user: authedUser, setLoginModalState } = useAppStore()
  const { id, avatar, name, likes_count, talks_count, introduction, user } =
    character
  const navigate = useNavigate()

  async function toChat() {
    if (!authedUser.uid) {
      setLoginModalState(LoginModalState.LOGIN)
      return
    }

    const { chat_key = '' } = await getChatKey(id)
    navigate(`/character/${id}/chat/${chat_key}`)
  }

  return (
    <div
      onClick={toChat}
      style={{
        backgroundImage: `url(${avatar})`,
      }}
      className="relative lg:h-335px lg:w-310px sm:h-229px sm:w-172px xl:w-251px flex h-full w-full flex-col justify-between rounded-xl bg-cover bg-center bg-no-repeat p-2 hover:cursor-pointer"
    >
      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)',
        }}
        className="absolute top-0 left-0 right-0 bottom-0"
      />

      <div className="flex-between z-1">
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
          <p className="text-10px ml-1 font-medium text-white">
            {user?.user_name}
          </p>
        </div>
      </div>
      <div className="z-1">
        <p className="text-xl font-bold text-white">{name}</p>
        <div className="min-h-61px text-13px rounded-bl-20px rounded-br-20px rounded-tr-20px max-h-248px backdrop-blur-12px mt-2 flex items-center border border-pink-500 bg-black/10 px-3 py-2 font-medium text-white">
          <span className="hover:line-clamp-12 line-clamp-2">
            {introduction.replace(/\\n/g, '&#10;')}
          </span>
        </div>
      </div>
    </div>
  )
}
