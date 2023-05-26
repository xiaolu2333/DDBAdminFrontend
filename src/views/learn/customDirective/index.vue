<template>
  <p>自定义指令</p>
  <el-card>
    <p>指令控制背景颜色</p>
    <div style="height: 100px" v-focus/>
    <div style="height: 100px; background-color: #4983ff"/>
  </el-card>
  <el-card>
    <p>指令控制按钮隐藏（简单权限信息）</p>
    <el-card>
      <el-button v-permission="'1:1'">有权限</el-button>
      <el-button v-permission="'1:2'">无权限</el-button>
    </el-card>
  </el-card>
  <el-card>
    <p>指令控制按钮禁用</p>
    <el-row>
      <el-col :span="5">
        <el-card>
          <p>（一般权限信息格式）</p>
          <el-button v-perm="['qx:xz:00059']" type="primary">新增</el-button>
          <el-button v-perm="['qx:bj:00060']" type="success">编辑</el-button>
          <el-button v-perm="['qx:sc:00061']" type="danger">删除</el-button>
          <el-button v-perm="['qx:xq:00068']" type="primary">详情</el-button>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <p>（配置文件权限信息格式）</p>
          <el-button v-btn="[getRoles()]" type="primary">新增本地库</el-button>
          <el-button v-btn="[getRoles()]" type="success">编辑</el-button>
          <el-button v-btn="[getRoles()]" type="danger">删除</el-button>
          <el-button v-btn="[getRoles()]" type="primary">详情</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <p>（配置文件权限信息格式）</p>
          <el-card>
            <p>角色 role: db_sys_admin-数据库系统管理员 db_admin-数据库管理员 db_operator-数据库操作员</p>
            <p>注册状态 status: 0-待授权 1-已注册 2-已拒绝 3-等待中</p>
            <p>数据库类型 islocal: -2-不限 -1-本地/域内 0-本地库 1-域内库 2-跨域库 3-中心库</p>
            <el-button-group>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(-2), getIsLocal(-1)]" type="primary"
              >新增跨域库
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbAdmin'), getStatus(-2), getIsLocal(-1)]"
                  type="primary">新增本地库
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(-2), getIsLocal(-1)]"
                  type="success">编辑
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(-2), getIsLocal(-1)]"
                  type="danger">删除
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(-2), getIsLocal(-1)]"
                  type="primary">详情
              </el-button>
            </el-button-group>
            <el-button-group>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(-1), getIsLocal(1)]"
                  type="primary">
                初始化为中心库
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(3), getIsLocal(-1)]"
                  type="primary">
                初始化为中心库
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(3), getIsLocal(1)]"
                  type="primary">业务授权
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(-1), getIsLocal(1)]"
                  type="primary">
                分级角色用户授权
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), getStatus(2), getIsLocal(0)]"
                  type="primary">提交注册
              </el-button>
              <el-button
                  v-btn2=""
                  type="primary">表共享
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin')]"
                  type="primary">发布数据库
              </el-button>
            </el-button-group>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
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

// v-Perm 权限控制
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
      // console.log("hasPerm:", hasPerm)
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


const getRoles = () => {
  return 'hasDbSysAdmin'
}
import btnPerms from './index.json'

console.log("btnPerms:", btnPerms)
const vBtn = {
  mounted(el, binding) {
    binding.value = binding.value || [];
    console.log("binding.value:", binding.value[0].toString())

    if (binding.value) {
      // 获取el-button元素的子元素span
      const span = el.getElementsByTagName('span')[0];
      // 获取span元素的文本
      const text = span.innerText;
      // console.log("text:", text)

      const hasPerm = btnPerms?.some(perm =>
          // 检查perm中名 name 按钮的 roles 属性值是否包含 binding.value
          perm.name === text && perm.roles.some(role => binding.value.includes(role))
      )
      // console.log("hasPerm:", hasPerm)

      if (!hasPerm) {
        el.classList.add('is-disabled');
        el.setAttribute('disabled', 'disabled');
      }
    } else {
      throw new Error("need perms! Like v-perm=\"['sys:user:add','sys:user:edit']\"");
    }
  },
};


const getRole = (role) => {
  return role
}
const getStatus = (status) => {
  return status
}
const getIsLocal = (isLocal) => {
  return isLocal
}
const vBtn2 = {
  mounted(el, binding) {
    binding.value = binding.value || ["", -1000, -1000];
    console.log("binding.value:", binding.value)

    if (binding.value.length === 3) {
      // 获取el-button元素的子元素span
      const span = el.getElementsByTagName('span')[0];
      const text = span.innerText;
      const [btnRole, dbIsLocal, dbStatus] = binding.value;

      // 判断按钮是否有权限：按钮名称、所需角色、数据库类型、数据库状态
      const hasPerm = btnPerms?.some(perm =>
          perm.name === text &&
          perm.roles.some(role => btnRole.includes(role)) &&
          perm.isLocal === dbIsLocal &&
          perm.status === dbStatus
      )

      if (!hasPerm) {
        el.classList.add('is-disabled');
        el.setAttribute('disabled', 'disabled');
      }
    } else {
      throw new Error("need perms! Like v-perm=\"[getRole('hasDbSysAdmin'), getStatus(-1), getIsLocal(1)]\"");
    }
  },
};

</script>