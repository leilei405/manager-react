import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import { hideLoading, showLoading } from '@/views/fallback/Loading'
import { getStorage, removeStorage } from '@/utils'
import { IResult } from '@/types'
import env from '@/config'

// 创建axios实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试',
  withCredentials: true, // 默认跨域
  headers: {
    icode: '83ED095F04E97C39'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.showLoading) showLoading()
    const token = getStorage('token')

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    if (env.mock) {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: IResult = response.data
    hideLoading()
    if (response.config.responseType === 'blob') return response
    if (data.code === 500001) {
      message.error(data.msg)
      removeStorage('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    } else if (data.code !== 0) {
      if (response.config.showError === false) {
        return Promise.resolve(data)
      } else {
        message.error(data.msg)
        return Promise.reject(data)
      }
    }
    return data.data
  },
  (err: AxiosError) => {
    hideLoading()
    message.error(err.message)
    return Promise.reject(err.message)
  }
)

interface IConfig {
  /** 是否显示loading */
  showLoading?: boolean
  /** 是否显示错误提示 */
  showError?: boolean
}

export const requestGet = <T>(
  url: string,
  params?: object,
  options: IConfig = { showLoading: true, showError: true }
): Promise<T> => {
  return instance.get(url, { params, ...options })
}

export const requestPost = <T>(
  url: string,
  data?: object,
  options: IConfig = { showLoading: true, showError: true }
): Promise<T> => {
  return instance.post(url, data, options)
}

//  下载文件
export const downLoadFile = (url: string, data?: any, fileName = 'fileName.xlsx') => {
  return instance({ url, data, method: 'post', responseType: 'blob' }).then(res => {
    const blob = new Blob([res.data], {
      type: res.data.type
    })
    const name = (res.headers['file-name'] as string) || fileName
    const link = document.createElement('a') // 创建a标签
    const objectUrl = URL.createObjectURL(blob) // 创建下载链接
    link.href = objectUrl // href指向下载链接
    link.download = decodeURIComponent(name) // 下载后文件名
    link.click() // 点击下载
    document.body.removeChild(link) // 下载完成移除元素
    URL.revokeObjectURL(objectUrl) // 释放掉blob对象
  })
}
