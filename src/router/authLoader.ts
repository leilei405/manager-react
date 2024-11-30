import { getPermissionList } from '@/api'
import { MenuItem } from '@/types'
import { getPagePath } from '@/utils'

export interface IAuthLoader {
  buttonList: string[]
  menuList: MenuItem[]
  menuPathList: string[]
}

export default async function loadAuth() {
  const result = await getPermissionList()
  const menuPathList = getPagePath(result.menuList)
  return {
    buttonList: result.buttonList,
    menuList: result.menuList,
    menuPathList
  }
}
