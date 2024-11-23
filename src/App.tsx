import { RouterProvider } from 'react-router-dom'
// 1. 导入路由对象 <RouterProvider router={router} />
import router from './router'
// 2. 导入路由组件  <BrowserRouter> <Router /> </BrowserRouter>
// import Router from './router'

import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#a170f2'
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
