<template>
  <div>
    <el-select
        v-model="name"
        filterable
        allow-create
        clearable
        default-first-option
        :reserve-keyword="false"
        @change="handleNameChange"
    >
      <el-option
          v-for="item in nameOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <br/>
    <vxe-select v-model="val1" placeholder="默认尺寸">
      <vxe-option v-for="num in 15" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
    </vxe-select>
    <br/>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent()">新增</vxe-button>
        <vxe-button @click="insertEvent(tableData[2])">在第3行插入并激活 Sex 单元格</vxe-button>
        <vxe-button @click="insertEvent(-1)">在最后行插入</vxe-button>
        <vxe-button @click="removeSelectRowEvent">删除选中</vxe-button>
        <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="setActiveEditRow">激活第三行</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
        border
        show-overflow
        keep-source
        ref="xTable"
        max-height="400"
        :data="tableData"
        :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable
                  :edit-render="{autofocus: '.vxe-input--inner'}"
      >
        <template #edit="{ row }">
          <el-select
              v-model="row.name"
              filterable
              allow-create
              clearable
              default-first-option
              placeholder="—— 请选择 ——"
              :reserve-keyword="false"
              @change="handleNameChange"
          >
            <el-option
                v-for="item in nameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{}">
        <template #default="{ row }">
          <span>{{ formatSex(row.sex) }}</span>
        </template>
        <template #edit="{ row }">
          <vxe-select v-model="row.sex" transfer>
            <vxe-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
          </vxe-select>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {VXETable, VxeTableInstance} from 'vxe-table'

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  sex2: string[]
  num1: number
  age: number
  address: string
  date12: string
  date13: string
}

const xTable = ref<VxeTableInstance<RowVO>>()

const tableData = ref<RowVO[]>([
  {
    id: 10001,
    name: 'Test1',
    nickname: 'T1',
    role: 'Develop',
    sex: '0',
    sex2: ['0'],
    num1: 40,
    age: 28,
    address: 'Shenzhen',
    date12: '',
    date13: ''
  },
  {
    id: 10002,
    name: 'Test2',
    nickname: 'T2',
    role: 'Designer',
    sex: '1',
    sex2: ['0', '1'],
    num1: 20,
    age: 22,
    address: 'Guangzhou',
    date12: '',
    date13: '2020-08-20'
  },
  {
    id: 10003,
    name: 'Test3',
    nickname: 'T3',
    role: 'Test',
    sex: '0',
    sex2: ['1'],
    num1: 200,
    age: 32,
    address: 'Shanghai',
    date12: '2020-09-10',
    date13: ''
  },
  {
    id: 10004,
    name: 'Test4',
    nickname: 'T4',
    role: 'Designer',
    sex: '1',
    sex2: ['1'],
    num1: 30,
    age: 23,
    address: 'Shenzhen',
    date12: '',
    date13: '2020-12-04'
  }
])

const sexList = ref([
  {label: '', value: ''},
  {label: '男', value: '1'},
  {label: '女', value: '0'}
])

const nameOptions = ref([
  {label: '张三', value: '张三'},
  {label: '李四', value: '李四'},
  {label: '王五', value: '王五'},
])

const formatSex = (value: string) => {
  if (value === '1') {
    return '男'
  }
  if (value === '0') {
    return '女'
  }
  return ''
}

const name = ref('')
const val1 = ref(0)
const handleNameChange = (val) => {
  console.log('val:', val)
}

const insertEvent = async (row?: RowVO | number) => {
  const $table = xTable.value
  if ($table) {
    const record = {
      sex: '1',
      date12: '2021-01-01'
    }
    const {row: newRow} = await $table.insertAt(record, row)
    await $table.setEditCell(newRow, 'name')
  }
}

const setActiveEditRow = () => {
  const $table = xTable.value
  if ($table) {
    $table.setEditCell(tableData.value[2], 'name')
  }
}

const removeSelectRowEvent = () => {
  const $table = xTable.value
  if ($table) {
    $table.removeCheckboxRow()
  }
}

const getInsertEvent = () => {
  const $table = xTable.value
  if ($table) {
    const insertRecords = $table.getInsertRecords()
    VXETable.modal.alert(`新增：${insertRecords.length}`)
  }
}

const getSelectionEvent = () => {
  const $table = xTable.value
  if ($table) {
    const selectRecords = $table.getCheckboxRecords()
    VXETable.modal.alert(`选中：${selectRecords.length}`)
  }
}

const saveEvent = () => {
  const $table = xTable.value
  if ($table) {
    const {insertRecords, removeRecords, updateRecords} = $table.getRecordset()
    VXETable.modal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
  }
}
</script>


<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div>&ndash;&gt;-->
<!--&lt;!&ndash;    <vxe-toolbar>&ndash;&gt;-->
<!--&lt;!&ndash;      <template #buttons>&ndash;&gt;-->
<!--&lt;!&ndash;        <vxe-button @click="allAlign = 'left'">居左</vxe-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <vxe-button @click="allAlign = 'center'">居中</vxe-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <vxe-button @click="allAlign = 'right'">居右</vxe-button>&ndash;&gt;-->
<!--&lt;!&ndash;      </template>&ndash;&gt;-->
<!--&lt;!&ndash;    </vxe-toolbar>&ndash;&gt;-->

<!--&lt;!&ndash;    <vxe-table&ndash;&gt;-->
<!--&lt;!&ndash;      :align="allAlign"&ndash;&gt;-->
<!--&lt;!&ndash;      :data="tableData">&ndash;&gt;-->
<!--&lt;!&ndash;      <vxe-column type="seq" width="60"></vxe-column>&ndash;&gt;-->
<!--&lt;!&ndash;      <vxe-column field="name" title="Name"></vxe-column>&ndash;&gt;-->
<!--&lt;!&ndash;      <vxe-column field="sex" title="Sex"></vxe-column>&ndash;&gt;-->
<!--&lt;!&ndash;      <vxe-column field="age" title="Age"></vxe-column>&ndash;&gt;-->
<!--&lt;!&ndash;    </vxe-table>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script lang="ts" setup>&ndash;&gt;-->
<!--&lt;!&ndash;import { ref } from 'vue'&ndash;&gt;-->
<!--&lt;!&ndash;import { VxeTablePropTypes } from 'vxe-table'&ndash;&gt;-->

<!--&lt;!&ndash;interface RowVO {&ndash;&gt;-->
<!--&lt;!&ndash;  id: number&ndash;&gt;-->
<!--&lt;!&ndash;  name: string&ndash;&gt;-->
<!--&lt;!&ndash;  role: string&ndash;&gt;-->
<!--&lt;!&ndash;  sex: string&ndash;&gt;-->
<!--&lt;!&ndash;  age: number&ndash;&gt;-->
<!--&lt;!&ndash;  address: string&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;const allAlign = ref<VxeTablePropTypes.Align>(null)&ndash;&gt;-->

<!--&lt;!&ndash;const tableData = ref<RowVO[]>([&ndash;&gt;-->
<!--&lt;!&ndash;  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },&ndash;&gt;-->
<!--&lt;!&ndash;  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },&ndash;&gt;-->
<!--&lt;!&ndash;  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },&ndash;&gt;-->
<!--&lt;!&ndash;  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }&ndash;&gt;-->
<!--&lt;!&ndash;])&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->


<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash;通过gridOptions绑定所有配置、列、数据&ndash;&gt;-->
<!--    <vxe-grid v-bind="gridOptions">-->
<!--      &lt;!&ndash;通过toolbar_buttons插槽自定义工具栏按钮&ndash;&gt;-->
<!--      <template #toolbar_buttons>-->
<!--        <vxe-button>刷新</vxe-button>-->
<!--        <vxe-button status="primary">新增</vxe-button>-->
<!--        <vxe-button status="danger">删除</vxe-button>-->
<!--        <vxe-button status="warning">修改</vxe-button>-->
<!--      </template>-->
<!--      <div class="search">-->
<!--        <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>-->
<!--        <vxe-button status="primary">搜索</vxe-button>-->
<!--      </div>-->
<!--    </vxe-grid>-->
<!--  </div>-->
<!--</template>-->


<!--<script lang="ts" setup>-->
<!--import {reactive, ref} from 'vue'-->
<!--import {VxeGridProps} from 'vxe-table'-->

<!--interface RowVO {-->
<!--  id: number-->
<!--  name: string-->
<!--  nickname: string-->
<!--  role: string-->
<!--  sex: string-->
<!--  age: number-->
<!--  address: string-->
<!--}-->

<!--const searchName = ref('')-->

<!--// @ts-ignore-->
<!--const gridOptions = reactive<VxeGridProps<RowVO>>({-->
<!--  // 定义各项属性-->
<!--  border: true,       // 是否带有边框-->
<!--  height: 300,        // 表格高度-->
<!--  align: null,        // 表格对齐方式-->
<!--  columnConfig: {     // 列配置-->
<!--    resizable: true,       // 是否允许拖动列宽调整大小-->
<!--    // 更多列配置请参考 vxe-grid.column-config 属性-->
<!--  },-->
<!--  columns: [          // 列绑定配置-->
<!--    {-->
<!--      type: 'seq',        // 列类型-->
<!--      // 更多列类型请参考 vxe-grid.columns.type 属性，包含seq、checkbox、radio、expand、html五种类型-->
<!--      width: 50           // 列宽度，数字类型使用 px 作为单位，也能用数字+%的形式-->
<!--      // 更多列绑定配置请参考 vxe-grid.columns.width 属性-->
<!--    },-->
<!--    {-->
<!--      field: 'name',      // 列字段名-->
<!--      title: 'name'       // 列标题-->
<!--                          // 更多列绑定配置请参考 vxe-grid.columns 属性-->
<!--    },-->
<!--    {field: 'sex', title: 'sex'},-->
<!--    {field: 'address', title: 'Address'}-->
<!--  ],-->

<!--  // 定义工具栏配置-->
<!--  toolbarConfig: {-->
<!--    slots: {-->
<!--      buttons: 'toolbar_buttons'-->
<!--    }-->
<!--  },-->
<!--  data: [-->
<!--    {id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen'},-->
<!--    {id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},-->
<!--    {id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},-->
<!--    {id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen'},-->
<!--    {id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'},-->
<!--    {id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen'},-->
<!--    {id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen'},-->
<!--    {id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen'}-->
<!--  ]-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--.search {-->
<!--  float: right;-->
<!--}-->
<!--</style>-->