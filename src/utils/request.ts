import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
  timeoutErrorMessage: '请求超时, 请稍后再试',
  withCredentials: true // 默认跨域
})

export default {
  get: (url: string, params: any) => {
    return axios.get(url, { params })
  },

  post: (url: string, data: any) => {
    return axios.post(url, data)
  }
}

// 响应拦截器
// instance.interceptors.response.use(
//   res => {
//     return res.data
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

// 封装请求
// export const request = (options: any) => {
//   options.method = options.method || 'get'
//   if (options.method.toLowerCase() === 'get') {
//     options.params = options.data
//   }
//   let isMock = false
//   if (typeof options.mock !== 'undefined') {
//     isMock = options.mock
//   }
//   if (isMock) {
//     const result = {
//       status: 200,
//       message: 'success',
//       data: options.data
//     }
//     return result
//   } else {
//     return instance(options)
//   }
// }
