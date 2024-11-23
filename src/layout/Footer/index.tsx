import { Button, Divider } from 'antd'
import styles from './index.module.less'

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.top}>
        <Button type='link' target='_blank' href='https://github.com/leilei405' children='个人主页' />
        <Divider type='vertical' />

        <Button type='link' target='_blank' href='https://github.com/leilei405' children='React 后台项目' />
        <Divider type='vertical' />

        <Button type='link' target='_blank' href='https://github.com/leilei405' children='Vue2 后台项目' />
        <Divider type='vertical' />

        <Button type='link' target='_blank' href='https://github.com/leilei405' children='Vue3 后台项目' />
        <Divider type='vertical' />

        <Button type='link' target='_blank' href='https://github.com/leilei405' children='个人博客' />
        <Divider type='vertical' />

        <Button type='link' target='_blank' href='https://github.com/leilei405' children='个人主页' />
      </div>
      <div className={styles.bottom}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</div>
    </div>
  )
}

export default Footer
