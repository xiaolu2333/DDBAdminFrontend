<template>
  <el-button @click="sendDataToGrandson(666)">爷爷向孙子传值</el-button>
  <br>
  <el-button @click="callGrandsonMethod">孙子向爷爷传值</el-button>

  <MiddleDialog
      ref="middleDialogRef"
      :dialogData="dialogData"
  />
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, provide} from "vue";

import MiddleDialog from "./MiddleDialog.vue";
import {ElMessage} from "element-plus";

const middleDialogRef = ref<InstanceType<typeof MiddleDialog>>()
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

/**
 * 爷爷调用孙子的函数获取数据
 */
const callGrandsonMethod = () => {
  state.dialogData.dialogVisible = true
  console.log('middleDialogRef:', middleDialogRef)
  if (middleDialogRef.value.middleMethod() === '我叫你爷爷你敢答应吗？') {
    ElMessage.success('A~我滴个乖孙咂~~~~~')
  } else {
    ElMessage.error('你不是我孙子，我不答应')
  }
}

</script>

<style scoped>

</style>