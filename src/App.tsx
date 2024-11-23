// @ts-ignore
import React from 'react'
import { RouterProvider } from 'react-router-dom'
// 1. 导入路由对象 <RouterProvider router={router} />
import router from './router'

// 2. 导入路由组件  <BrowserRouter> <Router /> </BrowserRouter>
// import Router from './router'

function App() {
  return <RouterProvider router={router} />
}

export default App
