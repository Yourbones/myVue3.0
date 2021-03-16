<template>
  <div class="home">
    <div>{{ title }}</div>
    <div>{{ path }}</div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <router-link to="/mine">&emsp;Mine</router-link>
      <router-link to="/card">&emsp;Card</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default defineComponent({
    name: 'Home',
    components: {
      HelloWorld
    },
    data() {
      return {
        title: '这里是home.vue',
        path: '/'
      }
    }
  })
</script>

<style></style>
