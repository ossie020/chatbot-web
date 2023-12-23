import { FaArrowsRotate } from 'react-icons/fa6'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

import { useChatStore } from '@/stores/chat'

export function NetworkError() {
  const { retry } = useChatStore()

  return (
    <div className="py-7px px-16px mb-16px text-14px rounded-lg bg-pink-500 text-white">
      <div className="flex items-center">
        <HiOutlineExclamationCircle className="mr-1" />
        <span>Network Error.</span>
      </div>
      <div className="flex ml-4 items-center">
        <FaArrowsRotate className="mr-1" />
        <span
          className="border-b-1px hover:cursor-pointer font-700"
          onClick={retry}
        >
          Regenerate Now
        </span>
      </div>
    </div>
  )
}
