<template>
  <el-button @click="handleConvert">转换</el-button>
</template>
<script setup>
import {reactive, toRefs} from "vue";

const state = reactive({
  loading: true,
  listData: [
    {
      id: 1,
      name: '机构1',
      code: 'JG1',
      status: 1,
      parentCode: "",
      children: []
    },
    {
      id: 2,
      name: '机构2',
      code: 'JG2',
      status: 1,
      parentCode: "JG1",
      children: []
    },
    {
      id: 3,
      name: '机构3',
      code: 'JG3',
      status: 1,
      parentCode: "JG2",
      children: []
    },
    {
      id: 4,
      name: '机构4',
      code: 'JG4',
      status: 1,
      parentCode: "JG2",
      children: []
    },
    {
      id: 5,
      name: '机构5',
      code: 'JG5',
      status: 1,
      parentCode: "",
      children: []
    },
    {
      id: 6,
      name: '机构6',
      code: 'JG6',
      status: 1,
      parentCode: "JG5",
      children: []
    },
    {
      id: 7,
      name: '机构7',
      code: 'JG7',
      status: 1,
      parentCode: "JG4",
      children: []
    }
  ],
  treeData: [],
})

const {
  loading,
  listData,
  treeData
} = toRefs(state);

function handleConvert() {
  state.listData.forEach(item => {
    if (item.parentCode === "") {
      state.treeData.push(item)
    } else {
      const parent = state.listData.find(parent => parent.code === item.parentCode)
      parent.children.push(item)
    }
  })

  console.log(state.listData)
  console.log(state.treeData)
}


</script>