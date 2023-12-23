import { FaArrowsRotate } from 'react-icons/fa6'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { ChatLoading } from '@/components/Lottie/ChatLoading'
import { useAppStore } from '@/stores/app'
import { useCharacterStore } from '@/stores/character'
import { useChatStore } from '@/stores/chat'
import type { Message } from '@/stores/chat'

type Props = Message & {
  isLastChatbot: boolean
}

export function MessageBox({ type, message, isLastChatbot }: Props) {
  const { user } = useAppStore()
  const { character } = useCharacterStore()
  const { retry } = useChatStore()

  const isChatbot = type === 'chatbot'
  const avatar = isChatbot ? character.avatar : user.avatar
  const direction = isChatbot ? 'flex-row' : 'flex-row-reverse'
  const msgClass = isChatbot
    ? 'text-white bg-black/20 rounded-tr-3xl'
    : 'text-black bg-white rounded-tl-3xl max-w-480px break-all'
  const emClass = isChatbot ? 'text-#FFFFFFCC' : 'test-gray-900'

  if (type === 'loading') {
    return (
      <div className="gap-x-10px flex">
        <img
          src={character.avatar}
          className="h-64px w-64px min-w-64px rounded-full object-cover"
        />
        <div className="px-16px py-9px rounded-bl-3xl rounded-br-3xl backdrop-blur-md text-white bg-black/20 rounded-tr-3xl">
          <ChatLoading />
        </div>
      </div>
    )
  }

  return (
    <div className={`gap-x-10px flex ${direction}`}>
      {isChatbot && (
        <img
          src={avatar}
          className="h-64px w-64px min-w-64px rounded-full object-cover"
        />
      )}

      <div
        className={`px-16px py-9px rounded-bl-3xl rounded-br-3xl backdrop-blur-md ${msgClass}`}
      >
        <ReactMarkdown
          className="whitespace-pre-wrap"
          children={message.replace(/\\n/g, '&#10;')}
          components={{
            strong({ children }) {
              return <strong className="font-900">{children}</strong>
            },
            em({ children }) {
              return (
                <em className={`font-200 font-italic ${emClass}`}>
                  {children}
                </em>
              )
            },
            code(props) {
              const { children, className, ...rest } = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  children={String(children).replace(/\n$/, '')}
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        />
      </div>

      {isLastChatbot && (
        <div className="flex flex-col justify-end">
          <FaArrowsRotate
            className="h-4 w-4 text-gray-500 hover:cursor-pointer"
            onClick={retry}
          />
        </div>
      )}
    </div>
  )
}
