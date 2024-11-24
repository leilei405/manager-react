import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import {
  DesktopOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
  SendOutlined,
  TrademarkCircleOutlined,
  BarsOutlined,
  CloudOutlined,
  DotChartOutlined,
  PayCircleOutlined
} from '@ant-design/icons'
import { useStore } from '@/store'

import styles from './index.module.less'

const SiderMenu = () => {
  const navigate = useNavigate()
  const { collapsed } = useStore()

  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />
    },
    {
      label: '用户管理',
      key: '2',
      icon: <UsergroupAddOutlined />,
      children: [
        {
          label: '用户列表',
          key: '2-1',
          icon: <UserOutlined />
        },
        {
          label: '菜单管理',
          key: '2-2',
          icon: <MenuOutlined />
        },
        {
          label: '角色管理',
          key: '2-3',
          icon: <TrademarkCircleOutlined />
        },
        {
          label: '部门管理',
          key: '2-4',
          icon: <SendOutlined />
        }
      ]
    },
    {
      label: '订单管理',
      key: '3',
      icon: <CloudOutlined />,
      children: [
        {
          label: '订单列表',
          key: '3-1',
          icon: <BarsOutlined />
        },
        {
          label: '订单聚合',
          key: '3-2',
          icon: <DotChartOutlined />
        },
        {
          label: '司机列表',
          key: '3-3',
          icon: <PayCircleOutlined />
        }
      ]
    }
  ]

  // 点击跳转到首页
  const handleToHome = () => {
    navigate('/welcome')
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleToHome}>
        <img src='http://lowcodedemo.top/logo.png' alt='logo' />
        {!collapsed && <span>后台管理</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        style={{ width: collapsed ? 80 : 'auto' }}
        theme='dark'
        mode='inline'
        items={items}
      />
    </div>
  )
}

export default SiderMenu
