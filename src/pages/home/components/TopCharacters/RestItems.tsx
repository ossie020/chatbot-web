import { HiOutlineFire, HiOutlineHeart } from 'react-icons/hi'

type Props = {
  list: {
    img: string
    name: string
    rank: number
    hot: number
    fav: number
  }[]
}

export function RestItems({ list }: Props) {
  const mt = (index: number) => (index === 0 ? '' : 'mt-4')

  return (
    <div className="mt-4 p-3">
      {list.map(({ img, name, rank, hot, fav }, index) => (
        <div
          key={name}
          className={`${mt(
            index,
          )} rounded-lg w-full flex items-center justify-between hover:cursor-pointer`}
        >
          <div className="flex items-center">
            <p className="text-sm font-bold text-pink-500">#{rank}</p>
            <img src={img} className="ml-3 h-5 w-5" />
            <p className="ml-1 text-xs">{name}</p>
          </div>
          <div className="flex items-center text-xs text-pink-500">
            <HiOutlineFire className="mr-0.5" />
            <p className="mr-1">{hot}</p>
            <HiOutlineHeart className="mr-0.5" />
            <p>{fav}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
