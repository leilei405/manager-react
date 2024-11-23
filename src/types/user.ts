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

// 全部转为可选类型
export type UserInfo = Partial<UserInfoC>
