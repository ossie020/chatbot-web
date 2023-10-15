import { HiChatAlt } from 'react-icons/hi'

type Props = {
  list: { img: string; name: string; desc: string }[]
}

export function Items({ list }: Props) {
  const mt = (index: number) => (index === 0 ? '' : 'mt-3')

  return list.map(({ img, name, desc }, index) => (
    <div
      key={name}
      className={`${mt(
        index,
      )} w-full flex items-center  hover:bg-gray-100 hover:cursor-pointer`}
    >
      <img src={img} className="w-12 h-12 rounded-full" />
      <div className="flex-1 ml-2.5">
        <div className="flex items-center">
          <p className="text-sm">{name}</p>
          <HiChatAlt className="w-4 h-4 ml-1 text-pink-500" />
        </div>
        <p className="mt-1 text-xs text-gray-500 line-clamp-1">{desc}</p>
      </div>
    </div>
  ))
}
