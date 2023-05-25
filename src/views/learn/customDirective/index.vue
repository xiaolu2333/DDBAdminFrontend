<template>
  <el-card>
    <div style="height: 100px" v-focus/>
    <div style="height: 100px; background-color: #4983ff"/>
  </el-card>
  <el-card>
    <el-row>
      <el-col :span="8">
        <el-button-group>
          <el-button v-permission="'1:1'">有权限</el-button>
          <el-button v-permission="'1:2'">无权限</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="8">
        <el-button-group>
          <el-button v-permission="'1:1'">有权限</el-button>
          <el-button v-permission="'1:1'">无权限</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
  </el-card>
  <el-card>
    <el-button v-perm="['qx:xz:00059']" type="primary">新增</el-button>
    <el-button v-perm="['qx:bj:00060']" type="success">编辑</el-button>
    <el-button v-perm="['qx:sc:00061']" type="danger">删除</el-button>
    <el-button v-perm="['qx:xq:00062']" type="primary">详情</el-button>
  </el-card>
</template>

<script setup>
// v-focus 改变背景颜色
const vFocus = {
  mounted: (el) => {
    el.style.backgroundColor = 'red'
  }
}

// v-permission 权限控制
const permString = "1:1"
const vPermission = {
  mounted: (el, binding) => {
    if (permString === binding.value) {
      // 按钮可用
      el.style.display = 'block'
    } else {
      el.style.display = 'none'
    }
  }
}

const user = {
  resourceList: ["qx:xz:00059", "qx:bj:00060"]
}
const vPerm = {
  mounted(el, binding) {
    binding.value = binding.value || [];
    // binding.value绑定元素的权限码
    if (binding.value) {
      // user.resourceList 用户所有按钮权限码
      const hasPerm = user.resourceList?.some(perm => binding.value.includes(perm));
      console.log("hasPerm:", hasPerm)
      // 按钮如果有权限，不做任何处理，如果没有权限，页面上的按钮增加禁选类名和属性，icon增加禁止点击事件
      if (!hasPerm) {
        // element-plus el-button 类名
        el.classList.add('is-disabled');
        // element-plus el-button 属性
        el.setAttribute('disabled', 'disabled');
        // 图标元素禁止点击事件
        // el.addEventListener('click', disableClick, true);
      }
    } else {
      throw new Error("need perms! Like v-perm=\"['sys:user:add','sys:user:edit']\"");
    }
  },
  unmounted(el) {
    // el.removeEventListener('click', disableClick);
  },
};

</script>