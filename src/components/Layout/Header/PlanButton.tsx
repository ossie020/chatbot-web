import { Button } from 'antd'
import { HiChevronDoubleUp } from 'react-icons/hi'

import { useAppStore } from '@/stores/app'

import { PlanModal } from './PlanModal'
import { LoginModalState } from '@/utils/enums'

export function PlanButton() {
  const { user, setLoginModalState, planOpen, setPlanOpen } = useAppStore()

  function openPlanModal() {
    if (!user.uid) {
      setLoginModalState(LoginModalState.LOGIN)
      return
    }

    setPlanOpen(true)
  }

  return (
    <>
      <Button
        onClick={openPlanModal}
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
