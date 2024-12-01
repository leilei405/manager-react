import { MutableRefObject } from 'react'
import { UserInfo } from './user'
import { EditParams } from './dept'
import { EditMenuParams } from './menu'
import { RoleItem } from './role'
import { OrderItem } from './order-list'

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
  modalRef?: MutableRefObject<{ open: (type: IAction, data?: UserInfo) => void } | undefined> // 用户
  deptRef?: MutableRefObject<{ open: (type: IAction, data?: EditParams) => void } | undefined> // 部门
  menuRef?: MutableRefObject<{ open: (type: IAction, data?: EditMenuParams) => void } | undefined> // 菜单
  roleRef?: MutableRefObject<{ open: (type: IAction, data?: RoleItem) => void } | undefined> // 角色
  permissionRef?: MutableRefObject<{ open: (type: IAction, data?: RoleItem) => void } | undefined> // 权限
  orderRef?: MutableRefObject<{ open: (type: IAction, data?: OrderItem) => void } | undefined> // 订单
  detailRef?: MutableRefObject<{ open: (data?: OrderItem) => void } | undefined> // 订单详情
  markerRef?: MutableRefObject<{ open: (data?: OrderItem) => void } | undefined> // 订单轨迹地图
  update: () => void
}
