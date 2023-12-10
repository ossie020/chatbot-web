/// <reference types="vite/client" />

export {}

declare global {
  interface CommonResponse<T> {
    code: number
    msg: string
    data: T
  }

  interface PageResponse<T> {
    total: number
    data: T[]
  }
}
