import { MessageList } from './MessageList'

export function Content() {
  return (
    <div
      style={{ background: 'linear-gradient(0deg, #D3DAED 0%, #D3DAED 100%), rgba(0, 0, 0, 0.20)' }}
      className="px-16px flex h-full w-full flex-col rounded-bl-xl rounded-br-xl"
    >
      <div className="h-full min-h-0 w-full flex-1 overflow-auto">
        <MessageList />
      </div>
      {/* <div className="h-110px w-full">
        <Toolbar />
      </div> */}
    </div>
  )
}
