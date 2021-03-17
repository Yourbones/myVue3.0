import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios, { AxiosInstance } from 'axios'

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $http: AxiosInstance;
  }
}

const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.config.globalProperties.$http = axios

app.mount('#app')
