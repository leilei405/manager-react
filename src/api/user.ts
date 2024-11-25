import { requestGet, requestPost } from '@/utils'
import { QueryUserParams, UserInfo, UserParams, IUserListResult } from '@/types'

// 登录
export const login = (params: UserParams) => {
  return requestPost<string>('/users/login', params, { showLoading: false, showError: false })
}

// 获取用户信息
export const getUserInfo = () => {
  return requestGet<UserInfo>('/users/getUserInfo')
}

// 获取用户列表
export const getUserListData = (params?: QueryUserParams) => {
  return requestGet<IUserListResult>('/users/list', params)
}
