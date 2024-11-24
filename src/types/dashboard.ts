/** 工作台类型定义 */
export interface IReportData {
  driverCount?: number
  totalMoney?: number
  orderCount?: number
  cityNum?: number
}

/** 折线图类型定义 */
export interface ILineData {
  label?: string[]
  order?: number[]
  money?: number[]
}

/** 饼图类型定义 */
export interface IPieData {
  label?: string
  value?: number
}

/** 雷达图图类型定义 */
export interface IRadarData {
  indicator?: Array<{ name: string; max: number }>
  data?: {
    value?: number[]
    name?: string
  }
}
