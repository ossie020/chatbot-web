import { HiChevronLeft, HiOutlineStar, HiStar } from 'react-icons/hi'

export function Header() {
  return (
    <div className="h-48px w-full flex-between bg-white px-4 py-2.5">
      <HiChevronLeft className="h-7 w-7" />
      <HiOutlineStar className="h-7 w-7" />
    </div>
  )
}
