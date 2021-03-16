<template>
  <div class="mine">
    <div>{{ title }}</div>
    <div>{{ path }}</div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Mine',
    data() {
      return {
        title: '这里属于mine.vue',
        path: '/mine'
      }
    }
  })
</script>

<style></style>
