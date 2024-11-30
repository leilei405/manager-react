import { requestGet, requestPost } from '@/utils'
import { CreateOrderParams, DictItem, IOrderListResult, OrderItem, OrderParams } from '@/types'

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
export const getOrderDetail = (orderId: number) => {
  return requestGet<OrderItem>(`/order/detail/${orderId}`)
}
