/* 回收站 */
const RECYCLE = [
  {
    path: 'recycle',
    name: 'Recycle',
    component: () => import(/* webpackChunkName: "recycle" */ '@/views/demand-pool/recycle/index.vue'),
  },
]
export default RECYCLE
