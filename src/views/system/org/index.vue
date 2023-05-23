<template>
  <div>
    <el-button-group>
      <el-button type='primary' @click='handleCreate' :icon="Plus">新增</el-button>
      <el-button type='success' @click='handleUpdate' :icon="Edit">修改</el-button>
      <el-button type='danger' @click='handleDelete' :icon="Delete">删除</el-button>
      <el-button type='primary' @click='handleRead' :icon="Document">详情</el-button>
    </el-button-group>
    <el-table
        ref="xTreeRef"
        highlight-current-row
        :data="tableData"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @row-click='handleRowClick'
    >
      <el-table-column prop="name" label="name" tree-node></el-table-column>
      <el-table-column prop="code" label="code"/>
      <el-table-column prop="parentCode" label="parentCode"/>
      <el-table-column prop="enabled" label="enabled"/>
      <el-table-column prop="createTime" label="时间">
        <template #default="{row}">
          <p><span>创建时间：</span>{{ row.createTime }}</p>
          <p><span>更新时间：</span>{{ row.updateTime }}</p>
        </template>
      </el-table-column>
    </el-table>
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
      <el-form-item label="上级机构" prop='parentCode' label-width='140px'>
        <el-tree-select
            v-model="formData.parentCode"
            placeholder='选择上级机构'
            :data="orgOptions"
            :props="{ value: 'parentCode', label: 'name' }"
            filterable
            check-strictly
        />
      </el-form-item>
      <el-form-item label="机构名称" prop='name' label-width='140px'>
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="机构编码" prop='code' label-width='140px'>
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
          <el-button @click="closeDialog1" :icon="WarningFilled"/>
          <el-button @click="closeDialog1" :icon="QuestionFilled"/>
        </el-col>
        <el-col :span="12">
          <el-button type='primary' @click='submitForm' :icon="Checked">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, ref, reactive, toRefs} from 'vue'
import {VXETable, VxeTableInstance} from 'vxe-table'
import {
  Plus, Delete, Edit, Document, Checked, WarningFilled, QuestionFilled
} from '@element-plus/icons-vue'

import {GetOrgList, GetOrgDetail, CreateOrg} from '../../../api/system/org.js'

interface OrgData {
  id?: number,
  name: string,
  code: string,
  parentCode: string,
  enabled: boolean,
  createTime?: string,
  updateTime?: string,
}

const state = reactive({
  orgOptions: undefined as any,
  tableData: [] as OrgData[],
  selectedRow: {} as OrgData,
  dialog: {
    title: '',
    visible: false,
  },
  formData: {} as OrgData,
  rules: {
    name: [
      {required: true, message: '请输入名称', trigger: 'blur'},
    ],
  },
})
const {
  orgOptions,
  tableData,
  selectedRow,
  dialog,
  formData,
  rules,
} = toRefs(state)

/************************ table ************************/
function handleRowClick(row: OrgData, column: any, event: any) {
  state.selectedRow = row
}


/************************ dialog ************************/
// 新增
function handleCreate() {
  loadOrgOptions()
  state.dialog = {
    title: '新增机构',
    visible: true,
  }
}

// 修改
function handleUpdate() {
}

function submitForm() {
}

// 删除
function handleDelete() {
}

// 详情
function handleRead() {
}

/**
 * 关闭数据库表单弹窗
 */
function closeDialog() {
  dialog.value.visible = false
  state.formData = {} as OrgData
}


/************************ utils ************************/
function test(list: any[]): any[] {
  const originalArray = list
  const targetArray = [];
  // 将原始数组中根节点的项添加到目标数组中
  originalArray.forEach(item => {
    if (item.parentCode === "0") {
      targetArray.push({
        ...item,
        children: []
      });
    }
  });
  // 递归函数，在根节点下添加子节点
  const addChildren = (parent, array) => {
    array.forEach(item => {
      if (item.parentCode === parent.code) {
        parent.children.push({
          ...item,
          children: []
        });
        addChildren(parent.children[parent.children.length - 1], array);
      }
    });
  }
  // 对于每个根节点，添加子节点
  targetArray.forEach(item => {
    addChildren(item, originalArray);
  });
  console.log(targetArray); // 输出转换后的目标数组
  return targetArray
}


/**
 * 将 tableData 构造为树形结构，设置机构选项
 */
function loadOrgOptions() {
  let tempList = []
  GetOrgList().then(res => {
    tempList = res.data.dataList
  })

  let treeData = test(tempList)

  console.log('treeData:', treeData)
}

function getList() {
  // 获取机构列表
  GetOrgList().then(res => {
    state.tableData = res.data.dataList
  })
}

onMounted(async () => {
  getList()
})
</script>
