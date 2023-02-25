<template>
  <el-container id="layout-container">
    <el-aside id="layout-aside">
      <LayoutSidebar />
    </el-aside>
    <el-container>
      <el-header id="layout-header"><LayoutHeader /></el-header>
      <el-main id="layout-main"><LayoutMain /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import LayoutSidebar from './components/Sidebar/index.vue'
import LayoutMain from './components/Main/index.vue'
import LayoutHeader from './components/Header/index.vue'

</script>

<style scoped>

</style>