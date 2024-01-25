<template>
  <div class='app-container'>
    <el-row :gutter='5'>
      <!-- 机构树 -->
      <el-col :span='4' :xs='6'>
        <el-card shadow='never'>
          <template #header>
            <span>机构部门信息</span>
          </template>
          <el-tree
              ref='orgDeptTreeRef'
              :data='orgDeptTree'
              :props="{ children: 'children', label: 'name' }"
              node-key="id"
              :current-node-key="clickedNode?.id"
              :default-expand-all='true'
              :expand-on-click-node='false'
              @node-click='handleOrgNodeClick'
          />
        </el-card>
      </el-col>

      <!-- 部门数据 -->
      <el-col :span='20' :xs='18'>
        <!--        <el-card>-->
        <!--          <template #header>-->
        <!--            <span v-if="clickedNode.name">机构【{{ clickedNode.name }}】</span>-->
        <!--          </template>-->
        <vxe-toolbar>
          <template #buttons>
            <vxe-button status="primary" @click="insertEvent">新增</vxe-button>
            <vxe-button status="danger" @click="$refs.xTable1.removeCheckboxRow()">删除选中</vxe-button>
            <!--      <vxe-button status="success" :icon="Checked" @click="saveEvent">保存</vxe-button>-->
          </template>
        </vxe-toolbar>
        <vxe-table
            ref="xTreeRef"
            :loading='loading'
            align="center"
            :data="deptTree"
            :column-config="{resizable: true}"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @change="currentChangeEvent"
            border
            show-header-overflow
            show-overflow
            :row-config="{height: 100, isCurrent:true, isHover:true}"
            empty-text="暂无数据！"
            @current-change="currentChangeEvent"
        >
          <vxe-column type="seq" width="60"/>
          <vxe-column field="name" title="name"></vxe-column>
          <vxe-column field="code" title="code"></vxe-column>
          <vxe-column field="parentCode" title="parentCode"></vxe-column>
          <vxe-column field="enabled" title="enabled"></vxe-column>
          <vxe-column field="createTime" title="createTime"></vxe-column>
          <vxe-column field="updateTime" title="updateTime"></vxe-column>
        </vxe-table>
        <!--        </el-card>-->
      </el-col>
    </el-row>
  </div>

  <el-dialog
      :close-on-click-modal="false"
      :title='dialog.title'
      v-model='dialog.visible'
      width='600px'
      @closed='closeDialog'
      class="dialogTab"
  >
    <el-form ref='dataFormRef' :model='formData' :rules='rules'>
      <el-form-item label="上级部门" prop='parentCode' label-width='140px'>
        <el-tree-select
            v-model="formData.parentCode"
            placeholder='选择上级部门'
            :data="deptOptions"
            :props="{ children: 'children', value: 'code', label: 'name' }"
            filterable
            check-strictly
            @change="handleDeptParentChange"
        >
        </el-tree-select>
      </el-form-item>
      <el-form-item label="部门名称" prop='name' label-width='140px'>
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="部门编码" prop='code' label-width='140px'>
        <el-input v-model="formData.code"/>
      </el-form-item>
      <el-form-item label="是否启用" prop='enabled' label-width='140px'>
        <el-radio-group v-model="formData.enabled">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row>
        <el-col :span="12" style="text-align: left!important;">
          <el-button :icon="WarningFilled"/>
          <el-button :icon="QuestionFilled"/>
        </el-col>
        <el-col :span="12">
          <el-button type='primary' @click='submitForm' :icon="Checked">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import {h, onMounted, reactive, ref, toRefs} from 'vue'
import {ElForm, ElMessage, ElMessageBox, ElTag} from 'element-plus'
import {
  Plus, Delete, Edit, Document, Checked, WarningFilled, QuestionFilled
} from '@element-plus/icons-vue'
import {VXETable, VxeTableInstance} from 'vxe-table'

import {GetOrgDeptTree, GetUserList} from '../../../api/system/user.js'
import {GetDeptList, GetDeptDetail, CreateDept, UpdateDept, DeleteDept} from '../../../api/system/dept.js'

const orgDeptTreeRef = ref('orgDeptTreeRef')
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


interface OrgData {
  id?: number,
  name: string,
  code: string,
  parentCode: string,
  enabled: boolean,
  createTime?: string,
  updateTime?: string,
  children?: OrgData[]
}

const state = reactive({
  loading: false,
  orgDeptTree: [] as OrgData[],
  clickedNode: {},
  curRow: {} as DeptData,
  // 表格树数据
  deptList: [] as DeptData[],
  deptTree: [] as DeptData[],

  dialog: {
    title: '',
    visible: false,
  },
  formData: {
    parentCode: "0",
    enabled: true,
  } as DeptData,
  deptOptions: undefined as any,

  rules: {
    name: [{required: true, message: '部门名称不能为空', trigger: 'blur'}],
    code: [{required: true, message: '部门代码不能为空', trigger: 'blur'}],
    sortNum: [{required: true, message: '显示排序不能为空', trigger: 'blur'}]
  }
})

const {
  loading,
  orgDeptTree,
  clickedNode,
  curRow,
  deptList,
  deptTree,

  dialog,
  formData,
  deptOptions,
  rules,
} = toRefs(state)


/************************ tree ************************/
function handleOrgNodeClick(data) {
  state.clickedNode = data
  getUserList(state.clickedNode.id)
}


/************************ table ************************/
const xTreeRef = ref<VxeTableInstance>()
// 行选中事件
const currentChangeEvent = () => {
  const $table: any = xTreeRef.value;
  curRow.value = $table.getCurrentRecord();
  // 获取当前行信息
  GetDeptDetail(curRow.value.id).then(res => {
    console.log("res:", res.data)
    ElMessage.success("获取部门信息成功！")
  })
}

// 新增
const insertEvent = () => {
  loadDeptOptions()
  state.dialog = {
    title: '新增部门',
    visible: true,
  }
}

/************************ dialog ************************/
async function submitForm() {

  // @ts-ignore
  state.formData.orgId = state.clickedNode.id

  if (state.formData.id) {
    // 修改
    await UpdateDept(state.formData).then(res => {
      ElMessage.success('修改成功')
      state.dialog.visible = false
      state.formData = {
        parentCode: "1",
        enabled: true,
      } as DeptData

      // 刷新表格
      init()
    }).catch(err => {
      ElMessage.error('修改失败')
    })
  } else {
    await CreateDept(state.formData).then(res => {
      ElMessage.success('创建成功')
      state.dialog.visible = false
      state.formData = {
        parentCode: "1",
        enabled: true
      } as DeptData

      // 刷新用户表格
      getUserList(state.clickedNode.id)
    }).catch(err => {
      console.log("err:", err)
      ElMessage.error('创建失败')
    })
  }
}

/**
 * 关闭数据库表单弹窗
 */
function closeDialog() {
  dialog.value.visible = false
  state.formData = {
    parentCode: "0",
  } as DeptData
}

// tree select 节点点击事件
function handleDeptParentChange(value: any) {
  console.log("value:", value)
  state.formData.parentCode = value
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
  return result;
}

// 构造机构树
function constructTree(data) {
  const tree = [];
  const map = {};
  data.forEach(node => {
    map[node.code] = {...node, children: []};
  });
  data.forEach(node => {
    if (node.parentCode !== "0") {
      map[node.parentCode].children.push(map[node.code]);
    } else {
      tree.push(map[node.code]);
    }
  });
  return tree;
}


/**
 * 将 tableData 构造为树形结构，设置机构选项
 */
function loadDeptOptions() {
  GetDeptList(state.clickedNode.id).then(res => {
    state.deptOptions = [
      {
        id: 0,
        name: "根部门",
        code: "0",
        parentCode: "0",
        enabled: true,
        createTime: "",
        updateTime: "",
        children: []
      }
    ]
    // 将 tableData 作为 orgOptions 中的 children
    state.deptOptions[0].children = constructTree(res.data.dataList)
  }).catch(err => {
    ElMessage.error(err.message)
  })
}

// 获取部门列表
function getUserList(nodeId) {
  state.deptList = []
  GetUserList(nodeId).then(res => {
    res.data?.dataList.forEach(item => {
      item.children = []
      state.deptList.push(item)
    })
    state.deptTree = formatData(state.deptList)
  })
}


/************************ init ************************/
function init() {
  // 获取机构部门树
  GetOrgDeptTree().then(res => {
    state.orgDeptTree = res.data.dataList
  })
}

onMounted(async () => {
  init()
})
</script>

<style scoped>
:deep(.el-tree-node.is-current>.el-tree-node__content) {
  background-color: #ecf5ff;
}
</style>
