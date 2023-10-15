import NProgress from 'nprogress'
import { useEffect } from 'react'

NProgress.configure({ showSpinner: false })

export function PageLoading() {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })

  return null
}
