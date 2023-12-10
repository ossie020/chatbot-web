import { API_BASE, KEYS } from './constants'

export async function createCookie(idToken: string) {
  const resp = await fetch(`${API_BASE}/user/create_cookie/`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  const cookie = await resp.text()
  return cookie
}

async function handleResponse<T>(resp: Response) {
  if (resp.status === 401) {
    throw new Error(resp.statusText)
  }

  if (resp.status !== 200) {
    throw new Error(resp.statusText)
  }

  const { code, msg, data }: CommonResponse<T> = await resp.json()
  if (code !== 200) {
    throw new Error(msg)
  }

  return data
}

export async function post<T>(path: string, data: any = {}) {
  const resp = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
    body: JSON.stringify(data),
  })

  return handleResponse<T>(resp)
}

export async function get<T>(path: string, data: Record<string, any> = {}) {
  const params = new URLSearchParams(data)

  const resp = await fetch(`${API_BASE}${path}?${params}`, {
    headers: {
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
  })

  return handleResponse<T>(resp)
}

export async function postForm<T>(path: string, formData: FormData) {
  const resp = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
    body: formData,
  })

  return handleResponse<T>(resp)
}
