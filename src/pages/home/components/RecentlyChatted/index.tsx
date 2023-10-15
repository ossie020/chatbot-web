import Messages from '@/assets/svg/messages.svg'

import { Items } from './Items'

export function RecentlyChatted() {
  const list = ['Kamado Tanjiro', 'Zero Two', 'Gojo Satoru', 'Jessica', 'Nobita'].map((name) => ({
    name,
    img: 'https://www.fate.ink/temp/avatar1.png',
    desc: 'Lorem ipsum dolor sit amet, id nam reque lorem rationibus',
  }))

  return (
    <div className="w-342px p-6 border border-pink-400 rounded-xl">
      <div className="flex items-center mb-4">
        <img src={Messages} className="w-8 h-8" />
        <p className="ml-2 text-xl text-pink-500 font-bold">Recently Chatted</p>
      </div>

      <Items list={list} />
    </div>
  )
}
