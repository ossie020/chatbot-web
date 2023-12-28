import { message } from 'antd'
import ky from 'ky'

import { API_BASE, KEYS } from './constants'

export async function createCookie(idToken: string) {
  const resp = await ky.get(`${API_BASE}/user/create_cookie/`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const cookie = await resp.text()
  return cookie
}

async function handleResponse<T>(resp: Response) {
  const { code, msg, data }: CommonResponse<T> = await resp.json()
  if (code !== 200) {
    throw new Error(msg)
  }

  return data
}

export async function post<T>(path: string, data: any = {}) {
  const resp = await ky.post(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
    json: data,
  })

  return handleResponse<T>(resp)
}

export async function get<T>(path: string, data: Record<string, any> = {}) {
  const resp = await ky.get(`${API_BASE}${path}`, {
    headers: {
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
    searchParams: data,
  })

  return handleResponse<T>(resp)
}

export async function postForm<T>(path: string, formData: FormData) {
  const resp = await ky.post(`${API_BASE}${path}`, {
    headers: {
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
    body: formData,
  })

  return handleResponse<T>(resp)
}
