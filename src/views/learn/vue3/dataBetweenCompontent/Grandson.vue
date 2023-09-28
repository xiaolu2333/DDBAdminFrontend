<template>
    <el-card>
      <el-tag>从老爷子那里获得：{{ dataToGrandson }}</el-tag>
      <br>
      <el-button @click="sendDataToGrandpa(2333)">孙子向爷爷传值</el-button>
    </el-card>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, provide, inject} from "vue";

// 接收值
const dataToGrandson = inject('dataToGrandson')
// 接收函数-传值
const getDataFromGrandson = inject('getDataFromGrandson')

const state = reactive({
  dataToGrandpa: 0
});
const {
  dataToGrandpa
} = toRefs(state)

const sendDataToGrandpa = (data) => {
  dataToGrandpa.value = data
  getDataFromGrandson(dataToGrandpa.value)
}

</script>

<style scoped>
</style>