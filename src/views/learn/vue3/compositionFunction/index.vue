<template>
  <p>通常来说，我们会将处理无状态数据的功能抽象为 uitls 函数:</p>
  <el-card>
    <p>单组件中的鼠标追踪器</p>
    <p>当前鼠标位置：({{ x1 }}, {{ y1 }})</p>
  </el-card>

  <p>如果我们想在多个组件中复用这个相同的逻辑呢？我们可以把这个逻辑以一个组合式函数——hooks的形式提取到外部文件中：</p>
  <el-card>
    <p>多组件中复用鼠标追踪器</p>
    <p>当前鼠标位置：({{ x }}, {{ y }})</p>
  </el-card>

  <a href="https://cn.vuejs.org/guide/reusability/composables.html#what-is-a-composable"
     target="_blank"><h2>什么是“组合式函数——hooks”？</h2></a>
  <a href="https://juejin.cn/post/7083401842733875208#heading-0">
    <h2>Vue3必学技巧-自定义Hooks-让写Vue3更畅快</h2>
  </a>
  <a href="https://juejin.cn/post/7208111879150993464">
    <h2>理解Vue3中的hooks（为什么要用hooks）</h2>
  </a>

</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'

import {useMousePositionDisplay} from '@/hooks/useMousePositionDisplay.js'

const {x, y} = useMousePositionDisplay()

const x1 = ref(0)
const y1 = ref(0)

function update(event) {
  x1.value = event.pageX
  y1.value = event.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
</script>

<style scoped>

</style>