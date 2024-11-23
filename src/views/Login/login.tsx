import { Button, Card, Form, Input, Typography, message } from 'antd'
import { login } from '@/api'
import { setStorage } from '@/utils'
import { UserParams } from '@/types'
import styles from './index.module.less'

const Login = () => {
  const onFinish = async (values: UserParams) => {
    const result = await login(values)
    setStorage('token', result)
    message.success('登录成功')
    const params = new URLSearchParams(location.search)
    window.location.href = params.get('callback') || '/home'
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styles.login}>
      <Card className={styles['login-wrapper']}>
        <Typography.Title className={styles.title}>系统登录</Typography.Title>
        <Form
          name='basic'
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder='请输入密码' />
          </Form.Item>

          <Form.Item>
            <Button block type='primary' htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
