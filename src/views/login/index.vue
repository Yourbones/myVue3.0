<!--
 * @Author: wy
 * @LastEditors: Please set LastEditors
 * @Description: 登录
-->
<template>
  <div class="login-layout flex">
    <main class="login-pop">
      <h1 class="t-c login-pop__title">您好！欢迎来到懒熊管理平台</h1>
      <section class="login-pop__content t-c">
        <el-form ref="form" :rules="rules" :model="formData" label-width="0px">
          <el-form-item prop="mobilePhone" class="login-pop__content--item">
            <div class="b-b-ecec p-b-20">
              <el-input placeholder="请输入手机号码" v-model="formData.mobilePhone"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="smsCode">
            <div class="b-b-ecec p-b-20 flex">
              <el-input placeholder="请输入验证码" v-model="formData.smsCode"></el-input>
              <p
                class="t-r cursor login-pop__content--code"
                @click="getCode"
                :class="isLegal ? 'c-2ca7b3' : 'c-999'"
              >
                {{ codeText }}
              </p>
            </div>
          </el-form-item>
        </el-form>
      </section>
      <footer class="t-c login-pop__footer">
        <button class="login-pop__footer--btn" @click="loginIn()">登入</button>
      </footer>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { formValidation } from '../../utils/validate'
  import { successToast } from '../../utils/toast'
  import LoginContrl from '../../modules/login/loginControl'
  import VerifyContrl from '../../modules/verify/verifyControl'

  export default defineComponent({
    name: 'Login',
    setup() {
      const router = useRouter()
      // 表单实例
      const form = ref()

      let codeText = ref<string>('获取验证码')
      const phoneReg = ref<RegExp>(/^1[3456789]\d{9}$/)
      const formData = reactive({
        mobilePhone: '',
        smsCode: ''
      })
      const rules = reactive({
        mobilePhone: [
          {
            required: true,
            trigger: 'blur',
            validator: formValidation('phone', '请输入手机号码', '手机格式错误')
          }
        ],
        smsCode: [{ required: true, message: '请输入验证码', trigger: 'change' }]
      })
      const isLegal = computed<boolean>(() => phoneReg.value.test(formData.mobilePhone))

      async function getCode(): Promise<void> {
        if (codeText.value === '获取验证码' && isLegal) {
          await sedSmsCodeRequest()

          return countdown()
        }
      }

      function countdown(): void {
        let num: number = 60
        let timer = setInterval(() => {
          if (num === 0) {
            codeText.value = '获取验证码'
            clearInterval(timer)
            return
          }
          codeText.value = `已发送${num}s`
          num--
        }, 1000)
      }

      async function sedSmsCodeRequest(): Promise<void> {
        const { msg } = await VerifyContrl.sendSmsCodeRequest(formData.mobilePhone)

        msg && successToast(msg)
      }

      async function loginIn(): Promise<void> {
        // 发送请求成功后，页面跳转
        form.value.validate(async (valid: boolean) => {
          if (!valid) return

          await sendLoginInRequest()
          router.push({ name: 'Home' })
        })
      }

      async function sendLoginInRequest(): Promise<void> {
        const { result } = await LoginContrl.loginRequest(formData)

        localStorage.setItem('token', result.token)
        localStorage.setItem('userInfo', JSON.stringify(result.userinfo))
      }

      return {
        phoneReg,
        codeText,
        form,
        formData,
        rules,
        getCode,
        isLegal,
        loginIn,
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
