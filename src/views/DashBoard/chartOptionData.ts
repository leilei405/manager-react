import { ILineData, IPieData, IRadarData } from '@/types'
// 折线图
export const lineOptions = (data: ILineData) => {
  const config = {
    title: {
      text: '订单量/流水'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['订单', '流水']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data?.label
    },
    yAxis: {
      type: 'value'
    },
    // 数据
    series: [
      {
        name: '订单',
        type: 'line',
        stack: 'Total',
        data: data?.order
      },
      {
        name: '流水',
        type: 'line',
        stack: 'Total',
        data: data.money
      }
    ]
  }
  return { ...config }
}

// 饼图1
export const pieCityOption = (data: IPieData[]) => {
  const config = {
    title: {
      text: '司机城市分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
  return { ...config }
}

// 饼图2 半径版本
export const pieAgeOption = (data: IPieData[]) => {
  const config = {
    title: {
      text: '司机年龄分布',
      left: 'center'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '城市数据',
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data
      }
    ]
  }
  return { ...config }
}

// 雷达图
export const radarChartOption = (data: IRadarData) => {
  const config = {
    title: {
      text: '司机模拟诊断',
      left: 'center'
    },
    radar: {
      indicator: data.indicator
    },
    series: [
      {
        type: 'radar',
        data: data.data
      }
    ]
  }
  return { ...config }
}

// 暂时先注释掉
// 饼图-年龄分布配置
// const getPieAgeChart = () => {
// const pieChartAge = document.getElementById('pieChartAge')
// const chartAge = echarts.init(pieChartAge)
// }

// 雷达图配置
// const getRadarChart = () => {
// const radarChart = document.getElementById('radarChart')
// const chart = echarts.init(radarChart)
// }

// 饼图-城市分布配置
// const getPieCityChart = () => {
// const pieChartCity = document.getElementById('pieChartCity')
// const chartCity = echarts.init(pieChartCity)
// }

// 折线图信息配置
// const getLineChart = () => {
// const lineChart = document.getElementById('lineChart')
// const chart = echarts.init(lineChart)
// }
