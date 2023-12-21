<template>
  <el-button type="primary" v-btn-lose-focus>按钮</el-button>
</template>

<script setup>
import {vBtnLoseFocus} from "@/directives/ui/elementPLus.js"
</script>

<style scoped>

</style>


<!--<template>-->
<!--  <el-button type="primary" v-btn>按钮</el-button>-->
<!--</template>-->

<!--<script setup>-->

<!--// v-throttle 节流：触发事件后立即执行函数，n 秒内不再触发新的执行-->
<!--const vBtn = {-->
<!--  mounted(el, binding) {-->
<!--    el.addEventListener('click', loseFocus);-->
<!--  }-->
<!--}-->

<!--// 事件处理函数有参数-->
<!--function loseFocus(evt) {-->
<!--  let target = evt.target-->
<!--  if (target.nodeName === 'SPAN') {-->
<!--    target = evt.target.parentNode-->
<!--  }-->
<!--  target.blur()-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->