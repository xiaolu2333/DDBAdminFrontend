<template>
  <div class="demo-date-picker">
    <p>日期选择器:</p>
    <el-date-picker
        v-model="value1"
        type="date"
        size="default"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
    />
    <span>{{ value1 }}</span>
  </div>

  <div class="demo-datetime-picker">
    <p>日期时间选择器:</p>
    <el-date-picker
        v-model="value2"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"

    />
    <span>{{ value2 }}</span>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'

const value1 = ref('2022-12-12')
const value2 = ref('2022-12-12 14:09:23')


onBeforeMount(() => {
  // 获取当前日期与时间
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentSecond = new Date().getSeconds();
  const formattedDate = `${currentYear}-${currentMonth + 1}-${currentDay}`;
  console.log(formattedDate)
  value1.value = formattedDate
  const formattedTime = `${currentHour}:${currentMinute}:${currentSecond}`;
  console.log(formattedTime)
  value2.value = formattedDate + " " + formattedTime

  const formattedDateTime = new Date().toISOString();
  console.log(formattedDateTime)
})
</script>

<style scoped>
</style>
