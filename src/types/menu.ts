export interface MenuParams {
  menuName?: string
  menuState?: number
}

export interface CreateMenuParams {
  menuName: string // 菜单名称
  icon?: string // 菜单图标
  menuType: number // 1: 菜单 2：按钮 3：页面
  menuState: number // 1：正常 2：停用
  menuCode?: string // 按钮权限标识
  parentId?: string // 父级菜单ID
  path?: string // 菜单路径
  component?: string // 组件名称
  orderBy: number // 组件排序
}

export interface EditMenuParams extends CreateMenuParams {
  _id?: string
}

export interface MenuItem {
  _id: string
  menuType: number
  menuName: string
  path: string
  icon: string
  orderBy: number
  menuState: number
  parentId: string
  createId: number
  createTime: string
  updateTime: string
  children?: MenuItem[]
  buttons?: MenuItem[]
}
