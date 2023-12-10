import { useEffect, useRef } from 'react'

import { useChatStore } from '@/stores/chat'

import { MessageBox } from './MessageBox'

export function MessageList() {
  const { messages } = useChatStore()

  const bottomRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (bottomRef.current && bottomRef.current.clientHeight) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages])

  return (
    <div ref={bottomRef} className="py-36px grid gap-4">
      {messages.map((item) => (
        <MessageBox key={item.timestamp} {...item} />
      ))}
    </div>
  )
}
