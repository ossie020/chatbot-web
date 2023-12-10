import { createGlobalStore } from 'hox'
import { useState } from 'react'

import type { Character } from '@/api/character'

export const [useCharacterStore, getCharacterStore] = createGlobalStore(() => {
  const [characterList, setCharacterList] = useState<Character[]>([])
  const [character, setCharacter] = useState<Partial<Character>>({})
  const mode = character.id === undefined ? 'Create' : 'Update'

  return {
    characterList,
    setCharacterList,
    character,
    setCharacter,
    mode,
  }
})
