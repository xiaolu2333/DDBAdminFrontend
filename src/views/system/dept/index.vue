<template>
  <el-form :model="queryParams" ref="queryForm" :inline="true">
    <el-form-item label="机构名称" prop="name">
      <el-input
          v-model="queryParams.name"
          placeholder="请输入机构名称"
          clearable
          style="width: 200px"
          @change="handleQueryNameOptionsChange"
      />
    </el-form-item>
    <el-form-item>
      <el-button
          type="primary"
          icon="Search"
          @click="handleQuery"
      >搜索
      </el-button>
      <el-button
          icon="Refresh"
          @click="resetQuery"
      >重置
      </el-button>
    </el-form-item>
  </el-form>

  <el-card>
    <el-button
        type="primary"
        plain
        icon="Plus"
        @click="handleAdd"
    >新增
    </el-button>
    <el-table
        :data="deptTree"
        :loading="loading"
        :row-style="rowStyle"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @cell-click="handleNodeClick"
    >
      <el-table-column prop="name" label="Name"/>
      <el-table-column prop="id" label="Id"/>
      <el-table-column prop="parentId" label="ParentId"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="success" @click="handleUpdate(scope.row)">修改</el-button>
          <!--          <el-button v-if="scope.row.parentId != 0" link type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增或编辑机构对话框 -->
    <el-dialog v-model="dialogVisible" :title="deptFormTitle" draggable>
      <el-form ref="Form" :model="deptForm" size="large">
        <el-form-item label="name" prop="name">
          <el-input v-model="deptForm.name"/>
        </el-form-item>
        <el-form-item label="orderNum" prop="orderNum">
          <el-input v-model="deptForm.orderNum"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm">Submit</el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>

</template>
<script setup>
import {onMounted, reactive, toRefs} from "vue";
import {ElMessage} from "element-plus";

import {GetDeptTreeByPost} from "@/api/system/dept";

const state = reactive({
  loading: false,
  parentNode: {},
  currentNode: {},
  deptTree: [],
  // deptTree: [
  //   {
  //     id: 1,
  //     name: "A省环保局",
  //     parentId: "root",
  //     orderNum: 1,
  //     children: [
  //       {
  //         id: 2,
  //         name: "A市环保局",
  //         parentId: 1,
  //         orderNum: 1,
  //         children: [
  //           {
  //             id: 3,
  //             name: "a1县环保局",
  //             parentId: 2,
  //             orderNum: 1,
  //             children: [
  //               {
  //                 id: 4,
  //                 name: "a1乡环保局",
  //                 parentId: 3,
  //                 orderNum: 1,
  //                 children: []
  //               },
  //               {
  //                 id: 11,
  //                 name: "a1乡环保局2",
  //                 parentId: 3,
  //                 orderNum: 2,
  //                 children: []
  //               }
  //             ],
  //           },
  //           {
  //             id: 5,
  //             name: "a2县环保局",
  //             parentId: 2,
  //             orderNum: 2,
  //             children: []
  //           }
  //         ]
  //       },
  //       {
  //         id: 6,
  //         name: "B市环保局",
  //         parentId: 1,
  //         orderNum: 2,
  //         children: [
  //           {
  //             id: 7,
  //             name: "b1县环保局",
  //             parentId: 6,
  //             orderNum: 1,
  //             children: []
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     id: 8,
  //     name: "B省环保局",
  //     parentId: "root",
  //     orderNum: 2,
  //     children: [
  //       {
  //         id: 9,
  //         name: "C市环保局",
  //         parentId: 8,
  //         orderNum: 1,
  //         children: [
  //           {
  //             id: 12,
  //             name: "c1县环保局",
  //             parentId: 9,
  //             orderNum: 1,
  //             children: []
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     id: 10,
  //     name: "C省环保局",
  //     parentId: "root",
  //     orderNum: 3,
  //     children: []
  //   }
  // ],
  queryParams: {},
  dialogVisible: false,
  deptForm: {
    id: null,
    name: null,
    parentId: null,
    orderNum: null
  },
  deptFormTitle: "",
})

const {
  loading,
  deptTree,
  parentNode,
  currentNode,
  queryParams,
  dialogVisible,
  deptForm,
  deptFormTitle
} = toRefs(state);

/**
 * 查询部门
 * */
function handleQuery() {
  GetDeptTreeByPost().then(response => {
    deptTree.value = response.data.data;
  })
}

/**
 * 新增部门
 * */
function handleAdd(val) {
  // console.log("新增部门:", val);
  // 只有点击了部门节点才能新增部门（暂不支持添加根节点）
  if (currentNode.value.id) {
    dialogVisible.value = true;
    deptFormTitle.value = "新增部门";
  } else {
    ElMessage.error("请选择一个部门！")
  }
}

function resetQuery() {
  console.log("resetQuery");
}

/**
 * 修改部门
 * */
function handleUpdate(row) {
  console.log("handleUpdate", row);
  dialogVisible.value = true;
  deptFormTitle.value = "修改部门";
  // 将当前行数据赋值给表单
  deptForm.value = row;
}

/**
 * 提交表单
 * */
function submitForm() {
  console.log("submitForm");
}

// 部门名称输入框 change事件
function handleQueryNameOptionsChange() {
  console.log("handleQueryNameOptionsChange");
}

// 节点点击事件
function handleNodeClick(row) {
  currentNode.value = row;
  getParentNode(state.deptTree, row.id);

}

// 高亮被点击行
function rowStyle({row}) {
  if (currentNode.value === row) {
    return 'background: #85bff9; color: #aa2626; cursor: pointer';
  }
}

// 获取被点击行的父级节点
function getParentNode(treeData, id) {
  let parentObj = null;

  function traverse(treeNode, targetId) {
    if (treeNode.id === targetId) {
      return;
    }

    if (treeNode.children && treeNode.children.length > 0) {
      for (let i = 0; i < treeNode.children.length; i++) {
        let child = treeNode.children[i];

        if (child.id === targetId) {
          parentObj = treeNode;
          return;
        }

        traverse(child, targetId);
      }
    }
  }

  for (let i = 0; i < treeData.length; i++) {
    traverse(treeData[i], id);

    if (parentNode) {
      break;
    }
  }

  console.log("parentObj:", parentObj);
  // return parentObj;
}

// 测试
function test() {
  // 根据id获取父级对象
  function findParentNode(tree, id) {
    let parentNode = null;

    function traverse(node, targetId) {
      if (node.id === targetId) {
        return;
      }

      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          let child = node.children[i];

          if (child.id === targetId) {
            parentNode = node;
            return;
          }

          traverse(child, targetId);
        }
      }
    }

    for (let i = 0; i < tree.length; i++) {
      traverse(tree[i], id);

      if (parentNode) {
        break;
      }
    }

    return parentNode;
  }

  const data = [
    {
      id: 1,
      name: "A省环保局",
      parentId: "root",
      orderNum: 1,
      children: [
        {
          id: 2,
          name: "A市环保局",
          parentId: 1,
          orderNum: 1,
          children: [
            {
              id: 3,
              name: "a1县环保局",
              parentId: 2,
              orderNum: 1,
              children: [
                {
                  id: 4,
                  name: "a1乡环保局",
                  parentId: 3,
                  orderNum: 1,
                  children: []
                },
                {
                  id: 11,
                  name: "a1乡环保局2",
                  parentId: 3,
                  orderNum: 2,
                  children: []
                }
              ],
            },
            {
              id: 5,
              name: "a2县环保局",
              parentId: 2,
              orderNum: 2,
              children: []
            }
          ]
        },
        {
          id: 6,
          name: "B市环保局",
          parentId: 1,
          orderNum: 2,
          children: [
            {
              id: 7,
              name: "b1县环保局",
              parentId: 6,
              orderNum: 1,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 8,
      name: "B省环保局",
      parentId: "root",
      orderNum: 2,
      children: [
        {
          id: 9,
          name: "C市环保局",
          parentId: 8,
          orderNum: 1,
          children: [
            {
              id: 12,
              name: "c1县环保局",
              parentId: 9,
              orderNum: 1,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 10,
      name: "C省环保局",
      parentId: "root",
      orderNum: 3,
      children: []
    }
  ];

  const parentNode = findParentNode(data, 12);
  console.log(parentNode);
}

onMounted(() => {
  test();
  handleQuery();
});
</script>

<style scoped>
.current {
  background-color: #409EFF;
  color: #e6f7ff;
}
</style>