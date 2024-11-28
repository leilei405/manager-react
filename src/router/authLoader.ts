import { getPermissionList } from '@/api'

export default async function loadAuth() {
  const result = await getPermissionList()

  return {
    buttonList: result.buttonList,
    menuList: result.menuList,
    menuPathList: []
  }
}
