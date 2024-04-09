<template>
  <div>
    <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
    <el-button @click="handleSave">保存到localStorage</el-button>
    <el-button @click="handleGet">获取</el-button>
    <el-button @click="handleRemove">删除</el-button>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const inputValue = ref('')

const handleSave = () => {
  try {
    localStorage.setItem('inputValue', inputValue.value)
    alert('localStorage 存储成功')
  } catch (e) {
    alert('localStorage 存储失败')
  }
}

const handleGet = () => {
  try {
    alert(localStorage.getItem('inputValue'))
  } catch (e) {
    alert('localStorage 获取失败')
  }
}

const handleRemove = () => {
  try {
    localStorage.removeItem('inputValue')
    alert('localStorage 删除成功')
  } catch (e) {
    alert('localStorage 删除失败')
  }
}
</script>

<style scoped>

</style>