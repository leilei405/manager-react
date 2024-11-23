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
    showLoading()
    // 配置请求头
    const token = getStorage('token')
    if (token) {
      config.headers.Authorization = 'Bearer' + token
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
    hideLoading()
    const data: IResult = response.data
    if (data.code === 500001) {
      message.error(data.msg)
      removeStorage('token')
      location.href = '/login'
    } else if (data.code !== 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  (err: AxiosError) => {
    hideLoading()
    message.error(err.message)
    return Promise.reject(err.message)
  }
)

export const requestGet = <T>(url: string, params?: any): Promise<T> => {
  return instance.get(url, { params })
}

export const requestPost = <T>(url: string, data?: any): Promise<T> => {
  return instance.post(url, data)
}
