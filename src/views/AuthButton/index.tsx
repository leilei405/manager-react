import { useRouteLoaderData } from 'react-router-dom'
import { IAuthLoader } from '@/router/authLoader'
import { useStore } from '@/store'
import { Button } from 'antd'

const AuthButton = (props: any) => {
  const data = useRouteLoaderData('layout') as IAuthLoader
  const role = useStore(state => state.userInfo.role)
  if (!props.auth) {
    return <Button {...props}>{props.children}</Button>
  }

  // 管理员
  if (data.buttonList.includes(props.auth) || role === 1) {
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}
export default AuthButton
