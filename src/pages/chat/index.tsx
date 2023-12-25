import { useParams } from 'react-router-dom'

import { getCharacter } from '@/api/character'
import { createChatKey, listChatHistory } from '@/api/chat'
import { PlanModal } from '@/components/Layout/Header/PlanModal'
import { useMount } from '@/hooks'
import { useAppStore } from '@/stores/app'
import { useCharacterStore } from '@/stores/character'
import { Message, useChatStore } from '@/stores/chat'

import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export default function Chat() {
  const { id, chat_key } = useParams()
  const { chatKeyRef, setMessages } = useChatStore()
  const { setCharacter } = useCharacterStore()
  const { planOpen, setPlanOpen } = useAppStore()

  useMount(init)

  async function init() {
    chatKeyRef.current = chat_key!

    const character = await getCharacter(id!)
    setCharacter(character)

    const historyList = await listChatHistory(chatKeyRef.current)
    const realHistoryList = historyList.data.filter(({ content }) => !!content)
    if (!realHistoryList.length) {
      return
    }
    const messages: Message[] = realHistoryList.reverse().map((item) => ({
      id: item.id,
      message: item.content,
      type: item.type === 'user' ? 'user' : 'chatbot',
    }))
    setMessages(messages)
  }

  return (
    <div className="h-full w-full">
      <div className="h-72px w-full">
        <Header />
      </div>
      <div className="max-w-540px mx-auto flex h-[calc(100%-72px)] w-full flex-col justify-center py-6">
        <div className="min-h-0 w-full flex-1">
          <Content />
        </div>
        <div className="h-60px w-full">
          <Footer />
        </div>
      </div>

      <PlanModal open={planOpen} close={() => setPlanOpen(false)} />
    </div>
  )
}
