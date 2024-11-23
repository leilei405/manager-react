import { requestGet, requestPost } from '@/utils'
import { UserInfo, UserParams } from '@/types'

// 登录
export const login = (params: UserParams) => {
  return requestPost<string>('/users/login', params, { showLoading: false, showError: false })
}

// 获取用户信息
export const getUserInfo = () => {
  return requestGet<UserInfo>('/users/getUserInfo')
}
