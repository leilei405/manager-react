import { requestGet } from '@/utils'
import { IOrderListResult, OrderParams } from '@/types'

export const getOrderList = (params?: OrderParams) => {
  return requestGet<IOrderListResult>('/order/list', params)
}
