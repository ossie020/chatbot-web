import { ChattedCharacter, listRecentCharacter } from '@/api/character'
import { useMount } from '@/hooks'
import { useAppStore } from '@/stores/app'
import { useState } from 'react'
import { Header } from './Header'
import { Item } from './Item'

export function RecentlyChatted() {
  const { user, setOpen } = useAppStore()

  const [list, setList] = useState<ChattedCharacter[]>([])

  useMount(() => fetchData())

  async function fetchData() {
    const _list = await listRecentCharacter()
    setList(_list)
  }

  function renderList() {
    return list.map((chattedCharacter) => <Item key={chattedCharacter.id} {...chattedCharacter} />)
  }

  function renderEmpty() {
    return (
      <div className="flex-center text-gray-500">🤔 You haven't created any Characters yet.</div>
    )
  }

  function renderNoAuth() {
    return (
      <div className="flex-center">
        <a href="#" onClick={() => setOpen(true)} className="font-500 text-pink-500 underline">
          Log in
        </a>
        <span className="text-gray-500">&nbsp; to chat</span>
      </div>
    )
  }

  return (
    <div className="mt-4 w-full rounded-xl border border-pink-400 p-6">
      <Header />
      <div className="h-240px no-scrollbar mt-4 grid gap-3 overflow-auto">
        {user.uid ? (list.length ? renderList() : renderEmpty()) : renderNoAuth()}
      </div>
    </div>
  )
}
