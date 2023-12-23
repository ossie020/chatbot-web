import { ConfigProvider, Input } from 'antd'
import { useState } from 'react'
import { HiChevronLeft, HiSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Character, searchCharacter } from '@/api/character'
import { useAppStore } from '@/stores/app'
import { darkTheme, theme } from '@/utils/antd'

import { CharacterCard } from './components/CharacterCard'

export default function Search() {
  const navigate = useNavigate()
  const { darkMode } = useAppStore()

  const [characterList, setCharacterList] = useState<Character[]>([])
  const [keyword, setKeyword] = useState('')

  async function search() {
    if (!keyword) {
      setCharacterList([])
    }

    const { introduction, name, tag } = await searchCharacter(keyword)
    setCharacterList([...introduction, ...name, ...tag])
  }

  return (
    <ConfigProvider theme={darkMode ? darkTheme : theme}>
      <div className="h-72px border-b-1 flex-center fixed left-0 top-0 w-full border-gray-200 bg-white p-4 dark:border-b-gray-500 dark:bg-gray-800">
        <HiChevronLeft
          onClick={() => navigate(-1)}
          className="mr-3 h-6 w-6 text-pink-500 hover:cursor-pointer"
        />
        <Input
          placeholder="Search"
          prefix={<HiSearch className="h-5 w-5 text-gray-500" />}
          className="lg:w-668px h-full rounded-full bg-gray-50 focus:shadow-none dark:border-gray-500 dark:bg-gray-700"
          onChange={(e) => setKeyword(e.target.value)}
          onPressEnter={search}
          autoFocus
        />
      </div>

      <div className="lg:w-1024px md:w-768px sm:w-390px xl:w-1440px flex-center mx-auto mt-24 grid gap-3">
        {characterList.map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </div>
    </ConfigProvider>
  )
}
