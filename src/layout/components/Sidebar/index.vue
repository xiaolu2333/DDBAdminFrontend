<template>
  <!--router属性是必须的-->
  <el-menu
      router
      :collapse="collapse"
      :default-active="$route.path"
      active-text-color="#00a0e9"
      :unique-opened="true"
  >
    <!--一级菜单-->
    <template v-for=" item in routersOptions" :key="item.path">
      <el-sub-menu v-if="item.name==='Home' && item.children" :index="item.path">
        <template #title>
          <el-icon>
            <House/>
          </el-icon>
          <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <el-menu-item :index="child.path">
            <template #title>
              <el-icon>
                <House/>
              </el-icon>
              <span>{{ child.meta && child.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-sub-menu v-if="item.name==='System' && item.children" :index="item.path">
        <template #title>
          <el-icon>
            <Setting/>
          </el-icon>
          <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <el-menu-item :index="child.path">
            <template #title>
              <el-icon>
                <Setting/>
              </el-icon>
              <span>{{ child.meta && child.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-sub-menu v-if="item.name==='DataManage' && item.children" :index="item.path">
        <template #title>
          <el-icon>
            <Coin/>
          </el-icon>
          <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
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
          <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
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
            <Document/>
          </el-icon>
          <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
        </template>
        <!--二级菜单-->
        <template v-for="child in item.children" :key="child.path">
          <el-sub-menu v-if="child?.children.length > 0" :index="child.path">
            <template #title>
              <el-icon>
                <Document/>
              </el-icon>
              <span>{{ child.meta && child.meta.title }}</span>
            </template>
            <!--三级菜单-->
            <template v-for="grandson in child.children" :key="grandson.path">
              <el-menu-item :index="grandson.path">
                <template #title>
                  <el-icon>
                    <Document/>
                  </el-icon>
                  <span>{{ grandson.meta && grandson.meta.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-sub-menu>
      <el-sub-menu v-if="item.name==='visual' && item.children" :index="item.path">
        <template #title>
          <el-icon>
            <Coin/>
          </el-icon>
          <span v-if="!collapse">{{ item.meta && item.meta.title }}</span>
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
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAppStore} from '@/store/modules/app.js'

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

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
  float: left;
  /* 垂直居中 */
  display: block;
}

.title {
  float: right;
  /* 水平居中 */
  text-align: center;
  /* 文字均匀分布 */
  text-justify: distribute-all-lines;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>