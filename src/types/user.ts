import { MutableRefObject } from 'react'
import { PageParams } from './common'

export interface UserInfoC {
  userImg: string
  _id: string
  userId: number
  userName: string
  userEmail: string
  mobile: string
  deptId: string
  deptName: string
  job: string
  state: number
  role: number
  createId: number
  roleList: string
}

// 查询用户列表参数
export interface QueryUserParams extends PageParams {
  userId?: string
  userName?: string
  state?: number
}

/** 全部转为可选类型 */
export type UserInfo = Partial<UserInfoC>

/** 用户列表返回类型 */
export interface IUserListResult {
  list: UserInfo[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}

/** 创建用户所传参数 */
export interface ICreateUserParams {
  userName: string
  userEmail: string
  mobile?: number
  deptId: string
  job?: string
  state: number
  roleList?: string[]
  userImg?: string
}

// 操作类型
export type IAction = 'create' | 'edit' | 'delete'
export interface IModalProp {
  modalRef: MutableRefObject<{ open: (type: IAction, data?: UserInfo) => void } | undefined>
  update: () => void
}
