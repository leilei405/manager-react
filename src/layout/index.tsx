import React, { useEffect } from 'react'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import { Layout, Watermark } from 'antd'
import { getUserInfo } from '@/api'
import { useStore } from '@/store'

// 布局组件 菜单 头部 底部 内容
import SliderMenu from './SiderMenu'
import NavHeader from './Header'
import Footer from './Footer'
import styles from './index.module.less'

const { Sider, Content } = Layout

const LayoutPage: React.FC = () => {
  const { updateUserInfo, collapsed } = useStore()
  const data = useRouteLoaderData('layout')

  // 获取用户信息
  const getUserInfoData = async () => {
    const result = await getUserInfo()
    updateUserInfo(result)
  }

  // 初始化用户信息
  useEffect(() => {
    getUserInfoData()
  }, [])

  return (
    <Watermark content={'Lucky'}>
      <Layout style={{ display: 'flex' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='demo-logo-vertical' />
          <SliderMenu />
        </Sider>
        <Layout>
          <NavHeader />
          <Content className={styles.mainContent}>
            <div className={styles.mainWrapper}>
              <Outlet />
            </div>
            <Footer />
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default LayoutPage
