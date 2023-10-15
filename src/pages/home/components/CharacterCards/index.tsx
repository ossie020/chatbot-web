import { Card } from './Card'

export function CharacterCards() {
  const list = new Array(40).fill('').map(() => ({
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
    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-4">
      {list.map((item, i) => (
        <Card key={`${i}`} {...item} />
      ))}
    </div>
  )
}
