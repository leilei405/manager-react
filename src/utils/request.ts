import axios, { AxiosError } from 'axios'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '/api',
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
    // 配置请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer' + token
    }
    return { ...config }
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  res => {
    const data = res.data
    if (data.code === 500001) {
      message.error(data.msg)
      localStorage.removeItem('token')
      location.href = '/login'
    } else if (data.code !== 0) {
      message.error(data.msg || '请求失败')
      return Promise.reject(data)
    }
    return data.data
  },
  (err: AxiosError) => {
    return Promise.reject(err)
  }
)

export default {
  get: (url: string, params: any) => {
    return axios.get(url, { params })
  },

  post: (url: string, data: any) => {
    return axios.post(url, data)
  }
}
