<template>
  <div class="add-foreign-key">
    添加外键关系：
    <el-cascader
        v-model="cfkFromEntry"
        :options="cfieldOptions"
        :props="{expandTrigger: 'hover' }"
        placeholder="From"
    />
    <el-cascader
        v-model="cfkToEntry"
        :options="cfieldOptions"
        :props="{expandTrigger: 'hover' }"
        placeholder="To"
    />
    <el-button type="primary" @click="addFKRelationship">确认</el-button>
  </div>
  <div class="delete-foreign-key">
    删除外键关系：
    <el-cascader
        v-model="dfkFromEntry"
        :options="dfieldOptions"
        :props="{expandTrigger: 'hover' }"
        placeholder="From"
    />
    <el-cascader
        v-model="dfkToEntry"
        :options="dfieldOptions"
        :props="{expandTrigger: 'hover' }"
        placeholder="To"
    />
    <el-button type="primary" @click="deleteFKRelationship">确认</el-button>
  </div>
  <div class="Diagram">
    <div id="myDiagramDiv"
         style="background-color: white; border: 1px solid black; width: 100%; height: 700px; position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;">
      <canvas tabindex="0" width="1102" height="851"
              style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; width: 904px; height: 698px; cursor: auto;">
        This text is displayed if your browser does not support the Canvas HTML element.
      </canvas>
      <div style="position: absolute; overflow: auto; width: 904px; height: 698px; z-index: 1;">
        <div style="position: absolute; width: 1px; height: 1px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, toRefs, ref} from 'vue'

import {GetERDData} from '@/api/dataService/ERD.js'

const state = reactive({
  entryOptions: [],
  // 添加外键关系时的下拉框选项
  cfieldOptions: [],
  // 删除外键关系时的下拉框选项
  dfieldOptions: [],

  // 添加外键关系
  cfkFromEntry: "",
  cfkToEntry: "",
  // 删除外键关系
  dfkFromEntry: "",
  dfkToEntry: "",

  // 实体/节点数据
  nodeDataList: [],
  // 关系/边数据
  linkDataList: [],
})

const {
  entryOptions,
  cfieldOptions,
  dfieldOptions,
  cfkFromEntry,
  cfkToEntry,
  dfkFromEntry,
  dfkToEntry,
  nodeDataList,
  linkDataList,
} = toRefs(state)

let myDiagram = null


/**************************** 按钮事件 ******************************/
// 添加外键关系
const addFKRelationship = () => {
  console.log('from:', cfkFromEntry.value)
  console.log('to:', cfkToEntry.value)
  // {from: "Products", to: "Suppliers", text: "0..N", toText: "1"}
  let temp = {
    from: cfkFromEntry.value[0],
    to: cfkToEntry.value[0],
    text: cfkFromEntry.value[0] + " M",
    toText: cfkToEntry.value[0] + " 1"
  }
  // linkDataList.value.push(temp)

  myDiagram.model.addLinkData(temp)
  console.log('linkDataList.value:', linkDataList.value)
  refreshDfieldOptions()
}

// 删除外键关系
const deleteFKRelationship = () => {
  console.log('dfkFromEntry:', dfkFromEntry.value)
  console.log('dfkToEntry:', dfkToEntry.value)
  // let temp = {
  //   from: dfkFromEntry.value[0],
  //   to: dfkToEntry.value[0],
  //   text: dfkFromEntry.value[0] + " M",
  //   toText: dfkToEntry.value[1] + " 1"
  // }
  let temp = {
    from: 'ProductID',
    to: 'SupplierID',
    text: "SupplierID M",
    toText: "SupplierID 1"
  }

  const t = myDiagram.model.getKeyForLinkData(temp)
  console.log('t:', t)

  // myDiagram.model.removeLinkData(temp)
  // console.log('linkDataList.value:', linkDataList.value)
  // refreshDfieldOptions()
}


/***************************** utils ******************************/
const refreshDfieldOptions = () => {
  let temp = []

  state.dfieldOptions = state.cfieldOptions

  console.log('state.dfieldOptions:', state.dfieldOptions)
}


/***************************** 初始化 ******************************/
function init() {
  // 定义模板
  let $ = go.GraphObject.make;

  // 定义画布
  myDiagram = $(
      go.Diagram,
      "myDiagramDiv",                     // 画布元素
      {                                   // 画布属性
        allowDelete: false,                 // 禁止删除
        allowCopy: false,                   // 禁止复制
        layout: $(go.ForceDirectedLayout),  // 指定布局：力导向布局
        "undoManager.isEnabled": true       // 开启撤销和重做功能
      });


  let colors = {
    'red': '#be4b15',
    'green': '#52ce60',
    'blue': '#6ea5f8',
    'lightred': '#fd8852',
    'lightblue': '#afd4fe',
    'lightgreen': '#b9e986',
    'pink': '#faadc1',
    'purple': '#d689ff',
    'orange': '#fdb400',
  }
  // 每条节点数据数组中每个属性的模板
  let itemTempl =
      $(
          go.Panel,         // represents a single item in a Panel of type "LIST"
          "Horizontal",     // 内部元素水平排列
          $(go.Shape,       // 形状属性配置
              {desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2}, // 形状大小
              new go.Binding("figure", "figure"),   // 形状类型
              new go.Binding("fill", "color"),      // 形状填充颜色
              new go.Binding("stroke", "color")),   // 形状边框颜色
          $(go.TextBlock,    // 文本属性配置
              {
                stroke: "#333333",            // 文本颜色
                font: "bold 14px sans-serif"  // 文本字体
              },
              new go.Binding("text", "name")) //
      );

  // 定义节点模板，用于表示实体
  myDiagram.nodeTemplate =
      $(
          go.Node,    // 表示一个节点
          "Auto",     // 节点的位置和大小由其内容决定
          {           // 节点属性配置
            selectionAdorned: true,     // 节点被选中时，显示选中装饰器
            resizable: true,            // 节点可调整大小
            layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,  // 节点大小不受布局影响
            fromSpot: go.Spot.AllSides, // 节点的连线起点可以在节点的任意一侧
            toSpot: go.Spot.AllSides,   // 节点的连线终点可以在节点的任意一侧
            isShadowed: true,           // 节点显示阴影
            shadowOffset: new go.Point(3, 3),  // 阴影偏移量
            shadowColor: "#C5C1AA"      // 阴影颜色
          },
          new go.Binding("location", "location").makeTwoWay(),  // 节点位置
          // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
          // clear out any desiredSize set by the ResizingTool.
          new go.Binding("desiredSize", "visible", function (v) {
            return new go.Size(NaN, NaN);
          }).ofObject("LIST"),
          // define the node's outer shape, which will surround the Table
          $(go.Shape, "RoundedRectangle",
              {fill: 'white', stroke: "#eeeeee", strokeWidth: 3}),
          $(go.Panel, "Table",
              {margin: 8, stretch: go.GraphObject.Fill},
              $(go.RowColumnDefinition, {row: 0, sizing: go.RowColumnDefinition.None}),
              // the table header
              $(go.TextBlock,
                  {
                    row: 0, alignment: go.Spot.Center,
                    margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
                    font: "bold 16px sans-serif"
                  },
                  new go.Binding("text", "key")),
              // the collapse/expand button
              $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
                  {row: 0, alignment: go.Spot.TopRight}),
              // the list of Panels, each showing an attribute
              $(go.Panel, "Vertical",
                  {
                    name: "LIST",
                    row: 1,
                    padding: 3,
                    alignment: go.Spot.TopLeft,
                    defaultAlignment: go.Spot.Left,
                    stretch: go.GraphObject.Horizontal,
                    itemTemplate: itemTempl
                  },
                  new go.Binding("itemArray", "items"))
          )  // end Table Panel
      );  // end Node
  // define the Link template, representing a relationship
  myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
          {
            selectionAdorned: true,
            layerName: "Foreground",
            reshapable: true,
            routing: go.Link.AvoidsNodes,
            corner: 5,
            curve: go.Link.JumpOver
          },
          $(go.Shape,  // the link shape
              {stroke: "#303B45", strokeWidth: 2.5}),
          $(go.TextBlock,  // the "from" label
              {
                textAlign: "center",
                font: "bold 14px sans-serif",
                stroke: "#1967B3",
                segmentIndex: 0,
                segmentOffset: new go.Point(NaN, NaN),
                segmentOrientation: go.Link.OrientUpright
              },
              new go.Binding("text", "text")),
          $(go.TextBlock,  // the "to" label
              {
                textAlign: "center",
                font: "bold 14px sans-serif",
                stroke: "#1967B3",
                segmentIndex: -1,
                segmentOffset: new go.Point(NaN, NaN),
                segmentOrientation: go.Link.OrientUpright
              },
              new go.Binding("text", "toText"))
      );


  // create the model for the E-R diagram
  console.log('state.nodeDataList', state.nodeDataList)
  console.log('state.linkDataList', state.linkDataList)
  let nodeDataArray = state.nodeDataList
  // [
  //   {
  //     key: "Products",
  //     items: [{name: "ProductID", iskey: true, figure: "Decision", color: colors.red},
  //       {name: "ProductName", iskey: false, figure: "Hexagon", color: colors.blue},
  //       {name: "SupplierID", iskey: false, figure: "Decision", color: "purple"},
  //       {name: "CategoryID", iskey: false, figure: "Decision", color: "purple"}]
  //   },
  //   {
  //     key: "Suppliers",
  //     items: [{name: "SupplierID", iskey: true, figure: "Decision", color: colors.red},
  //       {name: "CompanyName", iskey: false, figure: "Hexagon", color: colors.blue},
  //       {name: "ContactName", iskey: false, figure: "Hexagon", color: colors.blue},
  //       {name: "Address", iskey: false, figure: "Hexagon", color: colors.blue}]
  //   },
  //   {
  //     key: "Categories",
  //     items: [{name: "CategoryID", iskey: true, figure: "Decision", color: colors.red},
  //       {name: "CategoryName", iskey: false, figure: "Hexagon", color: colors.blue},
  //       {name: "Description", iskey: false, figure: "Hexagon", color: colors.blue},
  //       {name: "Picture", iskey: false, figure: "TriangleUp", color: colors.pink}]
  //   },
  //   {
  //     key: "Order Details",
  //     items: [{name: "OrderID", iskey: true, figure: "Decision", color: colors.red},
  //       {name: "ProductID", iskey: true, figure: "Decision", color: colors.red},
  //       {name: "UnitPrice", iskey: false, figure: "Circle", color: colors.green},
  //       {name: "Quantity", iskey: false, figure: "Circle", color: colors.green},
  //       {name: "Discount", iskey: false, figure: "Circle", color: colors.green}]
  //   },
  // ];
  let linkDataArray = state.linkDataList
  // [
  //   {from: "Products", to: "Suppliers", text: "0..N", toText: "1"},
  //   {from: "Products", to: "Suppliers", text: "0..N", toText: "1"},
  //   {from: "Products", to: "Categories", text: "0..N", toText: "1"},
  //   {from: "Order Details", to: "Products", text: "0..N", toText: "1"}
  // ];
  myDiagram.model = $(go.GraphLinksModel,
      {
        copiesArrays: true,
        copiesArrayObjects: true,
        nodeDataArray: nodeDataArray,
        linkDataArray: linkDataArray
      });
}


onMounted(() => {
  GetERDData().then(res => {
    console.log('res.data.data: ', res.data.data)

    state.nodeDataList = res.data.data.nodeDataArray
    console.log('GetERDData state.nodeDataList', state.nodeDataList)
    linkDataList.value = res.data.data.linkDataArray
    console.log('GetERDData linkDataList.value', linkDataList.value)

    res.data.data.nodeDataArray.forEach(item => {
      state.entryOptions.push({
        value: item.key,
        label: item.key,
      })
    })

    state.cfieldOptions = res.data.data.nodeDataArray.map(item => {
      return {
        value: item.key,
        label: item.key,
        children: item.items.map(field => {
          return {
            value: field.name,
            label: field.name
          }
        })
      }
    })
    console.log('GetERDData state.cfieldOptions', state.cfieldOptions)

    refreshDfieldOptions()
    init()
  })
});
</script>

<style scoped>
#myDiagramDiv {
  background-color: #F8F8F8;
  border: 1px solid #aaa;
}
</style>







<!--<template>-->
<!--  <el-card class='cs-list-card' shadow='never'>-->
<!--    <template #header>-->
<!--      <el-button-->
<!--          type='primary' @click='handleCreateCrossDomain'-->
<!--          :icon="Plus">>新增pgbouncer-->
<!--      </el-button>-->
<!--      <el-button-->
<!--          :disabled="editBtnDisabled"-->
<!--          type='success' :icon="Edit"-->
<!--          @click='handleUpdate'>-->
<!--        修改-->
<!--      </el-button>-->
<!--      <el-button-->
<!--          :disabled="editBtnDisabled"-->
<!--          type='danger' :icon="Delete"-->
<!--          @click="handleDeleteBouncer(row)">删除-->
<!--      </el-button>-->
<!--      <el-button type='danger' :icon="More" @click="handleDetailBouncer(row)">详情</el-button>-->
<!--    </template>-->
<!--    <div class='show-list'>-->
<!--      <vxe-table-->
<!--          border-->
<!--          :row-config="{isCurrent: true, isHover: true}"-->
<!--          :data="tableData"-->
<!--          ref="xTable"-->
<!--          align="center"-->
<!--          empty-text="暂无数据！"-->
<!--          @current-change="currentChangeEvent"-->
<!--      >-->
<!--        <vxe-column type="seq" width="60"/>-->
<!--        <vxe-column type="expand" width="60">-->
<!--          &lt;!&ndash; 展开行 &ndash;&gt;-->
<!--          &lt;!&ndash;          <template #content="{ bouncerRow }">&ndash;&gt;-->
<!--          <template #content="{ rowIndex }">-->
<!--            <div class="expand-wrapper">-->
<!--              <vxe-table-->
<!--                  :loading="loading"-->
<!--                  class="db-table"-->
<!--                  :row-class-name="rowClassName"-->
<!--                  border-->
<!--                  show-header-overflow-->
<!--                  show-overflow-->
<!--                  :row-config="{height: 100, isCurrent:true, isHover:true}"-->
<!--                  :data="listData"-->
<!--                  align="center"-->
<!--                  empty-text="暂无数据！"-->
<!--                  ref="xTable"-->
<!--                  @current-change="currentChangeEvent"-->
<!--              >-->
<!--                <template #header>-->
<!--                  {{ rowIndex }}-->
<!--                  <div class='cus-table-header' style='margin: 5px'>-->
<!--                    <div style="height: 35px">-->
<!--                      <el-button-group>-->
<!--                        <el-button-->
<!--                            v-btn-role type='primary' @click='handleCreateCrossDomain'-->
<!--                            :icon="Plus">-->
<!--                          新增跨域库-->
<!--                        </el-button>-->
<!--                        <el-button-->
<!--                            :disabled="editBtnDisabled"-->
<!--                            v-btn-role type='success' :icon="Edit"-->
<!--                            @click='handleUpdate'>-->
<!--                          修改-->
<!--                        </el-button>-->
<!--                        <el-button v-btn-role type='danger' @click='handleDelete' :icon="Delete">-->
<!--                          卸载-->
<!--                        </el-button>-->
<!--                        <el-button v-btn-role type='primary' @click='handleRead' :icon="Document">-->
<!--                          详情-->
<!--                        </el-button>-->
<!--                      </el-button-group>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </template>-->
<!--                <vxe-column type="seq" title="序号" align="center" width="60"/>-->
<!--                <vxe-column field="name" title="数据库名称" align="center">-->
<!--                  <template #default="{ row }">-->
<!--                    <p style='font-size: 15px; font-weight: bolder'>{{ row.name }}</p>-->
<!--                    <p style='font-size: 10px'>{{ row.type }}</p>-->
<!--                    <p style='font-size: 10px'>{{ row.ip }}:{{ row.port }} &#45;&#45; {{ row.databaseName }}</p>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="dbType" title="数据库类型" width="150">-->
<!--                  <template #default="{ row }">-->
<!--                    <p v-if="row.isLocal === 0">本地库</p>-->
<!--                    <p v-if="row.isLocal === 1">域内库</p>-->
<!--                    <p v-if="row.isLocal === 2">跨域库</p>-->
<!--                    <p v-if="row.isLocal === 3">中心库</p>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="status" title="数据库状态" width="200">-->
<!--                  <template #default="{ row }">-->
<!--                    <p v-if="db_sys_admin  && !row.commit">发布状态：<span style="font-weight: bolder">未发布</span></p>-->
<!--                    <p v-if="db_sys_admin  && row.commit">发布状态：<span style="font-weight: bolder">已发布</span></p>-->
<!--                    <p>注册状态：<span style="font-weight: bolder">{{ showStatusInTableItem(row.status) }}</span></p>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="storageSpaceUsage" title="存储空间使用情况">-->
<!--                  <template #default="{ row }">-->
<!--                    <div v-if="showMmyPctInTableItem(row.total, row.used) !== -1">-->
<!--                      <p class="use-pct">当前存储 {{ Number(Number(row.used) / 1024).toLocaleString() }} MB</p>-->
<!--                      <el-progress-->
<!--                          :percentage='showMmyPctInTableItem(row.total, row.used)'-->
<!--                          :stroke-width='10'-->
<!--                      />-->
<!--                    </div>-->
<!--                    <span v-else>使用情况未知</span>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="create" title="创建信息">-->
<!--                  <template #default="{ row }">-->
<!--                    <p>创建人：{{ row.createUserName }}</p>-->
<!--                    <p>{{ row.createTime }}</p>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="submitTo" title="提交信息" sort-type="string" v-if="db_sys_admin  && db_admin">-->
<!--                  <template #default="{ row }">-->
<!--                    <div v-if="row.commit">-->
<!--                      <p>提交人：{{ row.createUserName }}</p>-->
<!--                      <p>{{ row.commitTime }}</p>-->
<!--                    </div>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="operate" title="操作" v-if="db_sys_admin || db_admin">-->
<!--                  <template #default="{ row }">-->
<!--                    <el-button-->
<!--                        v-if="db_sys_admin && !row.commit"-->
<!--                        :icon="Grid" size='small' type='primary'-->
<!--                        @click='publishDBInfo(row)'-->
<!--                    >发布-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                        v-if="(db_sys_admin || db_admin) && row.commit"-->
<!--                        size='small' type='primary' @click='handleDtAuth(row)'-->
<!--                        :icon="Finished"-->
<!--                    >用户授权-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                        v-if="isCenterDB && db_sys_admin && row.commit && (row.isLocal === 0 || row.isLocal === 1)"-->
<!--                        size='small' type='success' :icon="Rank"-->
<!--                        @click='handleMakeCenter(row)'-->
<!--                    >初始化为中心库-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                        v-if="db_admin && row.commit && row.isLocal === 3"-->
<!--                        size='small' type='success' @click='handleBsnAuth(row)'-->
<!--                        :icon="Finished"-->
<!--                    >业务授权-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                        v-if="db_admin && row.status !== 1 && row.commit && (row.isLocal === 0 || row.isLocal === 1)"-->
<!--                        :icon="CirclePlus" size='small' type='danger'-->
<!--                        @click='handleCommit(row)'-->
<!--                    >提交注册-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                        v-if="db_admin && row.status === 1 && row.commit && (row.isLocal === 0 || row.isLocal ===1) && !row.share"-->
<!--                        :icon="Grid" size='small' type='danger'-->
<!--                        @click='setTablePerms(row)'-->
<!--                    >表共享-->
<!--                    </el-button>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="register" title="注册管理" v-if="db_admin" width="150">-->
<!--                  <template #default="{ row }">-->
<!--                    <el-popover-->
<!--                        v-if="row.isLocal === 2 && row.status !== 1"-->
<!--                        placement="bottom"-->
<!--                        :width="350"-->
<!--                        trigger="hover"-->
<!--                        content="this is content, this is content, this is content"-->
<!--                    >-->
<!--                      <el-button-group v-if="db_admin && row.status !== 1">-->
<!--                        <el-button type='danger' :icon="Check" @click="handleRegisterType(row, 1)">同意注册</el-button>-->
<!--                        <el-button type='danger' :icon="Close" @click="handleRegisterType(row, 2)">拒绝注册</el-button>-->
<!--                        <el-button type='danger' :icon="More" @click="handleRegisterType(row, 3)">等待注册</el-button>-->
<!--                      </el-button-group>-->
<!--                      <template #reference>-->
<!--                        <el-button type='primary' size="small" class="m-2" :icon="Memo">执行注册管理操作</el-button>-->
<!--                      </template>-->
<!--                    </el-popover>-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--              </vxe-table>-->
<!--            </div>-->
<!--          </template>-->
<!--        </vxe-column>-->
<!--        <vxe-column field="name" title="Name"/>-->
<!--        <vxe-column field="ip" title="IP"/>-->
<!--        <vxe-column field="create" title="创建信息">-->
<!--          <template #default="{ row }">-->
<!--            <p>创建人：{{ row.createUserName }}</p>-->
<!--            <p>创建时间：{{ row.createTime }}</p>-->
<!--          </template>-->
<!--        </vxe-column>-->
<!--        <vxe-column title="操作" width="440">-->
<!--          <template #default="{ row }">-->
<!--            <el-button-group>-->
<!--              <el-button type='primary' :icon="Check" @click="handleConfigBouncer(row, 1)">配置bouncer</el-button>-->
<!--              <el-button type='primary' :icon="Close" @click="handleRegisterType(row, 2)">新增数据库</el-button>-->
<!--            </el-button-group>-->
<!--          </template>-->
<!--        </vxe-column>-->
<!--      </vxe-table>-->
<!--    </div>-->
<!--  </el-card>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {reactive, ref, toRefs} from 'vue'-->
<!--import {VxeColumnPropTypes, VxeTableInstance, VxeTablePropTypes} from 'vxe-table'-->
<!--import {-->
<!--  Plus, Coin, Delete, Edit, Document, Refresh, Search, Warning, Checked, Rank,-->
<!--  Finished, WarningFilled, QuestionFilled, Switch, Grid, CirclePlus, Memo, Check, Close, More-->
<!--} from '@element-plus/icons-vue'-->

<!--const xTable = ref<VxeTableInstance>()-->
<!--// 表格当前选中行数据-->
<!--const curRow: any = ref();-->
<!--// 当前用户是否为中心管理员-->
<!--const center_admin = isCenterAdmin();-->
<!--// 当前用户是否为子管理员-->
<!--const sub_admin = isSubAdmin();-->
<!--// 当前用户是否为数据库系统管理员（A）-->
<!--const db_sys_admin = isRoleA()-->
<!--// 当前用户是否为数据库管理员（B）-->
<!--const db_admin = isRoleB()-->
<!--// 当前用户是否为数据库操作员（C）-->
<!--const db_operator = isRoleC()-->


<!--const state = reactive({-->
<!--  pgBouncerList: [],-->
<!--})-->

<!--const {-->
<!--  pgBouncerList,-->
<!--} = toRefs(state)-->


<!--const tableData = ref([-->
<!--  {id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc'},-->
<!--  {id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},-->
<!--  {id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},-->
<!--])-->

<!--const otherList = ref([-->
<!--  {id: 50001, name: 'Test5001', role: 'Develop', sex: 'Man', age: 28, address: 'test abc'},-->
<!--  {id: 50001, name: 'Test5001', role: 'Develop', sex: 'Man', age: 28, address: 'test abc'},-->
<!--])-->

<!--// 获取用户角色-->
<!--const getRoleList = () => {-->
<!--  const roles: any = getProps("roles");-->
<!--  return roles.split(",");-->
<!--}-->

<!--/******************************** table **************************/-->
<!--/**-->
<!-- * 获取当前选中的行-->
<!-- */-->
<!--const currentChangeEvent = () => {-->
<!--  const $table: any = xTable.value;-->
<!--  curRow.value = $table.getCurrentRecord();-->
<!--  console.log("curRow:", curRow.value)-->
<!--}-->


<!--// 导入按钮权限控制信息-->
<!--import btnPerms from './BtnPerms.json'-->
<!--import {getProps, isCenterAdmin, isRoleA, isRoleB, isRoleC, isSubAdmin} from "@/utils/auth";-->
<!--import {VxeTableInstance} from "vxe-table";-->
<!--// 判断按钮是否有权限：用户角色-->
<!--const vBtnRole = {-->
<!--  mounted(el, binding) {-->
<!--    function _checkBtnPermission(btnName, role) {-->
<!--      const item = btnPerms.find(item => item.name === btnName)-->
<!--      if (item) {-->
<!--        return item.roles.some(item => role.includes(item))-->
<!--      }-->
<!--      return false-->
<!--    }-->

<!--    binding.value = getRoleList()-->
<!--    // console.log("binding.value:", binding.value)-->

<!--    if (binding.value) {-->
<!--      // 获取el-button元素的子元素span-->
<!--      const span = el.getElementsByTagName('span')[0];-->
<!--      const text = span.innerText;-->
<!--      // 判断按钮是否有权限：按钮名称、所需角色、数据库类型、数据库状态-->
<!--      const hasPerm = _checkBtnPermission(text, binding.value);-->
<!--      // console.log("hasPerm:", hasPerm)-->

<!--      if (!hasPerm) {-->
<!--        el.classList.add('is-disabled');-->
<!--        el.setAttribute('disabled', 'disabled');-->
<!--      }-->
<!--    } else {-->
<!--      throw new Error("need role perms!");-->
<!--    }-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.expand-wrapper {-->
<!--  padding: 20px;-->
<!--}-->
<!--</style>-->






