<template>
  <div>
    <h1>前端监控</h1>
    <button @click="clickLog">前端监控1</button>
    <button @click="clickLog">前端监控2</button>
  </div>
</template>

<script setup>
import {postFrontEndLog} from '@/api/learn/webapi.js'
import {useRoute} from "vue-router";
import router from "@/router/index.js";


// 元素点击埋点——监控用户点击行为
const clickLog = (e) => {
  console.log(e)
  const {target} = e
  const {tagName, innerText, dataset} = target

  const logInfo = {
    type: 'button_click',
    data: {
      page: router.currentRoute.value.path,
      val: "点击了" + innerText,
    }
  }
  postFrontEndLog(logInfo)
}
</script>

<style scoped>

</style>