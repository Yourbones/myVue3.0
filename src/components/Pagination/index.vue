<!--
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 分页组件
-->
<template>
  <div>
    <footer class="t-r">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: Number,
    size: Number,
    total: Number,
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.$emit('listRequest', currentPage, '')
    },
  },
}
</script>

<style lang="scss" scoped></style>
