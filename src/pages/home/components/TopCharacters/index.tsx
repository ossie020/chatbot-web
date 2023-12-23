import { useState } from 'react'

import { Character, listTopCharacter } from '@/api/character'
import { useMount } from '@/hooks'

import { Header } from './Header'
import { RestItem } from './RestItem'
import { TopItem } from './TopItem'

export function TopCharacters() {
  const [list, setList] = useState<Character[]>([])

  useMount(() => fetchData())

  async function fetchData() {
    const _list = await listTopCharacter()
    setList(_list)
  }

  return (
    <div className="mt-4 w-full rounded-xl border border-pink-400 p-6">
      <Header />

      <div className="mt-4 grid gap-3">
        {list.slice(0, 3).map((character, index) => (
          <TopItem key={character.id} rank={index + 1} {...character} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
        {list.slice(3).map((character, index) => (
          <RestItem key={character.id} rank={index + 4} {...character} />
        ))}
      </div>
    </div>
  )
}
