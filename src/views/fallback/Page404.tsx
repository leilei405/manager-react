import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

const Page404 = () => {
  const navigate = useNavigate()

  const handleToHome = () => {
    navigate('/')
  }
  return (
    <Result
      status='404'
      title='404'
      subTitle='抱歉，你访问的页面不存在。'
      extra={
        <Button type='primary' onClick={handleToHome}>
          回到首页
        </Button>
      }
    />
  )
}
export default Page404
