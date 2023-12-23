import { Outlet } from 'react-router-dom'

import { Header } from './Header'

export function Layout() {
  return (
    <>
      <div className="z-9 lg:h-18 sm:h-15 fixed left-0 right-0 top-0">
        <Header />
      </div>
      <div className="mt-18 lg:w-1024px md:w-768px sm:w-390px xl:w-1440px mx-auto px-4">
        <Outlet />
      </div>
    </>
  )
}
