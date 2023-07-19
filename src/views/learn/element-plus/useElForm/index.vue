<template>
  <div>
    <el-card
        style="height: 400px;width: 400px;"
    >
      <el-form
          :model="formData"
          label-width="80px"
          :disabled="formDisabled"
          @keydown.enter="submit"
      >
        <el-form-item prop="name" label="用户名">
          <el-input v-model="formData.name"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="formData.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>

import {ElForm} from "element-plus";
import {reactive, toRefs} from "vue";

const state = reactive({
  formData: {
    name: '11',
    password: '11',
  },
  formDisabled: true
})
const {
  formData,
  formDisabled,
} = toRefs(state)


const submit = () => {
  console.log('formData:', formData.value)
}
</script>

<style scoped>

</style>