import React from 'react'
import { Breadcrumb, Button, Dropdown, MenuProps, message, Switch } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useStore } from '@/store'
import styles from './index.module.less'

const NavHeader = () => {
  const { userInfo, collapsed, updateCollapsed } = useStore()

  // 面包屑
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '列表'
    },
    {
      title: '应用列表'
    }
  ]

  //  下拉菜单
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: `邮箱：${userInfo.userEmail}`
    },
    {
      key: 'layout',
      label: '退出登录'
    }
  ]

  // 点击退出登录
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'layout') {
      localStorage.removeItem('token')
      window.location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else {
      message.success('点击了')
    }
  }

  // 切换菜单
  const handleToggle = () => {
    updateCollapsed(!collapsed)
  }

  return (
    <div className={styles.navHeaderWrapper}>
      {/* left */}
      <div className={styles.left}>
        <Button type='text' icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={handleToggle} />
        <Breadcrumb items={breadList} />
      </div>

      {/* right */}
      <div className={styles.right}>
        <Switch className={styles.themeSwitch} checkedChildren='暗黑' unCheckedChildren='默认' />
        <Dropdown menu={{ items, onClick }}>
          <Button type='link'>{userInfo.userName}</Button>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
