<!--
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 面包屑
-->
<template>
  <div>
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in route.meta.breadCrumbs" :key="index">
        <router-link v-if="item.path" :to="item.path">{{ item.name }}</router-link>
        <a v-else>{{ item.name }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { useRoute } from "vue-router"


export default defineComponent({
  name: 'BreadCrumbs',
  setup() {
    const route = useRoute()

    return {
      route,
    }
  }
})
</script>

<style lang="scss">
@import './index.scss';
</style>
