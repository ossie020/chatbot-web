import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { useAppStore } from '@/stores/app'
import { useCharacterStore } from '@/stores/character'
import type { Message } from '@/stores/chat'

export function MessageBox({ type, message }: Message) {
  const { user } = useAppStore()
  const { character } = useCharacterStore()
  const avatar = type === 'chatbot' ? character.avatar : user.avatar
  const direction = type === 'chatbot' ? 'flex-row' : 'flex-row-reverse'
  const msgClass =
    type === 'chatbot'
      ? 'text-white bg-black/20 rounded-tr-3xl'
      : 'text-black bg-white rounded-tl-3xl'
  const msgStyle =
    type === 'chatbot'
      ? {
          // border: '1px solid transparent',
          // borderImage: 'linear-gradient(to right, #E74694, #FFCD83)',
          // borderImageSlice: 1,
        }
      : {}

  return (
    <div className={`gap-x-10px flex ${direction}`}>
      <img src={avatar} className="h-32px w-32px rounded-full" />

      <div
        style={msgStyle}
        className={`max-w-340px px-16px py-9px rounded-bl-3xl rounded-br-3xl backdrop-blur-md ${msgClass}`}
      >
        <ReactMarkdown
          children={message}
          components={{
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
    </div>
  )
}
