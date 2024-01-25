<template>
  <vxe-table
      :data="tableData"
      align="center"
  >
    <vxe-column type="seq" width="60"></vxe-column>
    <vxe-column title="基本信息">
      <template #default="scope">
        <p>{{ scope.row.databaseName }}</p>
        <p>{{ scope.row.type }}</p>
        <p>{{ scope.row.ip }}:{{ scope.row.port }}</p>
      </template>
    </vxe-column>
    <vxe-column field="type" title="type"></vxe-column>
    <vxe-column title="状态">
      <template #default="scope">
        <p>运行状态：{{ scope.row.___sin_factor_control.showRunningStatus() }}</p>
        <p>注册状态：{{ scope.row.___multi_factor_control.showCommitStatus() }}</p>
      </template>
    </vxe-column>
    <!--    <vxe-column field="commitStatus" title="注册状态">-->
    <!--      <template #default="scope">-->
    <!--        <span>{{ scope.row.__controller.showStatus() }}</span>-->
    <!--      </template>-->
    <!--    </vxe-column>-->
    <vxe-column title="操作" width="200">
      <template #default="scope">
        <el-button
            v-btn-lose-focus
            :type="scope.row.___sin_factor_control.backgroundColor"
            v-if="scope.row.___sin_factor_control.visible"
            @click="scope.row.___sin_factor_control.btnClick(scope.row)"
        >
          {{ scope.row.___sin_factor_control.text }}
        </el-button>

        <el-button-group>
          <el-button
              v-btn-lose-focus
              v-for="btn in scope.row.___multi_factor_control.btnList"
              :key="btn.text"
              :type="btn.backgroundColor"
              @click="btn.btnClick(scope.row)"
          >
            {{ btn.text }}
          </el-button>
        </el-button-group>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup>
import {computed, onBeforeMount, reactive, ref} from "vue";

import {vBtnLoseFocus} from "@/directives/ui/elementPLus.js";
import {ElMessage} from "element-plus";


// 单因素按钮控制器
class RunningStatusBtnController {
  // 运行状态
  RUNNING_STATUS = {
    RUNNING: 'running', // 正在运行
    SHUTDOWN: 'shutdown', // 已经关闭
    STARTING: 'starting', // 正在启动
  }

  constructor(runningStatus) {
    // 根据数据库运行状态，控制相关按钮的显示设置与功能控制
    this.runningStatus = ref(runningStatus)
    this.visible = ref(false)
    this.text = ref(null)
    this.backgroundColor = ref(null)
  }

  // 界面交互——显示运行状态
  showRunningStatus() {
    this.__setText()
    this.__setBackgroundColor()
    this.__setVisible()

    if (this.runningStatus === this.RUNNING_STATUS.RUNNING) {
      return '正在运行'
    } else if (this.runningStatus === this.RUNNING_STATUS.SHUTDOWN) {
      return '已经关闭'
    } else if (this.runningStatus === this.RUNNING_STATUS.STARTING) {
      return '正在启动'
    } else {
      return '未知状态'
    }
  }

  // 界面交互——显示按钮中的文字
  __setText() {
    switch (this.runningStatus) {
      case this.RUNNING_STATUS.RUNNING:
        this.text = '关闭'
        break
      case this.RUNNING_STATUS.SHUTDOWN:
        this.text = '启动'
        break
      case this.RUNNING_STATUS.STARTING:
        this.text = '重启'
        break
      default:
        this.text = ''
    }
  }

  // 界面交互——显示按钮的背景颜色
  __setBackgroundColor() {
    switch (this.runningStatus) {
      case this.RUNNING_STATUS.RUNNING:
        this.backgroundColor = 'danger'
        break
      case this.RUNNING_STATUS.SHUTDOWN:
        this.backgroundColor = 'primary'
        break
      case this.RUNNING_STATUS.STARTING:
        this.backgroundColor = 'success'
        break
      default:
        this.backgroundColor = ''
    }
  }

  // 界面交互——是否显示按钮
  __setVisible() {
    switch (this.runningStatus) {
      case this.RUNNING_STATUS.RUNNING:
        this.visible = true
        break
      case this.RUNNING_STATUS.SHUTDOWN:
        this.visible = true
        break
      case this.RUNNING_STATUS.STARTING:
        this.visible = true
        break
      default:
        this.visible = false
    }
  }

  // 业务逻辑——按钮点击事件
  btnClick(dnInfo) {
    switch (this.runningStatus) {
      case this.RUNNING_STATUS.RUNNING:
        ElMessage.success(`${dnInfo.databaseName}关闭成功`)
        break
      case this.RUNNING_STATUS.SHUTDOWN:
        ElMessage.success(`${dnInfo.databaseName}启动成功`)
        break
      case this.RUNNING_STATUS.STARTING:
        ElMessage.success(`${dnInfo.databaseName}重启成功`)
        break
      default:
        break
    }
  }
}

// 多因素控制器
class CommitSatusBtnController {
  // 系统模式
  SYS_MODEL = {
    SINGLE_MODE: 0,     // 单机模式
    SUB_DB_MODE: 2,     // 子库模式
    CENTER_DB_MODE: 3,  // 中心库模式
  }

  // 人员类型
  ROLE_TYPE = {
    CLASS_A: 'sysadmin', // A类角色
    CLASS_B: 'dbadmin',  // B类角色
  }

  // 注册状态
  COMMIT_STATUS = {
    UNCOMMITTED: 0, // 未注册
    COMMITTED: 1,   // 已注册
    REJECTED: 2,    // 已拒绝
    WAITING: 3      // 等待中
  }

  // 数据库分布类型
  DB_DISTRIBUTION_TYPE = {
    LOCAL: 0,         // 本地数据库
    IN_DOMAIN: 1,     // 内域数据库
    CROSS_DOMAIN: 2,  // 跨域数据库
    CENTER: 3,        // 中心库
    UNIQUE_LOCAL: 4,  // 唯一本地库
  }

  constructor(dbInfo) {
    // 根据注册状态、系统模式、人员类型等，控制相关按钮的显示设置与功能控制
    this.db = ref(dbInfo)
    this.btnList = []
  }


  // 界面交互——显示注册状态
  showCommitStatus() {
    this.__setText()
    if (this.db.commitStatus === this.COMMIT_STATUS.UNCOMMITTED) {
      return '未注册'
    } else if (this.db.commitStatus === this.COMMIT_STATUS.COMMITTED) {
      return '已注册'
    } else if (this.db.commitStatus === this.COMMIT_STATUS.REJECTED) {
      return '已拒绝'
    } else if (this.db.commitStatus === this.COMMIT_STATUS.WAITING) {
      return '等待中'
    }
  }

  // 界面交互——显示按钮中的文字
  __setText() {
    // sys_admin && row.status !== 1 && (row.isLocal === 0 || row.isLocal === 1 || row.isLocal === 4) && sysModel === 2
    if (this.db.roleType === this.ROLE_TYPE.CLASS_A
        && this.db.commitStatus !== this.COMMIT_STATUS.COMMITTED
        && (this.db.isLocal === this.DB_DISTRIBUTION_TYPE.LOCAL
            || this.db.isLocal === this.DB_DISTRIBUTION_TYPE.IN_DOMAIN
            || this.db.isLocal === this.DB_DISTRIBUTION_TYPE.UNIQUE_LOCAL)
        && this.db.sysModel === this.SYS_MODEL.SUB_DB_MODE) {
      let temp = {
        text: '提交注册',
        backgroundColor: 'primary',
        visible: true,
        btnClick: () => {
          ElMessage.success(`${this.db.databaseName}被点击了`)
        }
      }
      console.log('temp:', temp)
      if (!this.btnList.some(item => item.text === temp.text)) {
        this.btnList.push(temp)
      }
    }
    // sys_admin && row.status === 1 && (row.isLocal === 0 || row.isLocal ===1 || row.isLocal === 4) && !row.share && sysModel === 2
    else if (this.db.roleType === this.ROLE_TYPE.CLASS_A
        && this.db.commitStatus === this.COMMIT_STATUS.COMMITTED
        && (this.db.isLocal === this.DB_DISTRIBUTION_TYPE.LOCAL
            || this.db.isLocal === this.DB_DISTRIBUTION_TYPE.IN_DOMAIN
            || this.db.isLocal === this.DB_DISTRIBUTION_TYPE.UNIQUE_LOCAL)
        && !this.db.share
        && this.db.sysModel === this.SYS_MODEL.SUB_DB_MODE) {
      let temp = {
        text: '表共享',
        backgroundColor: 'success',
        visible: true,
        btnClick: () => {
          ElMessage.success(`${this.db.databaseName}被点击了`)
        }
      }
      console.log('temp:', temp)

      if (!this.btnList.some(item => item.text === temp.text)) {
        this.btnList.push(temp)
      }
    }
    // sys_admin && row.isLocal !== 2 && (sysModel === 0 || sysModel === 3)
    else if (this.db.roleType === this.ROLE_TYPE.CLASS_A
        && this.db.isLocal !== this.DB_DISTRIBUTION_TYPE.CROSS_DOMAIN
        && (this.db.sysModel === this.SYS_MODEL.SINGLE_MODE || this.db.sysModel === this.SYS_MODEL.CENTER_DB_MODE)) {
      let temp = {
        text: '用户授权',
        backgroundColor: 'warning',
        visible: true,
        btnClick: () => {
          ElMessage.success(`${this.db.databaseName}被点击了`)
        }
      }
      console.log('temp:', temp)

      if (!this.btnList.some(item => item.text === temp.text)) {
        this.btnList.push(temp)
      }
    }

    // sysMode === 2 && sys_admin && row.isLocal === 3 && (sysModel === 0 || sysModel === 3)
    else if (this.db.sysModel === this.SYS_MODEL.SUB_DB_MODE
        && this.db.roleType === this.ROLE_TYPE.CLASS_A
        && this.db.isLocal === this.DB_DISTRIBUTION_TYPE.CENTER
        && (this.db.sysModel === this.SYS_MODEL.SINGLE_MODE || this.db.sysModel === this.SYS_MODEL.CENTER_DB_MODE)) {
      let temp = {
        text: '业务授权',
        backgroundColor: 'danger',
        visible: true,
        btnClick: () => {
          ElMessage.success(`${this.db.databaseName}被点击了`)
        }
      }
      console.log('temp:', temp)

      if (!this.btnList.some(item => item.text === temp.text)) {
        this.btnList.push(temp)
      }
    }

    this.getBtnList()
  }

  getBtnList() {
    console.log('this.btnList:', this.btnList)
    return this.btnList
  }
}


const tableData = ref([])
const listData = [
  {
    id: 1,
    databaseName: 'db1',
    type: 'postgresql',
    ip: '127.0.0.1',
    port: '5432',
    runningStatus: 'running',
    commitStatus: 0,
    share: false,
    sysModel: 0,
    roleType: 'sysadmin',
    isLocal: 0,
  },
  {
    id: 2,
    databaseName: 'db2',
    type: 'mysql',
    ip: '127.0.0.1',
    port: '3306',
    runningStatus: 'shutdown',
    commitStatus: 0,
    share: false,
    sysModel: 2,
    roleType: 'sysadmin',
    isLocal: 0,
  },
  {
    id: 3,
    databaseName: 'db3',
    type: 'oracle',
    ip: '127.0.0.1',
    port: '1521',
    runningStatus: 'starting',
    commitStatus: 1,
    share: false,
    sysModel: 2,
    roleType: 'sysadmin',
    isLocal: 0
  },
  {
    id: 4,
    databaseName: 'db4',
    type: 'sqlserver',
    ip: '127.0.0.1',
    port: '1433',
    runningStatus: 'running',
    commitStatus: 3,
    share: false,
    sysModel: 0,
    roleType: 'sysadmin',
    isLocal: 0
  },
  {
    id: 5,
    databaseName: 'db5',
    type: 'mongodb',
    ip: '127.0.0.1',
    port: '27017',
    runningStatus: '',
    commitStatus: 0,
    share: false,
    sysModel: 0,
    roleType: 'sysadmin',
    isLocal: 0
  },
]

onBeforeMount(() => {
  tableData.value = listData
  tableData.value.forEach(item => {
    item.___sin_factor_control = new RunningStatusBtnController(item.runningStatus)

    item.___multi_factor_control = new CommitSatusBtnController(item)
  })
  console.log('tableData.value:', tableData.value)
})
</script>

<style scoped>

</style>