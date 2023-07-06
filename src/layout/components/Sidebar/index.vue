<template>
  <el-row class="logo-container">
    <el-col :span="6">
      <img class="logo" src="@/assets/images/logo.svg" width="60" height="60" alt="管理后台logo"/>
    </el-col>
    <el-col :span="14">
      <span class="title">{{ appStore.getTitle }}</span>
    </el-col>
  </el-row>
  <!--router属性是必须的-->
  <el-menu
      router
      :default-active="$route.path"
      background-color="#2c3e50"
      text-color="#fff"
      active-text-color="#00a0e9"
      :unique-opened="true"
  >
    <el-scrollbar
        style="height: 80vh; overflow: auto;"
    >
      <template v-for=" item in routersOptions
    " :key="item.path">
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
        <el-sub-menu v-if="item.name==='DataManage' && item.children" :index="item.path">
          <template #title>
            <el-icon>
              <Coin/>
            </el-icon>
            <span>{{ item.meta && item.meta.title }}</span>
          </template>
          <template v-for="child in item.children" :key="child.path">
            <el-menu-item :index="child.path">
              {{ child.meta && child.meta.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-sub-menu v-if="item.name==='Learning' && item.children" :index="item.path">
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
        <el-sub-menu v-if="item.name==='DataService' && item.children" :index="item.path">
          <template #title>
            <el-icon>
              <Service/>
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
    </el-scrollbar>
  </el-menu>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useAppStore} from '@/store/app'

const appStore = useAppStore()

// 获取路由实例对象
const router = useRouter();
// console.log("router:", router);
// // 获取路由列表的详细配置项
// const routers = router.getRoutes();
// console.log("routers:", routers);
// 获取定义路由的配置项
const routersOptions = router.options.routes
// console.log("routersOptions:", routersOptions);
</script>

<style lang="scss" scoped>
.logo-container:hover {
  cursor: pointer;
  background-color: #73b8ff;
  color: #ffffff;
}

.logo {
  /* 水平居中 */
  margin: 10px auto;
  /* 垂直居中 */
  display: block;
}

.title {
  /* 水平居中 */
  text-align: center;
  /* 垂直居中 */
  line-height: 80px;
  /* 文字均匀分布 */
  text-justify: distribute-all-lines;
}
</style>