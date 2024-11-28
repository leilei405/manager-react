import { getPermissionList } from '@/api'
import { getPagePath } from '@/utils'

export default async function loadAuth() {
  const result = await getPermissionList()
  const menuPathList = getPagePath(result.menuList)
  return {
    buttonList: result.buttonList,
    menuList: result.menuList,
    menuPathList
  }
}
