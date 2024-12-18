import { useState } from 'react'
import { Button, Card, Form, Input, Typography, message } from 'antd'
import { login } from '@/api'
import { setStorage } from '@/utils'
import { UserParams } from '@/types'
import { useStore } from '@/store'
import styles from './index.module.less'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const updateToken = useStore(state => state.updateToken)

  const onFinish = async (values: UserParams) => {
    try {
      setLoading(true)
      const result = await login(values)
      setLoading(false)
      // store.token = result // 存储token  resso
      updateToken(result) // 存储token  zustand
      setStorage('token', result) // 存储token localstorage
      message.success('登录成功')
      const params = new URLSearchParams(location.search)
      setTimeout(() => {
        window.location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
      message.error('登录失败')
    }
  }

  return (
    <div className={styles.login}>
      <Card className={styles['login-wrapper']}>
        <Typography.Title className={styles.title}>系统登录</Typography.Title>
        <Form name='basic' style={{ maxWidth: 600 }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder='请输入密码' />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} block type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
