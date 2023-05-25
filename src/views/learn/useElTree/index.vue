<template>
  <div>
    <el-card style="height: 50vh; width: 50vw">
      <p>用户授权</p>
      <el-scrollbar style="height: 40vh;">
        <el-tree
            ref='userTreeRef'
            node-key='id'
            :data='userOptions'
            :props="{ children: 'nodes', label: 'text', disabled: ''}"
            :expand-on-click-node='false'
            default-expand-all
        >
          <template #default="{ node, data }">
            <span style="width: 150px">{{ node.label }}</span>
            <el-button
                v-if="node.data.type === 'user'"
                size="small" type="primary" style="margin-left: 20px"
                @click="tableAuth(data)"
            >授权
            </el-button>
            <span class="custom-tree-node" v-if="node.data.type === 'table'">
                <p style="margin-left: 20px">
                  <template v-for="perm in ['select', 'insert', 'delete', 'update']">
                <el-checkbox v-if="tableHasPerm(data, perm)" :key="perm" :checked="true" disabled>
                  {{ perm }}
                </el-checkbox>
              </template>
                </p>
            </span>
          </template>
        </el-tree>
      </el-scrollbar>
      <el-button type='primary' @click='submit' :icon="Checked" style="float: right">确定</el-button>
    </el-card>
  </div>

  <el-dialog
      title="表授权"
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
import {Checked, QuestionFilled, WarningFilled} from '@element-plus/icons-vue'


// 授权用户树
const userTreeRef = ref(ElTree)

const state = reactive({
  // 提示
  placeholder: "数据库管理员",
  // 可被分配权限的用户的列表
  userOptions: [] as any[],
  dialogVisible: false,
})

const {
  placeholder,
  userOptions,
  dialogVisible,
} = toRefs(state);


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

              // 用户节点的nodes属性，必须
              nodes: [
                // id: 表id，必须
                // text: 表名，必须
                // disabled: 只能为true，必须
                // perms: 表权限，必须
                // type: 节点类型，必须
                // 其他属性可自定义
                {text: 't1', perms: 'select,update', id: 't1', type: 'table', disabled: true},
                {text: 't2', perms: 'select,delete', id: 't2', type: 'table', disabled: true},
                {text: 't3', perms: 'select,insert', id: 't3', type: 'table', disabled: true},
                // {text: '', perms: '', id: '', type: 'table-s', disabled: false},
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
});
</script>

<style scoped>
</style>