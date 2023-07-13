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
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
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

  <el-dialog
      :lock-scroll="false"
      :title='dialog.title'
      v-model='dialog.visible'
  >
    <span>{{ selectedContextMenu }}</span>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, toRefs, reactive} from "vue";

import {GetDataTree, CreateNode} from '../../../api/dataManage/dataTree.js'
import ContextMenu from './ContextMenu.json'


const state = reactive({
  // 树类型：true-完整，false-简易
  isComplete: true,
  // 树数据
  treeData: [] as any[],
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
  dialog: {
    title: '',
    visible: false,
  }
})
const {
  isComplete,
  treeData,
  defaultProps,
  contextMenus,
  contextmenuNode,
  contextMenuPositionX,
  contextMenuPositionY,
  contextMenuPositionHeight,
  nodeContextMenus,
  selectedContextMenu,
  menuShow,
  dialog,
} = toRefs(state)


/************************ tree ************************/
const handleNodeClick = (data: any) => {
  console.log(data)
}

/**
 * 树节点右键菜单
 */
const handleNodeContextMenu = (e: any, data: any) => {
  state.contextMenuNode = data
  state.contextMenuPositionX = e.clientX
  state.contextMenuPositionY = e.clientY

  for (let i = 0; i < state.contextMenus.length; i++) {
    // 将节点类型与右键菜单对象的第一个key进行比较，相同则赋值
    // @ts-ignore
    if (state.contextMenuNode.node_type === Object.keys(state.contextMenus[i])[0]) {
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
  console.log('contextMenuNode:', state.contextMenuNode)
  console.log('selectedContextMenu:', state.selectedContextMenu)

  // 仅有一级菜单
  if (state.selectedContextMenu.length === 1) {
    state.dialog.title = state.selectedContextMenu[0]
    state.dialog.visible = true
  } else if (state.selectedContextMenu.length === 2) {
    // 二级菜单
    let SecondClassMenu = ['创建服务器组', '创建服务器', '创建数据库', '创建表', '创建字段', '创建索引']
    // @ts-ignore
    if (SecondClassMenu.includes(state.selectedContextMenu[1])) {
      state.dialog.title = state.selectedContextMenu[1]
      state.dialog.visible = true
    }
  }
}


/************************ init ************************/
onMounted(() => {
  GetDataTree().then(res => {
    state.treeData = res.data.data
  })
})

</script>
