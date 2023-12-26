import { Input } from 'antd'
import { KeyboardEvent, useState } from 'react'
import { HiArrowCircleUp } from 'react-icons/hi'

import { useChatStore } from '@/stores/chat'

export function Footer() {
  const { send, loading } = useChatStore()
  const [message, setMessage] = useState('')

  async function sendMessage() {
    if (message.trim() === '') {
      return
    }

    if (loading) {
      return
    }

    send(message)
    setMessage('')
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.keyCode !== 13) {
      return
    }

    if (message.trim() === '') {
      return
    }

    if (loading) {
      return
    }

    e.preventDefault()
    sendMessage()
  }

  return (
    <div className="flex-between h-full w-full py-4">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onPressEnter={handleKeydown}
        placeholder="Type your message"
        className="h-9 rounded-full"
      />
      {loading ? (
        <HiArrowCircleUp className="ml-3 h-11 w-11 text-#E0E5F2" />
      ) : (
        <HiArrowCircleUp
          onClick={sendMessage}
          className="ml-3 h-11 w-11 text-pink-500 hover:cursor-pointer"
        />
      )}
    </div>
  )
}
