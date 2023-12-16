<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside">
      <MyLayoutSidebar v-model:collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header id="layout-header">
        <MyLayoutHeader v-model:collapse="isCollapse"/>
      </el-header>
      <el-main id="layout-main">
        <MyLayoutMain/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {ref} from "vue";

import MyLayoutSidebar from '@/layout/components/Sidebar/index.vue'
import MyLayoutMain from '@/layout/components/Main/index.vue'
import MyLayoutHeader from '@/layout/components/Header/index.vue'

// 侧边栏是否折叠
let isCollapse = ref(false)
</script>

<style scoped>


</style>