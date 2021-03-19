import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from './router'
import ElementPlus from 'element-plus'
import { AxiosInstance } from 'axios'
// 二次封装的 axios 实例
import http from './utils/request'
import { successToast, warnToast } from './utils/toast'
import { IMessageHandle } from 'element-plus/lib/el-message/src/types'

import './styles/index.scss'

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
    $successToast: (text: string) => IMessageHandle;
    $warnToast: (text: string) => IMessageHandle;
  }
}

const app = createApp(App)

// 手动使用插件
app.use(store, key)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

// 添加全局实例方法
app.config.globalProperties.$http = http
app.config.globalProperties.$successToast = successToast
app.config.globalProperties.$warnToast = warnToast

app.mount('#app')
