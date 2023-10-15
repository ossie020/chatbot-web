import { CharacterCards } from './components/CharacterCards'
import { Foot } from './components/Foot'
import { RecentlyChatted } from './components/RecentlyChatted'
import { TopCharacters } from './components/TopCharacters'

export default function Home() {
  return (
    <div className="flex">
      <div>
        <RecentlyChatted />
        <TopCharacters />
        <Foot />
      </div>
      <div className="ml-4">
        <CharacterCards />
      </div>
    </div>
  )
}
