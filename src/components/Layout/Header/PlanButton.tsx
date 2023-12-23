import { Button } from 'antd'
import { HiChevronDoubleUp } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'

import { PlanModal } from './PlanModal'

export function PlanButton() {
  const { planOpen, setPlanOpen } = useAppStore()

  return (
    <>
      <Button
        onClick={() => setPlanOpen(true)}
        style={{
          background: `linear-gradient(101deg, rgba(231, 70, 148, 0.20) 19.44%, rgba(255, 205, 131, 0.20) 100.17%)`,
        }}
        className="flex-center text-16px h-12 rounded-full border-none px-5 py-3 text-pink-500 sm:hidden lg:flex"
      >
        <HiChevronDoubleUp className="mr-2 h-6 w-6" />
        <span>Premium</span>
      </Button>

      <PlanModal open={planOpen} close={() => setPlanOpen(false)} />
    </>
  )
}
