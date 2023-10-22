import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import type { LazyExoticComponent } from 'react'
import { Layout } from './components/Layout'
import { PageLoading } from './components/PageLoading'

function asyncRoute(RouteComponent: LazyExoticComponent<() => JSX.Element>) {
  return () => (
    <Suspense fallback={<PageLoading />}>
      <RouteComponent />
    </Suspense>
  )
}

const Home = asyncRoute(lazy(() => import('./pages/home')))
const Create = asyncRoute(lazy(() => import('./pages/create')))
const Character = asyncRoute(lazy(() => import('./pages/character')))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/create',
        element: <Create />,
      },
      {
        path: '/character/:id',
        element: <Character />,
      },
      {
        path: '*',
        element: <Home />,
      },
    ],
  },
])
