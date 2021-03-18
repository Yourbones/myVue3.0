/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description:
 */
import http from '../../utils/request'

interface LoginParams {
  mobilePhone: string;
  smsCode: string;
}

class LoginModel {
  /**
   * @description: 登入
   * @method post
   * @file yapi http://192.168.137.12:3000/project/49/interface/api/2199
   * 入参
   * @param {Object} params
   * @param {string} params.mobilePhone
   * @param {string} params.smsCode
   * 返回
   * @type {Object} result
   * @property {Object} userinfo
   * @property {string} userinfo.id
   * @property {string} userinfo.avatar 头像
   * @property {string} userinfo.userCode 用户编码
   * @property {string} userinfo.employeeNo 员工号
   * @property {string} userinfo.nickName 昵称
   * @property {string} userinfo.mobilePhone 手机号
   * @property {string} userinfo.email 邮箱
   * @property {stirng} userinfo.realName 姓名
   * @property {string} userinfo.sex 性别
   * @property {string} userinfo.birthday 生日
   * @property {string} userinfo.organization 隶属组织
   * @property {string} userinfo.department 所属部门
   * @property {string} userinfo.workGroup 工作组
   * @property {string} userinfo.workPlace 工作地点
   * @property {string} userinfo.job 岗位
   * @property {string} userinfo.dutyHospital 驻点医院
   * @property {string} userinfo.reimbursementLevel 报销级别
   * @property {string} userinfo.directLeader 直系领导
   * @property {string} userinfo.jobLevel 岗位级别
   * @property {string} userinfo.workDegree 工作性质
   * @property {string} userinfo.entryDate 入职时间
   * @property {string} token 权鉴
   * @return {result} result返回内容
   */
  static async sendLoginRequest(params: LoginParams) {
    const { data: result } = await http.post('/efficacy/login/sms_code', params)
    return { result }
  }
}

export default LoginModel
