import { PageParams } from './common'

export interface RoleParams extends PageParams {
  roleName?: string
}

export interface CreateParams {
  roleName: string
  remark?: string
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

export interface CreatePermission {
  _id: string
  permissionList: {
    checkedKeys: string[]
    halfCheckedKeys: string[]
  }
}

export interface EditRoleParams extends CreateParams {
  _id: string
}

export interface DelRoleParams {
  _id: string
}

export interface IRoleListResult {
  list: RoleItem[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}
