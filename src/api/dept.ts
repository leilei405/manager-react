import { requestGet } from '@/utils'
import { IDeptQueryParams, DeptItem } from '@/types'

// 获取工作台报表数
export const getDeptData = async (params: IDeptQueryParams) => {
  return requestGet<DeptItem[]>('/dept/list', params)
}
