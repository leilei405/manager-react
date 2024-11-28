import { requestGet } from '@/utils'
import { IRoleListResult, RoleParams } from '@/types'

export const getRoleListData = (params?: RoleParams) => {
  return requestGet<IRoleListResult>('/roles/list', params)
}
