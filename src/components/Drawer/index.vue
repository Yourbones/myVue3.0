<!-- 右抽屉 -->
<template>
  <div class="drawer-layout" :class="maskClass" @click="closeDrawer()">
    <div class="drawer-content" :class="contentClass" @click.stop="111">
      <header v-if="isShowBaseInfor" class="drawer-header">
        <div class="flex drawer-header__top">
          <h1 class="drawer-header__title c-333">
            <span style="margin-right: 10px;">{{ baseInfor.code }}</span>
            {{ baseInfor.title }}
          </h1>
          <h4 class="c-999 drawer-header__subTitle">
            紧急程度：<span :class="emergencyLevel[baseInfor.emergencyLevel]">{{ baseInfor.emergencyLevelStr }}</span>
          </h4>
        </div>
        <h6 class="t-r f-w-400 c-2ca7b3" style="float: right; margin-top: 15px;">{{ stageMap[baseInfor.stage] }}</h6>
      </header>
      <main class="drawer-body">
        <div v-if="isShowBaseInfor">
          <section class="drawer-body__content">
            <p class="c-666 m-b-20" v-if="baseInfor.aliasCode">代号：{{ baseInfor.aliasCode }}</p>
            <p class="c-666 m-b-20">
              <span class="m-r-40">提出人：{{ baseInfor.createdUserName }}</span>
              <span class="m-r-40">提出时间：{{ baseInfor.createdTime }}</span>
              <span v-if="baseInfor.productOwnerName">产品负责人：{{ baseInfor.productOwnerName }}</span>
            </p>
            <p class="c-666 m-b-20">
              <span class="m-r-40">业务系统：{{ baseInfor.businessSystemStr }}</span>
              <span>需求类别：{{ baseInfor.typeStr }}</span>
            </p>
            <p class="c-666 m-b-20">期望完成时间：{{ baseInfor.expectCompleteTime }}</p>
            <p class="c-666 m-b-20" v-if="baseInfor.estimatedTime">截止时间：{{ baseInfor.estimatedTime }}</p>
            <p class="c-666">使用角色：{{ baseInfor.useRoleListStr }}</p>
          </section>
          <section class="drawer-body__description">
            <div class="m-b-20">
              <h6 class="m-b-10">目的：</h6>
              <div class="drawer-body__description--content f-w-400 c-666 f-s-14">
                {{ baseInfor.purpose }}
              </div>
            </div>
            <div class="m-b-20">
              <h6 class="m-b-10">描述：</h6>
              <div class="drawer-body__description--content f-w-400 c-666 f-s-14">
                {{ baseInfor.description }}
              </div>
            </div>
            <div class="m-b-20" v-if="baseInfor.emergencyReason && baseInfor.emergencyLevel === 1">
              <h6 class="m-b-10">紧急原因：</h6>
              <div class="drawer-body__description--content f-w-400 c-666 f-s-14">
                {{ baseInfor.emergencyReason }}
              </div>
            </div>
            <div class="m-b-20" v-if="baseInfor.impactEvaluate && baseInfor.emergencyLevel === 1">
              <h6 class="m-b-10">影响评估面：</h6>
              <div class="drawer-body__description--content f-w-400 c-666 f-s-14">
                {{ baseInfor.impactEvaluate }}
              </div>
            </div>
            <div class="m-b-20" v-if="baseInfor.productOverview">
              <h6 class="m-b-10">产品综述：</h6>
              <div class="drawer-body__description--content f-w-400 c-666 f-s-14">
                {{ baseInfor.productOverview }}
              </div>
            </div>
            <div class="m-b-20 b-b-1" v-if="baseInfor.meetingDescr">
              <h6 class="m-b-10">会议纪要：</h6>
              <div class="drawer-body__description--content f-w-400 c-666 f-s-14">
                {{ baseInfor.meetingDescr }}
              </div>
            </div>
          </section>
        </div>
        <section>
          <slot name="otherContent"></slot>
        </section>
      </main>
      <footer class="drawer-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
import { DemandContrl } from '@/modules/demand/management/indexContrl'
export default {
  name: 'Drawer',
  data() {
    return {
      stageMap: {
        0: '产品设计中...',
        1: 'UI设计中...',
        2: '开发中...',
        3: '测试中...',
        4: '上线中...',
      },
      baseInfor: {},
      isShow: false,
      isShowBaseInfor: true,
      emergencyLevel: DemandContrl.emergencyLevelMap,
    }
  },
  computed: {
    maskClass() {
      return this.isShow ? 'mask-show' : 'mask-hidden'
    },
    contentClass() {
      return this.isShow ? 'mask-content__show' : 'mask-content__hidden'
    },
  },
  methods: {
    show(baseInfor, isShowBaseInfor) {
      this.isShow = true
      this.stopMove()
      this.baseInfor = baseInfor
      typeof isShowBaseInfor === 'boolean' ? (this.isShowBaseInfor = isShowBaseInfor) : ''
    },
    closeDrawer() {
      this.isShow = false
      this.baseInfor = {}
      this.startMove()
      this.$emit('closeDrawer', '')
    },
    stopMove() {
      document.body.style.overflow = 'hidden'
    },
    startMove() {
      document.body.style.overflow = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
