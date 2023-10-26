<template>
  <el-card class="login-form-wrapper">
    <el-form :model="formData" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive, toRefs} from 'vue'

import CryptoJS from 'crypto-js'

// do not use same name with ref
const state = reactive({
  formData: {
    name: '',
    password: ''
  }
})

const {
  formData,
} = toRefs(state)


// n位随机数生成
function randomNum(n) {
  let sString = "";
  let strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < n; i++) {
    let ind = Math.floor(Math.random() * strings.length);
    sString += strings.charAt(ind);
  }
  return sString
}


const onSubmit = () => {
  console.log('密码：', state.formData.password)
  const password = state.formData.password
}
</script>

<style scoped>
.login-form-wrapper {
  width: 500px;
  margin: 100px auto;
}
</style>