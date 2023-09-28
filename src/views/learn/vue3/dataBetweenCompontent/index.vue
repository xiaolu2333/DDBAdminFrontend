<template>
  <el-button @click="sendDataToGrandson(666)">爷爷向孙子传值</el-button>

  <MiddleDialog :dialogData="dialogData"></MiddleDialog>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, provide} from "vue";

import MiddleDialog  from "./MiddleDialog.vue";
import {ElMessage} from "element-plus";


const state = reactive({
  dataToGrandson: 0,

  dialogData: {
    dialogVisible: false,
    title: '中间弹窗',
    height: 500
  }
});
const {
  dataToGrandson,
  dialogData
} = toRefs(state)

/**
 * 孙子调用爷爷的函数实现孙子向爷爷传值
 */
const getDataFromGrandson = (data) => {
  ElMessage.success(`爷爷收到孙子的传来的值：${data}`)
}

// 传值
provide('dataToGrandson', dataToGrandson)
// 传函数-接收值
provide('getDataFromGrandson', getDataFromGrandson)

const sendDataToGrandson = (data) => {
  state.dataToGrandson = data
  state.dialogData.dialogVisible = true
}
</script>

<style scoped>

</style>