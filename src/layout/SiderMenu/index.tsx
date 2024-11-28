import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Menu, MenuProps } from 'antd'
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
import * as Icons from '@ant-design/icons'
import { MenuItem as MenuItems } from '@/types'
import { useStore } from '@/store'

import styles from './index.module.less'

// Menu组件类型
type MenuItem = Required<MenuProps>['items'][number]
const SiderMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { collapsed } = useStore()
  const data: any = useRouteLoaderData('layout')

  // 生成每个菜单
  const getItem = (
    label: React.ReactNode,
    key: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }

  // 动态渲染 Icon 图标
  function createIcon(icon?: string) {
    if (!icon) return <></>
    const customIcon: { [key: string]: any } = Icons
    if (customIcon[icon]) {
      return React.createElement(customIcon[icon])
    }
    return <></>
  }

  // @ts-ignore
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

  // 递归获取菜单树
  const getTreeMenu = (menuData: MenuItems[], treeList: MenuItem[] = []) => {
    menuData.forEach((item: MenuItems, index) => {
      if (item.menuType === 1) {
        if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        else
          treeList.push(
            getItem(item.menuName, item.path || index, createIcon(item.icon), getTreeMenu(item.children || []))
          )
      }
    })
    return treeList
  }

  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  // 点击跳转到首页
  const handleToHome = () => {
    navigate('/welcome')
  }

  useEffect(() => {
    const tree: any = getTreeMenu(data.menuList, [])
    setMenuList(tree)
    setSelectedKeys([pathname])
  }, [])

  return (
    <div>
      <div className={styles.logo} onClick={handleToHome}>
        <img src='http://lowcodedemo.top/logo.png' alt='logo' />
        {!collapsed && <span>后台管理</span>}
      </div>
      <Menu
        onClick={handleClickMenu}
        defaultSelectedKeys={['1']}
        style={{ width: collapsed ? 80 : 'auto' }}
        theme='dark'
        mode='inline'
        selectedKeys={selectedKeys}
        items={menuList}
      />
    </div>
  )
}

export default SiderMenu
