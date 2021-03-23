/* 需求管理 */
const DEMAND = [
  {
    path: 'demand',
    name: 'Demand',
    redirect: '/demand-pool/demand/process',
    component: () => import(/* webpackChunkName: "demand" */ '@/views/demand-pool/management/index.vue'),
    children: [
      {
        path: 'process',
        name: 'Process',
        tabPath: '/demand-pool/demand/process',
        tabName: '待处理',
        component: () => import(/* webpackChunkName: "process" */ '@/views/demand-pool/management/process/index.vue'),
      },
      {
        path: 'inProgress',
        name: 'InProgress',
        tabPath: '/demand-pool/demand/inProgress',
        tabName: '进行中',
        component: () =>
          import(/* webpackChunkName: "inProgress" */ '@/views/demand-pool/management/in-progress/index.vue'),
      },
      {
        path: 'complete',
        name: 'Complete',
        tabPath: '/demand-pool/demand/complete',
        tabName: '已完成',
        component: () => import(/* webpackChunkName: "complete" */ '@/views/demand-pool/management/complete/index.vue'),
      },
      {
        path: 'respite',
        name: 'Respite',
        tabPath: '/demand-pool/demand/respite',
        tabName: '已暂缓',
        component: () => import(/* webpackChunkName: "respite" */ '@/views/demand-pool/management/respite/index.vue'),
      },
    ],
  },
]

export default DEMAND
