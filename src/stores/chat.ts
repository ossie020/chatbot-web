import { createGlobalStore } from 'hox'
import { useRef, useState } from 'react'

export interface Message {
  timestamp: number
  type: 'user' | 'chatbot'
  message: string
}

export const [useChatStore, getChatStore] = createGlobalStore(() => {
  const [chatKey, setChatKey] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const messagesRef = useRef<Message[]>([])
  const chatbotMessage = useRef('')
  const start = useRef(false)

  function reset() {
    setChatKey('')
    setMessages([])
    messagesRef.current = []
    chatbotMessage.current = ''
    start.current = false
  }

  function pushMessage({ timestamp, type, message }: Message) {
    if (type === 'user') {
      const newList = [...messages, { timestamp, type, message }]
      setMessages(newList)
      messagesRef.current = newList
      chatbotMessage.current = ''
      return
    }

    const condition = message.endsWith('[message]') || message.startsWith('[chat_key]')

    if (!condition && start.current === false) {
      return
    }

    if (condition) {
      start.current = true
      return
    }

    chatbotMessage.current = `${chatbotMessage.current}${message}`
    setMessages([...messagesRef.current, { timestamp, type, message: chatbotMessage.current }])
  }

  return {
    chatKey,
    setChatKey,
    messages,
    reset,
    pushMessage,
  }
})
