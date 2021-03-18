/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 弹窗提示框
 */
import { ElMessageBox } from 'element-plus';
import { Callback } from 'element-plus/lib/el-message-box/src/message-box.type'

function messageBox(title: string, subheading: string, fn: Callback,
isHtml = false) {
  ElMessageBox.confirm(title, subheading, {
    type: 'warning',
    callback: fn,
    dangerouslyUseHTMLString: isHtml,
  })
}

export { messageBox }
