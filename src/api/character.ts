import { KEYS } from '@/utils/constants'
import { get, post } from '@/utils/request'

import type { User } from './user'

export interface Character {
  id: number
  uid: string
  name: string
  avatar: string
  visibility: string
  introduction: string
  rating: string
  tags: string
  likes_count: number
  talks_count: number
  greeting?: string
  personality?: string
  chat_background?: string
  example_dialogs?: string
  prompt?: string
  created_at: string
  user?: User
  creator?: {
    name: string
    avatar: string
  }
  is_liked: number
}

export interface ChattedCharacter {
  id: number
  character_id: string
  chat_key: string
  content: string
  character: Character
}

export interface Tag {
  id: number
  name: string
  emoji: string
  description: string
}

function getRating() {
  return localStorage.getItem(KEYS.NSFW) === 'false' ? 'sfw' : 'nsfw'
}

export async function listCharacter(page: number = 1) {
  return get<PageResponse<Character>>('/index/', {
    page,
    count: 20,
    rating: getRating(),
  })
}

export async function listMyCharacter(page: number = 1) {
  return get<PageResponse<Character>>('/character/', {
    page,
    count: 20,
    rating: getRating(),
  })
}

export async function listFavouriteCharacter(page: number = 1) {
  return get<PageResponse<Character>>('/character/favourite/', {
    page,
    count: 20,
    rating: getRating(),
  })
}

export async function listCharacterByTag(tag_id: string, page: number = 1) {
  return get<PageResponse<Character>>('/character/tag/', {
    tag_id,
    page,
    count: 20,
    rating: getRating(),
  })
}

export async function listRecentCharacter() {
  return get<ChattedCharacter[]>('/index/recent/')
}

export async function listTopCharacter() {
  return get<Character[]>('/index/top/')
}

export async function searchCharacter(keyword: string) {
  return get<{
    introduction: Character[]
    name: Character[]
    tag: Character[]
  }>('/search/', {
    info: keyword,
  })
}

export async function getCharacter(character_id: string) {
  return get<Character>('/character/detail/', { character_id })
}

export async function createCharacter(character: Partial<Character>) {
  return post('/character/create/', character)
}

export async function listTag() {
  return get<Tag[]>('/tag/')
}

export async function getChatKey(character_id: string) {
  return get<{ chat_key: string }>('/character/last_history/', { character_id })
}
