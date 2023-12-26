import { useState } from 'react'

import { ChattedCharacter, listRecentCharacter } from '@/api/character'
import { useMount } from '@/hooks'
import { useAppStore } from '@/stores/app'
import { LoginModalState } from '@/utils/enums'

import { Header } from './Header'
import { Item } from './Item'

export function RecentlyChatted() {
  const { user, setLoginModalState } = useAppStore()

  const [list, setList] = useState<ChattedCharacter[]>([])

  useMount(() => fetchData())

  async function fetchData() {
    const _list = await listRecentCharacter()
    setList(_list)
  }

  function renderList() {
    return list.map((chattedCharacter) => (
      <Item key={chattedCharacter.id} {...chattedCharacter} />
    ))
  }

  function renderEmpty() {
    return (
      <div className="flex-center text-gray-500">
        🤔 You haven't chat with any character yet.
      </div>
    )
  }

  function renderNoAuth() {
    return (
      <div className="flex-center">
        <a
          href="#"
          onClick={() => setLoginModalState(LoginModalState.LOGIN)}
          className="font-500 text-pink-500 underline"
        >
          Log in
        </a>
        <span className="text-gray-500">&nbsp; to chat</span>
      </div>
    )
  }

  return (
    <div className="mt-4 w-full rounded-xl border border-pink-400 p-6">
      <Header />
      <div className="h-240px no-scrollbar mt-4 flex flex-col gap-3 overflow-auto">
        {user.uid
          ? list.length
            ? renderList()
            : renderEmpty()
          : renderNoAuth()}
      </div>
    </div>
  )
}
