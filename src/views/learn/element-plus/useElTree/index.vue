<template>
  <el-card>
    <template #header>
      <span>树节点拼接</span>
    </template>
    <el-tree
        ref="treeLoad"
        :data="data2"
        accordion
        node-key="oid"
        :current-node-key="clickedNode.oid"
        @node-click="handleNodeClick"
        @node-expand="handleNodeExpand"
        @node-collapse="handleNodeCollapse"
    >
      <template #default="{ node, data }">
        <span>{{ data.name }}</span>
      </template>
    </el-tree>
  </el-card>

  <el-card style="height: 520px;">
    <template #header>
      <span>自定义树节点</span>
    </template>
    <el-scrollbar style="height: 400px;">
      <el-tree
          ref='userTreeRef'
          node-key='id'
          :data='userOptions'
          :props="{ children: 'nodes', label: 'text', disabled: '', class: customNodeClass }"
          :expand-on-click-node='false'
          default-expand-all
          :heilight-current="true"
      >
        <template #default="{ node, data }">
          <p v-if="node.data.type === 'schema'">
            {{ node.label }}
          </p>
          <p v-if="node.data.type === 'table'" style="width: 250px; height:26px;overflow-wrap: break-word">
            {{ node.label }}
          </p>
          <p v-else>{{ node.label }}</p>
          <el-button v-if="node.data.type === 'user'"
                     size="small" type="primary" style="margin-left: 20px"
                     @click="tableAuth(data)"
          >授权
          </el-button>
          <p class="custom-tree-node" v-if="node.data.type === 'table'">
                <span style="margin-left: 20px">
                  <template v-for="perm in ['select', 'insert', 'delete', 'update']">
                    <el-checkbox v-if="tableHasPerm(data, perm)" :key="perm" :checked="true" disabled>
                      {{ perm }}
                    </el-checkbox>
                  </template>
                </span>
          </p>
        </template>
      </el-tree>
    </el-scrollbar>
    <el-button type='primary' @click='submit' :icon="Checked" style="float: right">确定</el-button>
  </el-card>
  <br/>

  <el-card>
    <template #header>
      <span>树节点过滤与禁用</span>
    </template>
    <el-input v-model="filterText" placeholder="Filter keyword"/>
    <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="data"
        show-checkbox
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
    />
  </el-card>

  <el-card>
    <template #header>
      <span>树节点展开与选中</span>
    </template>
    <el-tree
        :data="data"
        :props="defaultProps"
        node-key="id"
        :current-node-key="6"
        hlight-current="true"
        default-expanded-keys="[3, 6]"
    />
  </el-card>

  <el-dialog
      title="【数据库操作员】授权——阶段二"
      :close-on-click-modal="false"
      :draggable="true"
      v-model="dialogVisible"
      style="height: 600px; width: 700px;"
  >
    <vxe-table
        border
        ref="xTable1"
        :data="tableData"
        :header-align="'center'"
        :align="'center'"
        :height="430"
        :row-config="{keyField: 'id', isHover: true}"
        :tooltip-config="tooltipConfig"
        @checkbox-all="selectAllChangeEvent1"
        @checkbox-change="selectChangeEvent1"
        @closed='closeDialog'
    >
      <vxe-column type="checkbox" width="60"/>
      <vxe-column field="tableName" title="数据表名"/>
      <vxe-column field="select" title="select">
        <template #default="{row}">
          <vxe-checkbox v-model="row.select" size="medium" width="80"/>
        </template>
      </vxe-column>
      <vxe-column field="insert" title="insert">
        <template #default="{row}">
          <vxe-checkbox v-model="row.insert" size="medium" width="80"/>
        </template>
      </vxe-column>
      <vxe-column field="delete" title="delete">
        <template #default="{row}">
          <vxe-checkbox v-model="row.delete" size="medium" width="80"/>
        </template>
      </vxe-column>
      <vxe-column field="update" title="update">
        <template #default="{row}">
          <vxe-checkbox v-model="row.update" size="medium" width="80"/>
        </template>
      </vxe-column>
    </vxe-table>
    <template #footer>
      <el-row>
        <el-col :span="12" style="text-align: left!important;">
          <el-button @click="cancelForm" :icon="WarningFilled" :size="20"/>
          <el-button @click="cancelForm" :icon="QuestionFilled" :size="20"/>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="reset" :icon="RefreshRight">重置</el-button>
          <el-button type="primary" @click="submit" :icon="Checked">提交</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs, watch} from "vue";
import {ElForm, ElMessage, ElTree} from 'element-plus'
import {Checked, QuestionFilled, WarningFilled, Grid} from '@element-plus/icons-vue'


// 授权用户树
const userTreeRef = ref(ElTree)
const state = reactive({
  // 提示
  placeholder: "数据库管理员",
  // 可被分配权限的用户的列表
  userOptions: [] as any[],
  dialogVisible: false,
  testData1: [] as any[],
})
const {
  placeholder,
  userOptions,
  dialogVisible,
  testData1,
} = toRefs(state);


interface Tree {
  [key: string]: any
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: (node) => node.disabled || node.type === 1
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
            disabled: true,
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
        type: 1, // 1: 不可选择 2: 可选择
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]


/********************************* tree事件 *********************************/
function tableAuth(data: any) {
  console.log('testAuth:', data)
  state.dialogVisible = true
}

/********************************* dialog事件 *********************************/
// 提交
const submit = () => {
  const userCodeList = getCheckedUsersCode()

  console.log('userCodeList:', userCodeList)
}

const closeDialog = () => {
  state.dialogVisible = false
  state.placeholder = ""
}


/**************************** utils ******************************/
// 根据 selectable 字段设置节点是否默认被选中
function setNodesChecked() {
  const list: any = []
  let roleUserList = check(state.userOptions, list)
  let listCode: any = []
  for (let i = 0; i < roleUserList.length; i++) {
    if (roleUserList[i].selectable == true) {
      listCode[i] = roleUserList[i].id
    }
  }
  console.log('listCode:', listCode)
  userTreeRef.value!.setCheckedKeys(listCode, false)
}

// 递归树形数据
function check(data, list) {
  data.forEach((item) => {
    if (item.nodes && item.nodes.length > 0) {
      check(item.nodes, list)
    } else {
      list.push(item)
    }
  })
  return list
}

// 获取被选中的用户的code
function getCheckedUsersCode(): string {
  // 获取被选中的节点
  const userNode = userTreeRef.value!.getCheckedNodes(false, false)
  // console.log('userNode:', userNode)

  let userCodeNode: any = []
  let temp = 0
  for (let i = 0; i < userNode.length; i++) {
    // 从用户节点中获取用户code
    if (userNode[i].type == 'user') {
      userCodeNode[temp] = userNode[i].userCode
      temp++
    }
  }
  return userCodeNode.join(',')
}

// 展示权限
function tableHasPerm(data: any, actionType: string): boolean {
  // console.log('data:', data)
  return data.perms.indexOf(actionType) > -1;
}


// 自定义class name
const customNodeClass = (data: any, node: any) => {
  if (data.type == 'user') {
    return 'user-node'
  }
  if (data.type == 'table') {
    return 'table-node'
  }
  return ''
}


/********************************* 树节点加载拼接 *********************************/
import type Node from 'element-plus/es/components/tree/src/model/node'
import {GetDataTree} from '../../../../api/dataManage/dataTree.js'

// 树DOM
const treeLoad = ref(null)
// 树数据
const data2 = ref([] as any[])
// 被点击的节点
const clickedNode = ref({} as Node)

const queryTreeNode = (oid: number) => {
  console.log('oid', oid)
  if (oid === -1) {
    GetDataTree(0).then(res => {
      let tree = []
      res.data.data.forEach((item: any) => {
        // 装载服务器组节点
        if (item.node_type === 'server_group') {
          tree.push(item)
        }
      })
      data2.value = tree
    })
  } else {
    GetDataTree(oid).then(res => {
      // 向被点击的节点添加子节点
      clickedNode.value.children = res.data.data

      try {
        // 更新树节点
        treeLoad.value.store.updateKeyChildren(clickedNode.value)
        // 配合 :current-node-key 展开当前节点
        treeLoad.value.store.setCurrentNodeKey(clickedNode.value)
      } catch (TypeError) {
        console.log('可忽略的类型错误：', TypeError)
      }
    })
  }
}


const handleNodeClick = (data: any) => {
  console.log('点击节点：', data)

  // // 向被点击的节点添加子节点
  // data.children = [{
  //   "oid": 100,
  //   "parentOid": 1,
  //   "name": "Level three 1-1-1",
  //   "node_type": "server",
  //   "children": []
  // }]
  // clickedNode.value = data
  // try {
  //   // 更新树节点
  //   treeLoad.value.store.updateKeyChildren(clickedNode.value)
  //   // 配合 :current-node-key 展开当前节点
  //   treeLoad.value.store.setCurrentNodeKey(clickedNode.value)
  // } catch (TypeError) {
  //   console.log('可忽略的类型错误：', TypeError)
  // }

  clickedNode.value = data
  // 如果当前节点没有子节点，请求服务器获取子节点
  if (data.children.length === 0) {
    queryTreeNode(data.oid)
  }
}

const handleNodeExpand = (data: any) => {
  console.log('展开节点：', data)
}

const handleNodeCollapse = (data: any) => {
  console.log('折叠节点：', data)
}


/********************************* init *********************************/
function init() {
  userOptions.value = [
    {
      orgCode: "90",
      selectable: false,
      objId: "1630049073618747392",
      id: "90",
      text: "XXX",
      state: {
        expanded: true,
        checked: false
      },
      type: "org",
      parentId: "0",
      deptCode: ""
    },
    {
      nodes: [
        {
          nodes: [],
          orgCode: "9012",
          selectable: false,
          objId: "1631225273292685312",
          id: "122",
          text: "1室",
          state: {
            expanded: true,
            checked: false
          },
          type: "dept",
          parentId: "9012",
          deptCode: "122"
        },
        {
          nodes: [],
          orgCode: "9012",
          selectable: false,
          objId: "1631193361920557056",
          id: "123",
          text: "1室",
          state: {
            expanded: true,
            checked: false
          },
          type: "dept",
          parentId: "9012",
          deptCode: "123"
        },
        {
          nodes: [
            {
              nodes: [],
              orgCode: "9012",
              selectable: false,
              objId: "1631493107470041088",
              id: "9012_124_02",
              text: "XXX团队",
              state: {
                expanded: true,
                checked: false
              },
              type: "dept",
              parentId: "124",
              deptCode: "9012_124_02"
            },
            {
              nodes: [],
              orgCode: "9012",
              selectable: false,
              objId: "1631492491435835392",
              id: "9012_124_01",
              text: "XXX团队",
              state: {
                expanded: true,
                checked: false
              },
              type: "dept",
              parentId: "124",
              deptCode: "9012_124_01"
            }
          ],
          orgCode: "9012",
          selectable: false,
          objId: "1631193986762801152",
          id: "124",
          text: "4室",
          state: {
            expanded: true,
            checked: false
          },
          type: "dept",
          parentId: "9012",
          deptCode: "124"
        },
        {
          nodes: [
            {
              sysCode: "SHJKXTGLYA",
              orgCode: "9012",
              selectable: true,
              objId: "1661184566850748416",
              id: "SHJKGLYB",
              text: "xxx管理员B",
              state: {
                expanded: false,
                checked: true
              },
              type: "user",
              parentId: "125",
              deptCode: "125",
              userCode: "SHJKGLYB",
              nodes: [
                {
                  text: 'public-a',
                  id: 'public-a',
                  type: 'schema',
                  nodes: [
                    {
                      text: 'pgadmin_mydbconfig_postgresqlconf_postgresqlconf',
                      perms: 'select,update',
                      id: 't1',
                      type: 'table',
                      disabled: true
                    },
                    {text: 't2', perms: 'select,delete', id: 't2', type: 'table', disabled: true},
                    {text: 't3', perms: 'select,insert', id: 't3', type: 'table', disabled: true},
                  ]
                },
                {
                  text: 'public-b',
                  id: 'public-b',
                  type: 'schema',
                  nodes: [
                    {text: 't4', perms: 'select,update', id: 't4', type: 'table', disabled: true},
                    {text: 't5', perms: 'select,delete', id: 't5', type: 'table', disabled: true},
                    {text: 't6', perms: 'select,insert', id: 't6', type: 'table', disabled: true},
                  ]
                }
              ]
            }
          ],
          orgCode: "9012",
          selectable: false,
          objId: "1648975184708762648",
          id: "125",
          text: "5室",
          state: {
            expanded: true,
            checked: false
          },
          type: "dept",
          parentId: "9012",
          deptCode: "125"
        }
      ],
      orgCode: "9012",
      selectable: false,
      objId: "1631193361920557056",
      id: "9012",
      text: "XXX",
      state: {
        expanded: true,
        checked: false
      },
      type: "org",
      parentId: "0",
      deptCode: ""
    },
  ]

  setNodesChecked()
}


onMounted(() => {
  init()
  queryTreeNode(-1)
});
</script>

<style scoped>
:deep(.user-node) {
  background-color: #f0f0f0;
}

:deep(.table-node) {
  background-color: #f4eafe;
  overflow-wrap: break-word;
}

:deep(.el-tree-node.is-current>.el-tree-node__content) {
  background-color: #4983ff;
}
</style>