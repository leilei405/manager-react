// @ts-ignore
import React from 'react'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
// 1. 导入路由对象 <RouterProvider router={router} />
// import router from './router'

// 2. 导入路由组件  <BrowserRouter> <Router /> </BrowserRouter>
import Router from './router'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
