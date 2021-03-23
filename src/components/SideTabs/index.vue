<!-- 侧导航 -->
<template>
  <div>
    <main class="demand-content">
      <section class="demand-content__tab">
        <ul>
          <li
            :class="activeTabIndex === index ? item.color : item.defaultColor"
            @click="jumpToTabItem(index, item)"
            v-for="(item, index) in tabList"
            :key="index"
            class="demand-tab__item t-c cursor"
            @mouseenter="hoverItem(item)"
            @mouseleave="leaveItem(item)"
          >
            <p v-if="!item.isHover">{{ item.name }}</p>
            <p v-if="item.isHover">{{ item.dataNum }}</p>
            <span v-if="item.isHover">{{ item.name }}</span>
          </li>
        </ul>
      </section>
      <main class="demand-content__detail">
        <router-view v-on:changeTabList="changeTabList"></router-view>
      </main>
    </main>
  </div>
</template>

<script>
import sideTabList from './sideTabs.json'
export default {
  name: 'SideTabs',
  props: {
    routerList: Array,
  },
  data() {
    return {
      activeTabIndex: 0,
      tabList: [],
    }
  },
  methods: {
    changeTabList(val, index) {
      this.tabList[index].dataNum = val
    },
    jumpToTabItem(index, item) {
      this.$router.push(item.path)
      this.activeTabIndex = index
    },
    hoverItem(item) {
      item.isHover = true
    },
    leaveItem(item) {
      item.isHover = false
    },
  },
  mounted() {
    sideTabList.forEach((item, index) => {
      item.name = this.routerList.map(item => item.tabName)[index]
      item.path = this.routerList.map(item => item.tabPath)[index]
      item.dataNum = 0
    })
    this.tabList = sideTabList
    console.log(this.tabList)
    this.tabList.forEach((item, index) => {
      if (item.path === this.$route.path) {
        this.activeTabIndex = index
        return
      }
    })
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
