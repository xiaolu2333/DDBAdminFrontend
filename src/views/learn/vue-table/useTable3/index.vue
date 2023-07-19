<template>
  <div>
    <p>
      <vxe-button @click="toggleSelectRow(tableData[1])">切换第二行选中</vxe-button>
      <vxe-button @click="setSelectRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
      <vxe-button @click="selectAllEvent">设置所有行选中</vxe-button>
      <vxe-button @click="clearSelectEvent">清除所有行选中</vxe-button>
      <vxe-button @click="getSelectEvent">获取选中</vxe-button>
      <vxe-button class="clickable" @click="getSelectedEvent">获取selected=true选中</vxe-button>
    </p>

    <vxe-table
        border
        ref="tableRef"
        :data="tableData"
        :header-align="'center'"
        :align="'center'"
        :height="440"
        :width="200"
        :row-config="{keyField: 'id', isHover: true}"
        :checkbox-config="{highlight:true, checkRowKeys:selectDataOriginIds}"
        @checkbox-all="selectAllChangeEvent"
        @checkbox-change="selectChangeEvent"
        @checkbox-range-change="selectRangeChangeEvent"
    >
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>
    <p>
      <vxe-button @click="clear">清除</vxe-button>
      <vxe-button @click="reset">重置</vxe-button>
      <vxe-button @click="submit">确认</vxe-button>
    </p>

    <div>
      <p>选中的数据：</p>
      <pre>{{ JSON.stringify(selectData, null, 2) }}</pre>
    </div>

    <!--    <el-button @click="showDialog">showDialog</el-button>-->
    <!--    <el-dialog-->
    <!--        :model-value="dialogVisible"-->
    <!--    >-->
    <!--    </el-dialog>-->
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {VXETable, VxeTableEvents, VxeTableInstance} from 'vxe-table'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
  selected?: boolean
}

const dialogVisible = ref(false)
const tableRef = ref<VxeTableInstance>()
const tableData = ref<RowVO[]>([
  {id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', selected: true},
  {id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
  {id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', selected: true},
  {id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc', selected: true},
  {id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'}
])
const selectData = ref<RowVO[]>([])
// 保存原始选中的数据
const selectDataOrigin = ref<RowVO[]>([])
// 保存原始选中的数据的id
const selectDataOriginIds = ref<string[]>([])


//
const showDialog = () => {
  getSelectedEvent()
  dialogVisible.value = true
}

// 选中所有事件
const selectAllChangeEvent: VxeTableEvents.CheckboxAll = ({checked}) => {
  const $table = tableRef.value
  if ($table) {
    const records = $table.getCheckboxRecords()
    console.log(checked ? '所有勾选事件' : '所有取消事件', records)
    selectData.value = records
  }
}


// 选中事件
const selectChangeEvent: VxeTableEvents.CheckboxChange = ({checked}) => {
  const $table = tableRef.value
  if ($table) {
    const records = $table.getCheckboxRecords()
    console.log(checked ? '勾选事件' : '取消事件', records)
    selectData.value = records
  }
}

// 选中范围事件
const selectRangeChangeEvent: VxeTableEvents.CheckboxRangeChange = ({checked, records}) => {
  const $table = tableRef.value
  // 如果selected=true，则设置为选中状态
  if ($table) {
    const selectRecords = $table.getCheckboxRecords()
    console.log(checked ? '勾选范围事件' : '取消范围事件', records)
    selectData.value = selectRecords
  }
}

// 选中/取消指定行
const toggleSelectRow = (row: RowVO) => {
  const $table = tableRef.value
  if ($table) {
    $table.toggleCheckboxRow(row)
    selectData.value = $table.getCheckboxRecords()
  }
}

// 选中指定多行
const setSelectRow = (rows: RowVO[], checked: boolean) => {
  const $table = tableRef.value
  if ($table) {
    $table.setCheckboxRow(rows, checked)
    selectData.value = $table.getCheckboxRecords()
  }
}

// 设置所有选中
const selectAllEvent = () => {
  const $table = tableRef.value
  if ($table) {
    $table.setAllCheckboxRow(true)
    selectData.value = $table.getCheckboxRecords()
  }
}

// 清除所有选中
const clearSelectEvent = () => {
  const $table = tableRef.value
  if ($table) {
    $table.clearCheckboxRow()
    selectData.value = $table.getCheckboxRecords()
  }
}

// 获取选中数据
const getSelectEvent = () => {
  const $table = tableRef.value
  if ($table) {
    const selectRecords = $table.getCheckboxRecords()
    VXETable.modal.alert(`${selectRecords.length}条数据`)
    selectData.value = $table.getCheckboxRecords()
  }
}

// 清除
const clear = () => {
  const $table = tableRef.value
  if ($table) {
    $table.clearCheckboxRow()
    selectData.value = $table.getCheckboxRecords()
  }
}

// 重置
const reset = () => {
  const $table = tableRef.value
  if ($table) {
    $table.clearCheckboxRow()
    setSelectRow(selectDataOrigin.value, true)
    selectData.value = $table.getCheckboxRecords()
  }
}

// 确认
const submit = () => {
  const $table = tableRef.value
  if ($table) {
    selectData.value = $table.getCheckboxRecords()
    console.log('submit', selectData.value)
  }
}

/**
 * 设置指定行选中
 */
const getSelectedEvent = () => {
  const $table = tableRef.value
  let selectedRows = []
  selectedRows = tableData.value.filter((item) => item?.selected)
  console.log('selectedRows', selectedRows)

  if ($table) {
    $table.setCheckboxRow(selectedRows, true)

    selectData.value = $table.getCheckboxRecords()
    selectDataOrigin.value = selectData.value
  }
}

onMounted(() => {
  selectData.value = []
  selectDataOrigin.value = []
  selectDataOriginIds.value = []
  tableData.value.forEach((item) => {
    if (item.selected) {
      selectData.value.push(item)
      selectDataOrigin.value.push(item)
      selectDataOriginIds.value.push(item.id.toString())
    }
  })
})
</script>