/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 校验相关
 */
interface Validate {
  [key: string]: (str: string) => boolean;
}
const validate: Validate = {
  phone: function(str: string): boolean {
    const reg = /^1[3456789]\d{9}$/

    return reg.test(str)
  },
}

interface ValidateValue {
  (validateName: string, emptyMsg: string, errorMsg: string): (rule: any, value: string, callback: Function) => void
}
export const formValidation: ValidateValue = (validateName, emptyMsg, errorMsg) => async (rule, value, callback) => {
  if (!value) {
    console.log('The value is empty!');
    callback(new Error(emptyMsg))
  } else if (await validate[validateName](value)) {
    console.log('The value is correct!');
    callback()
  } else {
    console.log('OPs, there is an error!');
    callback(new Error(errorMsg))
  }
}
