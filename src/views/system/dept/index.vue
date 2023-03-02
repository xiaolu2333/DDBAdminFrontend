<template>
  <el-card>
    <div slot="header">
      <el-tree-select
          :data="orgTree"
          :props="{
        children: 'children',
        label: 'name',
        value: 'name'
      }"
          placeholder="请选择机构"
          @node-click="handleOrgClick"
          default-expand-all
          v-model="currentOrg.name"
      />
      <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleAddDept"
          v-if="state.currentOrg.name"
      >新增部门
      </el-button>
      <el-button
          type="success"
          icon="el-icon-edit"
          @click="handleEditDept"
          v-if="state.currentOrg.name && state.currentDept.name"
          :disabled="!state.currentDept.name"
      >编辑部门
      </el-button>
      <el-button
          type="danger"
          icon="el-icon-delete"
          @click="handleDeleteDept"
          v-if="state.currentOrg.name && state.currentDept.name"
          :disabled="!state.currentDept.name"
      >删除部门
      </el-button>
    </div>
    <el-table
        row-key="id"
        default-expand-all
        :data="deptTree"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :loading="loading"
        :row-style="rowStyle"
        @row-click="handleDeptClick"
        v-if="state.currentOrg.name"
    >
      <el-table-column
          prop="name"
          label="部门名称"
      />
      <el-table-column
          prop="code"
          label="部门编码"
      />
      <el-table-column
          prop="name"
          label="部门抿成"
      />
      <el-table-column
          prop="code"
          label="部门代码"
      />
      <el-table-column
          prop="status"
          label="部门状态"
      >
        <template #default="{row}">
          <el-tag v-if="row.status === 0" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="desc"
          label="部门描述"
      />
      <el-table-column
          prop="parentId"
          label="父级代码"
      />
    </el-table>

    <el-dialog
        :title="state.dialog.title"
        :visible="state.dialog.visible"
    >
      <el-form
          :model="state.form"
          :rules="state.rules"
          ref="mainForm"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="state.deptForm.name"/>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="state.deptForm.code"/>
        </el-form-item>
        <el-form-item label="部门状态" prop="status">
          <el-radio label="0">禁用</el-radio>
          <el-radio label="1">启用</el-radio>
        </el-form-item>
        <el-form-item label="部门描述" prop="desc">
          <el-input v-model="state.deptForm.desc"/>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>

</template>
<script setup>
import {reactive, toRefs} from "vue";

const state = reactive({
  loading: true,
  currentOrg: {},
  parentDept: {},
  currentDept: {},
  orgTree: [
    {
      id: 1,
      name: '机构1',
      code: 'JG1',
      status: 0,
      desc: "1111111111",
      parentId: "root",
      children: [
        {
          id: 2,
          name: '机构2',
          code: 'JG2',
          status: 1,
          desc: "1111111111",
          parentId: 1,
          children: [
            {
              id: 3,
              name: '机构3',
              code: 'JG3',
              status: 0,
              desc: "1111111111",
              parentId: 2,
              children: [
                {
                  id: 4,
                  name: '机构4',
                  code: 'JG4',
                  status: 1,
                  desc: "1111111111",
                  parentId: 3,
                  children: []
                },
                {
                  id: 5,
                  name: '机构5',
                  code: 'JG5',
                  status: 0,
                  desc: "1111111111",
                  parentId: 3,
                  children: []
                }
              ]
            },
            {
              id: 6,
              name: '机构6',
              code: 'JG6',
              status: 1,
              desc: "1111111111",
              parentId: 2,
              children: []
            }
          ]
        },
        {
          id: 7,
          name: '机构7',
          code: 'JG7',
          status: 0,
          desc: "1111111111",
          parentId: 1,
          children: [
            {
              id: 8,
              name: '机构8',
              code: 'JG8',
              status: 1,
              desc: "1111111111",
              parentId: 7,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 9,
      name: '机构9',
      code: 'JG9',
      status: 0,
      desc: "1111111111",
      parentId: "root",
      children: [
        {
          id: 10,
          name: '机构10',
          code: 'JG10',
          status: 1,
          desc: "1111111111",
          parentId: 9,
          children: []
        }
      ]
    },
    {
      id: 11,
      name: '机构11',
      code: 'JG11',
      status: 1,
      desc: "1111111111",
      parentId: "root",
      children: []
    },
  ],
  deptTree: [
    {
      id: 1,
      name: "部门1",
      code: "BM1",
      status: 0,
      desc: "1111111111",
      parentId: "root",
      children: [
        {
          id: 2,
          name: "部门2",
          code: "BM2",
          status: 1,
          desc: "1111111111",
          parentId: 1,
          children: [
            {
              id: 3,
              name: "部门3",
              code: "BM3",
              status: 0,
              desc: "1111111111",
              parentId: 2,
              children: [
                {
                  id: 4,
                  name: "部门4",
                  code: "BM4",
                  status: 1,
                  desc: "1111111111",
                  parentId: 3,
                  children: []
                },
                {
                  id: 5,
                  name: "部门5",
                  code: "BM5",
                  status: 0,
                  desc: "1111111111",
                  parentId: 3,
                  children: []
                }
              ]
            },
            {
              id: 6,
              name: "部门6",
              code: "BM6",
              status: 1,
              desc: "1111111111",
              parentId: 2,
              children: []
            }
          ]
        },
        {
          id: 7,
          name: "部门7",
          code: "BM7",
          status: 0,
          desc: "1111111111",
          parentId: 1,
          children: [
            {
              id: 8,
              name: "部门8",
              code: "BM8",
              status: 1,
              desc: "1111111111",
              parentId: 7,
              children: []
            }
          ]
        }
      ]
    }
  ],
  deptForm: {},
  dialog: {
    title: "",
    visible: false,
  },
})

const {
  loading,
  currentOrg,
  parentDept,
  currentDept,
  orgTree,
  deptTree,
  deptForm,
  dialog,
} = toRefs(state);

// 机构树点击事件
const handleOrgClick = (current, parent) => {
  console.log(current, parent);
  state.parentNode = parent;
  state.currentNode = current;
  state.loading = false;
}

// 展示选中的机构
function showSelectedOrg() {
  console.log("showSelectedOrg", state.currentNode);
}

// 部门树点击事件
const handleDeptClick = (row) => {
  console.log("deptClick", row);
  state.currentDept = row;
}

// 高亮被点击部门
function rowStyle({row}) {
  if (state.currentDept === row) {
    return "background: #85bff9; color: #aa2626; cursor: pointer";
  }
}

// 新增部门
function handleAddDept() {
  console.log("handleAddDept");
  state.dialog = {
    title: "新增部门",
    visible: true,
  }
}

// 修改部门
function handleEditDept() {
  console.log("handleEditDept");
  state.dialog = {
    title: "修改部门",
    visible: true,
  }
}

// 提交表单
function handleSubmit() {
  console.log("handleSubmit");

}

// 删除部门
function handleDeleteDept() {
  console.log("handleDeleteDept");
}

</script>