import { useEffect, useRef } from 'react'

export function useMount(fn: VoidFunction) {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      return
    }

    mounted.current = true
    fn()
  }, [])
}

export function useUnmount(fn: VoidFunction) {
  const mounted = useRef(false)
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    if (mounted.current) {
      return
    }

    return () => fnRef.current()
  }, [])
}
