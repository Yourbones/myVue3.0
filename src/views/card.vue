<template>
  <div class="card">
    <div class="title">{{ title }}</div>
    <div>{{ path }}</div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Card',
    data() {
      return {
        title: '这是卡片页面',
        path: '/card'
      }
    }
  })
</script>

<style lang="scss" scoped>
  .card {
    border: 1px solid red;
    .title {
      background: yellow;
    }
  }
</style>>