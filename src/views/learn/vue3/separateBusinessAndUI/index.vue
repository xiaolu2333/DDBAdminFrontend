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
    <vxe-column field="runningStatus" title="运行状态">
      <template #default="scope">
        <span>{{ scope.row.__controller.showRunningStatus() }}</span>
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
            :type="scope.row.__controller.backgroundColor"
            v-if="scope.row.__controller.visible"
            @click="scope.row.__controller.btnClick(scope.row)"
        >
          {{ scope.row.__controller.text }}
        </el-button>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup>
import {computed, onBeforeMount, reactive, ref} from "vue";

import {vBtnLoseFocus} from "@/directives/ui/elementPLus.js";
import {ElMessage} from "element-plus";

// 业务注册类型
const COMMIT_STATUS = {
  0: 0, // 未注册
  1: 1, // 已注册
  2: 2, // 已拒绝
  3: 3  // 等待中
}

// // 运行状态
// const RUNNING_STATUS = {
//   RUNNING: 'running', // 正在运行
//   SHUTDOWN: 'shutdown', // 已经关闭
//   STARTING: 'starting', // 正在启动
// }

class BtnController {
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
  },
  {
    id: 2,
    databaseName: 'db2',
    type: 'mysql',
    ip: '127.0.0.1',
    port: '3306',
    runningStatus: 'shutdown',
  },
  {
    id: 3,
    databaseName: 'db3',
    type: 'oracle',
    ip: '127.0.0.1',
    port: '1521',
    runningStatus: 'starting',
  },
  {
    id: 4,
    databaseName: 'db4',
    type: 'sqlserver',
    ip: '127.0.0.1',
    port: '1433',
    runningStatus: 'running',
  },
  {
    id: 5,
    databaseName: 'db5',
    type: 'mongodb',
    ip: '127.0.0.1',
    port: '27017',
    runningStatus: '',
  },
]

onBeforeMount(() => {
  tableData.value = listData
  tableData.value.forEach(item => {
    item.__controller = new BtnController(item.runningStatus)
  })
  console.log('tableData.value:', tableData.value)
})
</script>

<style scoped>

</style>