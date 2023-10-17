import Messages from '@/assets/svg/messages.svg'

import { Items } from './Items'

export function RecentlyChatted() {
  const list = ['Kamado Tanjiro', 'Zero Two', 'Gojo Satoru', 'Jessica', 'Nobita'].map((name) => ({
    name,
    img: 'https://www.fate.ink/temp/avatar1.png',
    desc: 'Lorem ipsum dolor sit amet, id nam reque lorem rationibus',
  }))

  return (
    <div className="w-342px border border-pink-400 rounded-xl p-6">
      <div className="mb-4 flex items-center">
        <img src={Messages} className="h-8 w-8" />
        <p className="ml-2 text-xl font-bold text-pink-500">Recently Chatted</p>
      </div>

      <Items list={list} />
    </div>
  )
}
