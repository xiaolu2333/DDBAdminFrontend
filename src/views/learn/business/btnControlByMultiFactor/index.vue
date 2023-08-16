<template>
  <!--  <div class="container" style="margin-bottom: 15px;">-->
  <!--    <span>选择业务用户：</span>-->
  <!--    <el-button-->
  <!--        type='primary' :icon="Finished"-->
  <!--        @click='handleDtAuth()'-->
  <!--    >按钮名称-->
  <!--    </el-button>-->
  <!--  </div>-->

  <p>基于 系统模式+当前角色+数据库类型+数据库分布类型 等因素控制按钮可用性</p>

  <span>选择系统模式：</span>
  <el-select
      v-model="sysMode"
      @change="handleSysModeChange"
      class="m-2" placeholder="Select"
  >
    <el-option
        v-for="item in modeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <br>
  <span>是否角色A：</span>
  <el-switch
      v-model="sys_admin"
      @change="handleSysAdminChange"
  />
  <br>
  <span>是否角色B：</span>
  <el-switch
      v-model="db_admin1"
      @change="handleDbAdmin1Change"
  />
  <br>
  <span>选择数据库注册状态：</span>
  <el-select
      v-model="status"
      @change="handleStatusChange"
      class="m-2" placeholder="Select"
  >
    <el-option
        v-for="item in statusOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <br>
  <span>选择数据库分布类型：</span>
  <el-select
      v-model="isLocal"
      @change="handleIsLocalChange"
      class="m-2" placeholder="Select"
  >
    <el-option
        v-for="item in distTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <br>
  <span>是否共享库：</span>
  <el-switch
      v-model="share"
      @change="handleShareChange"
  />
  <br>

  <el-card>
    <BtnCtrl
        :sysMode="sysMode"
        :sys_admin="sys_admin"
        :db_admin1="db_admin1"
        :isLocal="isLocal"
        :status="status"
        :share="share"
        @bsn-auth="handleBsnAuth"
        @dt-auth="handleDtAuth"
        @make-center="handleMakeCenter"
        @commit-register="handleCommitRegister"
        @table-perms="handleTablePerms"
    />
  </el-card>

</template>

<script setup>
import {ref, defineProps, defineEmits, watchEffect, reactive, toRefs} from 'vue';
import BtnCtrl from './BtnCtrl.vue';

const state = reactive({
  sysMode: 0,
  sys_admin: false,
  db_admin1: false,
  isLocal: 0,
  status: 0,
  share: false,
})

const {
  sysMode,
  sys_admin,
  db_admin1,
  isLocal,
  status,
  share,
} = toRefs(state)

const modeOptions = [
  {
    value: 0,
    label: '单库模式',
  },
  {
    value: 2,
    label: '中心库模式',
  },
  {
    value: 3,
    label: '子库模式',
  }
]

const statusOptions = [
  {
    value: 0,
    label: '未注册',
  },
  {
    value: 1,
    label: '已注册',
  },
  {
    value: 3,
    label: '待审核',
  },
  {
    value: 4,
    label: '已拒绝',
  }
]

const distTypeOptions = [
  {
    value: 0,
    label: '本地库',
  },
  {
    value: 1,
    label: '内域库',
  },
  {
    value: 2,
    label: '跨域库',
  },
  {
    value: 3,
    label: '中心库',
  }
]

const handleDtAuth = (row) => {
  console.log("用户授权 handleDtAuth:", row)
}

const handleMakeCenter = (row) => {
  console.log("初始化为中心库 handleMakeCenter:", row)
}

const handleBsnAuth = (row) => {
  console.log("业务授权 handleBsnAuth:", row)
}

const handleSysModeChange = (value) => {
  // console.log("选择系统模式 handleSysModeChange:", value)
}

const handleSysAdminChange = (value) => {
  // console.log("是否角色A handleSysAdminChange:", value)
}

const handleDbAdmin1Change = (value) => {
  // console.log("是否角色B handleDbAdmin1Change:", value)
}

const handleIsLocalChange = (value) => {
  console.log("选择数据库分布类型 handleIsLocalChange:", value)
}

const handleCommitRegister = (row) => {
  console.log("提交注册 handleCommitRegister:", row)
}

const handleTablePerms = (row) => {
  console.log("表权限 handleTablePerms:", row)
}

const handleStatusChange = (value) => {
  console.log("选择数据库注册状态 handleStatusChange:", value)
}

const handleShareChange = (value) => {
  // console.log("是否共享库 handleShareChange:", value)
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}
</style>