import { requestGet, requestPost } from '@/utils'
import { QueryUserParams, UserInfo, UserParams, IUserListResult, ICreateUserParams, UserItem, MenuItem } from '@/types'

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

// 所有用户列表
export const getAllUserList = async () => {
  return requestGet<UserItem[]>('/users/all/list')
}

// 创建用户
export const createUser = (params: ICreateUserParams) => {
  return requestPost('/users/create', params)
}

// 编辑用户
export const editUser = (params: ICreateUserParams) => {
  return requestPost('/users/edit', params)
}

// 删除用户 批量删除
export const deleteUser = (params: { userIds: number[] }) => {
  console.log('debugger', params)
  return requestPost('/users/delete', { userIds: params.userIds })
}

// 权限列表
export const getPermissionList = () => {
  return requestGet<{ buttonList: string[]; menuList: MenuItem[] }>('/users/getPermissionList')
}
