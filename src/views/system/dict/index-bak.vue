<template>
  <el-row :gutter="24">
    <el-col :span="8">
      <el-card>
        <el-select
            v-model="currentResource"
            placeholder="请选择"
            clearable
            filterable
            :default-first-option="false"
            @change="handleDictResourceChange"
        >
          <el-option
              v-for="item in dictResource"
              :key="item.id"
              :label="item.name"
              :value="item"
          />
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        <el-tree
            :data="dictType"
            :props="{
              children: 'children',
              label: 'name',
              value: 'name'
            }"
            node-key="name"
            :default-expand-all="true"
            :highlight-current="true"
            @node-click="handleDictTypeClick"
        >
        </el-tree>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <template #header>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button type="success" icon="el-icon-edit" @click="handleUpload">新增</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </template>
        <el-table
            row-key="id"
            :data="dictData"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            :highlight-current="true"
            @row-click="handleDictDataClick"
        >
          <el-table-column label="名称" prop="name"/>
          <el-table-column label="编码" prop="code"/>
        </el-table>
      </el-card>
    </el-col>
  </el-row>

</template>
<script setup>
import {reactive, toRefs} from "vue";

const state = reactive({
  loading: true,
  dictResource: [
    {
      id: 1,
      name: "数据库1",
      code: "db1",
    },
    {
      id: 2,
      name: "数据库2",
      code: "db2",
    },
    {
      id: 3,
      name: "数据库3",
      code: "db3",
    }
  ],
  dictType: [
    {
      id: 1,
      name: "类型1",
      code: "type1",
      children: [
        {
          id: 4,
          name: "类型1-1",
          code: "type1-1",
        },
        {
          id: 5,
          name: "类型1-2",
          code: "type1-2",
        },
        {
          id: 6,
          name: "类型1-3",
          code: "type1-3",
        }
      ]
    },
    {
      id: 2,
      name: "类型2",
      code: "type2",
    },
    {
      id: 3,
      name: "类型3",
      code: "type3",
    }
  ],
  dictData: [
    {
      id: 1,
      name: "数据1",
      code: "data1",
    },
    {
      id: 2,
      name: "数据2",
      code: "data2",
      children: [
        {
          id: 4,
          name: "数据1-1",
          code: "data1-1",
        },
        {
          id: 5,
          name: "数据1-2",
          code: "data1-2",
        },
        {
          id: 6,
          name: "数据1-3",
          code: "data1-3",
        }
      ]
    },
    {
      id: 3,
      name: "数据3",
      code: "data3",
      children: [
        {
          id: 7,
          name: "数据3-1",
          code: "data3-1",
        },
        {
          id: 8,
          name: "数据3-2",
          code: "data3-2",
        },
        {
          id: 9,
          name: "数据3-3",
          code: "data3-3",
          children: [
            {
              id: 10,
              name: "数据3-3-1",
              code: "data3-3-1",
            },
            {
              id: 11,
              name: "数据3-3-2",
              code: "data3-3-2",
            },
            {
              id: 12,
              name: "数据3-3-3",
              code: "data3-3-3",
            }
          ]
        }
      ]
    }
  ],
  currentResource: null,  // 初始设置必须为null，否则会el-select会默认选中数组中最后一个
  currentType: null,
  currentData: null,
})

const {
  loading,
  dictResource,
  dictType,
  dictData,
  currentResource,
  currentType,
  currentData,
} = toRefs(state);

// 选中字典源
function handleDictResourceChange(val) {
  console.log("选中字典源：", val)
  state.currentResource = val
}

// 选中字典类型
function handleDictTypeClick(data, node, self) {
  console.log("选中字典源：", data)
  state.currentType = data
}

// 选中字典数据
function handleDictDataClick(row, column, event) {
  console.log("选中字典数据：", row)
  state.currentData = row
}
</script>