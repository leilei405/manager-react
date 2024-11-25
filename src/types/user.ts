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

// 全部转为可选类型
export type UserInfo = Partial<UserInfoC>

export interface IUserListResult {
  list: UserInfo[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}
