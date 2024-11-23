/**
 * @description 通用工具函数封装
 */

// 格式化金额 使用 toLocaleString 方法
// 缺点：只针对数字类型的金额
type IMoneyType = number | string
export const formatMoneyToLocale = (num: IMoneyType) => {
  const numStr = parseFloat(num.toString())
  if (isNaN(numStr)) {
    throw new Error('请输入合法数字金额')
  }
  return numStr.toLocaleString('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  })
}

//  格式化数字 使用正则方式
export const formatMoneyRegExp = (num: IMoneyType) => {
  const numStr = num.toString()

  // 匹配整数部分的正则
  const strRegExp = /(\d)(?=(\d{3})+$)/g

  // 匹配小数部分的正则
  const indexOfDropRegExp = /(\d)(?=(\d{3})+\.)/g

  if (numStr.indexOf('.') > -1) {
    return numStr.replace(indexOfDropRegExp, '$1,')
  }
  return numStr.replace(strRegExp, '$1,')
}

// 格式化日期 toLocaleDateString
export const formatDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) {
    curDate = date
  }
  if (rule === 'yyyy-mm-dd') {
    return curDate.toLocaleDateString().replaceAll('/', '-')
  }
  if (rule === 'hh:mm:ss') {
    return curDate.toLocaleTimeString().replaceAll('/', '-')
  }
  return curDate.toLocaleString().replaceAll('/', '-')
}

// 格式化日期 使用正则方式
export const formatDate2 = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) {
    curDate = date
  }
  let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear() + '')

  const dateMap: { [key: string]: number } = {
    'M+': curDate.getMonth() + 1, // 月份
    'd+': curDate.getDate(), // 日
    'h+': curDate.getHours(), // 小时
    'm+': curDate.getMinutes(), // 分
    's+': curDate.getSeconds() // 秒
  }
  for (const key in dateMap) {
    if (new RegExp(`(${key})`).test(fmt)) {
      const value = dateMap[key] + ''
      fmt = fmt.replace(new RegExp(`(${key})`, 'g'), value.length === 1 ? `0${value}` : value)
    }
  }
  return fmt
}