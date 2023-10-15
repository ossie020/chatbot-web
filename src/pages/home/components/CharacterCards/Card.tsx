import { HiOutlineFire, HiOutlineHeart } from 'react-icons/hi'

type Props = {
  user: {
    avatar: string
    name: string
  }
  hot: number
  fav: number
  name: string
  desc: string
  img: string
}

export function Card({ user, hot, fav, name, desc, img }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="h-335px xl:w-251px lg:w-310px md:w-380px p-2 flex flex-col justify-between rounded-xl bg-center bg-cover bg-no-repeat"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center text-pink-500">
          <div className="px-1 flex items-center bg-white rounded-full">
            <HiOutlineFire className="w-3 h-3" />
            <p className="ml-1 text-10px">{hot}</p>
          </div>
          <div className="ml-1 px-1 flex items-center bg-white rounded-full">
            <HiOutlineHeart className="w-3 h-3" />
            <p className="ml-1 text-10px">{fav}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={user.avatar} className="w-4 h-4 rounded-full" />
          <p className="ml-1 text-10px text-white font-medium">{user.name}</p>
        </div>
      </div>
      <div>
        <p className="text-white text-xl font-bold">{name}</p>
        <div className="mt-2 px-3 py-2 text-white text-10px font-medium bg-black/10 backdrop-blur-md border border-pink-500 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl">
          {desc}
        </div>
      </div>
    </div>
  )
}
