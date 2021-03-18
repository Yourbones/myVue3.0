/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 登录
 */
import LoginModel from './loginModel'

interface LoginParams {
  mobilePhone: string;
  smsCode: string;
}
class LoginContrl {
  static async loginRequest(params: LoginParams) {
    const { result } = await LoginModel.sendLoginRequest(params)
    return { result }
  }
}

export default LoginContrl
