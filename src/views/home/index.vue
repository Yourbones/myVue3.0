<!--
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 首页
-->
<template>
  <div class="home-layout">
    <Header></Header>
    <main class="home-content t-c">
      <img class="home-content__logo" src="../../assets/home/logo.png" alt="" />
      <div class="home-content__search flex">
        <el-input class="w-500" placeholder="请输入搜索内容" v-model="search"></el-input>
        <img
          @click="$warnToast('功能正在开发中，请君耐心等待')"
          class="icon-search"
          src="../../assets/home/icon-search.png"
          alt=""
        />
      </div>
      <section>
        <ul class="t-c c-fff flex home-content__list">
          <li class="cursor home-content__item" @click="jumpToDemandPool()">
            <img class="home-content__item--icon" src="../../assets/home/icon-demand.png" alt="" />
            <p class="home-content__item--title">需求管理</p>
          </li>
          <li @click="$warnToast('功能正在开发中，请君耐心等待')" class="cursor home-content__item">
            <img class="home-content__item--icon" src="../../assets/home/icon-add.png" alt="" />
            <p class="home-content__item--title">添加</p>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header/index.vue'

export default defineComponent({
  name: 'home',
  components: {
    Header,
  },
  setup() {
    let search = ref<string>('')
    const router = useRouter()

    function jumpToDemandPool(): void {
      router.push('/demand-pool')
    }

    return {
      search,
      jumpToDemandPool,
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
