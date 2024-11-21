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
      status='500'
      title='500'
      subTitle='对不起，服务器出错了。'
      extra={
        <Button type='primary' onClick={handleToHome}>
          回到首页
        </Button>
      }
    />
  )
}
export default Page404
