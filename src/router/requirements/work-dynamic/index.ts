/* 工作动态 */
const WORK_DYNAMIC = [
  {
    path: 'dynamic',
    name: 'Dynamic',
    component: () => import(/* webpackChunkName: "dynamic" */ '@/views/demand-pool/dynamic/index.vue'),
  },
]
export default WORK_DYNAMIC
