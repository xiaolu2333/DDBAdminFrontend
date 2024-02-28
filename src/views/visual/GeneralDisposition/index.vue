<template>
  <div>
    <el-button-group>
      <el-button @click="handleTypeChange(1)">I级事故</el-button>
      <el-button @click="handleTypeChange(2)">II级事故</el-button>
      <el-button @click="handleTypeChange(3)">III级事故</el-button>
    </el-button-group>

    <el-card>
      <el-form :inline="true" :model="queryForm" class="demo-form-inline">
        <el-form-item label="输入查询：">
          <el-input v-model="queryForm.name" placeholder="作业名称" clearable/>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-select v-model="queryForm.enabled">
            <el-option label="启用" :value="true"/>
            <el-option label="禁用" :value="false"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否锁定">
          <el-select v-model="queryForm.locked">
            <el-option label="锁定" :value="true"/>
            <el-option label="未锁定" :value="false"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <vxe-grid v-bind="gridOptions" v-on="gridEvents">
      <template #name_edit="{ row }">
        <vxe-input v-model="row.name"></vxe-input>
      </template>
      <template #nickname_edit="{ row }">
        <vxe-input v-model="row.nickname"></vxe-input>
      </template>
      <template #role_edit="{ row }">
        <vxe-input v-model="row.role"></vxe-input>
      </template>
      <template #address_edit="{ row }">
        <vxe-input v-model="row.address"></vxe-input>
      </template>

      <template #operations="{ row }">
        <vxe-button type="text" status="primary" content="编辑" icon="vxe-icon-edit"></vxe-button>
        <vxe-button type="text" status="success" content="上传" icon="vxe-icon-upload"></vxe-button>
        <vxe-button type="text" status="danger" content="删除" icon="vxe-icon-delete"></vxe-button>
      </template>

      <template #pager>
        <!--使用 pager 插槽-->
        <vxe-pager
            :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
            v-model:current-page="tablePage.currentPage"
            v-model:page-size="tablePage.pageSize"
            :total="tablePage.total"
            @page-change="handlePageChange">
        </vxe-pager>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, onBeforeMount} from 'vue'
import {VxeGridInstance, VxeGridListeners, VxeGridProps, VxePagerEvents, VXETable} from 'vxe-table'

interface RowType {
  id?: number
  incidentType: string
  incidentProduct: string
  levelOne: string
  levelTwo: string
  levelThree: string
}


/************************************ 标签切换 ***********************************/
const typeCode = ref(1)
const handleTypeChange = (code: number) => {
  typeCode.value = code

  tablePage.currentPage = 1
  tablePage.pageSize = 20
  handleQuery()
}


/************************************ 查询 ***********************************/
const queryForm = reactive({
  name: '',
  enabled: true,
  locked: true
})

const onQuery = () => {
  tablePage.currentPage = 1
  tablePage.pageSize = 20
  handleQuery()
}

const onReset = () => {
  queryForm.name = ''
  queryForm.enabled = true
  queryForm.locked = true

  tablePage.currentPage = 1
  tablePage.pageSize = 20
  handleQuery()
}


const xGrid = ref<VxeGridInstance>()
// @ts-ignore
const gridOptions = reactive<VxeGridProps>({
  id: 'GeneralDisposition',
  border: true,
  keepSource: true,
  showOverflow: true,
  height: window.innerHeight - 200,
  align: 'center',
  loading: false,
  columnConfig: {
    resizable: true
  },
  toolbarConfig: {
    buttons: [
      {code: 'checkAll', name: '全选'},
      {code: 'invertALL', name: '反选'},
      {
        name: '批量操作',
        disabled: false,
        dropdowns: [
          {code: 'batchDelete', name: '批量删除', type: 'text', disabled: false},
          {code: 'batchOption2', name: '批量操作2', type: 'text', disabled: false},
          {code: 'batchOption3', name: '批量操作3', type: 'text', disabled: false}
        ]
      }
    ],
    export: true,
    import: true,
    // print: true,
    // zoom: true,
    // custom: true
    tools: [
      {code: 'handleCreate', name: '添加', status: 'primary'},
      // {code: 'handleExport', name: '导出'},
    ],
  },
  columns: [
    {type: 'checkbox', width: 50},
    {type: 'seq', width: 60},
    {field: 'name', title: '作业名称', width: 200},
    {type: 'checkbox', width: 50},
    {type: 'seq', width: 60},
    {field: 'codeName', title: '作业程序名称', width: 200},
    {field: 'desc', title: '文件描述'},
    {title: '操作', width: 250, slots: {default: 'operations'}},
  ],
  data: [
    {id: 10001, name: 'x1-DL-1', codeName: "A1程序", desc: "这是个描述"},
    {id: 10001, name: 'x1-DL-1', codeName: "A2程序", desc: "这是个描述"},
    {id: 10001, name: 'x1-DL-1', codeName: "A3程序", desc: "这是个描述"},
    {id: 10001, name: 'x1-DL-1', codeName: "A4程序", desc: "这是个描述"},
    {id: 10001, name: 'x1-DL-1', codeName: "A5程序", desc: "这是个描述"},
  ]
})


const gridEvents: VxeGridListeners = {
  toolbarButtonClick({code}) {
    const $grid = xGrid.value
    if ($grid) {
      switch (code) {
        case 'checkAll': {
          // 全选

          break
        }
        case 'invertALL': {

          break
        }
        case 'batchDelete': {

          break
        }
        case 'batchOption2': {

          break
        }
        case 'batchOption3': {

          break
        }
      }
    }
  },
  toolbarToolClick({code}) {
    const $grid = xGrid.value
    if ($grid) {
      switch (code) {
        case 'handleCreate': {

          break
        }
          // case 'myPrint': {
          //   $grid.exportData({
          //     type: 'csv'
          //   })
          //   break
          // }
      }
    }
  }
}


/********************************* 表格分页 *********************************/
const tablePage = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})

// 查询
const handleQuery = () => {

}

const handlePageChange: VxePagerEvents.PageChange = ({currentPage, pageSize}) => {
  tablePage.currentPage = currentPage
  tablePage.pageSize = pageSize
  handleQuery()
}


/************************************ 生命周期 ***********************************/
onBeforeMount(() => {

})
</script>
