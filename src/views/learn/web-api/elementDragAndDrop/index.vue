<template>
  <el-table :data="tableData" id="dragTable" border style="width: 800px;">
    <el-table-column prop="date" label="Date" width="180"/>
    <el-table-column prop="name" label="Name" width="180"/>
    <el-table-column prop="address" label="Address"/>
  </el-table>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import Sortable from 'sortablejs'


const column = [
  {field: 'date', title: 'Date'},
  {field: 'name', title: 'Name'},
  {field: 'address', title: 'Address'},
]

const tableData = ref([
  {
    id: 10001,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    index: 1
  },
  {
    id: 10002,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    index: 2
  },
  {
    id: 10003,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    index: 3
  },
  {
    id: 10004,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    index: 4
  },
])

function setSort() {
  const el = document.querySelector('#dragTable table tbody')
  new Sortable(el, {
    sort: true,
    ghostClass: 'sortable-ghost',
    onEnd: (e) => {
      console.log(e)
      const oldIdx = e.oldIndex
      const newIdx = e.newIndex
      // 将表格中 oldIdx 处的数据移动到 newIdx 处

      const movedElement = tableData.value.splice(e.oldIndex, 1)[0]; // Remove the element at index 3 and store it in movedElement
      tableData.value.splice(e.newIndex, 0, movedElement)
      console.log('tableData:', tableData)
    },
  })
}

onMounted(() => {
  setSort()
})
</script>
