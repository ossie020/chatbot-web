import { useCharacterStore } from '@/stores/character'

import { UpsertForm } from './components/UpsertForm'

export default function Character() {
  const { mode } = useCharacterStore()

  return (
    <div className="h-full w-full py-4">
      <div className="w-560px mx-auto rounded-xl border border-gray-300 p-6">
        <p className="text-30px mb-6 font-bold text-pink-500">
          {mode} Your Character
        </p>
        <UpsertForm />
      </div>
    </div>
  )
}
