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
      <img src={img} className="h-12 w-12 rounded-full" />
      <div className="ml-2.5 flex-1">
        <div className="flex items-center">
          <p className="text-sm">{name}</p>
          <HiChatAlt className="ml-1 h-4 w-4 text-pink-500" />
        </div>
        <p className="line-clamp-1 mt-1 text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  ))
}
