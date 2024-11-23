import axios, { AxiosError } from 'axios'
import { message } from 'antd'
import { hideLoading, showLoading } from '@/views/fallback/Loading/index'
import { getStorage } from '@/utils/storage'
import env from '@/config'

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
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
    // showLoading()
    // 配置请求头
    const token = getStorage('token')
    if (token) {
      config.headers.Authorization = 'Bearer' + token
    }

    // if (import.meta.env.VITE_MOCK === 'true') {
    if (env.mock) {
      // config.baseURL = import.meta.env.VITE_MOCK_API
      config.baseURL = env.mockApi
    } else {
      // config.baseURL = import.meta.env.VITE_BASE_API
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
    // hideLoading()
    const data = response.data
    if (data.code === 500001) {
      message.error(data.msg)
      localStorage.removeItem('token')
      // location.href = '/login'
    } else if (data.code !== 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data.data
  },
  (err: AxiosError) => {
    // hideLoading()
    message.error(err.message)
    return Promise.reject(err.message)
  }
)

export default {
  get<T>(url: string, params?: any): Promise<T> {
    return instance.get(url, { params })
  },

  post<T>(url: string, data?: any): Promise<T> {
    return instance.post(url, data)
  }
}
