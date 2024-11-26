import { MutableRefObject } from 'react'
import { UserInfo } from './user'
import { EditParams } from './dept'
import { EditMenuParams } from './menu'

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

export type OptionsTypes = Array<{
  label?: string
  value?: number
}>

// 操作类型
export type IAction = 'create' | 'edit' | 'delete'
export interface IModalProp {
  modalRef?: MutableRefObject<{ open: (type: IAction, data?: UserInfo) => void } | undefined>
  deptRef?: MutableRefObject<{ open: (type: IAction, data?: EditParams) => void } | undefined>
  menuRef?: MutableRefObject<{ open: (type: IAction, data?: EditMenuParams) => void } | undefined>
  update: () => void
}
