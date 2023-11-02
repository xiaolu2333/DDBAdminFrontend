<template>
  <div>
    <div class="demo-collapse">
      <el-collapse v-model="activeCollapseItemName" accordion>
        <el-card>
          <el-collapse-item title="画布及内容操作" name="1">
            <el-card>
              <el-button @click="newNode" disabled>创建节点</el-button>
              <el-button @click="getAllNodesInDiagram">获取画布中的所有节点</el-button>
              <el-button @click="getAllLinksInDiagram">获取画布中的所有边</el-button>
            </el-card>
            <el-card>
              <div class="add-foreign-key">
                添加外键关系：
                <br/>
                <el-radio-group
                    v-model="fkType"
                    @change="handleFkTypeChange"
                >
                  <el-radio
                      v-for="(item,index) in fkTypeOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                  >
                    {{ item.label }}
                  </el-radio>
                </el-radio-group>
                <br/>
                <el-cascader
                    v-model="cfkFromEntry"
                    :options="cFieldOptions"
                    :props="{expandTrigger: 'hover' }"
                    placeholder="From"
                />
                <el-cascader
                    v-model="cfkToEntry"
                    :options="cFieldOptions"
                    :props="{expandTrigger: 'hover' }"
                    placeholder="To"
                />
                <el-button type="primary" @click="addFKRelationship">确认</el-button>
                <el-button type="primary" @click="getFKRelationship">获取数据关系</el-button>
              </div>
              <br/>
              <div class="delete-foreign-key">
                删除外键关系：
                <br/>
                <el-cascader
                    v-model="dfkFromEntry"
                    :options="dFieldOptions"
                    :props="{expandTrigger: 'hover' }"
                    placeholder="From"
                />
                <el-cascader
                    v-model="dfkToEntry"
                    :options="dFieldOptions"
                    :props="{expandTrigger: 'hover' }"
                    placeholder="To"
                />
                <el-button type="primary" @click="deleteFKRelationship">确认</el-button>
                <el-button type="primary" @click="getFKRelationship">获取数据关系</el-button>
              </div>
            </el-card>
            <el-card>
              <div>
                <div v-if="clickedLink || rightClickedLink">
          <span v-if="clickedLink && !rightClickedLink">
            选中连线【{{ clickedLink.from }}.{{ clickedLink.fromPort }} -> {{ clickedLink.to }}.{{ clickedLink.toPort }}】
          </span>
                  <span v-if="(!clickedLink && rightClickedLink) || (clickedLink && rightClickedLink)">
            选中连线【{{ rightClickedLink.from }}.{{ rightClickedLink.fromPort }} -> {{
                      rightClickedLink.to
                    }}.{{ rightClickedLink.toPort }}】
          </span>
                </div>
                <div v-if="clickedNode || rightClickedNode">
          <span v-if="clickedNode && !rightClickedNode">
            选中节点【{{ clickedNode.key }}】
          </span>
                  <span v-if="(!clickedNode && rightClickedNode) || (clickedNode && rightClickedNode)">
            选中节点【{{ rightClickedNode.key }}】
          </span>
                </div>
                <!--      <el-button-group>-->
                <!--        <el-button type="primary" @click="addNode">添加节点</el-button>-->
                <!--        <el-button type="primary" @click="addLink">添加边</el-button>-->
                <!--        <el-button type="primary" @click="deleteNode">删除节点</el-button>-->
                <!--        <el-button type="primary" @click="deleteLink">删除边</el-button>-->
                <!--        <el-button type="primary" @click="save">保存</el-button>-->
                <!--        <el-button type="primary" @click="load">数据融合</el-button>-->
                <!--      </el-button-group>-->
              </div>
            </el-card>
            <el-card>
              <div>
                选择布局方式：
                <el-select v-model="selectedLayout" class="m-2" placeholder="Select" @change="layoutOptionChange">
                  <el-option
                      v-for="item in layoutOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
            </el-card>
          </el-collapse-item>
        </el-card>
      </el-collapse>
    </div>
    <br/>

    <div>
      <el-button type="success" :disabled="!clickedNode">修改</el-button>
      <el-button type="info" :disabled="!clickedNode">1M</el-button>
      <el-button type="info" :disabled="!clickedNode">MM</el-button>
      <el-button type="danger" :disabled="!clickedNode">删除</el-button>
      <el-button type="primary" @click="handleDataMerge('横向')">多表横向数据融合</el-button>
      <el-button type="primary" @click="handleDataMerge('纵向')">多表纵向数据融合</el-button>

      <el-button type="primary">生成SQL</el-button>
    </div>
    <br>

    <div>
      <el-row>
        <el-col :span="6">
          <div id="paletteZone"
               style="height: 400px; margin-right: 2px; background-color: lightblue; padding: 10px;">
            <el-switch
                v-model="isComplete"
                size="large"
                active-text="完整"
                inactive-text="简易"
            />
            <el-tree
                :data="treeData"
                :props="defaultProps"
                :draggable="true"
                :allow-drag="allowDrag"
                :allow-drop="allowDrop"
                @node-click="handleTreeNodeClick"
                @node-drag-start="handleNodeDragStart"
            >
              <template #default="scope">
                <span>{{ scope.node.label }}</span>
              </template>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div id="myDiagramDiv">
            <canvas tabindex="0" width="1234" height="407"
                    style="position: absolute; top: 0; left: 0; z-index: 2; user-select: none; width: 905px; height: 299px; cursor: auto;">
              This text is displayed if your browser does not support the Canvas HTML element.
            </canvas>
            <div style="position: absolute; overflow: auto; width: 905px; height: 299px; z-index: 1;">
              <div style="position: absolute; width: 1px; height: 1px;"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--展示节点属性-->
    <el-dialog
        ref="showNodePropertyDialog"
        v-model="dialog.visible"
        :title="dialog.title"
        :lock-scroll="false"
    >
      {{ dialog.data }}
    </el-dialog>

    <el-dialog
        v-model="dataMergeDialog1Visible"
        :title="dataMergeDialogType === '纵向' ? '多表纵向数据融合' : '多表横向数据融合'"
        :close-on-click-modal="false"
        :lock-scroll="false"
        :destroy-on-close="true"
        draggable
        width="550"
        @close="closeDataMergeDialog"
    >
      <el-form
          :model="dataMergeForm"
          label-position="left"
          :rules="rules"
          label-width="110"
          ref="dataMergeFormRef"
      >
        <el-tabs
            type="card"
            v-model="activeTabName"
            @tab-click="handleTabClick"
        >
          <el-scrollbar :height="390">
            <el-tab-pane label="基本" name="基本">
              <el-form-item
                  label="融合结果名称"
                  prop="dataMergeResultName"
              >
                <el-input v-model="dataMergeForm.dataMergeResultName"/>
              </el-form-item>
              <el-form-item
                  label="融合结果类型"
                  prop="dataMergeResultType"
              >
                <el-radio-group
                    v-model="dataMergeForm.dataMergeResultType"
                    @change="handleDataMergeResultTypeChange"
                >
                  <el-radio :label="1">物化视图</el-radio>
                  <el-radio :label="2">数据表</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="关联" name="关联">
              <el-form-item
                  label="数据融合方式"
                  prop="dataMergeType"
              >
                <el-radio-group
                    v-if="dataMergeDialogType === '纵向'"
                    v-model="dataMergeForm.dataMergeType"
                    @change="handleDataMergeTypeChange"
                >
                  <el-radio :label="1">左连接</el-radio>
                  <el-radio :label="2">右连接</el-radio>
                  <el-radio :label="3">内连接</el-radio>
                  <el-radio :label="4">全连接</el-radio>
                </el-radio-group>
                <el-radio-group
                    v-else
                    v-model="dataMergeForm.dataMergeType"
                    @change="handleDataMergeTypeChange"
                >
                  <el-radio :label="1">去重合并</el-radio>
                  <el-radio :label="2">不去重合并</el-radio>
                  <el-radio :label="3">交集</el-radio>
                  <el-radio :label="4">差集</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                  label="主表"
                  prop="mainTable"
              >
                <el-select
                    v-model="dataMergeForm.mainTable"
                    placeholder="请选择主表"
                    style="width: 100%"
                    @change="handleMainTableChange"
                >
                  <el-option
                      v-for="(item,index) in entryOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                  label="主表关联字段"
                  prop="mainTableJoinField"
              >
                <el-select
                    v-model="dataMergeForm.mainTableJoinField"
                    @change="handleMainTableFieldChange"
                    placeholder="请选择主表关联字段"
                    multiple
                    style="width: 100%"
                >
                  <el-option
                      v-for="(item,index) in mainTableJoinFieldOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                  label="从表"
                  prop="subTable"
              >
                <el-select
                    v-model="dataMergeForm.subTable"
                    placeholder="请选择从表"
                    style="width: 100%"
                    @change="handleSubTableChange"
                >
                  <el-option
                      v-for="(item,index) in entryOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                  label="从表关联字段"
                  prop="subTableJoinField"
              >
                <el-select
                    v-model="dataMergeForm.subTableJoinField"
                    @change="handleSubTableFieldChange"
                    placeholder="请选择从表关联字段"
                    multiple
                    style="width: 100%"
                >
                  <el-option
                      v-for="(item,index) in subTableJoinFieldOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-tab-pane>
          </el-scrollbar>
        </el-tabs>
      </el-form>
      <template #footer>
        <el-button @click="closeDataMergeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDataMerge(dataMergeFormRef)">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, reactive, toRefs, ref} from 'vue'

import {GetERDData, GetTreeData} from '@/api/dataService/ERD.js'
import {ElForm, ElMessage} from "element-plus";

// 外键类型选项
const fkTypeOptions = [
  {label: "1M", value: "1M"},
  {label: "MM", value: "MM"},
]
const dataMergeFormRef = ref()

const state = reactive({
  isComplete: true,
  treeData: [],
  defaultProps: {
    children: 'children',
    label: 'name',
  },

  // 布局方式
  layoutOptions: [// 布局方式可选：GridLayout、TreeLayout、ForceDirectedLayout、LayeredDigraphLayout、CircularLayout
    {label: "力导向布局", value: "ForceDirectedLayout"},
    {label: "网格布局", value: "GridLayout"},
    {label: "树形布局", value: "TreeLayout"},
    {label: "分层布局", value: "LayeredDigraphLayout"},
    {label: "循环布局", value: "CircularLayout"},
  ],
  // 选中的布局方式
  selectedLayout: "ForceDirectedLayout",
  // 实体/节点数据
  nodeDataList: [],
  // 关系/边数据
  linkDataList: [],
  entryOptions: [],
  // 边数据，显示用
  edgeDataList: [],
  // 被拖动的节点
  draggedNode: null,
  // 节点背景颜色
  nodeColor: "#ffffff",
  // 眼睛
  isOpenEye: true,
  eyeStatus: 'eye-open',

  // 添加外键关系时的下拉框选项
  cFieldOptions: [],
  // 删除外键关系时的下拉框选项
  dFieldOptions: [],
  // 添加外键关系
  fkType: "1M",
  cfkFromEntry: "",
  cfkToEntry: "",
  // 删除外键关系
  dfkFromEntry: "",
  dfkToEntry: "",

  // 被左键单击的节点
  clickedNode: null,
  // 被左键单击的边
  clickedLink: null,
  // 被右键单击的节点
  rightClickedNode: null,
  // 被右键单击的边
  rightClickedLink: null,

  dialog: {
    visible: false,
    title: "",
    data: {}
  },

  // 鼠标松开时的坐标
  mouseUpPosition: {
    x: 0,
    y: 0
  },

  activeCollapseItemName: "1",

  // 数据融合dialog
  dataMergeDialog1Visible: false,
  // 数据融合tab
  activeTabName: "基本",
  // 数据融合dialog类型
  dataMergeDialogType: "横向",
  dataMergeForm: {
    mainTable: "",
    mainTableJoinField: "",
    subTable: "",
    subTableJoinField: "",
    dataMergeType: 1,
    dataMergeResultType: 1,
    dataMergeResultName: ""
  },
  rules: {
    mainTable: [
      {required: true, message: '主表不能为空', trigger: 'blur'},
    ],
    mainTableJoinField: [
      {required: true, message: '主表关联字段不能为空', trigger: 'blur'},
    ],
    subTable: [
      {required: true, message: '从表不能为空', trigger: 'blur'},
    ],
    subTableJoinField: [
      {required: true, message: '从表关联字段不能为空', trigger: 'blur'},
    ],
    dataMergeResultName: [
      {required: true, message: '名称不能为空', trigger: 'blur'},
      {min: 1, max: 255, message: '长度不能超过255个字符', trigger: "blur"},
    ],
  },
  // 主表字段
  mainTableJoinFieldOptions: [],
  // 从表字段
  subTableJoinFieldOptions: [],
  // 数据融合结果类型
  dataMergeResultType: '1',

  a: false
})

const {
  isComplete,
  treeData,
  defaultProps,

  layoutOptions,
  selectedLayout,
  nodeDataList,
  linkDataList,
  entryOptions,
  edgeDataList,
  draggedNode,
  nodeColor,
  isOpenEye,
  eyeStatus,

  cFieldOptions,
  dFieldOptions,
  fkType,
  cfkFromEntry,
  cfkToEntry,
  dfkFromEntry,
  dfkToEntry,
  clickedNode,
  clickedLink,
  rightClickedNode,
  rightClickedLink,

  dialog,

  mouseUpPosition,

  activeCollapseItemName,

  dataMergeDialog1Visible,
  activeTabName,
  dataMergeDialogType,
  dataMergeForm,
  rules,
  mainTableJoinFieldOptions,
  subTableJoinFieldOptions,
  dataMergeResultType,

  a
} = toRefs(state)

let dragged = ref(null)
let myDiagram = ref(null)


/**************************** 事件 ******************************/
/**
 * 获取画布中的所有节点
 */
const getAllNodesInDiagram = () => {
  console.log('state.nodeDataList:', state.nodeDataList)
}

/**
 * 获取画布中的所有边
 */
const getAllLinksInDiagram = () => {
  console.log('linkDataList.value:', linkDataList.value)
}

/**
 * 外键选择变更事件
 */
const handleFkTypeChange = (val) => {
  console.log('fkType:', val)
  state.fkType = val
  state.cfkFromEntry = ""
  state.cfkToEntry = ""
}

/**
 * 添加外键关系
 */
const addFKRelationship = () => {
  // console.log('from:', cfkFromEntry.value)
  // console.log('to:', cfkToEntry.value)

  let fromText = ''
  let toText = ''

  if (fkType.value === '1M') {
    fromText = '1'
    toText = 'M'
  } else if (fkType.value === 'MM') {
    toText = 'M'
    fromText = 'M'
  }

  let temp = {
    fromSchema: cfkFromEntry.value[0].split('.')[0],
    from: cfkFromEntry.value[0].split('.')[1],
    fromPort: cfkFromEntry.value[1],
    fromText: fromText,
    toSchema: cfkToEntry.value[0].split('.')[0],
    to: cfkToEntry.value[0].split('.')[1],
    toPort: cfkToEntry.value[1],
    toText: toText,
  }
  // linkDataList.value.push(temp)

  myDiagram.model.addLinkData(temp)
  // console.log('linkDataList.value:', linkDataList.value)

  linkDataList.value.push(temp)

  refreshDFieldOptions()
}

/**
 * 删除外键关系
 */
const deleteFKRelationship = () => {
  console.log('删除前：', linkDataList.value)
  let temp = {
    from: dfkFromEntry.value[0],
    fromPort: dfkFromEntry.value[1],
    to: dfkToEntry.value[0],
    toPort: dfkToEntry.value[1],
  }

  // 从 state.linkDataList 数组中删除
  let index = linkDataList.value.findIndex(item => {
    return item.from === temp.from && item.fromPort === temp.fromPort && item.to === temp.to && item.toPort === temp.toPort
  })
  console.log('index:', index)
  if (index === -1) {
    ElMessage.error('未找到该外键关系')
  } else {
    myDiagram.model.removeLinkData(linkDataList.value[index])
    linkDataList.value.splice(index, 1)
    console.log('删除后：', linkDataList.value)
  }
}

/**
 * 获取外键关系
 */
const getFKRelationship = () => {
  console.log('linkDataList.value:', linkDataList.value)

  let relationship = []
  linkDataList.value.forEach(item => {
    relationship.push({
      from: item.from + "." + item.fromPort,
      foreignKeyType: state.fkType,
      to: item.to + "." + item.toPort,
    })
  })
  console.log('relationship:', relationship)
}

/**
 * 选择布局方式
 * @param val
 */
const layoutOptionChange = (val) => {
  state.selectedLayout = val
  // console.log('selectedLayout:', state.selectedLayout)
  if (val === 'ForceDirectedLayout') {
    myDiagram.layout = new go.ForceDirectedLayout()
  } else if (val === 'GridLayout') {
    myDiagram.layout = new go.GridLayout()
  } else if (val === 'TreeLayout') {
    myDiagram.layout = new go.TreeLayout()
  } else if (val === 'LayeredDigraphLayout') {
    myDiagram.layout = new go.LayeredDigraphLayout()
  } else if (val === 'CircularLayout') {
    myDiagram.layout = new go.CircularLayout()
  }
}

const handleTreeNodeClick = (data) => {
  // console.log(data)
}

/**
 * 检查是否允许拖拽
 */
function allowDrag(node) {
  // console.log('allowDrag:', node)
  return node.data.node_type === 'table';
}

/**
 * 检查是否能被放置
 * @param draggingNode 被拖拽的节点
 * @param dropNode 目标节点
 * @param type 放置的类型
 */
function allowDrop(draggingNode, dropNode, type) {
  // console.log('allowDrop:', draggingNode, dropNode, type)
  return draggingNode.data.node_type === 'table' && dropNode.data.node_type === 'db' && type === 'inner';
}

/**
 * 拖拽节点时获取节点数据
 * @param data
 * @param event
 */
const handleNodeDragStart = (data, event) => {
  state.draggedNode = data
  console.log('draggedNode:', state.draggedNode)
}

/**
 * tab切换事件
 */
const handleTabClick = (tab) => {
  console.log('tab:', tab)
}

/**
 * 多表数据融合
 */
const handleDataMerge = (type) => {
  console.log('type:', type)
  // 获取表数据

  // 主表
  let mainTableObj = {
    schema: 'A',
    table: 'table1',
    joinField: 'id'
  }
  // 从表
  let subTableObj = {
    schema: 'B',
    table: 'table2',
    joinField: 'id'
  }

  state.dataMergeDialogType = type === '纵向' ? '纵向' : type
  state.dataMergeDialog1Visible = true
}

/**
 * 数据融合方式变更事件
 */
const handleDataMergeTypeChange = (val) => {
  console.log('dataMergeType:', val)
}

/**
 * 数据融合结果类型变更事件
 */
const handleDataMergeResultTypeChange = (val) => {
  console.log('dataMergeResultType:', val)
}

/**
 * 主表变更事件
 */
const handleMainTableChange = (val) => {
  console.log('主表：', val)
  state.mainTableJoinFieldOptions = []

  state.nodeDataList.forEach(item => {
    if (item.key === val) {
      // 获取fields中name字段，作为下拉框选项
      item.fields.forEach(field => {
        state.mainTableJoinFieldOptions.push({
          label: field.name,
          value: field.name
        })
      })
    }
  })
}

/**
 * 主表字段变更事件
 */
const handleMainTableFieldChange = (val) => {
  console.log('主表字段：', val)
}

/**
 * 从表变更事件
 */
const handleSubTableChange = (val) => {
  console.log('从表：', val)
  state.subTableJoinFieldOptions = []

  state.nodeDataList.forEach(item => {
    if (item.key === val) {
      item.fields.forEach(field => {
        state.subTableJoinFieldOptions.push({
          label: field.name,
          value: field.name
        })
      })
    }
  })
}

/**
 * 从表字段变更事件
 */
const handleSubTableFieldChange = (val) => {
  console.log('从表字段：', val)
}

/**
 * 保存数据融合结果
 */
const saveDataMerge = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('state.dataMergeForm:', state.dataMergeForm)

      let SQL = ""
      // 物化视图填充数据
      let refreshMVSql = 'REFRESH MATERIALIZED VIEW ' + '"' + 'public' + '"."' + state.dataMergeForm.dataMergeResultName + '"\n'

      if (state.dataMergeDialogType === '纵向') {
        console.log('纵向')

        if (state.dataMergeForm.dataMergeResultType === 1) {
          console.log('物化视图')

          // 创建物化视图
          let createMVSql = 'CREATE MATERIALIZED VIEW ' + '"' + 'public' + '"."' + state.dataMergeForm.dataMergeResultName + '"\n' +
              'AS\n'
          // 物化视图定义
          let selectSql = 'SELECT *\n' +
              '  FROM ' + '"' + 'public' + '"."' + state.dataMergeForm.mainTable + '"' + '\n'
          let joinType = ''

          if (state.dataMergeForm.dataMergeType === 1) {
            console.log('左连接')
            joinType = '  LEFT JOIN'
          } else if (state.dataMergeForm.dataMergeType === 2) {
            console.log('右连接')
            joinType = '  RIGHT JOIN'
          } else if (state.dataMergeForm.dataMergeType === 3) {
            console.log('内连接')
            joinType = '  INNER JOIN'
          } else if (state.dataMergeForm.dataMergeType === 4) {
            console.log('全连接')
            joinType = '  FULL JOIN'
          }

          selectSql += joinType + ' ' + '"' + 'public' + '"."' + state.dataMergeForm.subTable + '"' + ' ON ' + '"' + state.dataMergeForm.mainTable + '"' + '.' + '"' + state.dataMergeForm.mainTableJoinField + '"' + ' = ' + '"' + state.dataMergeForm.subTable + '"' + '.' + '"' + state.dataMergeForm.subTableJoinField + '"' + '\n'
          createMVSql += selectSql
          console.log('createMVSql:', createMVSql)
          SQL = createMVSql + refreshMVSql
        } else {
          console.log('数据表')

          // let data = {
          //   schema: "public",
          //   key: state.dataMergeForm.dataMergeResultName,
          //   "loc": "380 0"
          // }
          //
          // let fields = []
          // state.dataMergeForm.mainTableJoinField.forEach(item => {
          //   fields.push({
          //     "name": item,
          //     "info": "char var",
          //     "color": "#F25022",
          //     "figure": "Rectangle",
          //     'icon': '字段'
          //   })
          // })
          //
          // state.dataMergeForm.subTableJoinField.forEach(item => {
          //   fields.push({
          //     "name": item,
          //     "info": "char var",
          //     "color": "#F25022",
          //     "figure": "Rectangle",
          //     'icon': '字段'
          //   })
          // })
          //
          // state.myDiagram.model.addNodeData(data);
          // let part = state.myDiagram.findPartForData(data);  // must be same data reference, not a new {}
          // // set location to saved mouseDownPoint in ContextMenuTool
          // part.location = state.myDiagram.toolManager.contextMenuTool.mouseDownPoint;
          //
          // updateModelData()
        }
      } else {
        console.log('横向')

        if (state.dataMergeForm.dataMergeResultType === 1) {
          console.log('物化视图')

          // 创建物化视图
          let createMVSql = 'CREATE MATERIALIZED VIEW ' + '"' + 'public' + '"."' + state.dataMergeForm.dataMergeResultName + '"\n' +
              'AS\n'
          // 物化视图定义
          let selectSql = ''
          let selectSqlOne = ''
          let selectSqlTwo = ''
          let unionType = ''

          // 将 state.dataMergeForm.mainTableJoinField 中的字段用 "" 包裹，并用 , 拼接
          let mainTableUnionField = ''
          state.dataMergeForm.mainTableJoinField.forEach(item => {
            mainTableUnionField += '"' + item + '"' + ','
          })
          mainTableUnionField = mainTableUnionField.substring(0, mainTableUnionField.length - 1)
          let subTableUnionField = ''
          state.dataMergeForm.subTableJoinField.forEach(item => {
            subTableUnionField += '"' + item + '"' + ','
          })
          subTableUnionField = subTableUnionField.substring(0, subTableUnionField.length - 1)

          selectSqlOne = 'SELECT ' + mainTableUnionField + '\n' +
              '  FROM ' + '"' + 'public' + '"."' + state.dataMergeForm.mainTable + '"' + '\n'
          selectSqlTwo = 'SELECT ' + subTableUnionField + '\n' +
              '  FROM ' + '"' + 'public' + '"."' + state.dataMergeForm.subTable + '"' + '\n'

          if (state.dataMergeForm.dataMergeType === 1) {
            console.log('去重合并')
            unionType = 'UNION'
          } else if (state.dataMergeForm.dataMergeType === 2) {
            console.log('不去重合并')
            unionType = 'UNION ALL'
          } else if (state.dataMergeForm.dataMergeType === 3) {
            console.log('交集')
            unionType = 'INTERSECT'
          } else if (state.dataMergeForm.dataMergeType === 4) {
            console.log('差集')
            unionType = 'EXCEPT'
          }

          selectSql = selectSqlOne + unionType + '\n' + selectSqlTwo
          SQL = createMVSql + selectSql + refreshMVSql
          console.log('SQL:', SQL)
        } else {
          console.log('数据表')
        }
      }

      // 执行SQL语句

    } else {
      console.log('error submit!', fields)
    }
  })

  // 关闭dialog
  closeDataMergeDialog()
}

/**
 * 重置表单
 */
const resetDataMergeForm = () => {
  state.dataMergeForm = {
    mainTable: "",
    mainTableJoinField: "",
    subTable: "",
    subTableJoinField: "",
    dataMergeType: 1,
    dataMergeResultType: 1,
    dataMergeResultName: ""
  }
}

/**
 * 关闭数据融合弹窗
 */
const closeDataMergeDialog = () => {
  state.dataMergeDialog1Visible = false
  state.activeTabName = '基本'
  state.dataMergeDialogType = '横向'
  resetDataMergeForm()
}


/***************************** utils ******************************/
const refreshDFieldOptions = () => {
  let temp = []

  state.dFieldOptions = state.cFieldOptions

  // console.log('state.dFieldOptions:', state.dFieldOptions)
}

/**
 * 判断鼠标松开的位置是否在指定元素的坐标范围内
 */
function isMouseUpInRect(elClassName) {
  let axis = getRect(elClassName);
  let x = state.mouseUpPosition.x;
  let y = state.mouseUpPosition.y;
  return x >= axis.left && x <= axis.left + axis.width && y >= axis.top && y <= axis.top + axis.height;
}

/**
 * 获取指定元素的坐标范围
 * @param elClassName
 */
function getRect(elClassName) {
  let rect = document.getElementsByClassName(elClassName)[0].getBoundingClientRect();
  const axis = {
    left: rect.left + document.body.scrollLeft,
    top: rect.top + document.body.scrollTop,
    width: rect.width,
    height: rect.height
  };
  console.log('元素坐标范围：', axis);
  return axis;
}


/***************************** diagram 初始化 ******************************/
/**
 * diagram 初始化
 */
function init() {
  // This event should only fire on the drag targets.
  // Instead of finding every drag target,
  // we can add the event to the document and disregard
  // all elements that are not of class "draggable"
  document.addEventListener("dragstart", event => {
    if (event.target.className !== "draggable") return;
    // Some data must be set to allow drag
    event.dataTransfer.setData("text", event.target.textContent);

    // store a reference to the dragged element and the offset of the mouse from the center of the element
    dragged = event.target;
    dragged.offsetX = event.offsetX - dragged.clientWidth / 2;
    dragged.offsetY = event.offsetY - dragged.clientHeight / 2;
    // Objects during drag will have a red border
    event.target.style.border = "2px solid red";
  }, false);

  // This event resets styles after a drag has completed (successfully or not)
  document.addEventListener("dragend", event => {
    // reset the border of the dragged element
    dragged.style.border = "";
    onHighlight(null);


  }, false);

  // Next, events intended for the drop target - the Diagram div
  const div = document.getElementById("myDiagramDiv");

  div.addEventListener("dragenter", event => {
    // Here you could also set effects on the Diagram,
    // such as changing the background color to indicate an acceptable drop zone

    // Requirement in some browsers, such as Internet Explorer
    event.preventDefault();
  }, false);

  div.addEventListener("dragover", event => {
    // We call preventDefault to allow a drop
    // But on divs that already contain an element,
    // we want to disallow dropping

    if (div === myDiagram.div) {
      const can = event.target;
      const pixelratio = myDiagram.computePixelRatio();

      // if the target is not the canvas, we may have trouble, so just quit:
      if (!(can instanceof HTMLCanvasElement)) return;

      const bbox = can.getBoundingClientRect();
      let bbw = bbox.width;
      if (bbw === 0) bbw = 0.001;
      let bbh = bbox.height;
      if (bbh === 0) bbh = 0.001;
      const mx = event.clientX - bbox.left * ((can.width / pixelratio) / bbw);
      const my = event.clientY - bbox.top * ((can.height / pixelratio) / bbh);
      const point = myDiagram.transformViewToDoc(new go.Point(mx, my));
      const part = myDiagram.findPartAt(point, true);
      onHighlight(part);
    }

    if (event.target.className === "dropzone") {
      // Disallow a drop by returning before a call to preventDefault:
      return;
    }

    // Allow a drop on everything else
    event.preventDefault();
  }, false);

  div.addEventListener("dragleave", event => {
    // reset background of potential drop target
    if (event.target.className === "dropzone") {
      event.target.style.background = "";
    }
    onHighlight(null);
  }, false);

  div.addEventListener("drop", event => {
    // prevent default action
    // (open as link for some elements in some browsers)
    event.preventDefault();

    // 元素拖入画布
    if (div === myDiagram.div) {
      const can = event.target;
      const pixelratio = myDiagram.computePixelRatio();

      // if the target is not the canvas, we may have trouble, so just quit:
      // 未拖入画布，则不处理
      if (!(can instanceof HTMLCanvasElement)) return;

      const bbox = can.getBoundingClientRect();
      let bbw = bbox.width;
      if (bbw === 0) bbw = 0.001;
      let bbh = bbox.height;
      if (bbh === 0) bbh = 0.001;
      const mx = event.clientX - bbox.left * ((can.width / pixelratio) / bbw);
      const my = event.clientY - bbox.top * ((can.height / pixelratio) / bbh);
      const point = myDiagram.transformViewToDoc(new go.Point(mx, my));
      // if there's nothing at that point
      if (myDiagram.findPartAt(point) === null) {
        // a return here doesn't allow the drop to happen
        // return;
      }
      // otherwise create a new node at the drop point
      myDiagram.startTransaction('new node');

      const nodeData = state.draggedNode.data.data
      console.log('nodeData:', nodeData)
      try {
        myDiagram.model.addNodeData(nodeData);
        onDrop(nodeData, point);
        updateModelData()
        console.log('myDiagram.model.nodeDataArray:', myDiagram.model.nodeDataArray)
      } catch (e) {
        alert('请使用table节点！')
      }


      myDiagram.commitTransaction('new node');

      // // remove dragged element from its old location, if checkbox is checked
      // if (document.getElementById('removeCheckBox').checked) dragged.parentNode.removeChild(dragged);
    }

    // If we were using drag data, we could get it here, ie:
    // const data = event.dataTransfer.getData('text');
  }, false);


  // this is called on a stationary node or link during an external drag-and-drop into a Diagram
  function onHighlight(part) {  // may be null
    const oldskips = myDiagram.skipsUndoManager;
    myDiagram.skipsUndoManager = true;
    myDiagram.startTransaction("highlight");
    if (part !== null) {
      myDiagram.highlight(part);
    } else {
      myDiagram.clearHighlighteds();
    }
    myDiagram.commitTransaction("highlight");
    myDiagram.skipsUndoManager = oldskips;
  }

  // this is called upon an external drop in this diagram,
  // after a new node has been created and selected
  function onDrop(newNode, point) {
    const it = myDiagram.findPartsAt(point).iterator;
    while (it.next()) {
      const part = it.value;
      if (part === newNode) continue;
      // the drop happened on some Part -- call its mouseDrop handler
      if (part && part.mouseDrop) {
        const e = new go.InputEvent();
        e.diagram = myDiagram;
        e.documentPoint = point;
        e.viewPoint = myDiagram.transformDocToView(point);
        e.up = true;
        myDiagram.lastInput = e;
        // should be running in a transaction already
        part.mouseDrop(e, part);
        return;
      }
    }
    // didn't find anything to drop onto
  }


  let $ = go.GraphObject.make;

  /**
   * 1，定义画布
   */
  myDiagram =
      $(go.Diagram,
          "myDiagramDiv",                                 // 挂载画布的元素
          {                                               // 画布属性
            validCycle: go.Diagram.CycleNotDirected,        // don't allow loops
            allowDelete: false,                             // 禁止删除
            allowCopy: false,                               // 禁止复制
            layout: $(go.LayeredDigraphLayout),             // 指定布局：分层布局
            "undoManager.isEnabled": true                   // 开启撤销和重做功能
          });

  /**
   * 2，定义节点field模板
   */
  let fieldTemplate =
      $(go.Panel,
          "TableRow",                                             // 指定Panel为TableRow，使用Table布局
          new go.Binding("portId", "name"),  // 绑定portId为nodeDataArray中的每项的name，设置连线端点
          {                                                       // Panel属性
            background: "transparent",                              // 使得portId的背景透明
            fromSpot: go.Spot.Right,                                // 只允许从右边出
            toSpot: go.Spot.Left,                                   // 只允许从左边进
            fromLinkable: false,                                    // 不允许从重新选择出
            toLinkable: false,                                      // 不允许从重新选择进
          },
          // $(go.Shape,                                                         // 形状配置
          //     {
          //       width: 12, height: 12, column: 0, strokeWidth: 2, margin: 4,  // 形状属性
          //       // but disallow drawing links from or to this shape:
          //       fromLinkable: false, toLinkable: false
          //     },
          //     new go.Binding("figure", "figure"),
          //     new go.Binding("fill", "color")
          // ),
          $(go.Shape,
              "RoundedRectangle",                               // 形状为圆角矩形
              {width: 18, height: 18},
              {margin: new go.Margin(5, 0), column: 0},     // 设置margin和column，使得图标和文本在同一列
              {fill: "transparent", stroke: "transparent"},     // 设置填充色和边框色为透明
          ),
          // 添加图标
          $(go.Picture,
              // 根据icon字段来显示不同的图标
              new go.Binding("source", "icon", function (icon) {
                return "/static/img/" + icon + ".svg";
              }),
              {width: 16, height: 16}
          ),
          $(go.TextBlock,                                                     // 文本配置
              {
                margin: new go.Margin(0, 5), column: 1,
                font: "bold 13px sans-serif",
                alignment: go.Spot.Left,                                        // 文本左对齐
                // and disallow drawing links from or to this text:
                fromLinkable: false, toLinkable: false
              },
              new go.Binding("text", "name")               // 绑定文本为nodeDataArray中的每项的name
          ),
          $(go.TextBlock,                                                     // 文本块配置
              {
                margin: new go.Margin(0, 5), column: 2,
                font: "13px sans-serif",
                alignment: go.Spot.Left
              },
              new go.Binding("text", "info")             // 绑定文本块为nodeDataArray中的每项的info
          )
      );

  /**
   * 3，定义节点模板
   */
  myDiagram.nodeTemplate =
      $(go.Node, "Auto",
          {
            copyable: false,
            deletable: false,
            // 鼠标移入
            mouseEnter: function (e, node) {
              node.isSelected = true
            },
            // 鼠标移出
            mouseLeave: function (e, node) {
              if (!state.clickedNode) node.isSelected = false
            },
          },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Shape,           // 节点形状属性
              {
                fill: state.nodeColor,  // 填充色
                stroke: "black",  // 边框色
                strokeWidth: 0.5,   // 边框宽度
              }
          ),
          // 自定义面板
          $(go.Panel,
              "Vertical",                                 // 垂直布局
              $(go.Panel, "Auto",                         // schema
                  {stretch: go.GraphObject.Horizontal},     // 水平拉伸，使得宽度与父节点一致
                  // $(go.Shape,                               // 形状
                  //     {fill: "#1570A6", stroke: null}),       // 填充色为蓝色，边框色为空
                  // header形状
                  $(go.Shape,
                      {fill: "#e9e9e9", stroke: "transparent"},  // 设置填充色和边框色为透明
                  ),
                  // header图标
                  $(go.Picture,
                      {
                        source: "/static/img/schema.svg",
                        // 左对齐
                        alignment: go.Spot.Left,
                        width: 25,
                        height: 25
                      }
                  ),
                  $(go.TextBlock,                           // 文本
                      {
                        alignment: go.Spot.Left,              // 文本左对齐
                        margin: new go.Margin(4, 0, 4, 25),
                        stroke: "black",                      // 文本色为白色
                        font: "bold 12pt sans-serif"
                      },
                      new go.Binding("text", "schema")         // 绑定文本为nodeDataArray中的schema
                  )
              ),
              $(go.Panel, "Auto",                         // table
                  {stretch: go.GraphObject.Horizontal},     // 水平拉伸，使得宽度与父节点一致
                  // $(go.Shape,                               // 形状
                  //     {fill: "#1570A6", stroke: null}),       // 填充色为蓝色，边框色为空
                  // header形状
                  $(go.Shape,
                      {fill: "#e9e9e9", stroke: "transparent"},  // 设置填充色和边框色为透明
                  ),
                  // header图标
                  $(go.Picture,
                      {
                        source: "/static/img/table.svg",
                        // 左对齐
                        alignment: go.Spot.Left,
                        width: 25,
                        height: 25
                      }
                  ),
                  $(go.TextBlock,                           // 文本
                      {
                        alignment: go.Spot.Left,              // 文本左对齐
                        margin: new go.Margin(4, 0, 4, 25),
                        stroke: "black",                      // 文本色为白色
                        font: "bold 12pt sans-serif"
                      },
                      new go.Binding("text", "key")         // 绑定文本为nodeDataArray中的key
                  )
              ),
              // 自定义面板，充当items，用于显示节点的fields
              $(go.Panel,
                  "Table",
                  // Table属性
                  {
                    padding: 2,
                    minSize: new go.Size(100, 10),
                    defaultStretch: go.GraphObject.Horizontal,          // 水平拉伸
                    itemTemplate: fieldTemplate                         // 指定item模板为上面定义的fieldTemplate
                  },
                  new go.Binding("itemArray", "fields")     // 绑定itemArray为nodeDataArray中的fields
              ),
              // 对象右键菜单
              {
                contextMenu:                    // define a context menu for each node
                    $("ContextMenu",
                        $("ContextMenuButton",
                            $(go.TextBlock,
                                {margin: 3, textAlign: "left", font: "bold 10pt sans-serif"},
                                "改变节点背景颜色"
                            ),
                            {click: changeColor,},
                        ),
                        $("ContextMenuButton",
                            $(go.TextBlock,
                                {margin: 3, textAlign: "left", font: "bold 10pt sans-serif"},
                                "弹出对话框"
                            ),
                            {click: showDialog},
                        ),
                        $("ContextMenuButton",
                            $(go.TextBlock,
                                {margin: 3, textAlign: "left", font: "bold 10pt sans-serif"},
                                "删除节点"
                            ),
                            {click: deleteNode},
                        ),
                    )
              }
          )
      );

  /**
   * 4，定义连线模板
   */
  myDiagram.linkTemplate =
      $(go.Link,
          {                           // 连线属性
            routing: go.Link.AvoidsNodes, // 连线避开节点
            corner: 5,                    // 连线拐角弧度
            curve: go.Link.JumpOver,      // 连线绕过节点
            toShortLength: 6,             // 入连线端点距离节点距离
            fromShortLength: 2,            // 出连线端点距离节点距离
            selectionAdorned: true,       // 连线选中时显示装饰
            reshapable: true,             // 连线可改变形状

            // 鼠标移入
            mouseEnter: function (e, link) {
              link.isSelected = true
            },
            // 鼠标移出
            mouseLeave: function (e, link) {
              if (!state.clickedLink) link.isSelected = false
            },
          },
          $(go.Shape, {strokeWidth: 1.5}),  // 连线形状属性
          $(go.Shape, {toArrow: "Standard", stroke: null}),  // 连线箭头属性
          $(go.TextBlock,
              {
                textAlign: "left",
                font: "bold 14px sans-serif",
                stroke: "#1967B3",
                segmentIndex: 0,
                segmentOffset: new go.Point(NaN, NaN),
                segmentOrientation: go.Link.OrientUpright
              },
              new go.Binding("text", "fromText")
          ),
          $(go.TextBlock,
              {
                textAlign: "right",
                font: "bold 14px sans-serif",
                stroke: "#1967B3",
                segmentIndex: -1,
                segmentOffset: new go.Point(NaN, NaN),
                segmentOrientation: go.Link.OrientUpright
              },
              new go.Binding("text", "toText")
          ),
      );

  /**
   *,4，定义模型
   */
  myDiagram.model =
      $(go.GraphLinksModel,
          {
            copiesArrays: true,                 // 可以复制数组
            copiesArrayObjects: true,           // 可以复制数组中的对象
            linkFromPortIdProperty: "fromPort", // 连线起始端口属性
            linkToPortIdProperty: "toPort",     // 连线结束端口属性
            nodeDataArray: state.nodeDataList,  // 节点数据
            linkDataArray: state.edgeDataList   // 连线数据
          });


  /**
   * 指定显示网格
   */
  myDiagram.grid.visible = true;
  /**
   * 拖动时对齐网格
   */
  myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
  /**
   * 重置大小时对齐网格
   */
  myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;


  /**
   * 添加对象点击事件，获取对象信息
   */
  myDiagram.addDiagramListener("ObjectSingleClicked",
      function (e) {
        state.clickedNode = undefined
        state.clickedLink = undefined
        state.rightClickedNode = undefined
        state.rightClickedLink = undefined
        let part = e.subject.part;
        if (part instanceof go.Node) {
          // console.log("Clicked on Node：" + part.data.key);
          state.clickedNode = part.data
          console.log('state.clickedNode', state.clickedNode)
        }
        if (part instanceof go.Link) {
          // console.log("Clicked on Link：" + part.data.from + " to " + part.data.to);
          state.clickedLink = part.data
          console.log('state.clickedLink', state.clickedLink)
        }
      });
  /**
   * 添加对象右键事件，获取对象信息
   */
  myDiagram.addDiagramListener("ObjectContextClicked",
      function (e) {
        state.clickedNode = undefined
        state.clickedLink = undefined
        state.rightClickedNode = undefined
        state.rightClickedLink = undefined
        let part = e.subject.part;
        if (part instanceof go.Node) {
          // console.log("right Clicked on Node：" + part.data.key);
          state.rightClickedNode = part.data
          // console.log('state.rightClickedNode', state.rightClickedNode)
        }
        if (part instanceof go.Link) {
          // console.log("right Clicked on Link：" + part.data.from + " to " + part.data.to);
          state.rightClickedLink = part.data
          // console.log('state.rightClickedLink', state.rightClickedLink)
        }
      });
  /**
   * 添加背景单击事件，清空选中对象信息
   */
  myDiagram.addDiagramListener("BackgroundSingleClicked", function (e, obj) {
    // 清空选中对象信息
    state.clickedNode = undefined
    state.clickedLink = undefined
  });
  /**
   * 添加背景单击事件，清空选中对象信息
   */
  myDiagram.addDiagramListener("BackgroundDoubleClicked", function (e, obj) {
    // 清空选中对象信息
    state.clickedNode = undefined
    state.clickedLink = undefined
  });


  /**
   * 背景右键菜单
   */
  myDiagram.contextMenu =
      $("ContextMenu",
          $("ContextMenuButton",
              $(go.TextBlock, {margin: 3, textAlign: "left", font: "bold 10pt sans-serif"}, "撤销"),
              {click: undo},
              new go.Binding("visible", "", function (o) {
                return o.diagram.commandHandler.canUndo();
              }).ofObject()),
          $("ContextMenuButton",
              $(go.TextBlock, {margin: 3, textAlign: "left", font: "bold 10pt sans-serif"}, "重做"),
              {click: redo},
              new go.Binding("visible", "", function (o) {
                return o.diagram.commandHandler.canRedo();
              }).ofObject()),
          // no binding, always visible button:
          $("ContextMenuButton",
              $(go.TextBlock, {margin: 3, textAlign: "left", font: "bold 10pt sans-serif"}, "创建新节点"),
              {click: newNode})
      );
}


/**
 * 对象右键菜单回调函数：改变节点背景颜色
 * @param e
 * @param obj
 */
function changeColor(e, obj) {
  myDiagram.commit((d) => {
    // 获取被点击的菜单
    let contextmenu = obj.part;
    // 获取节点信息
    let nodeData = contextmenu.data;
    // 选择新的颜色
    let colorOptions = ["#f1fff5", "#96b1eb", "#f4eafe", "#e2a50b"];
    state.nodeColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    console.log('state.nodeColor', state.nodeColor)
    // 修改节点数据
    d.model.set(nodeData, "color", state.nodeColor);
  }, "changed color");
}

/**
 * 对象右键菜单回调函数：弹出对话框
 * @param e
 * @param obj
 */
function showDialog(e, obj) {
  console.log('showDialog: ', e, obj)
  // 获取被点击的菜单
  let contextmenu = obj.part;
  // 获取节点信息
  let nodeData = contextmenu.data;
  console.log('nodeData', nodeData)
  state.dialog.visible = true
  state.dialog.title = '节点信息'
  state.dialog.data = nodeData
}

/**
 * 对象右键菜单回调函数：删除节点
 * @param e
 * @param obj
 */
function deleteNode(e, obj) {
  myDiagram.commit((d) => {
    // 获取被点击的菜单
    let contextmenu = obj.part;
    // 获取节点信息
    let nodeData = contextmenu.data;

    // 删除节点相关的连线
    deleteLink(nodeData.key)

    // 删除节点数据
    myDiagram.model.removeNodeData(nodeData);
  }, "delete node");
}

/**
 * 对象右键菜单回调函数：删除连线
 * @param nodeKey
 */
function deleteLink(nodeKey) {
  myDiagram.commit((d) => {
    // 删除 myDiagram.model中 from 或 to 是 nodeKey 的数据
    myDiagram.model.removeLinkDataCollection(myDiagram.model.linkDataArray.filter((item) => {
      return item.from === nodeKey || item.to === nodeKey
    }))

    // state.edgeDataList中的相关数据会被删除
    console.log('state.edgeDataList:', state.edgeDataList)
  }, "delete link");
}


/*********************************** 背景右键菜单回调函数 ***********************************/
/**
 * 新增节点
 * @param e
 * @param obj
 */
function newNode(e, obj) {
  e.diagram.commit(function (d) {
    let data = {
      schema: "public",
      key: "Record4",
      "fields": [
        {
          "name": "fieRecord4-1111111111111111",
          "info": "char var",
          "color": "#FFB900",
          "figure": "Diamond",
          'icon': '主键'
        },
        {"name": "fieRecord4-2222", "info": "char var", "color": "#F25022", "figure": "Rectangle", 'icon': '字段'},
        {
          "name": "fieRecord4-33333333333333333333333",
          "info": "real",
          "color": "#00BCF2",
          "figure": "Rectangle",
          'icon': '字段'
        }
      ],
      "loc": "380 0"
    };
    d.model.addNodeData(data);
    let part = d.findPartForData(data);  // must be same data reference, not a new {}
    // set location to saved mouseDownPoint in ContextMenuTool
    part.location = d.toolManager.contextMenuTool.mouseDownPoint;

    updateModelData()
  }, 'new node');
}

// 更新模型数据：节点与边
function updateModelData() {
  let model = myDiagram.model;
  state.nodeDataList = model.nodeDataArray
  console.log('state.nodeDataList', state.nodeDataList)

  // 更新节点选项
  state.entryOptions = []
  state.nodeDataList.forEach(item => {
    state.entryOptions.push({
      value: item.key,
      label: item.key,
    })
  })

  // 更新字段选项
  state.cFieldOptions = state.nodeDataList.map(item => {
    return {
      value: item.key,
      label: item.key,
      children: item.fields.map(field => {
        return {
          value: field.name,
          label: field.name
        }
      })
    }
  })

  refreshDFieldOptions()

  // 更新边选项

  // model.startTransaction("modified data");
  // model.setDataProperty(model.modelData, "date", new Date().toDateString());
  // model.commitTransaction("modified data");
}

/**
 * 撤销操作
 * @param e
 * @param obj
 */
function undo(e, obj) {
  e.diagram.commandHandler.undo();
}

/**
 * 重做操作
 * @param e
 * @param obj
 */
function redo(e, obj) {
  e.diagram.commandHandler.redo();
}


onMounted(() => {
  state.selectedLayout = 'LayeredDigraphLayout'

  GetTreeData().then(res => {
    // console.log('获取树形数据:', res)
    state.treeData = res.data.data
  })

  GetERDData().then(res => {
    // console.log('res.data.data: ', res.data.data)
    state.nodeDataList = res.data.data.nodeDataArray
    console.log('节点数据 nodeDataList', state.nodeDataList)
    linkDataList.value = res.data.data.linkDataArray
    console.log('边数据 linkDataList', linkDataList.value)
    edgeDataList.value = linkDataList.value

    res.data.data.nodeDataArray.forEach(item => {
      state.entryOptions.push({
        value: item.key,
        label: item.key,
      })
    })

    state.cFieldOptions = res.data.data.nodeDataArray.map(item => {
      return {
        value: item.schema + "." + item.key,
        label: item.schema + "." + item.key,
        children: item.fields.map(field => {
          return {
            value: field.name,
            label: field.name
          }
        })
      }
    })
    // console.log('GetERDData state.cFieldOptions', state.cFieldOptions)

    refreshDFieldOptions()
    init()
  })
});
</script>
<style scoped>

#myDiagramDiv {
  background-color: #F8F8F8;
  border: 1px solid #aaa;
  height: 70vh;
  position: relative;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  cursor: auto;
  z-index: 1000;
}

/* CSS for the traditional context menu */
.ctxmenu {
  display: none;
  position: absolute;
  opacity: 0;
  margin: 0;
  padding: 8px 0;
  z-index: 999;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
  list-style: none;
  background-color: #ffffff;
  border-radius: 4px;
}

.menu-item {
  display: block;
  position: relative;
  min-width: 60px;
  margin: 0;
  padding: 6px 16px;
  font: bold 12px sans-serif;
  color: rgba(0, 0, 0, .87);
  cursor: pointer;
}

.menu-item::before {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #000000;
}

.menu-item:hover::before {
  opacity: .04;
}

.menu .menu {
  top: -8px;
  left: 100%;
}

.show-menu, .menu-item:hover .ctxmenu {
  display: block;
  opacity: 1;
}

.target-area {
  width: 500px;
  height: 300px;
  border: 1px solid #999;
  background-color: #f1fff5;
}
</style>
