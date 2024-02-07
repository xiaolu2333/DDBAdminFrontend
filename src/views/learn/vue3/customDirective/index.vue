<template xmlns="http://www.w3.org/1999/html">
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
      <el-col :span="12">
        <el-card>
          <p>（配置文件权限信息格式）</p>
          <el-card>
            <p>角色 role: db_sys_admin-数据库系统管理员 db_admin-数据库管理员 db_operator-数据库操作员</p>
            <p>注册状态 status: 0-待授权 1-已注册 2-已拒绝 3-等待中</p>
            <p>数据库类型 islocal: -2-不限 -1-本地/域内 0-本地库 1-域内库 2-跨域库 3-中心库</p>
            <el-button-group>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), [0], [2]]" type="primary"
              >新增跨域库
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbAdmin'), [0], [2]]"
                  type="primary">新增本地库
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), [0,1,2], [0,1,3]]"
                  type="success">编辑
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), [0], [2]]"
                  type="danger">删除
              </el-button>
              <el-button
                  v-btn2="[getRole('hasDbSysAdmin'), [0], [2]]"
                  type="primary">详情
              </el-button>
            </el-button-group>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
  <el-card>
    <p>更多指令应用</p>
    <el-row>
      <el-col :span="4">
        <el-card>
          <el-button v-debounce="handleDebounce" type="primary">用指令实现按钮防抖</el-button>
          <br>
          <el-button v-throttle="handleThrottle({key:'value'})" type="primary">用指令实现按钮节流</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>

        </el-card>
      </el-col>
    </el-row>
    <div class="width-drag-container">
      <!--      <div style="background-color: #48ff32">-->
      <!--        <img-->
      <!--            ref="resizeRef"-->
      <!--            v-width-resize="handelWidthResize"-->
      <!--            src="./src/assets/images/logo.svg"-->
      <!--        >-->
      <!--      </div>-->

    </div>
  </el-card>

</template>

<script setup>
import {ref} from "vue";

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

const getRole = (role) => {
  return role
}
const vBtn2 = {
  mounted(el, binding) {
    binding.value = binding.value || ["", [-1], [-1]];
    console.log("binding.value:", binding.value)

    if (binding.value.length === 3) {
      // 获取el-button元素的子元素span
      const span = el.getElementsByTagName('span')[0];
      const text = span.innerText;
      const [btnRole, dbIsLocal, dbStatus] = binding.value;

      // 判断按钮是否有权限：按钮名称、所需角色、数据库类型、数据库状态
      const hasPerm = btnPerms?.some(perm =>
          perm.name === text &&
          // perm.isLocal.some(type => dbIsLocal.includes(type)) &&
          // perm.status.some(status => dbStatus.includes(status))
          dbIsLocal.every((el) => perm.isLocal.includes(el)) &&
          dbStatus.every((el) => perm.status.includes(el))
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


// v-debounce 防抖：触发事件后 n 秒后才执行函数
const vDebounce = {
  mounted(el, binding) {
    let timer = null;
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        binding.value();
      }, 2000);
    });
  },
};

// 事件处理函数无参数
function handleDebounce() {
  console.log("防抖")
}

// v-throttle 节流：触发事件后立即执行函数，n 秒内不再触发新的执行
const vThrottle = {
  mounted(el, binding) {
    let timer = null;
    el.addEventListener('click', () => {
      if (!timer) {
        timer = setTimeout(() => {
          binding.value();
          timer = null;
        }, 3000);
      }
    });
  },
};

// 事件处理函数有参数
function handleThrottle(data) {
  return () => {
    console.log("节流：data:", data)
  }
}

const resizeRef = ref(null)
const width = ref(300)
const ob = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const {width, height} = entry.contentRect
    console.log('entry:', entry.borderBoxSize[0])
    const fn = map.get(entry.target)
    if (fn) {
      fn({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      })
    }
  }
})
const map = new WeakMap()
// v-width-resize 拖拽改变宽度
const vWidthResize = {
  mounted(el, binding) {
    // 监听el元素尺寸变化
    map.set(el, binding.value)
    ob.observe(el)
  },
  unmounted(el) {
    // 移除监听
    ob.unobserve(el)
  }
}

function handelWidthResize(size) {
  console.log("size:", size)
  width.value = size.width
}
</script>

<style scoped>
.width-drag-container {
  display: flex;
  width: 100%;
  height: 300px;
}
</style>