import { requestGet } from '@/utils'

// 根据城市ID 获取订单聚合数据
export const getOrderClusterData = (cityId: string | number) => {
  return requestGet<Array<{ lng: string; lat: string }>>(`/order/cluster/${cityId}`)
}
