import { requestGet } from '@/utils'
import { IReportData } from '@/types'

// 获取工作台报表数
export const getReportData = async () => {
  return requestGet<IReportData>('/order/dashboard/getReportData')
}

// 获取折线图数据
export const getLineData = () => {
  return requestGet('/order/dashboard/getLineData')
}

// 获取饼图1数据
export const getPieCityData = () => {
  return requestGet('/order/dashboard/getPieCityData')
}

// 获取饼图2数据
export const getPitAgeData = () => {
  return requestGet('/order/dashboard/getPieAgeData')
}

// 获取雷达图数据
export const getRadarData = () => {
  return requestGet('/order/dashboard/getRadarData')
}
