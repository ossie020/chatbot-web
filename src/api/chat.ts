import { API_BASE, KEYS } from '@/utils/constants'
import { get } from '@/utils/request'

export async function createChatKey(character_id: number) {
  return get<{ chat_key: string }>('/bot/create/', { character_id })
}

export async function sendMessage(message: string, chat_key: string) {
  return fetch(`${API_BASE}/bot/chat/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'gensoul-cookie': localStorage.getItem(KEYS.COOKIE) || '',
    },
    body: JSON.stringify({ message, chat_key }),
  })
}
