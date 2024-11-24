import { requestGet } from '@/utils'
import { IReportData, ILineData, IPieData, IRadarData } from '@/types'

// 获取工作台报表数
export const getReportData = async () => {
  return requestGet<IReportData>('/order/dashboard/getReportData')
}

// 获取折线图数据
export const getLineData = () => {
  return requestGet<ILineData>('/order/dashboard/getLineData')
}

// 获取饼图1数据
export const getPieCityData = () => {
  return requestGet<IPieData[]>('/order/dashboard/getPieCityData')
}

// 获取饼图2数据
export const getPitAgeData = () => {
  return requestGet<IPieData[]>('/order/dashboard/getPieAgeData')
}

// 获取雷达图数据
export const getRadarData = () => {
  return requestGet<IRadarData>('/order/dashboard/getRadarData')
}
