<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <el-icon> <el-icon-user></el-icon-user></el-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <el-icon></el-icon>  去掉这个 就 加回class="el-icon" -->
          <el-icon-lock class="el-icon"></el-icon-lock>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        />
        <span class="show-pwd">
          <span class="svg-container">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
              @click="onChangePwdType"
            />
          </span>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { validatePassword } from './rules'
import { useUserStore } from '@/store/userStore'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

interface RuleForm {
  username: string
  password: string
}

// 数据源
const loginForm = ref({
  username: 'admin',
  password: '123456',
})
// 验证规则
const loginRules = ref<FormRules<RuleForm>>({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项',
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword(),
    },
  ],
})

// 处理密码框文本显示状态
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录动作处理
const loading = ref(false)
const loginFromRef = ref<FormInstance>()
const userStore = useUserStore()
const router = useRouter()
const handleLogin = () => {
  if (!loginFromRef.value) return
  loginFromRef.value.validate((valid) => {
    if (!valid) return

    loading.value = true
    userStore
      .login(loginForm.value)
      .then(() => {
        loading.value = false
        // TODO: 登录后操作
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item__content) {
      display: flex;
      flex-wrap: nowrap;
      height: 60px;
      padding-right: 10px;
      color: #454545;
      background: rgb(0 0 0 / 10%);
      border: 1px solid rgb(255 255 255 / 10%);
      border-radius: 5px;
    }

    :deep(.el-input__wrapper) {
      width: 85%;
      height: 40px;
      background: transparent;
      .el-input__inner {
        // padding: 12px 5px 12px 15px;
        color: #eee;
        border: 0;
        border-radius: 0;
        appearance: none;
        caret-color: #fff;
      }
    }
  }

  .svg-container {
    display: inline-block;
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px;
      font-size: 26px;
      font-weight: bold;
      color: #eee;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
@/store/userStore
