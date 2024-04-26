<template>
  <!--  <div class="app-container">-->
  <div>
    <vxe-grid ref="xGrid" v-bind="gridOptions"/>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from 'vue'

const xGrid = ref()
const tableDataLength = ref(3)

const gridOptions = reactive({
  loading: false,
  border: true,
  align: null,
  height: 'auto',  // 设置为 auto，表格高度会自动充满父容器
  keepSource: true,
  showStatus: true,
  toolbarConfig: {
    buttons: [{code: 'myInsert', name: '新增'}],
  },
  columns: [
    {type: 'seq', width: 50},
    {field: 'name', title: 'name'},
    {field: 'sex', title: 'sex'},
    {field: 'address', title: 'Address'}
  ],
  data: []
})


onBeforeMount(() => {
  gridOptions.loading = true
  // 模拟后端请求
  setTimeout(() => {
    gridOptions.data = [
      {id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen'},
      {id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
      {id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
      {id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen'},
      {id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
      {id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
      {id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen'},
      {id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
      {id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'}
    ]
    gridOptions.loading = false
  }, 1000)
})
</script>

<style scoped>
.app-container {
  height: calc(100vh - 100px);
}

.vxe-grid {
  height: calc(100vh - 300px);
}
</style>