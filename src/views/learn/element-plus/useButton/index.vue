<template>
  <el-button type="primary">无指令</el-button>
  <el-button type="primary" v-btn-lose-focus>有指令</el-button>
  <el-button
      ref='btn3'
      class="btn3"
      type="primary" @click="handleClick">有弹窗
  </el-button>

  <div ref="messageRef"></div>

  <el-dialog
      title="提示"
      v-model="dialogVisible"
      width="30%"
      @close="handelDialogClose"
  >
    11111111
    <template #footer>
      <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {vBtnLoseFocus} from "@/directives/ui/elementPLus.js"
import {ref, getCurrentInstance} from "vue";

const messageRef = ref()
const btn3 = ref()
const dialogVisible = ref(false)

// 只能在setup根级别或一些生命周期钩子中使用getCurrentInstance
const instance = getCurrentInstance()
console.log('instance:', instance)

const handleClick = () => {
  dialogVisible.value = true
  // let btn33 = document.querySelector('.btn3')
  // console.log('btn33:', btn33)
  // btn33.blur()
}

const handelDialogClose = () => {
  dialogVisible.value = false

  console.log('messageRef.value:', messageRef.value)
  // 随机颜色
  messageRef.value.style.backgroundColor = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
  // 随机内容
  messageRef.value.innerHTML = Math.floor(Math.random() * 100)


  // // 通过按钮 ref 获取元素DOM
  // console.log('btn3.value:', btn3.value)


  let btn33 = document.querySelector('.btn3')
  console.log('btn33:', btn33)
  btn33.blur()
}
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