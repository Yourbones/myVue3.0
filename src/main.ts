import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { AxiosInstance } from 'axios'
// 二次封装的 axios 实例
import http from './utils/request'

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
  }
}

const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.config.globalProperties.$http = http

app.mount('#app')
