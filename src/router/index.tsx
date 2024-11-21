import { createBrowserRouter, useRoutes } from 'react-router-dom'

import Login from '@/views/Login'
import Welcome from '@/views/Welcome'
import Page403 from '@/views/fallback/Page403'
import Page404 from '@/views/fallback/Page404'
import Page500 from '@/views/fallback/Page500'

const routes = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/home',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/403',
    element: <Page403 />
  },
  {
    path: '/404',
    element: <Page404 />
  },
  {
    path: '/500',
    element: <Page500 />
  }
]

// 1. API 路由
// export default createBrowserRouter(routes)

// 2. 组件路由
export default function Router() {
  return useRoutes(routes)
}
