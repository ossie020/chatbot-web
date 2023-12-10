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

  current ? htmlElement.setAttribute('class', 'dark') : htmlElement.removeAttribute('class')
  return current
}

export function toggleDarkMode(current: boolean) {
  const htmlElement = document.documentElement
  current ? htmlElement.removeAttribute('class') : htmlElement.setAttribute('class', 'dark')
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
