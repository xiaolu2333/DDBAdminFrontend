<template>
  <div class='app-container'>
    <el-row :gutter='5'>
      <!-- 机构树 -->
      <el-col :span='4' :xs='6'>
        <el-card shadow='never'>
          <template #header>
            <span>组织机构信息</span>
          </template>
          <el-tree
              ref='orgTreeRef'
              :data='orgTree'
              :props="{ children: 'children', label: 'name' }"
              :default-expand-all='true'
              :expand-on-click-node='false'
              @node-click='handleOrgNodeClick'
          />
        </el-card>
      </el-col>

      <!-- 部门数据 -->
      <el-col :span='20' :xs='18'>
        <el-card>
          <vxe-table
              ref="xTreeRef"
              :loading='loading'
              align="center"
              :data="deptTree"
              :column-config="{resizable: true}"
              :tree-config="{}"
              @toggle-tree-expand="toggleExpandChangeEvent"
          >
            <vxe-column field="name" title="name"></vxe-column>
            <vxe-column field="code" title="code"></vxe-column>
            <vxe-column field="parentCode" title="parentCode"></vxe-column>
            <vxe-column field="enabled" title="enabled"></vxe-column>
            <vxe-column field="createTime" title="createTime"></vxe-column>
            <vxe-column field="updateTime" title="updateTime"></vxe-column>
          </vxe-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import {h, onMounted, reactive, ref, toRefs} from 'vue'
import {ElForm, ElMessage, ElMessageBox, ElTag} from 'element-plus'
import { VXETable, VxeTableInstance } from 'vxe-table'

import {GetOrgList} from '../../../api/system/org.js'
import {GetDeptList, GetDeptDetail, CreateDept, UpdateDept, DeleteDept} from '../../../api/system/dept.js'

const orgTreeRef = ref('orgTreeRef')
const dataFormRef = ref(ElForm)

interface DeptData {
  id: number,
  name: string,
  code: string,
  parentCode: string,
  enabled: boolean,
  org_id: number,
  createTime?: string,
  updateTime?: string,
  children?: DeptData[]
}

const state = reactive({
  loading: false,
  orgTree: [],
  clickedOrg: {},
  // 表格树数据
  deptList: [] as DeptData[],
  deptTree: [] as DeptData[],
  rules: {
    name: [{required: true, message: '部门名称不能为空', trigger: 'blur'}],
    code: [{required: true, message: '部门代码不能为空', trigger: 'blur'}],
    sortNum: [{required: true, message: '显示排序不能为空', trigger: 'blur'}]
  }
})

const {
  loading,
  orgTree,
  clickedOrg,
  deptList,
  deptTree,
  rules,
} = toRefs(state)


/************************ tree ************************/
function handleOrgNodeClick(data) {
  console.log("handleOrgNodeClick:", data)
  state.clickedOrg = data

  // 获取部门列表
  state.deptList = []
  GetDeptList(data.id).then(res => {
    res.data?.dataList.forEach(item => {
      item.children = []
      state.deptList.push(item)
    })
    state.deptTree = formatData(state.deptList)
    console.log("deptTree:", state.deptTree)
  })
}


const xTreeRef = ref<VxeTableInstance>()
const toggleExpandChangeEvent = (params: any) => {
  const $table = xTreeRef.value
  if ($table) {
    const { row, expanded } = params
    console.log('节点展开事件', expanded, '获取父节点：', $table.getParentRow(row))
  }
}
/************************ utils ************************/
// 构造机构树
function formatData(data) {
  let result = [];
  let map = {};
  data.forEach(function (item) {
    map[item.id] = item;
    item.children = [];
  });
  data.forEach(function (item) {
    if (item.parentCode !== "0") {
      map[item.parentCode]?.children.push(item);
    } else {
      result.push(item);
    }
  });
  console.log("result:", result);
  return result;
}


/************************ init ************************/


function init() {
  // 获取机构列表
  GetOrgList().then(res => {
    state.orgTree = formatData(res.data.dataList)
    console.log("orgTree:", state.orgTree)
  })
}

onMounted(async () => {
  init()
})
</script>

<style scoped>
.isCurrent {
  background-color: #f8fdff;
}
</style>
