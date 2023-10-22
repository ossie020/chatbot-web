import { Header } from './Header'
import { TopItem } from './TopItem'
import { RestItem } from './RestItem'

export function TopCharacters() {
  const topList = ['Moonlight', 'Stardust', 'LostLover'].map((name, i) => ({
    name,
    img: 'https://www.fate.ink/temp/avatar2.png',
    rank: i + 1,
    hot: 24774,
    fav: 386,
  }))
  const restList = [
    'StarBoy',
    'BubblyNight',
    'StarryLuxury',
    'WanderingStars',
    'StargazingWalk',
    'MirageByTheSea',
  ].map((name, i) => ({
    name,
    img: 'https://www.fate.ink/temp/avatar4.png',
    rank: i + 1,
    hot: 24774,
    fav: 386,
  }))

  return (
    <div className="mt-4 w-full border border-pink-400 rounded-xl p-6">
      <Header />

      <div className="grid mt-4 gap-3">
        {topList.map((item, i) => <TopItem key={`${i}`} {...item} />)}
      </div>

      <div className="grid mt-4 gap-4 bg-gray-50 p-3">
        {restList.map((item, i) => <RestItem key={`${i}`} {...item} />)}
      </div>
    </div>
  )
}
