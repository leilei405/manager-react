import { useEffect } from 'react'
import * as echarts from 'echarts'
import { Button, Card, Descriptions, DescriptionsProps } from 'antd'
import { lineOptions, pieCityOption, pieAgeOption, radarChartOption } from './chartOptionData'
import styles from './index.module.less'

const DashBoard = () => {
  // 个人信息
  const items: DescriptionsProps['items'] = [
    {
      key: 'userID',
      label: '用户ID',
      children: '00001'
    },
    {
      key: 'userEmail',
      label: '邮箱',
      children: 'fllning@163.com'
    },
    {
      key: 'userStatus',
      label: '状态',
      children: '良好'
    },
    {
      key: 'telPhoneNumber',
      label: '手机号',
      children: '18220147709'
    },
    {
      key: 'userPost',
      label: '岗位',
      children: '资深前端开发'
    },
    {
      key: 'userDepartment',
      label: '部门',
      children: '技术研发一部'
    }
  ]

  // 折线图信息
  const getLineChart = () => {
    const lineChart = document.getElementById('lineChart')
    const chart = echarts.init(lineChart)
    lineOptions && chart.setOption(lineOptions)
  }

  // 饼图-城市分布
  const getPieCityChart = () => {
    const pieChartCity = document.getElementById('pieChartCity')
    const chartCity = echarts.init(pieChartCity)
    pieCityOption && chartCity.setOption(pieCityOption)
  }

  // 饼图-年龄分布
  const getPieAgeChart = () => {
    const pieChartAge = document.getElementById('pieChartAge')
    const chartAge = echarts.init(pieChartAge)
    pieAgeOption && chartAge.setOption(pieAgeOption)
  }

  // 雷达图
  const getRadarChart = () => {
    const radarChart = document.getElementById('radarChart')
    const chart = echarts.init(radarChart)
    radarChartOption && chart.setOption(radarChartOption)
  }

  useEffect(() => {
    getLineChart()
    getPieCityChart()
    getPieAgeChart()
    getRadarChart()
  }, [])

  return (
    <div className={styles.dashboardWrapper}>
      {/* 用户信息 */}
      <div className={styles.userInfo}>
        <img className={styles.profileImg} src='http://lowcodedemo.top/logo.jpg' alt='profile' />
        <Descriptions title='Lucky 加油 早日成为技术专家' items={items} />
      </div>

      {/* 订单信息 */}
      <div className={styles.report}>
        <Card className={styles.card}>
          <div className={styles.title}>司机数量</div>
          <p>412125</p>
        </Card>
        <Card className={styles.card}>
          <div className={styles.title}>总流水</div>
          <p>412125125</p>
        </Card>
        <Card className={styles.card}>
          <div className={styles.title}>总订单</div>
          <p>412125125</p>
        </Card>
        <Card className={styles.card}>
          <div className={styles.title}>开通城市</div>
          <p>412125125</p>
        </Card>
      </div>

      {/* 折线图展示 */}
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div id='lineChart' className={styles.lineChart}></div>
        </Card>
      </div>
      {/* 饼图展示 */}
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div id='pieChartCity' className={styles.pieChartCity}></div>
            <div id='pieChartAge' className={styles.pieChartAge}></div>
          </div>
        </Card>
      </div>
      {/* 雷达图展示 */}
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div id='radarChart' className={styles.radarChart}></div>
        </Card>
      </div>
    </div>
  )
}

export default DashBoard
