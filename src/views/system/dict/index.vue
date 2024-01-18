<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="数据字典管理">
      <el-row :gutter="20">
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
          <el-button-group>
            <el-button type="primary" :icon="CirclePlus" size="small">新增</el-button>
            <el-button type="success" :icon="Edit" size="small">编辑</el-button>
            <el-button type="danger" :icon="Delete" size="small">删除</el-button>
            <el-button type="warning" :icon="Refresh" size="small">刷新</el-button>
          </el-button-group>
          <el-input v-model="filterText" placeholder="Filter keyword"/>
          <el-tree
              ref="dataDictTreeRef"
              :data="data"
              :props="defaultProps"
              :highlight-current="true"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
          />
        </el-col>
        <el-col :xs="16" :sm="15" :md="15" :lg="18" :xl="18">
          <el-table :data="tableData" stripe border>
            <el-table-column type="index" width="50"/>
            <el-table-column prop="name" label="姓名" width="180"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column prop="date" label="日期"/>
          </el-table>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="系统常量管理">系统常量管理</el-tab-pane>
  </el-tabs>
</template>


<script lang="ts" setup>
import {ref, watch} from "vue";
import {
  Calendar,
  CirclePlus,
  Edit,
  Delete,
  Refresh,
} from '@element-plus/icons-vue'
import {ElTree} from 'element-plus'

/*************************************** 树形数据 ***************************************/
interface Tree {
  label: string
  children?: Tree[]
}

const dataDictTreeRef = ref<InstanceType<typeof ElTree>>()
const filterText = ref('')
watch(filterText, (val) => {
  dataDictTreeRef.value!.filter(val)
})
const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
const defaultProps = {
  children: 'children',
  label: 'label',
}

/*************************************** 表格数据 ***************************************/
const tableData = [
  {
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    date: '2016-05-02',
  },
  {
    name: '王小鸡',
    address: '上海市普陀区金沙江路 1517 弄',
    date: '2016-05-04',
  },
  {
    name: '王小狗',
    address: '上海市普陀区金沙江路 1519 弄',
    date: '2016-05-01',
  },
  {
    name: '王小猫',
    address: '上海市普陀区金沙江路 1516 弄',
    date: '2016-05-03',
  }
]


/*************************************** 事件 ***************************************/
const handleNodeClick = (data: Tree) => {
  console.log(data)
}


</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
