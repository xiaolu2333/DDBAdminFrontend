<template>
  <h4>根据列信息动态渲染表格</h4>
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue'
import {VxeGridProps} from 'vxe-table'

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  address: string
}

const gridOptions = reactive<VxeGridProps<RowVO>>({
  border: true,
  loading: false,
  height: 300,
  columns: [],
  data: [],
  columnConfig: {
    resizable: true
  }
})

onMounted(() => {
  gridOptions.loading = true
  setTimeout(() => {
    gridOptions.loading = false

    // 列配置
    let columnsDesc = [
      {field: 'name', title: 'Name'},
      {field: 'sex', title: 'Sex'},
      {field: 'role', title: 'Role'},
      {field: 'address', title: 'Address'}
    ]
    gridOptions.columns = columnsDesc

    // 数据列表
    let tableData = [
      {id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen'},
      {id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
      {id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
      {id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen'},
      {id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'},
      {id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen'},
      {id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen'},
      {id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen'}
    ]
    gridOptions.data = tableData
  }, 1500)
})
</script>
