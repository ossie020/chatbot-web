import { RouterProvider } from 'react-router-dom'

import { HoxRoot } from 'hox'

import { router } from './routes'

export default function App() {
  return (
    <HoxRoot>
      <RouterProvider router={router} />
    </HoxRoot>
  )
}
