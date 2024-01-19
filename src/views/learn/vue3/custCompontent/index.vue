<template>
  <el-button @click="handleClick">
    点击
    <span v-if="!loading">展示 loading</span>
    <span v-else>关闭 loading</span>
  </el-button>
  <div class="container">
    <MyLoading :loading="loading"></MyLoading>
  </div>

  <el-card>
    <p>多组件中复用鼠标追踪器</p>
    <p>当前鼠标位置：({{ x }}, {{ y }})</p>
  </el-card>
</template>

<script setup>
import {defineProps, ref, reactive, toRefs, watch} from 'vue'

import {MyLoading} from '@/components/common/index'
import {useMousePositionDisplay} from '@/hooks/useMousePositionDisplay.js'

const {x, y} = useMousePositionDisplay()


const state = reactive({
  loading: false
})
const {loading} = toRefs(state)


const handleClick = () => {
  loading.value = !loading.value
  console.log('new loading.value', loading.value)
}
</script>

<style lang="less" scoped>

</style>

