import { requestGet } from '@/utils'
import { DriverQueryParams, IDriverListResult } from '@/types/driver'

// 查看司机列表
export const getDrivers = (params: DriverQueryParams) => {
  return requestGet<IDriverListResult>(`/order/driver/list`, params)
}
