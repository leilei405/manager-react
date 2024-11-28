import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import { Menu, MenuProps, MenuTheme } from 'antd'
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
  const [menuList, setMenuList] = useState<MenuItems[]>([])
  const navigate = useNavigate()
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

  function createIcon(icon?: string) {
    if (!icon) return <></>
    const customIcon: { [key: string]: any } = Icons
    if (customIcon[icon]) {
      return React.createElement(customIcon[icon])
    }
    return <></>
  }

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

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons
  const addIcon = (name?: string) => {
    if (!name) return <div></div>
    const icon = customIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 递归获取菜单树
  const getTreeMenu = (menuData: MenuItems[], treeList: MenuItem[] = []) => {
    menuData.forEach((item: MenuItems, index) => {
      if (item.menuType === 1) {
        if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, addIcon(item.icon)))
        else
          treeList.push(
            getItem(item.menuName, item.path || index, addIcon(item.icon), getTreeMenu(item.children || []))
          )
      }
    })
    return treeList
  }

  // 点击跳转到首页
  const handleToHome = () => {
    navigate('/welcome')
  }

  useEffect(() => {
    const tree = getTreeMenu(data.menuList, [])
    setMenuList(tree)
  }, [])

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
        items={menuList}
      />
    </div>
  )
}

export default SiderMenu
