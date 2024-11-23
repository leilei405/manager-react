import styles from './index.module.less'

const Welcome = () => {
  return (
    <div className={styles.welcomeWrapper}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎使用体验 让非技术人员也能轻松开发应用</div>
        <div className={styles.title}>React18 通用后台管理系统</div>
        <div className={styles.desc}>React18 + ReactRouter6.0 + AntD5.2 + TypeScript + Vite 实现通用后台</div>
      </div>
      <div className={styles.bImg} />
    </div>
  )
}

export default Welcome
