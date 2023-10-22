import { Header } from './Header'
import { Item } from './Item'

export function RecentlyChatted() {
  const list = ['Kamado Tanjiro', 'Zero Two', 'Gojo Satoru', 'Jessica', 'Nobita'].map(name => ({
    name,
    img: 'https://www.fate.ink/temp/avatar1.png',
    desc: 'Lorem ipsum dolor sit amet, id nam reque lorem rationibus',
  }))

  return (
    <div className="w-full border border-pink-400 rounded-xl p-6">
      <Header />
      <div className="grid mt-4 gap-3">
        {list.map((item, i) => <Item key={`${i}`} {...item} />)}
      </div>
    </div>
  )
}
