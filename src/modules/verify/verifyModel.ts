/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 短信码
 */
import http from '../../utils/request'

class VerifyModel {
  /**
   * @description: 短信验证码
   * @method post
   * @file yapi 'http://192.168.137.12:3000/project/49/interface/api/2189'
   * 入参
   * @param {string} phone 手机号
   * 返回
   * @type {string} msg '发送成功‘
   * @property {string} msg
   * @return {msg} msg返回内容
   */
  static async sendSmsCodeRequest(phone: string) {
    const { msg } = await http.post('/efficacy/common/sms_code_send', { mobilePhone: phone }, { isLoading: false })
    return { msg }
  }
}
export default VerifyModel
