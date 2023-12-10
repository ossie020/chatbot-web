import { useCharacterStore } from '@/stores/character'
import { useChatStore } from '@/stores/chat'

import { getCharacter } from '@/api/character'
import { createChatKey } from '@/api/chat'
import { useMount, useUnmount } from '@/hooks'

import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export default function Chat() {
  const { chatKey, setChatKey, reset } = useChatStore()
  const { character, setCharacter } = useCharacterStore()

  useMount(() => {
    if (!chatKey) {
      createChatKey(character.id!).then(({ chat_key }) => setChatKey(chat_key))
    }
    getCharacter(character.id!).then((item) => setCharacter(item))
  })

  useUnmount(reset)

  return (
    <div className="max-w-540px py-36px mx-auto flex h-[calc(100vh-72px-32px)] w-full flex-col justify-center">
      <div className="h-48px w-full">
        <Header />
      </div>
      <div className="min-h-0 w-full flex-1">
        <Content />
      </div>
      <div className="h-60px w-full">
        <Footer />
      </div>
    </div>
  )
}
