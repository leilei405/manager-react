import { PageParams } from './common'

export interface RoleParams extends PageParams {
  roleName?: string
}

export interface RoleItem {
  permissionList?: {
    checkedKeys?: string[]
    halfCheckedKeys?: string[]
  }
  _id?: string
  roleName?: string
  remark?: string
  createId?: number
  updateTime?: string
  createTime?: string
}

export interface IRoleListResult {
  list: RoleItem[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}
