import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** 是否显示loading */
    showLoading?: boolean
    /** 是否显示错误提示 */
    showError?: boolean
  }
}
