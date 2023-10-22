import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function Layout() {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-99 h-18">
        <Header />
      </div>
      <div className="mx-auto mt-18 flex p-4 lg:max-w-[1024px] md:max-w-[768px] sm:max-w-[390px] xl:max-w-[1440px]">
        <Outlet />
      </div>
    </>
  )
}
