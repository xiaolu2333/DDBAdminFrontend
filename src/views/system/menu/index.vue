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
        row-key="id"
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
            :props="{ children: 'children', value: 'code', label: 'name' }"
            filterable
            check-strictly
            @change="handleOrgParentChange"
        >
        </el-tree-select>
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

<script lang="ts" setup>
import {onMounted, ref, reactive, toRefs} from 'vue'
import {ElForm, ElMessage, ElMessageBox} from 'element-plus'
import {
  Plus, Delete, Edit, Document, Checked, WarningFilled, QuestionFilled
} from '@element-plus/icons-vue'

import {GetOrgList, GetOrgDetail, CreateOrg, UpdateOrg, DeleteOrg} from '../../../api/system/org.js'

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
  formData: {
    parentCode: "0"
  } as OrgData,
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
// tree table 行点击事件
function handleRowClick(row: OrgData, column: any, event: any) {
  state.selectedRow = row
  console.log("row:", row)
}


/************************ tree ************************/
// tree select 节点点击事件
function handleOrgParentChange(value: any) {
  console.log("value:", value)
  state.formData.parentCode = value
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
  loadOrgOptions()
  state.dialog = {
    title: '新增机构',
    visible: true,
  }

  // 获取详情
  GetOrgDetail(state.selectedRow.id).then(res => {
    console.log("res:", res)
    state.formData = res.data.data
  }).catch(err => {
    console.log("err:", err)
  })
}

async function submitForm() {
  if (state.formData.id) {
    // 修改
    await UpdateOrg(state.formData).then(res => {
      console.log("res:", res)
      ElMessage.success('修改成功')
      state.dialog.visible = false
      state.formData = {
        parentCode: "1",
      } as OrgData

      // 刷新表格
      init()
    }).catch(err => {
      console.log("err:", err)
      ElMessage.error('修改失败')
    })
  } else {
    await CreateOrg(state.formData).then(res => {
      console.log("res:", res)
      ElMessage.success('创建成功')
      state.dialog.visible = false
      state.formData = {
        parentCode: "1",
      } as OrgData

      // 刷新表格
      init()
    }).catch(err => {
      console.log("err:", err)
      ElMessage.error('创建失败')
    })
  }
}

// 删除
function handleDelete() {
  ElMessageBox.confirm('此操作将永久删除该机构, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    DeleteOrg(state.selectedRow.id).then(res => {
      console.log("res:", res)
      ElMessage.success('删除成功')
      state.dialog.visible = false
      state.formData = {
        parentCode: "1",
      } as OrgData

      // 刷新表格
      init()
    }).catch(err => {
      console.log("err:", err)
      ElMessage.error('删除失败')
    })
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 详情
function handleRead() {
  loadOrgOptions()
  state.dialog = {
    title: '新增机构',
    visible: true,
  }

  // 获取详情
  GetOrgDetail(state.selectedRow.id).then(res => {
    console.log("res:", res)
    state.formData = res.data.data
  }).catch(err => {
    console.log("err:", err)
  })
}

/**
 * 关闭数据库表单弹窗
 */
function closeDialog() {
  dialog.value.visible = false
  state.formData = {
    parentCode: "0",
  } as OrgData
}


/************************ utils ************************/
// 构造机构树
function formatData(data) {
  console.log("data:", data);
  let result = [];
  let map = {};
  data.forEach((item) => {
    map[item.id] = item;
    item.children = [];
  });
  data.forEach((item) => {
    if (item.parentCode !== "0") {
      map[item.parentCode]?.children.push(item);
    } else {
      result.push(item);
    }
  });
  console.log("result:", result);
  return result;
}

function constructTree(data) {
  const tree = [];
  const map = {};
   data.forEach(node => {
    map[node.code] = { ...node, children: [] };
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

// // 为机构树节点属性：如果有子节点，则添加 hasChildren 属性为 true，否则为 false
// function formatTree(data) {
//   data.forEach(item => {
//     if (item.children.length > 0) {
//       item.hasChildren = true;
//       formatTree(item.children);
//     } else {
//       item.hasChildren = false;
//     }
//   });
//   return data;
// }

/**
 * 将 tableData 构造为树形结构，设置机构选项
 */
function loadOrgOptions() {
  GetOrgList().then(res => {
    state.orgOptions = [
      {
        id: 0,
        name: "根机构",
        code: "0",
        parentCode: "0",
        enabled: true,
        createTime: "",
        updateTime: "",
        children: []
      }
    ]
    // 将 tableData 作为 orgOptions 中的 children
    state.orgOptions[0].children = constructTree(res.data.dataList)
    console.log("orgOptions:", state.orgOptions)
    console.log(state.orgOptions);
  })
}

function init() {
  // 获取机构列表
  GetOrgList().then(res => {
    state.tableData = constructTree(res.data.dataList)
    console.log("tableData:", state.tableData)
  })
}

onMounted(async () => {
  init()
})
</script>
