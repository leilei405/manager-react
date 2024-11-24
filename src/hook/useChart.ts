import { RefObject, useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

export const useChart = (): [RefObject<HTMLDivElement>, echarts.EChartsType | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()

  useEffect(() => {
    const chart = echarts.init(chartRef.current as HTMLElement)
    setChartInstance(chart)
  }, [])

  return [chartRef, chartInstance]
}
