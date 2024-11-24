import { Card, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'

import styles from './index.module.less'

const DashBoard = () => {
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

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.userInfo}>
        <img className={styles.profileImg} src='http://lowcodedemo.top/logo.jpg' alt='profile' />
        <Descriptions title='Lucky 加油 早日成为技术专家' items={items} />
      </div>
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
    </div>
  )
}

export default DashBoard
