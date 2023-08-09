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

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style scoped>
.login-form-wrapper {
  width: 500px;
  margin: 100px auto;
}
</style>