import Badge from '@/assets/svg/badge.svg'

export function Header() {
  return (
    <div className="flex items-center">
      <img src={Badge} className="h-8 w-8" />
      <p className="ml-2 text-xl font-bold text-pink-500">Top Characters</p>
    </div>
  )
}
