<template>
  <div>
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
        :row-config="{isHover: true, isCurrent:true}"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
        align="center"
        height="350"
        width="50%"
        @current-change="currentChangeEvent"
    >
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
          <vxe-button @click="handleDirectUpdate(row)">点击status更新</vxe-button>
          <template v-if="$refs.xTable.isUpdateByRow(row)">
            <vxe-button @click="saveTheUpdate(row)" :loading="row.loading">更新编辑</vxe-button>
          </template>
        </template>
      </vxe-column>
    </vxe-table>
    <br/>

    <div>
      <vxe-grid ref="xGrid" v-bind="gridOptions">
        <template #operate="{ row }">
          <template v-if="hasActiveEditRow(row)">
            <vxe-button content="取消" @click="clearRowEvent"></vxe-button>
            <vxe-button status="primary" content="保存" @click="saveRowEvent(row)"></vxe-button>
          </template>
          <template v-else>
            <vxe-button v-if="row.changeable === 'yes'" content="编辑" @click="editRowEvent(row)"></vxe-button>
          </template>
          <!--          <vxe-button status="danger" content="删除" @click="removeRowEvent(row)"></vxe-button>-->
          <vxe-button
              v-if="!$refs.xGrid.isInsertByRow(row) && row.changeable === 'yes'"
              @click="$refs.xGrid.revertData(row)">还原
          </vxe-button>
        </template>

        <template #default="{ row }">
          {{ row.key }}
        </template>
        <template #value_edit="{ row }">
          <vxe-input v-model="row.value"></vxe-input>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted, ref, reactive} from 'vue'
import {VXETable, VxeTableInstance, VxeColumnPropTypes} from 'vxe-table'
import XEUtils from 'xe-utils'

import {GetTestData, DirectUpdate, SaveTheUpdate} from "../../../api/learn/saveLocalInVXETable.js";


const loading = ref(false)
const tableData = ref(null)

const xTable = ref<VxeTableInstance>();


/********************* 局部更新 *********************/
// 直接更新
const handleDirectUpdate = (row: any) => {
  console.log('row:', row)
  const $table = xTable.value
  row.loading = true
  let data = {
    id: row.id,
    name: row.name,
    status: row.status
  }
  const dataForm = {
    data: data
  }
  DirectUpdate(dataForm).then(response => {
    console.log('response:', response)
    row.loading = false
    tableData.value.find(item => item.id === row.id).status = response.data.data.status
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
    let data = {
      id: row.id,
      name: row.name,
      status: row.status
    }
    const dataForm = {
      data: data
    }
    SaveTheUpdate(dataForm).then(response => {
      console.log('response:', response)
      row.loading = false
      tableData.value.find(item => item.id === row.id).status = response.data.data.status
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


/**
 * 获取当前选中的行
 */
// 表格当前选中行数据
const curRow: any = ref();
const currentChangeEvent = () => {
  const $table: any = xTable.value;
  curRow.value = $table.getCurrentRecord();
}


onMounted(() => {
  GetTestData().then(response => {
    console.log('response:', response)
    tableData.value = response.data.dataList
  }).catch(error => {
    console.log(error)
  })
})


const xGrid = ref()
const gridOptions = reactive({
  border: true,
  keepSource: true,
  showOverflow: true,
  height: 530,
  loading: false,
  columnConfig: {
    resizable: true
  },
  editConfig: {
    trigger: 'manual',
    mode: 'row',
    showStatus: true
  },
  columns: [
    {type: 'seq', width: 60},
    {field: 'key', title: 'key'},
    {field: 'value', title: 'value', editRender: {autofocus: '.vxe-input--inner'}, slots: {edit: 'value_edit'}},
    {title: '操作', width: 300, slots: {default: 'operate'}}
  ],
  data: []
})


import PgBouncerItems from './PgBouncerItems.json'

const findList = () => {
  console.log('PgBouncerItems:', PgBouncerItems)
  gridOptions.loading = true
  setTimeout(() => {
    gridOptions.loading = false

    gridOptions.data = PgBouncerItems
  }, 300)
}

const hasActiveEditRow = (row) => {
  console.log('row:', row)
  const $grid = xGrid.value
  if ($grid) {
    return $grid.isEditByRow(row)
  }
  return false
}

const editRowEvent = (row) => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.setEditRow(row)
  }
}

const clearRowEvent = () => {
  const $grid = xGrid.value
  if ($grid) {
    $grid.clearEdit()
  }
}

const saveRowEvent = async (row) => {
  const $grid = xGrid.value
  if ($grid) {
    await $grid.clearEdit()
    gridOptions.loading = true
    // 模拟异步保存
    setTimeout(() => {
      gridOptions.loading = false
      VXETable.modal.message({content: `${JSON.stringify(row)}`, status: 'success'})
    }, 300)
  }
}

const removeRowEvent = async (row) => {
  const type = await VXETable.modal.confirm('您确定要删除该数据?')
  const $grid = xGrid.value
  if ($grid) {
    if (type === 'confirm') {
      await $grid.remove(row)
    }
  }
}

const revertEvent = async () => {
  const $table = xTable.value
  const type = await VXETable.modal.confirm('您确定要还原数据吗?')
  if (type === 'confirm') {
    $table.revertData()
  }
}

findList()
</script>

<style scoped>

</style>

