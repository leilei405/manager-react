import { requestGet, requestPost } from '@/utils'
import { CreateParams, IRoleListResult, RoleParams, EditRoleParams, RoleItem } from '@/types'

// 获取角色列表
export const getRoleListData = (params?: RoleParams) => {
  return requestGet<IRoleListResult>('/roles/list', params)
}

// 创建角色
export const createRole = (params: CreateParams) => {
  return requestPost('/roles/create', params)
}

// 编辑角色
export const updateRole = (params: EditRoleParams) => {
  return requestPost('/roles/edit', params)
}

// 删除角色
export const deleteRole = (params: { _id: string }) => {
  return requestPost('/roles/delete', { _id: params._id })
}

// 获取所有角色
export const getRoleAllList = () => {
  return requestGet<RoleItem[]>('/roles/allList')
}

// 设置角色权限
export const setRolePermission = (params: RoleItem) => {
  return requestPost('/roles/update/permission', params)
}
