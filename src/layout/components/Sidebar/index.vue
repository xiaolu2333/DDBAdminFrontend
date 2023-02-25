<template>
  <div class="logo-container">
    <img class="logo" src="@/assets/images/logo.svg" width="100" height="100" alt="管理后台logo"/>
    <span>XXX管理系统</span>
  </div>
  <!--router属性是必须的-->
  <el-menu
      router
      :default-active="$route.path"
      background-color="#2c3e50"
      text-color="#fff"
      active-text-color="#00a0e9"
  >
    <template v-for="item in routersOptions" :key="item.path">
      <el-sub-menu v-if="item.name==='Home' && item.children" :index="item.path">
        <template #title>
          <el-icon>
            <House/>
          </el-icon>
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <el-menu-item :index="child.path">
            {{ child.meta && child.meta.title }}
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-sub-menu v-if="item.name==='System' && item.children" :index="item.path">
        <template #title>
          <el-icon>
            <Setting/>
          </el-icon>
          <span>{{ item.meta && item.meta.title }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <el-menu-item :index="child.path">
            {{ child.meta && child.meta.title }}
          </el-menu-item>
        </template>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>
import {useRouter} from "vue-router";

// 获取路由实例对象
const router = useRouter();
console.log("router:", router);
// 获取路由列表的详细配置项
const routers = router.getRoutes();
console.log("routers:", routers);
// 获取定义路由的配置项
const routersOptions = router.options.routes
console.log("routersOptions:", routersOptions);
</script>

<style lang="scss" scoped>

</style>