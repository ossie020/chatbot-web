import { HiOutlineFire, HiOutlineHeart } from 'react-icons/hi'

interface Props {
  img: string
  name: string
  rank: number
  hot: number
  fav: number
}

export function RestItem({ img, name, rank, hot, fav }: Props) {
  return (
    <div className="w-full flex-between rounded-lg hover:cursor-pointer">
      <div className="flex items-center">
        <p className="text-sm font-bold text-pink-500">
          #
          {rank}
        </p>
        <img src={img} className="ml-3 h-5 w-5" />
        <p className="ml-1 text-xs">{name}</p>
      </div>
      <div className="flex items-center gap-x-1 text-xs text-pink-500">
        <HiOutlineFire />
        <p>{hot}</p>
        <HiOutlineHeart />
        <p>{fav}</p>
      </div>
    </div>
  )
}
