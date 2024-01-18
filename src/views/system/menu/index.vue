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
      <el-form-item label="上级菜单" prop='parentId' label-width='140px'>
        <el-tree-select
            v-model="formData.parentId"
            placeholder='选择上级菜单'
            :data="menuOptions"
            :props="{ children: 'children', value: 'id', label: 'name' }"
            filterable
            check-strictly
            @change="handleOrgParentChange"
        >
        </el-tree-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop='name' label-width='140px'>
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="页面类型" prop='pageType' label-width='140px'>
        <el-radio-group v-model='formData.pageType'>
          <el-radio :label="1">主目录/模块</el-radio>
          <el-radio :label="2">路由</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单类型" prop='menuType' label-width='140px'>
        <el-radio-group v-model='formData.menuType'>
          <el-radio :label="1">用户页面</el-radio>
          <el-radio :label="2">系统管理</el-radio>
          <el-radio :label="3">安全管理</el-radio>
          <el-radio :label="4">审计管理</el-radio>
          <el-radio :label="5">运维管理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="授权类型" prop='authType' label-width='140px'>
        <el-radio-group v-model='formData.authType'>
          1-公开 2-角色授权 3-用户登录
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">授权</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="路由路径" prop='path' label-width='140px'>
        <el-input v-model="formData.path"/>
      </el-form-item>
      <el-form-item label="页面路径" prop='component' label-width='140px'>
        <el-input v-model="formData.component"/>
      </el-form-item>
      <el-form-item label="图标名称" prop='icon' label-width='140px'>
        <el-input v-model="formData.icon"/>
      </el-form-item>
      <el-form-item label="是否启用" prop='enable' label-width='140px'>
        <el-radio-group v-model="formData.enable">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否隐藏" prop='hidden' label-width='140px'>
        <el-radio-group v-model="formData.hidden">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='排序' prop='sort' label-width='140px'>
        <el-input-number
            v-model='formData.sort'
            :min='0'
        />
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
  enable: boolean,
  createTime?: string,
  updateTime?: string,
}

const state = reactive({
  menuOptions: undefined as any,
  tableData: [] as any[],
  selectedRow: {} as any,
  dialog: {
    title: '',
    visible: false,
  },
  formData: {
    enable: true,
  } as any,
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
}


/************************ dialog ************************/
// 新增
function handleCreate() {
  loadMenuOptions()
  state.dialog = {
    title: '新增菜单',
    visible: true,
  }
}

// 修改
function handleUpdate() {
  loadMenuOptions()
  state.dialog = {
    title: '新增菜单',
    visible: true,
  }

  // 获取详情
  GetMenuDetail(state.selectedRow.id).then(res => {
    state.formData = res.data.data
    console.log("state.formData:", state.formData)
  }).catch(err => {
    console.log("err:", err)
  })
}

// 提交表单
async function submitForm() {
  console.log("state.formData:", state.formData)

  if (state.formData.id) {
    // 修改
    await UpdateMenu(state.formData).then(res => {
      console.log("res:", res)
      ElMessage.success('修改成功')
      state.dialog.visible = false
      state.formData = {
        enable: true,
      } as any

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
        enable: true,
      } as any

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
        enable: true,
      } as any

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
  loadMenuOptions()
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
// 构造菜单树 list To Tree
const listToTree = (list) => {
  const nodeMap = new Map()
  const result = []

  for (const node of list) {
    node["children"] = node["children"] || []
    nodeMap.set(node["id"], node)
  }
  for (const node of list) {
    const parent = nodeMap.get(node["parentId"])
    ;(parent ? parent.children : result).push(node)
  }
  return result
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
function loadMenuOptions() {
  GetMenuList().then(res => {
    let temp = listToTree(res.data.dataList)
    state.menuOptions = [
      {
        id: 0,
        name: '顶级菜单',
        enable: true,
        children: temp,
      }
    ]
  })
}

function init() {
  // 获取菜单列表
  GetMenuList().then(res => {
    state.tableData = listToTree(res.data.dataList)
  })
}

onMounted(async () => {
  init()
})
</script>
