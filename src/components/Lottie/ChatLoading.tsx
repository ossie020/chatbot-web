import Lottie from 'lottie-react'

import dotsMotion from '@/assets/lottie/dotsMotion.json'

export function ChatLoading() {
  return (
    <Lottie
      animationData={dotsMotion}
      className="w-36px h-36px"
      loop
      autoplay
    />
  )
}
