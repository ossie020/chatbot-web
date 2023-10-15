import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './components/Layouts/main'
import { PageLoading } from './components/PageLoading'

import type { LazyExoticComponent } from 'react'

function asyncRoute(RouteComponent: LazyExoticComponent<() => JSX.Element>) {
  return () => (
    <Suspense fallback={<PageLoading />}>
      <RouteComponent />
    </Suspense>
  )
}

const Home = asyncRoute(lazy(() => import('./pages/home')))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
])
