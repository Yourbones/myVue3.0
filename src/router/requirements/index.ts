/*
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 需求管理
 */
import DEMAND from './demand'
import MINE from './mine'
import RECYCLE from './recycle'
import WORK_DYNAMIC from './work-dynamic'

const DEMAND_POOL = [
  {
    path: '/demand-pool',
    redirect: '/demand-pool/demand',
    component: () => import(/* webpackChunkName: "demandPool" */ '@/views/demand-pool/index.vue'),
    children: [...DEMAND, ...RECYCLE, ...MINE, ...WORK_DYNAMIC],
  },
  {
    path: '/demand-pool-addEdit',
    name: 'demandAddEdit',
    component: () => import(/* webpackChunkName: "demandAddEdit" */ '@/views/demand-pool/add-edit/index.vue'),
    meta: {
      breadCrumbs: [
        { name: '需求列表', path: '/demand-pool/demand' },
        { name: '提需求', path: '' },
      ],
    },
    beforeEnter: (to, from, next) => {
      Object.keys(to.query).length
        ? (to.meta.breadCrumbs[1].name = '修改需求')
        : (to.meta.breadCrumbs[1].name = '新需求')

      next()
    },
  },
]
export default DEMAND_POOL
