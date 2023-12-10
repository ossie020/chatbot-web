import { get, post, postForm } from '@/utils/request'

export interface User {
  uid: string
  id: string
  email: string
  nickname: string
  avatar: string
}

export async function getUser() {
  return get<User>('/user/')
}

export async function getUserDetail() {
  return get<User>('/user/detail/')
}

export async function updateUser(user: Partial<User>) {
  return post('/user/update/', user)
}

export async function likeCharacter(character_id: number) {
  return get('/user/like/', { character_id })
}

export async function dislikeCharacter(character_id: number) {
  return get('/user/dislike/', { character_id })
}

export async function upload(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  return await postForm<{ url: string }>('/user/upload/', formData)
}
