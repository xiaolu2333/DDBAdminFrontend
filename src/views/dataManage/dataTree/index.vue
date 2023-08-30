<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <el-switch
              v-model="isComplete"
              size="large"
              active-text="完整"
              inactive-text="简易"
              style="margin-bottom: 20px"
          />
          <el-tree
              ref="treeLoad"
              :data="treeData"
              :props="defaultProps"
              accordion
              node-key="oid"
              :current-node-key="treeNode.oid"
              @node-click="handleNodeClick"
              @node-expand="handleNodeExpand"
              @node-collapse="handleNodeCollapse"
              @node-contextmenu="handleNodeContextMenu"
          />
          <!-- 右键菜单 -->
          <el-scrollbar>
            <el-cascader-panel
                :options="nodeContextMenus"
                v-if="menuShow"
                v-model="selectedContextMenu"
                @mouseleave="menuShow=false"
                @change="contextMenClick"
                :aria-expanded="false"
                :show-all-levels="false"
                :style="{'left':contextMenuPositionX-5+'px','top':contextMenuPositionY-20+'px',
            position:'fixed',backgroundColor:'#ffffff',zIndex:'9999','height':contextMenuPositionHeight+'px'}"
            />
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <p>2222222</p>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <component
      :is="customComponent.componentName"
      :title="customComponent.title"
      :componentData="customComponent.data"
      @clear-customComponent="clearCustomComponent"
      v-if="showCustomComponent"
  />
</template>

<script lang="ts" setup>
import {onMounted, ref, reactive, toRefs} from "vue";

import {GetDataTree} from '../../../api/dataManage/dataTree.js'
import ContextMenu from './ContextMenu.json'
import {
  CreateServerGroup,
  CreateServer,
  CreateDatabase,
  CreateSchema,
  CreateTable
} from '@/components/dataManage/index'
import {ElMessage, ElTree} from "element-plus";

// 树DOM
const treeLoad = ref(null)

interface TreeNode {
  oid: number
  nodeType: string,
  name: string,
  parentOid: number,
  children: TreeNode[]
}

const state = reactive({
  // 树类型：true-完整，false-简易
  isComplete: true,
  // 树数据
  treeData: [] as TreeNode[],
  // 树节点
  treeNode: {} as TreeNode,
  // 树节点分支
  treeNodeBunch: {} as TreeNode,
  // 树默认配置
  defaultProps: {
    children: 'children',
    label: 'name',
  },
  // 树右键事件节点
  contextMenuNode: {},
  // 右键鼠标位置
  contextMenuPositionX: 0,
  contextMenuPositionY: 0,
  contextMenuPositionHeight: 0,
  // 所有右键菜单
  contextMenus: ContextMenu,
  // 节点右键菜单
  nodeContextMenus: [] as any[],
  // 选中的右键菜单项
  selectedContextMenu: [] as any[],
  // 是否展示右键菜单
  menuShow: false,
  // 是否展示自定义组件
  showCustomComponent: false,
  customComponent: {
    componentName: undefined as any,
    data: {},
    title: '',
    visible: false,
  }
})
const {
  isComplete,
  treeData,
  treeNode,
  treeNodeBunch,
  defaultProps,
  contextMenus,
  contextmenuNode,
  contextMenuPositionX,
  contextMenuPositionY,
  contextMenuPositionHeight,
  nodeContextMenus,
  selectedContextMenu,
  menuShow,
  showCustomComponent,
  customComponent,
} = toRefs(state)


/************************ tree ************************/
const handleNodeClick = (data: any) => {
  state.treeNode = data
  // 如果当前节点没有子节点，请求服务器获取子节点
  if (data.children.length === 0) {
    queryTreeNode(data.oid)
  }
}

/**
 * 树节点展开事件
 */
const handleNodeExpand = (data: any) => {
  state.treeNode = data

  if (data.nodeType.split('-')[1] === 'p') {
    return
  } else {
    queryTreeNode(data.oid)
  }
}

/**
 * 树节点折叠事件
 */
const handleNodeCollapse = (data: any) => {
  state.treeNode = data
  console.log(data)
}

/**
 * 树节点右键菜单
 */
const handleNodeContextMenu = (e: any, data: any) => {
  state.treeNode = data
  state.contextMenuNode = data
  state.contextMenuPositionX = e.clientX
  state.contextMenuPositionY = e.clientY

  for (let i = 0; i < state.contextMenus.length; i++) {
    // 将节点类型与右键菜单对象的第一个key进行比较，相同则赋值
    // @ts-ignore
    if (state.contextMenuNode.nodeType === Object.keys(state.contextMenus[i])[0]) {
      // 获取右键菜单对象的第一个value
      // @ts-ignore
      state.nodeContextMenus = Object.values(state.contextMenus[i])[0]
    }
  }

  state.contextMenuPositionHeight = 35 * state.nodeContextMenus.length
  state.menuShow = true
}


/************************ contextMenu ************************/
/**
 * 右键菜单点击事件
 */
const contextMenClick = (data: any) => {
  state.selectedContextMenu = data

  // 仅有一级菜单
  if (state.selectedContextMenu.length === 1) {
  } else if (state.selectedContextMenu.length === 2) {
    // 二级菜单
    let SecondClassMenu = ['创建服务器组', '创建服务器', '创建数据库', '创建schema', '创建表', '创建列', '创建索引']
    // @ts-ignore
    if (SecondClassMenu.includes(state.selectedContextMenu[1])) {
      if (state.selectedContextMenu[1] === '创建服务器组') {
        serverGroupEvent(state.selectedContextMenu[1])
      } else if (state.selectedContextMenu[1] === '创建服务器') {
        serverEvent(state.selectedContextMenu[1])
      } else if (state.selectedContextMenu[1] === '创建数据库') {
        dbEvent(state.selectedContextMenu[1])
      } else if (state.selectedContextMenu[1] === '创建schema') {
        schemaEvent(state.selectedContextMenu[1])
      } else if (state.selectedContextMenu[1] === '创建表') {
        tableEvent(state.selectedContextMenu[1])
      } else if (state.selectedContextMenu[1] === '创建列') {
        columnEvent(state.selectedContextMenu[1])
      }
    }
  }
}


/************************ 菜单事件分发 ************************/
function serverGroupEvent(eventName) {
  if (eventName === '创建服务器组') {
    let propData = {
      id: state.contextMenuNode.id,
      name: state.contextMenuNode.name,
      nodeType: state.contextMenuNode.nodeType
    }
    state.showCustomComponent = true
    customComponent.value = {
      componentName: CreateServerGroup,
      data: propData,
      title: '创建服务器组',
      visible: true,
    }
  }

  state.selectedContextMenu = [] as any[]
}

function serverEvent(eventName) {
  if (eventName === '创建服务器') {
    let propData = {
      id: state.contextMenuNode.id,
      name: state.contextMenuNode.name,
      nodeType: state.contextMenuNode.nodeType
    }
    state.showCustomComponent = true
    customComponent.value = {
      componentName: CreateServer,
      data: propData,
      title: '创建服务器',
      visible: true,
    }
  }

  state.selectedContextMenu = [] as any[]
}

function dbEvent(eventName) {
  if (eventName === '创建数据库') {
    let propData = {
      id: state.contextMenuNode.id,
      name: state.contextMenuNode.name,
      nodeType: state.contextMenuNode.nodeType
    }
    state.showCustomComponent = true
    customComponent.value = {
      componentName: CreateDatabase,
      data: propData,
      title: '创建数据库',
      visible: true,
    }
  }

  state.selectedContextMenu = [] as any[]
}

function schemaEvent(eventName) {
  if (eventName === '创建schema') {
    let propData = {
      id: state.contextMenuNode.id,
      name: state.contextMenuNode.name,
      nodeType: state.contextMenuNode.nodeType
    }
    state.showCustomComponent = true
    customComponent.value = {
      componentName: CreateSchema,
      data: propData,
      title: '创建schema',
      visible: true,
    }
  }

  state.selectedContextMenu = [] as any[]
}

function tableEvent(eventName) {
  if (eventName === '创建表') {
    let propData = {
      id: state.contextMenuNode.id,
      name: state.contextMenuNode.name,
      nodeType: state.contextMenuNode.nodeType
    }
    state.showCustomComponent = true
    customComponent.value = {
      componentName: CreateTable,
      data: propData,
      title: '创建表',
      visible: true,
    }
  }

  state.selectedContextMenu = [] as any[]
}

function columnEvent(eventName) {
  if (eventName === '创建列') {
    let propData = {
      id: state.contextMenuNode.id,
      name: state.contextMenuNode.name,
      nodeType: state.contextMenuNode.nodeType
    }
    // state.showCustomComponent = true
    customComponent.value = {
      componentName: CreateTable,
      data: propData,
      title: '创建表',
      visible: true,
    }
  }

  state.selectedContextMenu = [] as any[]
}


// 清空自定义组件信息
function clearCustomComponent(data: boolean) {
  if (!data) {
    customComponent.value = {
      componentName: undefined as any,
      data: {},
      title: '',
      visible: false,
    }
    state.showCustomComponent = false
  }
}


/************************ utils ************************/


/************************ init ************************/
/**
 * 获取树节点
 */
const queryTreeNode = (oid: number) => {
  console.log('oid', oid)
  if (oid === -1) {
    GetDataTree(0).then(res => {
      if (res.data.data.length === 0) {
        ElMessage({
          message: '暂无数据',
          type: 'warning'
        })
        return
      }

      let tree = []
      res.data.data.forEach((item: any) => {
        // 装载服务器组节点
        if (item.nodeType === 'server_group') {
          tree.push(item)
        }
      })
      treeData.value = tree
    })
  } else {
    GetDataTree(oid).then(res => {
      if (res.data.data.length === 0) {
        ElMessage({
          message: '暂无数据',
          type: 'warning'
        })
        return
      }

      treeNode.value.children = []
      let serverP = []
      let dbP = {
        oid: -1,
        nodeType: 'db-p',
        name: '数据库',
        parentOid: -1,
        children: []
      }
      let schemaP = {
        oid: -1,
        nodeType: 'schema-p',
        name: '架构',
        parentOid: -1,
        children: []
      }
      let tableP = {
        oid: -1,
        nodeType: 'table-p',
        name: '表',
        parentOid: -1,
        children: []
      }

      res.data.data.forEach((item: any) => {
        // 装载服务器组节点
        if (item.nodeType === 'server') {
          console.log('服务器节点', item)
          serverP.push(item)
        } else if (item.nodeType === 'db') {
          console.log('数据库节点', item)
          dbP.children.push(item)
        } else if (item.nodeType === 'schema') {
          console.log('架构节点', item)
          schemaP.children.push(item)
        } else if (item.nodeType === 'table') {
          console.log('表节点', item)
          tableP.children.push(item)
        }
      })

      // 向被点击的节点添加子节点
      if (treeNode.value.nodeType === 'server_group' && serverP.length >= 0) {
        treeNode.value.children = serverP
      } else if (treeNode.value.nodeType === 'server' && dbP.children.length >= 0) {
        treeNode.value.children.push(dbP)
      } else if (treeNode.value.nodeType === 'db' && schemaP.children.length >= 0) {
        treeNode.value.children.push(schemaP)
      } else if (treeNode.value.nodeType === 'schema' && tableP.children.length >= 0) {
        treeNode.value.children.push(tableP)
      }

      try {
        // 更新树节点
        treeLoad.value.store.updateKeyChildren(treeNode.value)
        // 配合 :current-node-key 展开当前节点
        treeLoad.value.store.setCurrentNodeKey(treeNode.value)
      } catch (TypeError) {
        console.log('可忽略的类型错误：', TypeError)
      }
    })
  }
}


onMounted(() => {
  queryTreeNode(-1)
})

</script>
