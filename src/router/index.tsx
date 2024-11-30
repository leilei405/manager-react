import { createBrowserRouter, Navigate } from 'react-router-dom'

import Login from '@/views/Login'
import Welcome from '@/views/Welcome'
import Layout from '@/layout'
import DashBoardPage from '@/views/DashBoard'
import UserList from '@/views/system/user'
import DeptList from '@/views/system/dept'
import RoleList from '@/views/system/role'

// 403 404 500 页面
import Page403 from '@/views/fallback/Page403'
import Page404 from '@/views/fallback/Page404'
import Page500 from '@/views/fallback/Page500'
import MenuMangerList from '@/views/system/menu-manger'

// 权限拦截
import loadAuth from './authLoader'

export const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: loadAuth,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <DashBoardPage />
      },
      {
        path: '/userList',
        element: <UserList />
      },
      {
        path: '/deptList',
        element: <DeptList />
      },
      {
        path: '/menuList',
        element: <MenuMangerList />,
        meta: {
          auth: false
        }
      },
      {
        path: '/roleList',
        element: <RoleList />
      },
      {
        path: '*',
        element: <Navigate to='/404' />
      }
    ]
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
export default createBrowserRouter(routes)

// 2. 组件路由
// export default function Router() {
//   return useRoutes(routes)
// }
