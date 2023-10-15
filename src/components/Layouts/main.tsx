import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'

export function MainLayout() {
  return (
    <div>
      <AppHeader />
      <div className="mx-auto xl:max-w-1440px lg:max-w-1024px md:max-w-768px p-4">
        <Outlet />
      </div>
    </div>
  )
}
