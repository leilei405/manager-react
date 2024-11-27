import { requestGet, requestPost } from '@/utils'
import { CreateMenuParams, EditMenuParams, MenuItem, MenuParams } from '@/types'

// 获取菜单列表
export const getMenuList = (params: MenuParams) => {
  return requestGet<MenuItem[]>('/menu/list', params)
}

// 新增菜单
export const createMenu = (params: CreateMenuParams) => {
  return requestPost('/menu/create', params)
}

// 更新菜单
export const updateMenu = (params: EditMenuParams) => {
  return requestPost('/menu/update', params)
}

// 删除菜单
export const deleteMenu = (params: { _id: string }) => {
  return requestPost('/menu/delete', params)
}
