<template>
  <el-button @click="handleClick">
    点击
    <span v-if="!loading">展示 loading</span>
    <span v-else>关闭 loading</span>
  </el-button>
  <div class="container">
    <MyLoading :loading="loading"></MyLoading>
  </div>
</template>

<script setup>
import {reactive, toRefs, watch} from 'vue'

import {MyLoading} from '@/components/common/index'

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

