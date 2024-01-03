import { Input } from 'antd'
import { useState } from 'react'
import { HiChevronLeft, HiSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Character, searchCharacter } from '@/api/character'
import { DataLoading } from '@/components/Lottie/DataLoading'
import { filterCharacterList } from '@/utils'

import { CharacterCard } from './components/CharacterCard'

export default function Search() {
  const navigate = useNavigate()

  const [characterList, setCharacterList] = useState<Character[]>([])
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  async function search() {
    if (!keyword) {
      setCharacterList([])
    }

    setLoading(true)
    const { introduction, name, tag, rating } = await searchCharacter(keyword)
    setCharacterList(
      filterCharacterList([...introduction, ...name, ...tag, ...rating]),
    )
    setLoading(false)
  }

  return (
    <>
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

      <div className="lg:w-1024px md:w-768px sm:w-390px xl:w-1440px flex-center mx-auto mt-24 mb-6 grid gap-3">
        {loading ? (
          <DataLoading />
        ) : (
          characterList.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))
        )}
      </div>
    </>
  )
}
