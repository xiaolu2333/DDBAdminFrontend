<script setup>
import {ref} from 'vue';

import MyTable from "./MyTable.vue";


const tableColumnConfig = [
  {
    field: 'name',
    title: '姓名',
    uiType: 'input',
  },
  {
    field: 'gender',
    title: '性别',
    uiType: 'select',
    options: [
      {
        id: 1,
        label: '男',
        value: 'male'
      },
      {
        id: 2,
        label: '女',
        value: 'female'
      }
    ]
  },
  {
    field: 'hobby',
    title: '爱好',
    uiType: 'checkbox',
    options: [
      {
        label: '篮球',
        val: 'basketball'
      },
      {
        label: '足球',
        val: 'football'
      },
      {
        label: '羽毛球',
        val: 'badminton'
      }
    ]
  },
  {
    field: 'isStudent',
    title: '是否学生',
    uiType: 'switch',
  },
  {
    field: 'privilege',
    title: '权限',
    uiType: 'pulldown',
    options: [
      {
        label: 'view',
        value: '查看'
      },
      {
        label: 'edit',
        value: '编辑'
      },
      {
        label: 'delete',
        value: '删除'
      }
    ]
  }
]
const tableData = [
  {
    name: '张三',
    gender: '男',
    hobby: ['basketball', 'football'],
    isStudent: true,
    privilege: ['view']
  },
  {
    name: '李四',
    gender: '女',
    hobby: ['basketball', 'badminton'],
    isStudent: false,
    privilege: ['edit', 'delete']
  }
]

const tableRef = ref()
const handleClick = () => {
  let tableData = tableRef.value.getTableData()
  console.log('tableData:', tableData)
}
</script>

<template>
  <MyTable
      ref="tableRef"
      :config="tableColumnConfig"
      :data="tableData"
  />
  <el-button @click="handleClick">获取表格数据</el-button>
</template>

<style scoped>

</style>