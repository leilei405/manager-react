import { MutableRefObject } from 'react'
import { UserInfo } from './user'
import { EditParams } from './dept'

// 响应结构
export interface IResult<T = any> {
  code: number
  data: T
  msg: string
}

// 分页参数
export interface PageParams {
  pageNum?: number
  pageSize?: number
}

// 操作类型
export type IAction = 'create' | 'edit' | 'delete'
export interface IModalProp {
  modalRef?: MutableRefObject<{ open: (type: IAction, data?: UserInfo) => void } | undefined>
  deptRef: MutableRefObject<{ open: (type: IAction, data?: EditParams) => void } | undefined> | null | undefined
  update?: () => void
}
