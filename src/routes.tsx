import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from './components/Layout'
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
const Character = asyncRoute(lazy(() => import('./pages/character')))
const Chat = asyncRoute(lazy(() => import('./pages/chat')))
const Search = asyncRoute(lazy(() => import('./pages/search')))

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
        path: '/character',
        element: <Character />,
      },
      {
        path: '/character/:id',
        element: <Character />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '*',
        element: <Home />,
      },
    ],
  },
  {
    path: '/search',
    element: <Search />,
  },
])
