import Arrows from '@/assets/svg/arrows-repeat-outline.svg'

export function Toolbar() {
  return (
    <div className="gap-x-9px py-9px flex h-full w-full">
      <div className="flex-center bg-#00000099 px-16px py-9px text-14px rounded-xl text-white">
        That's awesome. I think our users will really appreciate the
        improvements.
      </div>
      <div className="flex-center bg-#00000099 px-16px py-9px text-14px rounded-xl text-white">
        That's awesome. I think our users
      </div>
      <div className="w-32px flex-center bg-#00000099 h-full rounded-xl">
        <img src={Arrows} />
      </div>
    </div>
  )
}
