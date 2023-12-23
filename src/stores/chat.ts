import { createGlobalStore } from 'hox'
import { useEffect, useRef, useState } from 'react'

import { sendMessage } from '@/api/chat'

export interface Message {
  id: number
  type: 'user' | 'chatbot' | 'loading'
  message: string
}

export const [useChatStore, getChatStore] = createGlobalStore(() => {
  const chatKeyRef = useRef('')
  const messagesRef = useRef<Message[]>([])
  const allMessageRef = useRef<Message[]>([])
  const chatbotMessage = useRef('')
  const start = useRef(false)
  const loadingRemovedRef = useRef(false)

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [limitedError, setLimitedError] = useState(false)
  const [networkError, setNetworkError] = useState(false)

  useEffect(() => {
    allMessageRef.current = messages
  }, [messages])

  function reset() {
    chatKeyRef.current = ''
    setMessages([])
    messagesRef.current = []
    chatbotMessage.current = ''
    start.current = false
  }

  function pushMessage({ id, type, message }: Message) {
    if (type === 'user') {
      const loadingMessage: Message = {
        id: Date.now(),
        type: 'loading',
        message: '',
      }
      const newMessages = [
        ...allMessageRef.current,
        { id, type, message },
        loadingMessage,
      ]
      setMessages(newMessages)
      messagesRef.current = newMessages
      chatbotMessage.current = ''
      loadingRemovedRef.current = false
      return
    }

    const condition =
      message.endsWith('[message]') || message.startsWith('[chat_key]')

    if (!condition && start.current === false) {
      return
    }

    if (condition) {
      start.current = true
      return
    }

    // 第一次 setMessages 前，把上一个 loading 删掉
    if (loadingRemovedRef.current === false) {
      console.log(messagesRef.current)
      messagesRef.current.pop()
      loadingRemovedRef.current = true
    }

    chatbotMessage.current = `${chatbotMessage.current}${message}`
    setMessages([
      ...messagesRef.current,
      { id, type, message: chatbotMessage.current },
    ])
  }

  async function send(message: string, retry?: boolean) {
    pushMessage({ id: Date.now(), type: 'user', message })

    const resp = await sendMessage(message, chatKeyRef.current, retry)
    if (resp.status === 402) {
      setLimitedError(true)
      throw new Error(resp.statusText)
    }
    if (resp.status !== 200) {
      setNetworkError(true)
      throw new Error(resp.statusText)
    }

    const reader = resp.body?.pipeThrough(new TextDecoderStream()).getReader()

    if (!reader) {
      throw new Error('no reader')
    }

    setLoading(true)
    while (true) {
      const { value, done } = await reader.read()

      if (done) {
        setLoading(false)
        break
      }

      pushMessage({ id: Date.now(), type: 'chatbot', message: value })
    }
  }

  function retry() {
    const lastMessage = messages[messages.length - 1]

    if (!lastMessage) {
      return
    }

    if (lastMessage.type !== 'chatbot') {
      return
    }

    const lastUserMessage = messages[messages.length - 2].message

    const newMessages = [...messages]
    newMessages.splice(messages.length - 2, 2)
    allMessageRef.current = newMessages
    setMessages(newMessages)

    send(lastUserMessage, true)
  }

  return {
    chatKeyRef,
    setMessages,
    messages,
    messagesRef,
    reset,
    pushMessage,
    send,
    retry,
    loading,
    limitedError,
    networkError,
  }
})
