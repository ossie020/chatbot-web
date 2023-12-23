import Lottie from 'lottie-react'

import loading from '@/assets/lottie/loading.json'

export function DataLoading() {
  return (
    <Lottie animationData={loading} className="mt-4 h-64px" loop autoplay />
  )
}
