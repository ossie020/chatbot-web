import { CharacterCard } from '@/components/CharacterCard'

export default function Home() {
  const list = Array.from({ length: 40 }).fill('').map(() => ({
    user: {
      avatar: 'https://www.fate.ink/temp/avatar3.png',
      name: 'MirageSea',
    },
    hot: 16775,
    fav: 322,
    name: 'Gojo Satoru',
    desc: `That's awesome. I think our users will really appreciate the improvements.`,
    img: 'https://www.fate.ink/temp/card.png',
  }))

  return (
    <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-4 sm:grid-cols-2 xl:grid-cols-4">
      {list.map((item, i) => (<CharacterCard key={`${i}`} {...item} />))}
    </div>
  )
}
