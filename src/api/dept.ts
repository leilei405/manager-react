import { requestGet, requestPost } from '@/utils'
import { IDeptQueryParams, CreateParams, EditParams, DeptItem } from '@/types'

// 获取部门数据
export const getDeptData = async (params?: IDeptQueryParams) => {
  return requestGet<DeptItem[]>('/dept/list', params)
}

// 新增部门数据
export const createDeptData = async (params: CreateParams) => {
  return requestPost('/dept/create', params)
}

// 修改部门数据
export const updateDeptData = async (params: EditParams) => {
  return requestPost('/dept/edit', params)
}

// 删除部门数据
export const deleteDeptData = async (params: { _id: EditParams['_id'] }) => {
  return requestPost('/dept/delete', params)
}
