/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 短信码
 */
import VerifyModel from './verifyModel'

class VerifyContrl {
  static async sendSmsCodeRequest(phone: string) {
    const { msg } = await VerifyModel.sendSmsCodeRequest(phone)
    return { msg }
  }
}
export default VerifyContrl
