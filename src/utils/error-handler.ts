import { ElMessage } from 'element-plus';
import { AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosResponse {
    response?: {
      data?: {
        rc: number;
        msg: string;
      }
    };
    msg?: string;
  }
}

// 状态码错误信息
const ERROR_MESSAGE: {
  [key: number]: string;
} = {
  400: '服务器正在维护',
  401: '登录信息已失效请重新登录',
  403: '您没有执行该操作的权限',
  404: '服务器找不到请求的资源',
  500: '服务器异常，请稍后重试',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
}

// 通用异常类
class CommonError {
  status: number;
  data: string;
  rc: string;
  msg: string;

  constructor(error: AxiosResponse) {
    const { response = error, status } = error

    // 接口状态码
    this.status = status
    // 响应数据
    this.data = response.data
    // 业务状态码
    this.rc = response.data.rc || null
    // 异常信息
    this.msg = ERROR_MESSAGE[status] || response.data.msg || '服务器正在维护'
  }
}

// 异常处理函数
function handleError(error: AxiosResponse) {
  // 异常信息
  const errorMsg = ERROR_MESSAGE[error.status] || error.data.msg || '服务器正在维护'

  // 统一拦截异常状态
  if (error.config.catchError) {
    ElMessage({
      type: 'error',
      message: errorMsg,
      duration: 1000,
    })
    // 返回新的 promise 来中断原有的 promise 链，让异常停留在这一层面
    return new Promise(() => {})
  }

  // 不做统一拦截，让单个 http 调用能独自处理异常状态
  return Promise.reject(new CommonError(error))
}

export { ERROR_MESSAGE, CommonError, handleError }
