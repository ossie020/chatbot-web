import { HiChatAlt } from 'react-icons/hi'

interface Props {
  img: string
  name: string
  desc: string
}

export function Item({ img, name, desc }: Props) {
  return (
    <div className="w-full flex items-center hover:cursor-pointer hover:bg-gray-100">
      <img src={img} className="h-12 w-12 rounded-full" />
      <div className="ml-2.5 flex-1">
        <div className="flex items-center">
          <p className="text-sm">{name}</p>
          <HiChatAlt className="ml-1 h-4 w-4 text-pink-500" />
        </div>
        <p className="line-clamp-1 mt-1 text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  )
}
