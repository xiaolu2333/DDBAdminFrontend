<template>
  <vxe-toolbar>
    <template #buttons>
      <vxe-button @click="insertEvent">新增</vxe-button>
      <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
      <vxe-button @click="getInsertEvent">获取新增</vxe-button>
      <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
      <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      <vxe-button @click="saveEvent">保存</vxe-button>
    </template>
  </vxe-toolbar>

  <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :loading="loading"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
    <vxe-column type="checkbox" width="60"></vxe-column>
    <vxe-column type="seq" width="60"></vxe-column>
    <vxe-column field="name" title="Name" :edit-render="{autofocus: '.myinput'}">
      <template #edit="scope">
        <input type="text" class="myinput" v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
      </template>
    </vxe-column>
    <vxe-column field="status" title="Status" :edit-render="{autofocus: '.myinput'}">
      <template #edit="scope">
        <input type="text" class="myinput" v-model="scope.row.status" @input="$refs.xTable.updateStatus(scope)"/>
      </template>
    </vxe-column>
    <vxe-column title="操作" width="300">
      <template #default="{ row }">
        <vxe-button @click="handleDirectUpdate(row)">直接更新</vxe-button>
        <template v-if="$refs.xTable.isUpdateByRow(row)">
          <vxe-button @click="saveTheUpdate(row)" :loading="row.loading">编辑更新</vxe-button>
        </template>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue'
import {VXETable, VxeTableInstance, VxeColumnPropTypes} from 'vxe-table'
import XEUtils from 'xe-utils'

import {GetTestData, DirectUpdate, SaveTheUpdate} from "../../../api/learn/saveLocalInVXETable.js";


const loading = ref(false)
const tableData = ref(null)

const xTable = ref<VxeTableInstance>();

const formatDate: VxeColumnPropTypes.Formatter = ({cellValue}) => {
  return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
}

/********************* 局部更新 *********************/
// 直接更新
const handleDirectUpdate = (row: any) => {
  console.log('row:', row)
  const $table = xTable.value
  row.loading = true
  const dataForm = {
    data: row
  }
  DirectUpdate(dataForm).then(response => {
    console.log('response:', response)
    row.loading = false
    row.status = response.data.data.status
    // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true
    $table.reloadRow(row, {})
    VXETable.modal.message({content: '保存成功！', status: 'success'})
  }).catch(error => {
    console.log(error)
  })
}

// 保存更新
const saveTheUpdate = (row: any) => {
  const $table = xTable.value
  if ($table.isUpdateByRow(row)) {
    row.loading = true
    SaveTheUpdate(row).then(response => {
      console.log('response:', response)
      row.loading = false
      row.status = response.data.data.status
      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true
      $table.reloadRow(row, {})
      VXETable.modal.message({content: '保存成功！', status: 'success'})
    }).catch(error => {
      console.log(error)
    })
  } else {
    VXETable.modal.message({content: '数据未改动！', status: 'info'})
  }
}

/******************** 顶部工具栏按钮事件 ********************/
const insertEvent = async () => {
  const $table = xTable.value
  const record = {}
  const {row: newRow} = await $table.insert(record)
  await $table.setEditCell(newRow, 'name')
}


const saveEvent = () => {
  loading.value = true
  // 默认异步
  setTimeout(() => {
    loading.value = false
    // 保存完成后重新刷新数据
    tableData.value = []
  }, 300)
}

const getInsertEvent = () => {
  const $table = xTable.value
  const insertRecords = $table.getInsertRecords()
  VXETable.modal.alert(`新增：${insertRecords.length}`)
}

const getRemoveEvent = () => {
  const $table = xTable.value
  const removeRecords = $table.getRemoveRecords()
  VXETable.modal.alert(`删除：${removeRecords.length}`)
}

const getUpdateEvent = () => {
  const $table = xTable.value
  const updateRecords = $table.getUpdateRecords()
  VXETable.modal.alert(`更新：${updateRecords.length}`)
}


onMounted(() => {
  GetTestData().then(response => {
    console.log(response)
    tableData.value = response.data
  })
})
</script>

<style scoped>

</style>