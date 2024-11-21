import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

const Page403 = () => {
  const navigate = useNavigate()

  const handleToHome = () => {
    navigate('/')
  }

  return (
    <Result
      status='403'
      title='403'
      subTitle='抱歉，你没有权限访问该页面。'
      extra={
        <Button type='primary' onClick={handleToHome}>
          回到首页
        </Button>
      }
    />
  )
}
export default Page403
