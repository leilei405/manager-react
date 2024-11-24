// 折线图
export const lineOptions = {
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
    data: ['12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月']
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
      data: [120, 132, 101, 134, 90, 230, 210, 230, 210, 120, 132, 101]
    },
    {
      name: '流水',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310, 330, 310, 220, 182, 191]
    }
  ]
}

// 饼图1
export const pieCityOption = {
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
      data: [
        { value: 1048, name: '北京' },
        { value: 735, name: '上海' },
        { value: 580, name: '深圳' },
        { value: 484, name: '广州' },
        { value: 300, name: '杭州' },
        { value: 300, name: '武汉' }
      ],
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

// 饼图2 半径版本
export const pieAgeOption = {
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
      data: [
        { value: 30, name: '北京' },
        { value: 28, name: '上海' },
        { value: 26, name: '深圳' },
        { value: 24, name: '广州' },
        { value: 22, name: '杭州' },
        { value: 18, name: '武汉' }
      ]
    }
  ]
}

// 雷达图
export const radarChartOption = {
  title: {
    text: '司机模拟诊断',
    left: 'center'
  },
  radar: {
    indicator: [
      { name: '服务态度', max: 6500 },
      { name: '在线时长', max: 16000 },
      { name: '接单率', max: 30000 },
      { name: '评分', max: 38000 },
      { name: '关注度', max: 52000 }
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [5000, 14000, 28000, 26000, 42000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
}
