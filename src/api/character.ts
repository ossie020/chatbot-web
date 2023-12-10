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
  is_liked: number
}

export interface ChattedCharacter {
  id: number
  character_id: number
  chat_key: string
  character: Character
}

export interface Tag {
  id: number
  name: string
  emoji: string
}

export async function listCharacter(page: number = 1) {
  return get<PageResponse<Character>>('/index/', { page, count: 10 })
}

export async function listRecentCharacter() {
  return get<ChattedCharacter[]>('/index/recent/')
}

export async function listTopCharacter() {
  return get<Character[]>('/index/top/')
}

export async function searchCharacter(keyword: string) {
  return get<{ introduction: Character[]; name: Character[]; tag: Character[] }>('/search/', {
    info: keyword,
  })
}

export async function listMyCharacter() {
  return get<Character[]>('/character/')
}

export async function listFavouriteCharacter() {
  return get<Character[]>('/character/favourite/')
}

export async function listCharacterByTag(tag_id: number) {
  return get<Character[]>('/character/tag/', { tag_id })
}

export async function getCharacter(character_id: number) {
  return get<Character>('/character/detail/', { character_id })
}

export async function createCharacter(character: Partial<Character>) {
  return post('/character/create/', character)
}

export async function listTag() {
  return get<Tag[]>('/tag/')
}
