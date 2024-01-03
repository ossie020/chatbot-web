import numeral from 'numeral'

import { KEYS } from './constants'

export function initDarkMode() {
  const htmlElement = document.documentElement

  let current = false
  const cache = localStorage.getItem(KEYS.DARK)
  if (cache) {
    current = localStorage.getItem(KEYS.DARK) === 'true'
  } else {
    current = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  current
    ? htmlElement.setAttribute('class', 'dark')
    : htmlElement.removeAttribute('class')
  return current
}

export function toggleDarkMode(current: boolean) {
  const htmlElement = document.documentElement
  current
    ? htmlElement.removeAttribute('class')
    : htmlElement.setAttribute('class', 'dark')
  localStorage.setItem(KEYS.DARK, (!current).toString())
}

export function dataURLtoBlob(dataURL: string, fileName: string) {
  const parts = dataURL.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  const blob = new Blob([uInt8Array], { type: contentType })
  const file = new File([blob], fileName, { type: blob.type })
  return file
}

export function calcDays(start: number, end: number) {
  return Math.ceil(Math.abs(end - start) / (3600 * 24 * 1000))
}

export function throttle(fn: (...arg: any[]) => any, interval: number = 300) {
  let lock = false
  return function (this: unknown, ...args: any[]) {
    if (lock) return
    lock = true
    setTimeout(() => (lock = false), interval)
    fn.bind(this)(...args)
  }
}

export function debounce(fn: (...arg: any[]) => any, duration: number = 300) {
  let timer = -1
  return function (this: unknown, ...args: any[]) {
    if (timer > -1) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.bind(this)(...args)
      timer = -1
    }, duration)
  }
}

export function formatLargeNumber(num: number = 0) {
  return numeral(num).format('0.[000]a').toUpperCase()
}
