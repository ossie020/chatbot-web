import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'

export function MainLayout() {
  return (
    <div>
      <AppHeader />
      <div className="mx-auto p-4 lg:max-w-1024px md:max-w-768px xl:max-w-1440px">
        <Outlet />
      </div>
    </div>
  )
}
