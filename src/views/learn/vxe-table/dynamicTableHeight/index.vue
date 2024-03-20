<template>
  <div>
    <el-card>
      <!--      <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents" :style="'height:' + calcTableHeight + 'px;'"/>-->
      <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents"/>
    </el-card>
  </div>
</template>

<script setup>
import {onBeforeMount, reactive, ref} from 'vue'

const xGrid = ref()
const tableDataLength = ref(3)

// 计算表格高度
const calcTableHeight = () => {
  console.log('tableDataLength.value', tableDataLength.value)

  // // 获取表格中新增数据
  // xGrid.value.getRecordset().insertRecords
  console.log('xGrid.value.getRecordset().insertRecords:', xGrid.value.getRecordset().insertRecords)

  return tableDataLength.value < 5 ? 48 * 5 : 48 * xGrid.value.getRecordset().insertRecords
}

const gridOptions = reactive({
  loading: false,
  border: true,
  align: null,
  height: 48 * 6,
  // minHeight: 800,
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

const gridEvents = {
  toolbarButtonClick({code}) {
    const $grid = xGrid.value
    if ($grid) {
      switch (code) {
        case 'myInsert': {
          $grid.insert({
            name: 'xxx'
          })
          break
        }
        case 'myRefresh': {
          $grid.getRecordset().insertRecords = []
          break
        }
      }
    }
  }
}


onBeforeMount(() => {
  gridOptions.loading = true
  // 模拟后端请求
  setTimeout(() => {
    gridOptions.data = [
      // {id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen'},
      // {id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
      // {id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'}
    ]
    gridOptions.loading = false
    // tableDataLength.value = gridOptions.data.length
  }, 1000)
})
</script>
