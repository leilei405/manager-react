import { requestPost } from '@/utils'
import { UserParams } from '@/types'

// 登录
export const login = (params: UserParams) => {
  return requestPost('/users/login', params, { showLoading: false, showError: false })
}
