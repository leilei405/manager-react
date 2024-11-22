/**
 * @description 通用工具函数封装
 */

// 格式化金额 使用 toLocaleString 方法
// 缺点：只针对数字类型的金额
type IMoneyType = number | string
type ICountryType = 'CN' | 'US' | 'JP' | 'KR' | 'CNY' | 'USD' | 'JPY' | 'KRW'

export const formatMoneyToLocale = (num: number | string) => {
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
