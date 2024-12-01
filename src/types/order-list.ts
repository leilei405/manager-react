import { PageParams } from './common'

export interface OrderParams extends PageParams {
  orderId?: string
  userName?: string
  state?: number
}

export enum IState {
  doing = 1,
  done = 2,
  timeout = 3,
  cance = 4
}

export interface CreateOrderParams {
  cityName: string
  userName: string
  mobile: number
  startAddress: string //下单开始地址
  endAddress: string //下单结束地址
  orderAmount: number //订单金额
  userPayAmount: number //支付金额
  driverAmount: number //支付金额
  // 1: 微信 2：支付宝
  payType: number //支付方式
  driverName: string //司机名称
  vehicleName: string //订单车型
  // 1: 进行中 2：已完成 3：超时 4：取消
  state: IState // 订单状态
  // 用车时间
  useTime: string
  // 订单结束时间
  endTime: string
}

export interface OrderItem extends CreateOrderParams {
  _id: string
  orderId: string //订单ID
  route: Array<{ lng: string; lat: string }> //行驶轨迹
  createTime: string //创建时间
  remark: string //备注
}

export interface IOrderListResult {
  list: OrderItem[]
  page: {
    pageNum: number
    pageSize: number
    total: number
  }
}

export interface DictItem {
  id: number
  name: string
}

export interface OrderRoute {
  orderId: string //订单ID
  route: Array<{ lng: string; lat: string }>
}

export interface DelOrderParams {
  _id: string
}

export interface SearchOrderParams {
  orderId?: string
  userName?: string
  state?: number
}
