export interface IDeptQueryParams {
  deptName?: string
}

export interface CreateParams {
  parentId?: string
  deptName: number
  userName: string
}

export interface EditParams extends CreateParams {
  _id: string
}

export interface DeptItem extends CreateParams {
  id: string
  userId: number
  createTime: string
  updateTime: string
  children?: DeptItem[]
}

// 等价于下面
export interface DeptItem {
  id: string
  parentId?: string
  createTime: string
  updateTime: string
  deptName: number
  userName: string
  children?: DeptItem[]
}
