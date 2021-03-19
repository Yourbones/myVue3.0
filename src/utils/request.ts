import axios, { AxiosInstance } from 'axios'
import LoadingManager from './loading-manager'
import { handleError } from './error-handler'
import router from '../router'

declare module 'axios' {
  interface AxiosRequestConfig {
    isLoading?: boolean;
    catchError?: boolean;
  }
}

const http: AxiosInstance = axios.create({
  baseURL: (import.meta.env.NODE_ENV === 'development' ? '' : import.meta.env.VITE_APP_API_ROOT) as string,
  isLoading: true,  // 是否加载全局 loading
  catchError: true, // 是否统一处理异常
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 默认加载全局 loading，若不需要加载则手动设置 isLoading 为 false
    // 例如：http.get(url, { isLoading: false })
    config.isLoading && LoadingManager.showFullSrceenLoading()
    config.headers['Authorization'] = localStorage.getItem('token') ? `Base ${localStorage.getItem('token')}` : ''

    return config
  },
  error => {
    // 关闭全局 loading
    error.response.config.isLoading && LoadingManager.hideFullScreenLoading()

    return handleError(error.response)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 关闭全局 loading
    response.config.isLoading && LoadingManager.hideFullScreenLoading()

    if (response.data.rc === 0) {
      // 请求成功
      return response.data
    }
    // 请求失败
    return handleError(response)
  },
  error => {
    // 关闭全局 loading
    error.response.config.isLoading && LoadingManager.hideFullScreenLoading()

    // 对响应错误做点什么
    let status = error.response.status
    if (status === 401) {
      // 跳转登录页
      router.push({ name: 'login' })
    }
    return handleError(error.response)
  }
)

export default http
