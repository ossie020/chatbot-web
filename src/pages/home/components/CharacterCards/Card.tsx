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
      className="h-335px flex flex-col justify-between rounded-xl bg-cover bg-center bg-no-repeat p-2 lg:w-310px md:w-380px xl:w-251px"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center text-pink-500">
          <div className="flex items-center rounded-full bg-white px-1">
            <HiOutlineFire className="h-3 w-3" />
            <p className="ml-1 text-10px">{hot}</p>
          </div>
          <div className="ml-1 flex items-center rounded-full bg-white px-1">
            <HiOutlineHeart className="h-3 w-3" />
            <p className="ml-1 text-10px">{fav}</p>
          </div>
        </div>
        <div className="flex items-center">
          <img src={user.avatar} className="h-4 w-4 rounded-full" />
          <p className="ml-1 text-10px font-medium text-white">{user.name}</p>
        </div>
      </div>
      <div>
        <p className="text-xl font-bold text-white">{name}</p>
        <div className="mt-2 border border-pink-500 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl bg-black/10 px-3 py-2 text-10px font-medium text-white backdrop-blur-md">
          {desc}
        </div>
      </div>
    </div>
  )
}
