import { useEffect, useState } from 'react'
import { Button, Card, Descriptions, DescriptionsProps } from 'antd'
import { useChart } from '@/hook'
import { useStore } from '@/store'
import { ILineData, IPieData, IRadarData, IReportData } from '@/types'
import { getReportData, getLineData, getPieCityData, getPitAgeData, getRadarData } from '@/api'
import { statusFormat, formatMoneyRegExp, formatMoneyToLocale } from '@/utils'
import { lineOptions, pieCityOption, pieAgeOption, radarChartOption } from './chartOptionData'
import styles from './index.module.less'

const DashBoard = () => {
  const userInfo = useStore(state => state.userInfo)

  // 工作台统计数据 & 折线图数据 & 饼图数据 & 雷达图数据
  const [report, setReport] = useState<IReportData>({})
  const [lineData, setLinData] = useState<ILineData>({})
  const [pieCityData, setPieCityData] = useState<IPieData[]>([])
  const [pieAgeData, setPieAgeData] = useState<IPieData[]>([])
  const [radarData, setRadarData] = useState<IRadarData>({})

  // 图表实例
  const [lineRef, lineChart] = useChart()
  const [pieCityRef, pieCityChart] = useChart()
  const [pieAgeRef, pieAgeChart] = useChart()
  const [radarRef, radarChart] = useChart()

  // 个人信息Descriptions展示
  const items: DescriptionsProps['items'] = [
    {
      key: 'userID',
      label: '用户ID',
      children: userInfo?.createId
    },
    {
      key: 'userEmail',
      label: '邮箱',
      children: userInfo?.userEmail
    },
    {
      key: 'userStatus',
      label: '状态',
      children: statusFormat(userInfo.state!)
    },
    {
      key: 'telPhoneNumber',
      label: '手机号',
      children: userInfo.mobile || '13888888888'
    },
    {
      key: 'userPost',
      label: '岗位',
      children: userInfo.job || '前端技术专家'
    },
    {
      key: 'userDepartment',
      label: '部门',
      children: '技术研发一部'
    }
  ]

  // 获取工作台统计数据
  const getReportList = async () => {
    const result = await getReportData()
    setReport(result)
  }

  // 获取折线图信息
  const getLineChartList = async () => {
    const lineResult = await getLineData()
    setLinData(lineResult)
  }

  // 获取饼图城市信息
  const getPieCityChartData = async () => {
    const pieCityResult = await getPieCityData()
    setPieCityData(pieCityResult)
  }

  // 获取饼图年龄信息
  const getPieAgeChartData = async () => {
    const pieAgeResult = await getPitAgeData()
    setPieAgeData(pieAgeResult)
  }

  // 获取雷达图信息
  const getRadarChartData = async () => {
    const radarResult = await getRadarData()
    setRadarData(radarResult)
  }

  // 刷新图标
  const handleRefresh = (type: string) => {
    if (type === 'line') {
      getLineChartList()
    } else if (type === 'pie') {
      getPieCityChartData()
      getPieAgeChartData()
    } else if (type === 'radar') {
      getRadarChartData()
    }
  }

  // 获取工作台数据
  useEffect(() => {
    getReportList()
    getLineChartList()
    getPieCityChartData()
    getPieAgeChartData()
    getRadarChartData()
  }, [])

  // 初始化图表数据
  useEffect(() => {
    lineChart && lineChart?.setOption(lineOptions(lineData))
    pieCityChart && pieCityChart?.setOption(pieCityOption(pieCityData))
    pieAgeChart && pieAgeChart?.setOption(pieAgeOption(pieAgeData))
    radarChart && radarChart?.setOption(radarChartOption(radarData))
  }, [lineChart, pieCityChart, pieAgeChart, radarChart])

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
          <p>{formatMoneyRegExp(report.driverCount! || 0)} 个</p>
        </Card>
        <Card className={styles.card}>
          <div className={styles.title}>总流水</div>
          <p>{formatMoneyToLocale(report.totalMoney! || 0)} 元</p>
        </Card>
        <Card className={styles.card}>
          <div className={styles.title}>总订单</div>
          <p>{formatMoneyRegExp(report.orderCount! || 0)} 单</p>
        </Card>
        <Card className={styles.card}>
          <div className={styles.title}>开通城市</div>
          <p>{report.cityNum!} 座</p>
        </Card>
      </div>

      {/* 折线图展示 */}
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={() => handleRefresh('line')}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.lineChart}></div>
        </Card>
      </div>
      {/* 饼图展示 */}
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={() => handleRefresh('pie')}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieCityRef} className={styles.pieChartCity}></div>
            <div ref={pieAgeRef} className={styles.pieChartAge}></div>
          </div>
        </Card>
      </div>
      {/* 雷达图展示 */}
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={() => handleRefresh('radar')}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.radarChart}></div>
        </Card>
      </div>
    </div>
  )
}

export default DashBoard
