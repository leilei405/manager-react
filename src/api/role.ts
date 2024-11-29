import { requestGet, requestPost } from '@/utils'
import { CreateParams, IRoleListResult, RoleParams, EditRoleParams } from '@/types'

export const getRoleListData = (params?: RoleParams) => {
  return requestGet<IRoleListResult>('/roles/list', params)
}

export const createRole = (params: CreateParams) => {
  return requestPost('/roles/create', params)
}

export const updateRole = (params: EditRoleParams) => {
  return requestPost('/roles/edit', params)
}

export const deleteRole = (params: { _id: string }) => {
  return requestPost('/roles/delete', { _id: params._id })
}

export const getRoleList = () => {
  return requestPost('/roles/allList')
}
