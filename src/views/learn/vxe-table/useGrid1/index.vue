<!--<template>-->
<!--  <div>-->
<!--    <vxe-toolbar>-->
<!--      <template #buttons>-->
<!--        <vxe-button @click="allAlign = 'left'">居左</vxe-button>-->
<!--        <vxe-button @click="allAlign = 'center'">居中</vxe-button>-->
<!--        <vxe-button @click="allAlign = 'right'">居右</vxe-button>-->
<!--      </template>-->
<!--    </vxe-toolbar>-->

<!--    <vxe-table-->
<!--      :align="allAlign"-->
<!--      :data="tableData">-->
<!--      <vxe-column type="seq" width="60"></vxe-column>-->
<!--      <vxe-column field="name" title="Name"></vxe-column>-->
<!--      <vxe-column field="sex" title="Sex"></vxe-column>-->
<!--      <vxe-column field="age" title="Age"></vxe-column>-->
<!--    </vxe-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { ref } from 'vue'-->
<!--import { VxeTablePropTypes } from 'vxe-table'-->

<!--interface RowVO {-->
<!--  id: number-->
<!--  name: string-->
<!--  role: string-->
<!--  sex: string-->
<!--  age: number-->
<!--  address: string-->
<!--}-->

<!--const allAlign = ref<VxeTablePropTypes.Align>(null)-->

<!--const tableData = ref<RowVO[]>([-->
<!--  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },-->
<!--  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },-->
<!--  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },-->
<!--  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }-->
<!--])-->
<!--</script>-->


<template>
  <div>
    <!--通过gridOptions绑定所有配置、列、数据-->
    <vxe-grid v-bind="gridOptions">
      <!--通过toolbar_buttons插槽自定义工具栏按钮-->
      <template #toolbar_buttons>
        <vxe-button>刷新</vxe-button>
        <vxe-button status="primary">新增</vxe-button>
        <vxe-button status="danger">删除</vxe-button>
        <vxe-button status="warning">修改</vxe-button>
      </template>
      <div class="search">
        <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>
        <vxe-button status="primary">搜索</vxe-button>
      </div>
    </vxe-grid>
  </div>
</template>


<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {VxeGridProps} from 'vxe-table'

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  address: string
}

const searchName = ref('')

// @ts-ignore
const gridOptions = reactive<VxeGridProps<RowVO>>({
  // 定义各项属性
  border: true,       // 是否带有边框
  height: 300,        // 表格高度
  align: null,        // 表格对齐方式
  columnConfig: {     // 列配置
    resizable: true,       // 是否允许拖动列宽调整大小
    // 更多列配置请参考 vxe-grid.column-config 属性
  },
  columns: [          // 列绑定配置
    {
      type: 'seq',        // 列类型
      // 更多列类型请参考 vxe-grid.columns.type 属性，包含seq、checkbox、radio、expand、html五种类型
      width: 50           // 列宽度，数字类型使用 px 作为单位，也能用数字+%的形式
      // 更多列绑定配置请参考 vxe-grid.columns.width 属性
    },
    {
      field: 'name',      // 列字段名
      title: 'name'       // 列标题
                          // 更多列绑定配置请参考 vxe-grid.columns 属性
    },
    {field: 'sex', title: 'sex'},
    {field: 'address', title: 'Address'}
  ],

  // 定义工具栏配置
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons'
    }
  },
  data: [
    {id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen'},
    {id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
    {id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
    {id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen'},
    {id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai'},
    {id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen'},
    {id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen'},
    {id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen'}
  ]
})
</script>

<style scoped>
.search {
  float: right;
}
</style>