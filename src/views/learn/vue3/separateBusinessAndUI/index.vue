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
    <vxe-column field="status" title="状态">
      <template #default="scope">
        <span>{{ scope.row.__controller.showStatus() }}</span>
      </template>
    </vxe-column>
    <vxe-column title="操作" width="200">
      <template #default="scope">
        <el-button
            v-btn-lose-focus
            :type="scope.row.__controller.backgroundColor"
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

class OperationBtn {
  constructor(status) {
    this.status = ref(status)
    this.visible = ref(false)
    this.text = ref(null)
    this.backgroundColor = ref(null)
  }

  // 界面交互——显示状态
  showStatus() {
    this.__setText()
    this.__setBackgroundColor()

    if (this.status === 'running') {
      return '正在运行'
    } else if (this.status === 'shutdown') {
      return '已经关闭'
    } else if (this.status === 'starting') {
      return '正在启动'
    } else {
      return '未知状态'
    }
  }

  // 界面交互——显示按钮中的文字
  __setText() {
    if (this.status === 'running') {
      this.text = '关闭'
    } else if (this.status === 'shutdown') {
      this.text = '启动'
    } else if (this.status === 'starting') {
      this.text = '重启'
    }
  }

  // 界面交互——显示按钮的背景颜色
  __setBackgroundColor() {
    if (this.status === 'running') {
      this.backgroundColor = 'danger'
    } else if (this.status === 'shutdown') {
      this.backgroundColor = 'primary'
    } else if (this.status === 'starting') {
      this.backgroundColor = 'success'
    }
  }

  // 业务逻辑——按钮点击事件
  btnClick(dnInfo) {
    if (this.status === 'running') {
      ElMessage.success(`${dnInfo.databaseName}关闭成功`)
    } else if (this.status === 'shutdown') {
      ElMessage.success(`${dnInfo.databaseName}启动成功`)
    } else if (this.status === 'starting') {
      ElMessage.success(`${dnInfo.databaseName}重启成功`)
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
    status: 'running',
  },
  {
    id: 2,
    databaseName: 'db2',
    type: 'mysql',
    ip: '127.0.0.1',
    port: '3306',
    status: 'shutdown',
  },
  {
    id: 3,
    databaseName: 'db3',
    type: 'oracle',
    ip: '127.0.0.1',
    port: '1521',
    status: 'starting',
  },
  {
    id: 4,
    databaseName: 'db4',
    type: 'sqlserver',
    ip: '127.0.0.1',
    port: '1433',
    status: 'running',
  },
  {
    id: 5,
    databaseName: 'db5',
    type: 'mongodb',
    ip: '127.0.0.1',
    port: '27017',
    status: 'starting',
  },
]

onBeforeMount(() => {
  tableData.value = listData
  tableData.value.forEach(item => {
    item.__controller = new OperationBtn(item.status)
  })
  console.log('tableData.value:', tableData.value)
})
</script>

<style scoped>

</style>