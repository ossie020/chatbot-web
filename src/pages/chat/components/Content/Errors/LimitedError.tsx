import { HiOutlineExclamationCircle } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'

export function LimitedError() {
  const { setPlanOpen } = useAppStore()

  return (
    <div className="h-38px py-7px px-16px mb-16px text-14px flex items-center rounded-lg bg-pink-500 text-white">
      <HiOutlineExclamationCircle className="mr-1" />
      <span>Chat limit reached, please check &nbsp;</span>
      <span
        className="border-b-1px hover:cursor-pointer"
        onClick={() => setPlanOpen(true)}
      >
        Subscription Plan
      </span>
      <span>.</span>
    </div>
  )
}
