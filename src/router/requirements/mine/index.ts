/* 我负责的 */
const MINE = [
  {
    path: 'mine',
    name: 'Mine',
    redirect: '/demand-pool/mine/process',
    component: () => import(/* webpackChunkName: "mine" */ '@/views/demand-pool/mine/index.vue'),
    children: [
      {
        path: 'process',
        name: 'Process',
        tabPath: '/demand-pool/mine/process',
        tabName: '待评估',
        component: () => import(/* webpackChunkName: "process" */ '@/views/demand-pool/mine/process/index.vue'),
      },
      {
        path: 'inProgress',
        name: 'InProgress',
        tabPath: '/demand-pool/mine/inProgress',
        tabName: '进行中',
        component: () => import(/* webpackChunkName: "inProgress" */ '@/views/demand-pool/mine/in-progress/index.vue'),
      },
      {
        path: 'complete',
        name: 'Complete',
        tabPath: '/demand-pool/mine/complete',
        tabName: '已上线',
        component: () => import(/* webpackChunkName: "complete" */ '@/views/demand-pool/mine/complete/index.vue'),
      },
      {
        path: 'respite',
        name: 'Respite',
        tabPath: '/demand-pool/mine/respite',
        tabName: '已暂缓',
        component: () => import(/* webpackChunkName: "respite" */ '@/views/demand-pool/mine/respite/index.vue'),
      },
    ],
  },
]
export default MINE
