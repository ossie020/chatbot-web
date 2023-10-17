import { HiFire, HiHeart } from 'react-icons/hi'
import Star from '@/assets/svg/star.svg'

type Props = {
  list: {
    img: string
    name: string
    rank: number
    hot: number
    fav: number
  }[]
}

export function TopItems({ list }: Props) {
  const mt = (index: number) => (index === 0 ? '' : 'mt-3')
  const bg = (index: number) => (index === 0 ? 'yellow' : index === 1 ? 'gray' : 'orange')

  return (
    <div className="mt-4">
      {list.map(({ img, name, rank, hot, fav }, index) => (
        <div
          key={name}
          className={`${mt(index)} rounded-lg w-full pr-3 flex items-center linear-bg-${bg(
            index,
          )} hover:cursor-pointer`}
        >
          <img src={img} className="h-14 w-14 rounded" />
          <div className="ml-2.5 h-14 flex flex-1 items-center justify-between">
            <div className="flex-1">
              <p className="text-sm">{name}</p>
              <div className="flex items-center text-xs text-pink-500">
                <HiFire className="mr-0.5" />
                <p className="mr-0.5">{hot}</p>
                <HiHeart className="mr-0.5" />
                <p>{fav}</p>
              </div>
            </div>
            <div
              style={{ backgroundImage: `url(${Star})` }}
              className={`w-8 h-8 text-white text-sm bg-center bg-cover bg-no-repeat flex items-center justify-center`}
            >
              #{rank}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
