import { useEffect, useRef } from 'react'

import { useChatStore } from '@/stores/chat'

import { MessageBox } from './MessageBox'

export function MessageList() {
  const { messages } = useChatStore()

  const listRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current && listRef.current.clientHeight) {
      listRef.current.scrollIntoView({
        // behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages])

  return (
    <div ref={listRef} className="py-16px grid gap-4">
      {messages.map((item, index) => (
        <MessageBox
          key={item.id}
          {...item}
          isLastChatbot={
            index === messages.length - 1 &&
            item.type === 'chatbot' &&
            messages.length > 1
          }
        />
      ))}
    </div>
  )
}
