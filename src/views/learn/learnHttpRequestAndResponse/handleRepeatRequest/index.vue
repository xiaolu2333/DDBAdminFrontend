<template>
  <el-button
      type="primary"
      @click="handleClick"
  >
    疯狂点击
  </el-button>
</template>

<script setup>
import {
  repeatRequest
} from '@/api/learn/http'
import {ElMessage} from "element-plus";


const handleClick = () => {
  repeatRequest().then(res => {
    console.log(res)
    if (res.data.code === 200) {
      ElMessage.success('请求成功')
    }
  }).catch(err => {
    ElMessage.error('请求失败')
  })
}
</script>


<style scoped>

</style>