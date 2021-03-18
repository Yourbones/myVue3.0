/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: toast提示
 */
import { ElMessage } from 'element-plus';
import { IMessageHandle } from 'element-plus/lib/el-message/src/types';

function successToast(text: string): IMessageHandle {
  return ElMessage({
    message: text,
    type: 'success',
  })
}

function warnToast(text: string): IMessageHandle {
  return ElMessage({
    message: text,
    type: 'warning',
  })
}

export { successToast, warnToast }
