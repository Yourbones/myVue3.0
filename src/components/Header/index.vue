<!--
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 头部--状态栏(通知、头像等)
-->
<template>
  <div>
    <header class="flex header-layout">
      <section class="header-content__logo">
        <img
          class="cursor"
          @click="router.push('/home')"
          v-if="isShowLogo"
          src="../../assets/icon/icon-logo.svg"
          alt=""
        />
        <slot></slot>
      </section>
      <section class="header-content__status flex">
        <h2 class="header-content__title"
          >{{ greetings }}！{{ userInfo.job + '-' + userInfo.realName }}</h2
        >
        <div>
          <img
            class="icon-message"
            @click="$warnToast('功能正在开发中，请君耐心等待')"
            src="../../assets/home/icon-message.png"
            alt=""
          />
          <img
            class="icon-notice"
            @click="$warnToast('功能正在开发中，请君耐心等待')"
            src="../../assets/home/icon-notice.png"
            alt=""
          />
          <el-dropdown>
            <div>
              <img class="icon-headPortrait" src="../../assets/home/icon-headPortrait.png" alt="" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="loginOut()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </section>
    </header>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'

  interface MapKey {
    lessThan: string;
    moreThan: string;
  }
  type MapValue = () => string;

  export default defineComponent({
    name: 'Header',
    props: {
      isShowLogo: {
        type: Boolean,
        default: false
      }
    },
    setup() {
      const router = useRouter()
      const userInfo = ref<Object>({})
      let greetings = ref<string>('')
      const greetingsStatus = ref<Map<MapKey, MapValue>>(new Map([
          [
            { lessThan: '050000', moreThan: '110000' },
            () => {
              return '早上好'
            }
          ],
          [
            { lessThan: '110001', moreThan: '130000' },
            () => {
              return '中午好'
            }
          ],
          [
            { lessThan: '130001', moreThan: '190000' },
            () => {
              return '下午好'
            }
          ],
          [
            { lessThan: '190001', moreThan: '235959' },
            () => {
              return '晚上好'
            }
          ],
          [
            { lessThan: '000000', moreThan: '045959' },
            () => {
              return '夜深了'
            }
          ]
        ]))

      function getUserInfo() {
        if (localStorage.getItem('userInfo')) {
          userInfo.value = JSON.parse(localStorage.getItem('userInfo') as string)
        }
        if (!localStorage.getItem('token')) return router.push('/login')
      }

      function getTime() {
        let lessThanTimeNum: number = 10
        let hours: (number| string) = new Date().getHours()
        let mins: (number| string) = new Date().getMinutes()
        let secs: (number| string) = new Date().getSeconds()
        let timeStr: string = ''

        if (hours < lessThanTimeNum) hours = '0' + hours
        if (mins < lessThanTimeNum) mins = '0' + mins
        if (secs < lessThanTimeNum) secs = '0' + secs

        timeStr = hours.toString() + mins.toString() + secs.toString()
        getGreetings(timeStr)
      }

      function getGreetings(timeStr: string): void {
        const text = [...greetingsStatus.value].filter(
          ([key]) => timeStr >= key.lessThan && timeStr <= key.moreThan
        )
        greetings.value = text[0][1]()
      }

      function loginOut(): void {
        router.push('/login')
        localStorage.clear()
      }

      onMounted(() => {
        getTime()
        getUserInfo()
      })

      return {
        userInfo,
        greetings,
        greetingsStatus,
        loginOut,
        router,
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
