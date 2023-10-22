import { UpsertForm } from './components/UpsertForm'
import { useCharacterStore } from '@/stores/character'

export default function Character() {
  const { mode } = useCharacterStore()

  return (
    <div className="mx-auto border border-gray-300 rounded-xl p-6 md:w-560px sm:w-full">
      <p className="mb-6 text-30px font-bold text-pink-500">
        {mode}
        {' '}
        Your Character
      </p>

      <UpsertForm />
    </div>
  )
}
