import Badge from '@/assets/svg/badge.svg'

import { RestItems } from './RestItems'
import { TopItems } from './TopItems'

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
    <div className="mt-4 w-342px p-6 border border-pink-400 rounded-xl">
      <div className="flex items-center">
        <img src={Badge} className="w-8 h-8" />
        <p className="ml-2 text-xl text-pink-500 font-bold">Top Characters</p>
      </div>

      <TopItems list={topList} />
      <RestItems list={restList} />
    </div>
  )
}
