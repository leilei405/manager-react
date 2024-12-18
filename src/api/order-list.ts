import { downLoadFile, requestGet, requestPost } from '@/utils'
import {
  CreateOrderParams,
  DelOrderParams,
  DictItem,
  IOrderListResult,
  OrderItem,
  OrderParams,
  OrderRoute,
  SearchOrderParams
} from '@/types'

// 获取订单列表
export const getOrderList = (params?: OrderParams) => {
  return requestGet<IOrderListResult>('/order/list', params)
}

// 获取城市列表
export const getCityList = () => {
  return requestGet<DictItem[]>('/order/cityList')
}

// 获取车型列表
export const getVehicleList = () => {
  return requestGet<DictItem[]>('/order/vehicleList')
}

// 创建订单
export const createOrder = (params: CreateOrderParams) => {
  return requestPost('/order/create', params)
}

// 获取订单详情
export const getOrderDetail = (orderId: string) => {
  return requestGet<OrderItem>(`/order/detail/${orderId}`)
}

// 更新订单
export const updateOrder = (params: OrderRoute) => {
  return requestPost(`/order/edit`, params)
}

// 删除订单
export const deleteOrder = (params: DelOrderParams) => {
  return requestPost('/order/delete', { _id: params._id })
}

// 订单导出
export const exportOrder = (params: SearchOrderParams) => {
  return downLoadFile('/order/orderExport', params, '订单列表')
}
