import Messages from '@/assets/svg/messages.svg'

export function Header() {
  return (
    <div className="flex items-center">
      <img src={Messages} className="h-8 w-8" />
      <p className="ml-2 text-xl font-bold text-pink-500">Recent Chats</p>
    </div>
  )
}
