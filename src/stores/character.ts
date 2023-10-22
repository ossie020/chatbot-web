import { useState } from 'react'
import { createGlobalStore } from 'hox'

export const [useCharacterStore, getCharacterStore] = createGlobalStore(() => {
  const [id, setId] = useState('')
  const mode = id ? 'Update' : 'Create'

  return {
    id,
    setId,
    mode,
  }
})
