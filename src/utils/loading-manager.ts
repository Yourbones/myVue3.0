import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

let loadingCount: number = 0
let loading: ILoadingInstance

interface Loading {
  startLoading(): void;
  closeLoading(): void;
  showFullSrceenLoading(): void;
  hideFullScreenLoading(): void;
}

const LoadingManager: Loading = {
  startLoading: function () {
    loading = ElLoading.service({
      lock: true,
      text: '正在加载',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  },

  closeLoading: function () {
    loading.close()
  },

  showFullSrceenLoading: function () {
    if (loadingCount === 0) {
      LoadingManager.startLoading()
    }
    loadingCount++
  },

  hideFullScreenLoading: function () {
    // 添加延时，防止多次间隔很短的请求造成的页面闪烁
    setTimeout(() => {
      if (loadingCount <= 0) return
      
      loadingCount--
      if (loadingCount === 0) {
        LoadingManager.closeLoading()
      }
    }, 100)
  },
}

export default LoadingManager
