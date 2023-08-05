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
      <el-table-column prop="name" label="名称" tree-node></el-table-column>
      <el-table-column prop="path" label="路由路径"></el-table-column>
      <el-table-column prop="component" label="组件路径"></el-table-column>
      <el-table-column prop="pageType" label="页面类型">
        <template #default="{row}">
          <span v-if="row.pageType === 1">主目录/模块</span>
          <span v-else-if="row.pageType === 2">路由</span>
        </template>
      </el-table-column>
      <el-table-column prop="menuType" label="菜单类型">
        <template #default="{row}">
          <span v-if="row.menuType === 1">用户页面</span>
          <span v-else-if="row.menuType === 2">系统管理</span>
          <span v-else-if="row.menuType === 3">安全管理</span>
          <span v-else-if="row.menuType === 4">审计管理</span>
          <span v-else-if="row.menuType === 5">运维管理</span>
        </template>
      </el-table-column>
      <el-table-column prop="authType" label="权限类型">
        <template #default="{row}">
          <span v-if="row.authType === 1">公开</span>
          <span v-else-if="row.authType === 2">角色授权</span>
          <span v-else-if="row.authType === 3">用户登录</span>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="是否启用">
        <template #default="{row}">
          <el-switch v-model="row.enable" active-color="#13ce66" inactive-color="#ff4949"
                     @change="handleEnableChange(row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="是否隐藏">
        <template #default="{row}">
          <el-switch v-model="row.hidden" active-color="#13ce66" inactive-color="#ff4949"
                     @change="handlehiddenChange(row)"></el-switch>
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
      <el-form-item label="上级菜单" prop='parentCode' label-width='140px'>
        <el-tree-select
            v-model="formData.parentCode"
            placeholder='选择上级菜单'
            :data="menuOptions"
            :props="{ children: 'children', value: 'code', label: 'name' }"
            filterable
            check-strictly
            @change="handleOrgParentChange"
        >
        </el-tree-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop='name' label-width='140px'>
        <el-input v-model="formData.name"/>
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

import {GetMenuList, GetMenuDetail, CreateMenu, UpdateMenu, DeleteMenu} from '../../../api/system/resource.js'

interface MenuData {
  id?: number,
  name: string,
  path: string,
  parent: string,
  enabled: boolean,
  createTime?: string,
  updateTime?: string,
}

const state = reactive({
  menuOptions: undefined as any,
  tableData: [] as MenuData[],
  selectedRow: {} as MenuData,
  dialog: {
    title: '',
    visible: false,
  },
  formData: {
    parentCode: "0"
  } as MenuData,
  rules: {
    name: [
      {required: true, message: '请输入名称', trigger: 'blur'},
    ],
  },
})
const {
  menuOptions,
  tableData,
  selectedRow,
  dialog,
  formData,
  rules,
} = toRefs(state)

/************************ table ************************/
// tree table 行点击事件
function handleRowClick(row: MenuData, column: any, event: any) {
  state.selectedRow = row
  console.log("row:", row)
}


/************************ tree ************************/
// tree select 节点点击事件
function handleOrgParentChange(value: any) {
  console.log("value:", value)
  state.formData.parent = value
}


/************************ dialog ************************/
// 新增
function handleCreate() {
  loadmenuOptions()
  state.dialog = {
    title: '新增菜单',
    visible: true,
  }
}

// 修改
function handleUpdate() {
  loadmenuOptions()
  state.dialog = {
    title: '新增菜单',
    visible: true,
  }

  // 获取详情
  GetMenuDetail(state.selectedRow.id).then(res => {
    console.log("res:", res)
    state.formData = res.data.data
  }).catch(err => {
    console.log("err:", err)
  })
}

// 提交表单
async function submitForm() {
  if (state.formData.id) {
    // 修改
    await UpdateMenu(state.formData).then(res => {
      console.log("res:", res)
      ElMessage.success('修改成功')
      state.dialog.visible = false
      state.formData = {
        parent: "1",
      } as MenuData

      // 刷新表格
      init()
    }).catch(err => {
      console.log("err:", err)
      ElMessage.error('修改失败')
    })
  } else {
    await CreateMenu(state.formData).then(res => {
      console.log("res:", res)
      ElMessage.success('创建成功')
      state.dialog.visible = false
      state.formData = {
        parent: "1",
      } as MenuData

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
  ElMessageBox.confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    DeleteMenu(state.selectedRow.id).then(res => {
      console.log("res:", res)
      ElMessage.success('删除成功')
      state.dialog.visible = false
      state.formData = {
        parent: "1",
      } as MenuData

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
  loadmenuOptions()
  state.dialog = {
    title: '新增菜单',
    visible: true,
  }

  // 获取详情
  GetMenuDetail(state.selectedRow.id).then(res => {
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
    parent: "0",
  } as MenuData
}


/************************ utils ************************/
// 构造菜单树
function constructTree(data) {
  const tree = [];
  const map = {};
  data.forEach(node => {
    map[node.code] = {...node, children: []};
  });
  data.forEach(node => {
    if (node.parentId !== 0) {
      map[node.parentId].children.push(map[node.code]);
    } else {
      tree.push(map[node.code]);
    }
  });
  return tree;
}

// // 为菜单树节点属性：如果有子节点，则添加 hasChildren 属性为 true，否则为 false
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
 * 将 tableData 构造为树形结构，设置菜单选项
 */
function loadmenuOptions() {
  GetMenuList().then(res => {
    // 将 tableData 作为 menuOptions 中的 children
    state.menuOptions = constructTree(res.data.dataList)
    console.log("menuOptions:", state.menuOptions)
    console.log(state.menuOptions);
  })
}

function init() {
  // 获取菜单列表
  GetMenuList().then(res => {
    state.tableData = res.data.dataList
    console.log("tableData:", state.tableData)
  })
}

onMounted(async () => {
  init()
})
</script>
