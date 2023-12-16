<template>
  <div class="header">
    <span @click="handleToggle" class="menu-control">
      <el-icon v-if="collapse === true" class="menu-expand">
        <Expand/>
      </el-icon>
      <el-icon v-else class="menu-fold">
        <Fold/>
      </el-icon>
    </span>
    <div class="module-list">
      <span class="module"><router-link :to="{ path: '/home/dashboard' }">首页</router-link></span>
      <span class="module"><router-link :to="{ path: '/home/dashboard' }">功能模块一</router-link></span>
      <span class="module"><router-link :to="{ path: '/home/dashboard' }">功能模块二</router-link></span>
      <span class="module"><router-link :to="{ path: '/home/dashboard' }">功能模块三</router-link></span>
      <span class="module"><router-link :to="{ path: '/home/dashboard' }">功能模块四</router-link></span>
    </div>
    <div class="user-info">
      <el-dropdown>
                <span class="el-dropdown-link" style="margin-right: 10px">
          <el-avatar size="small">111</el-avatar>
          <span class="user-name">admin</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>系统设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:collapse'])

const handleToggle = () => {
  // 需要修改父组件的isCollapse
  emits('update:collapse', !props.collapse)
}
</script>

<style lang="scss" scoped>
.header {
  height: auto;
  width: 100%;
  // 通过 display: flex 指定弹性布局
  display: flex;
  // 通过 align-items: center 指定弹性布局中的垂直对齐方式
  align-items: center;
  // 通过 justify-content: center 指定弹性布局中的水平对齐方式
}

.module > a {
  color: #010000;
  font-weight: bolder;
  text-decoration: none;
}

.module > a:hover {
  color: #409eff;
  // 字体添加阴影
  text-shadow: 0 0 20px #64afff;
}

.menu-control {
  float: left;
  cursor: pointer;
}

.menu-control:hover {
  color: #409eff;
}

.menu-expand, .menu-fold {
  width: 2em;
  height: 2em;
}

.module-list {
  display: flex;
  // 元素均匀分布在容器里
  justify-content: space-evenly;
  width: 90%;
}

.user-info {
  float: right;
  margin-right: 10px;
  padding: 5px;
}
</style>