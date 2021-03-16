<template>
  <div class="card">
    <div>{{ title }}</div>
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

<style></style>
