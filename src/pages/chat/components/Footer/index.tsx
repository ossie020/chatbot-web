import { Input } from 'antd'
import { KeyboardEvent, useState } from 'react'
import { HiArrowCircleUp } from 'react-icons/hi'

import { sendMessage } from '@/api/chat'
import { useChatStore } from '@/stores/chat'

export function Footer() {
  const { chatKey, pushMessage } = useChatStore()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    pushMessage({ timestamp: Date.now(), type: 'user', message })
    setMessage('')

    const resp = await sendMessage(message, chatKey)
    const reader = resp.body?.pipeThrough(new TextDecoderStream()).getReader()

    if (!reader) {
      console.log('no reader')
      return
    }

    setLoading(true)
    while (true) {
      const { value, done } = await reader.read()
      if (done) {
        setLoading(false)
        break
      }

      pushMessage({ timestamp: Date.now(), type: 'chatbot', message: value })
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.keyCode !== 13) {
      return
    }

    e.preventDefault()
    send()
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
      <HiArrowCircleUp
        onClick={send}
        className="ml-3 h-11 w-11 text-pink-500 hover:cursor-pointer"
      />
    </div>
  )
}
