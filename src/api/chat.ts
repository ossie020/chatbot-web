import { API_BASE, KEYS } from '@/utils/constants'
import { get } from '@/utils/request'

export async function createChatKey(character_id: number) {
  return get<{ chat_key: string }>('/bot/create/', { character_id })
}

export async function sendMessage(
  message: string,
  chat_key: string,
  retry?: boolean,
) {
  return fetch(`${API_BASE}/bot/chat/${retry ? '?retry=true' : ''}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
    body: JSON.stringify({ message, chat_key }),
  })
}

export type ChatHistory = {
  id: number
  content: string
  type: 'greeting' | 'assistant' | 'user'
  sequence: number
}

export async function listChatHistory(
  chat_key: string,
  page: number = 1,
  count: number = 100,
) {
  return get<PageResponse<ChatHistory>>('/bot/history/', {
    chat_key,
    page,
    count,
  })
}
