import { Spin } from 'antd'

import { useAppStore } from '@/stores/app'

export function Loading() {
  const { loading } = useAppStore()

  return (
    <Spin
      spinning={true}
      className="z-999 fixed bottom-0 left-0 right-0 top-0"
    />
  )
}
