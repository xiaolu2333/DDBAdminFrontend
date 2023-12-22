<template>

  <div class="demo-progress">
    <el-progress type="circle" :percentage="percentage" :status="status"/>
    <el-progress :percentage="percentage" :format="format" :status="status" :text-inside="true" :stroke-width="24"/>
    <el-button @click="handleRefresh">刷新</el-button>
  </div>
  <div class="demo-progress">
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const percentage = ref<number>(0)
const status = ref<"" | "success" | "warning" | "exception">("")

const handleRefresh = () => {
  percentage.value = 0
  status.value = ''
}

const format = (percentage) => (percentage === 100 ? '完成' : `${percentage}%`)

// 通过定时器模拟进度条的变化
setInterval(() => {
  percentage.value += 10
  if (percentage.value >= 100) {
    percentage.value = 100
    status.value = 'success'
    // percentage.value = 0
  }
}, 1000)

</script>

<style scoped>
.demo-progress .el-progress--circle {
  /* 水平居中 */
  align-items: center;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>