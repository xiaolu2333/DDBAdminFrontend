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
  <br/>
  <div>
    <div v-if="clickedLink || rightClickedLink">
      <el-button v-if="clickedLink && !rightClickedLink">
        选中连线【{{ clickedLink.from }}.{{ clickedLink.fromPort }} -> {{ clickedLink.to }}.{{ clickedLink.toPort }}】
      </el-button>
      <el-button v-if="(!clickedLink && rightClickedLink) || (clickedLink && rightClickedLink)">
        选中连线【{{ rightClickedLink.from }}.{{ rightClickedLink.fromPort }} -> {{
          rightClickedLink.to
        }}.{{ rightClickedLink.toPort }}】
      </el-button>
    </div>
    <div v-if="clickedNode || rightClickedNode">
      <el-button v-if="clickedNode && !rightClickedNode">
        选中节点【{{ clickedNode.key }}】
      </el-button>
      <el-button v-if="(!clickedNode && rightClickedNode) || (clickedNode && rightClickedNode)">
        选中节点【{{ rightClickedNode.key }}】
      </el-button>
    </div>
    <el-button-group>
      <el-button type="primary" @click="addNode">添加节点</el-button>
      <el-button type="primary" @click="addLink">添加边</el-button>
      <el-button type="primary" @click="deleteNode">删除节点</el-button>
      <el-button type="primary" @click="deleteLink">删除边</el-button>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="load">数据融合</el-button>
    </el-button-group>
  </div>
  <br/>
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
  <br/>

  <div id="myDiagramDiv"
       style="border: 1px solid black; width: 100%; height: 600px; position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;">
    <canvas tabindex="0" width="1234" height="407"
            style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; width: 905px; height: 299px; cursor: auto;">
      This text is displayed if your browser does not support the Canvas HTML element.
    </canvas>
    <div style="position: absolute; overflow: auto; width: 905px; height: 299px; z-index: 1;">
      <div style="position: absolute; width: 1px; height: 1px;"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, toRefs, ref} from 'vue'

import {GetERDData} from '@/api/dataService/ERD.js'

const state = reactive({
  // 布局方式
  layoutOptions: [// 布局方式可选：GridLayout、TreeLayout、ForceDirectedLayout、LayeredDigraphLayout、CircularLayout
    {label: "ForceDirectedLayout", value: "ForceDirectedLayout"},
    {label: "GridLayout", value: "GridLayout"},
    {label: "TreeLayout", value: "TreeLayout"},
    {label: "LayeredDigraphLayout", value: "LayeredDigraphLayout"},
    {label: "CircularLayout", value: "CircularLayout"},
  ],
  // 选中的布局方式
  selectedLayout: "ForceDirectedLayout",

  // 实体/节点数据
  nodeDataList: [],
  // 关系/边数据
  linkDataList: [],

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

  // 被左键单击的节点
  clickedNode: null,
  // 被左键单击的边
  clickedLink: null,
  // 被右键单击的节点
  rightClickedNode: null,
  // 被右键单击的边
  rightClickedLink: null,
})

const {
  layoutOptions,
  selectedLayout,
  nodeDataList,
  linkDataList,
  entryOptions,
  cfieldOptions,
  dfieldOptions,
  cfkFromEntry,
  cfkToEntry,
  dfkFromEntry,
  dfkToEntry,
  clickedNode,
  clickedLink,
  rightClickedNode,
  rightClickedLink,
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

/***************************** 选择器事件 ******************************/
/**
 * 选择布局方式
 * @param val
 */
const layoutOptionChange = (val) => {
  state.selectedLayout = val
  console.log('selectedLayout:', state.selectedLayout)
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


/***************************** utils ******************************/
const refreshDfieldOptions = () => {
  let temp = []

  state.dfieldOptions = state.cfieldOptions

  console.log('state.dfieldOptions:', state.dfieldOptions)
}


/***************************** 初始化 ******************************/
function init() {
  let $ = go.GraphObject.make;

  /**
   * 定义画布
   */
  myDiagram =
      $(go.Diagram,
          "myDiagramDiv",                                 // 画布元素
          {                                               // 画布属性
            validCycle: go.Diagram.CycleNotDirected,        // don't allow loops
            allowDelete: false,                             // 禁止删除
            allowCopy: false,                               // 禁止复制
            layout: $(go.LayeredDigraphLayout),             // 指定布局：分层布局
            "undoManager.isEnabled": true                   // 开启撤销和重做功能
          });

  /**
   * 定义节点field模板
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
          $(go.Shape,                                                         // 形状配置
              {
                width: 12, height: 12, column: 0, strokeWidth: 2, margin: 4,  // 形状属性
                // but disallow drawing links from or to this shape:
                fromLinkable: false, toLinkable: false
              },
              new go.Binding("figure", "figure"),
              new go.Binding("fill", "color")
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
              new go.Binding("text", "info"))               // 绑定文本块为nodeDataArray中的每项的info
      );

  /**
   * 定义节点模板
   */
  myDiagram.nodeTemplate =
      $(go.Node, "Auto",
          {copyable: false, deletable: false},
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Shape,           // 节点形状属性
              {
                fill: "#EEEEEE",  // 填充色
                stroke: "black",  // 边框色
                strokeWidth: 1,   // 边框宽度
              }
          ),
          // 节点内容包含 header 以及 items 列表
          $(go.Panel,
              "Vertical",                                 // 垂直布局
              $(go.Panel, "Auto",                         // header 自动布局
                  {stretch: go.GraphObject.Horizontal},     // 水平拉伸，使得header宽度与父节点一致
                  $(go.Shape,                               // header形状
                      {fill: "#1570A6", stroke: null}),       // 填充色为蓝色，边框色为空
                  $(go.TextBlock,                           // header文本
                      {
                        alignment: go.Spot.Center,
                        margin: 6,
                        stroke: "white",                      // 文本色为白色
                        font: "bold 12pt sans-serif"
                      },
                      new go.Binding("text", "key")         // 绑定文本为nodeDataArray中的key
                  )
              ),
              $(go.Panel, "Table",                                    // items Table布局
                  {                                                     // Table属性
                    padding: 2,
                    minSize: new go.Size(100, 10),
                    defaultStretch: go.GraphObject.Horizontal,          // 水平拉伸
                    itemTemplate: fieldTemplate                         // 指定item模板为上面定义的fieldTemplate
                  },
                  new go.Binding("itemArray", "fields")     // 绑定itemArray为nodeDataArray中的fields
              ),  // end Table Panel of items
              {                                                   // 对象右键菜单
                contextMenu:     // define a context menu for each node
                    $("ContextMenu",  // that has one button
                        $("ContextMenuButton",
                            $(go.TextBlock, "改变节点背景颜色"),
                            {click: changeColor,},
                        ),
                        $("ContextMenuButton",
                            $(go.TextBlock, "改变节点字体颜色"),
                            {click: changeColor},
                        )
                    )  // end Adornment
              }
          )  // end Vertical Panel
      );  // end Node

  /**
   * 定义连线模板
   */
  myDiagram.linkTemplate =
      $(go.Link,
          {                           // 连线属性
            reshapable: true,             // 连线可调整
            routing: go.Link.AvoidsNodes, // 连线避开节点
            corner: 5,                    // 连线拐角弧度
            curve: go.Link.JumpOver,      // 连线绕过节点
            toShortLength: 2,             // 入连线端点距离节点距离
            fromShortLength: 4            // 出连线端点距离节点距离
          },
          $(go.Shape, {strokeWidth: 1.5}),  // 连线形状属性
          $(go.Shape, {toArrow: "Standard", stroke: null})  // 连线箭头属性
      );

  /**
   * 定义模型
   */
  myDiagram.model =
      $(go.GraphLinksModel,
          {
            copiesArrays: true,                 // 可以复制数组
            copiesArrayObjects: true,           // 可以复制数组中的对象
            linkFromPortIdProperty: "fromPort", // 连线起始端口属性
            linkToPortIdProperty: "toPort",     // 连线结束端口属性
            nodeDataArray: state.nodeDataList,  // 节点数据
            linkDataArray: state.linkDataList   // 连线数据
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
          console.log("Clicked on Node：" + part.data.key);
          state.clickedNode = part.data
          console.log('state.clickedNode', state.clickedNode)
        }
        if (part instanceof go.Link) {
          console.log("Clicked on Link：" + part.data.from + " to " + part.data.to);
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
          console.log("right Clicked on Node：" + part.data.key);
          state.rightClickedNode = part.data
          console.log('state.rightClickedNode', state.rightClickedNode)
        }
        if (part instanceof go.Link) {
          console.log("right Clicked on Link：" + part.data.from + " to " + part.data.to);
          state.rightClickedLink = part.data
          console.log('state.rightClickedLink', state.rightClickedLink)
        }
      });

  /**
   * 背景右键菜单
   */
  myDiagram.contextMenu =
      $("ContextMenu",
          $("ContextMenuButton",
              $(go.TextBlock, "撤销"),
              {click: undo},
              new go.Binding("visible", "", function (o) {
                return o.diagram.commandHandler.canUndo();
              }).ofObject()),
          $("ContextMenuButton",
              $(go.TextBlock, "重做"),
              {click: redo},
              new go.Binding("visible", "", function (o) {
                return o.diagram.commandHandler.canRedo();
              }).ofObject()),
          // no binding, always visible button:
          $("ContextMenuButton",
              $(go.TextBlock, "创建新节点"),
              {click: newNode})
      );

}

// function init() {
//   let $ = go.GraphObject.make;
//
//   /**
//    * 定义画布
//    */
//   myDiagram = $(
//       go.Diagram,
//       "myDiagramDiv",                     // 画布元素
//       {                                   // 画布属性
//         allowDelete: false,                 // 禁止删除
//         allowCopy: false,                   // 禁止复制
//         layout: $(go.TreeLayout),           // 指定布局：力导向布局
//         "undoManager.isEnabled": true       // 开启撤销和重做功能
//       });
//
//   /**
//    * 指定显示网格
//    */
//   myDiagram.grid.visible = true;
//   /**
//    * 拖动时对齐网格
//    */
//   myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
//   /**
//    * 重置大小时对齐网格
//    */
//   myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;
//
//
//   let colors = {
//     'red': '#be4b15',
//     'green': '#52ce60',
//     'blue': '#6ea5f8',
//     'lightred': '#fd8852',
//     'lightblue': '#afd4fe',
//     'lightgreen': '#b9e986',
//     'pink': '#faadc1',
//     'purple': '#d689ff',
//     'orange': '#fdb400',
//   }
//   // 节点数据数组中每个属性的模板
//   let itemTempl =
//       $(
//           go.Panel,         // represents a single item in a Panel of type "LIST"
//           "Horizontal",     // 内部元素水平排列
//           $(go.Shape,       // 形状属性配置
//               {desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2}, // 形状大小
//               new go.Binding("figure", "figure"),   // 形状类型
//               new go.Binding("fill", "color"),      // 形状填充颜色
//               new go.Binding("stroke", "color")),   // 形状边框颜色
//           $(go.TextBlock,    // 文本属性配置
//               {
//                 stroke: "#333333",            // 文本颜色
//                 font: "bold 14px sans-serif"  // 文本字体
//               },
//               new go.Binding("text", "name")) //
//       );
//
//   /**
//    * 定义节点模板与边模板
//    */
//   myDiagram.nodeTemplate =
//       $(
//           go.Node,    // 表示一个节点
//           "Auto",     // 节点的位置和大小由其内容决定
//           {           // 节点属性配置
//             selectionAdorned: true,     // 节点被选中时，显示选中装饰器
//             resizable: true,            // 节点可调整大小
//             layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,  // 节点大小不受布局影响
//             fromSpot: go.Spot.AllSides, // 节点的连线起点可以在节点的任意一侧
//             toSpot: go.Spot.AllSides,   // 节点的连线终点可以在节点的任意一侧
//             isShadowed: true,           // 节点显示阴影
//             shadowOffset: new go.Point(3, 3),  // 阴影偏移量
//             shadowColor: "#C5C1AA"      // 阴影颜色
//           },
//           new go.Binding("location", "location").makeTwoWay(),  // 节点位置
//           // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
//           // clear out any desiredSize set by the ResizingTool.
//           new go.Binding("desiredSize", "visible", function (v) {
//             return new go.Size(NaN, NaN);
//           }).ofObject("LIST"),
//           // define the node's outer shape, which will surround the Table
//           $(go.Shape, "RoundedRectangle",
//               {fill: 'white', stroke: "#eeeeee", strokeWidth: 3}),
//           $(
//               go.Panel,
//               "Table",
//               {margin: 8, stretch: go.GraphObject.Fill},
//               $(go.RowColumnDefinition, {row: 0, sizing: go.RowColumnDefinition.None}),
//               // the table header
//               $(go.TextBlock,
//                   {
//                     row: 0, alignment: go.Spot.Center,
//                     margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
//                     font: "bold 16px sans-serif"
//                   },
//                   new go.Binding("text", "key")),
//               // the collapse/expand button
//               $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
//                   {row: 0, alignment: go.Spot.TopRight}),
//               // the list of Panels, each showing an attribute
//               $(go.Panel, "Vertical",
//                   {
//                     name: "LIST",
//                     row: 1,
//                     padding: 3,
//                     alignment: go.Spot.TopLeft,
//                     defaultAlignment: go.Spot.Left,
//                     stretch: go.GraphObject.Horizontal,
//                     itemTemplate: itemTempl
//                   },
//                   new go.Binding("itemArray", "items"))
//           ),  // end Table Panel
//           // 对象右键菜单
//           {
//             contextMenu:     // define a context menu for each node
//                 $("ContextMenu",  // that has one button
//                     $("ContextMenuButton",
//                         $(go.TextBlock, "改变节点背景颜色"),
//                         {click: changeColor},
//                     ),
//                     $("ContextMenuButton",
//                         $(go.TextBlock, "改变节点字体颜色"),
//                         {click: changeColor},
//                     )
//                     // more ContextMenuButtons would go here
//                 )  // end Adornment
//           }
//       );  // end Node
//   // 定义边模板
//   myDiagram.linkTemplate =
//       $(go.Link,
//           // 边属性配置
//           {
//             selectionAdorned: true,       // 边被选中时，显示选中装饰器
//             layerName: "Foreground",      // 边显示在节点上方
//             reshapable: true,             // 边可调整
//             routing: go.Link.AvoidsNodes, // 边避开节点
//             corner: 5,                    // 边拐角弧度
//             curve: go.Link.JumpOver       // 边跳过节点
//           },
//           $(go.Shape),  // 边形状，不指定则为直线
//           $(go.Shape, {toArrow: "OpenTriangle", fill: null}), // 边箭头，fill为null表示不填充
//           $(go.TextBlock,  // from 一侧的文本标签属性
//               {
//                 textAlign: "center",
//                 font: "bold 14px sans-serif",
//                 stroke: "#1967B3",
//                 segmentIndex: 0,
//                 segmentOffset: new go.Point(NaN, NaN),
//                 segmentOrientation: go.Link.OrientUpright
//               },
//               new go.Binding("text", "text")),
//           $(go.TextBlock,  // to 一侧的文本标签属性
//               {
//                 textAlign: "center",
//                 font: "bold 14px sans-serif",
//                 stroke: "#1967B3",
//                 segmentIndex: -1,
//                 segmentOffset: new go.Point(NaN, NaN),
//                 segmentOrientation: go.Link.OrientUpright
//               },
//               new go.Binding("text", "toText")),
//           // 对象右键菜单
//           {
//             contextMenu:     // define a context menu for each node
//                 $("ContextMenu",  // that has one button
//                     $("ContextMenuButton",
//                         $(go.TextBlock, "改变边颜色"),
//                         {click: changeColor},
//                     )
//                     // more ContextMenuButtons would go here
//                 )  // end Adornment
//           }
//       );
//
//   /**
//    * 背景右键菜单
//    */
//   myDiagram.contextMenu =
//       $("ContextMenu",
//           $("ContextMenuButton",
//               $(go.TextBlock, "Undo"),
//               {click: undo},
//               new go.Binding("visible", "", function (o) {
//                 return o.diagram.commandHandler.canUndo();
//               }).ofObject()),
//           $("ContextMenuButton",
//               $(go.TextBlock, "Redo"),
//               {click: redo},
//               new go.Binding("visible", "", function (o) {
//                 return o.diagram.commandHandler.canRedo();
//               }).ofObject()),
//           // no binding, always visible button:
//           $("ContextMenuButton",
//               $(go.TextBlock, "创建新节点"),
//               {click: newNode})
//       );
//
//   /**
//    * 获取节点数据与边数据
//    */
//   console.log('state.nodeDataList', state.nodeDataList)
//   console.log('state.linkDataList', state.linkDataList)
//   let nodeDataArray = state.nodeDataList
//   // [
//   //   {
//   //     key: "Products",
//   //     items: [{name: "ProductID", iskey: true, figure: "Decision", color: colors.red},
//   //       {name: "ProductName", iskey: false, figure: "Hexagon", color: colors.blue},
//   //       {name: "SupplierID", iskey: false, figure: "Decision", color: "purple"},
//   //       {name: "CategoryID", iskey: false, figure: "Decision", color: "purple"}]
//   //   },
//   //   {
//   //     key: "Suppliers",
//   //     items: [{name: "SupplierID", iskey: true, figure: "Decision", color: colors.red},
//   //       {name: "CompanyName", iskey: false, figure: "Hexagon", color: colors.blue},
//   //       {name: "ContactName", iskey: false, figure: "Hexagon", color: colors.blue},
//   //       {name: "Address", iskey: false, figure: "Hexagon", color: colors.blue}]
//   //   },
//   //   {
//   //     key: "Categories",
//   //     items: [{name: "CategoryID", iskey: true, figure: "Decision", color: colors.red},
//   //       {name: "CategoryName", iskey: false, figure: "Hexagon", color: colors.blue},
//   //       {name: "Description", iskey: false, figure: "Hexagon", color: colors.blue},
//   //       {name: "Picture", iskey: false, figure: "TriangleUp", color: colors.pink}]
//   //   },
//   //   {
//   //     key: "Order Details",
//   //     items: [{name: "OrderID", iskey: true, figure: "Decision", color: colors.red},
//   //       {name: "ProductID", iskey: true, figure: "Decision", color: colors.red},
//   //       {name: "UnitPrice", iskey: false, figure: "Circle", color: colors.green},
//   //       {name: "Quantity", iskey: false, figure: "Circle", color: colors.green},
//   //       {name: "Discount", iskey: false, figure: "Circle", color: colors.green}]
//   //   },
//   // ];
//   let linkDataArray = state.linkDataList
//   // [
//   //   {
//   //     from: "Products",
//   //     to: "Suppliers",
//   //     text: "0..N", toText: "1",
//   //     // fromEndSegmentLength: 30,
//   //     // toEndSegmentLength: 30
//   //   },
//   //   {
//   //     from: "Products",
//   //     to: "Categories",
//   //     text: "0..N",
//   //     toText: "1",
//   //     // fromEndSegmentLength: 30,
//   //     // toEndSegmentLength: 30
//   //   },
//   //   {
//   //     from: "Order Details",
//   //     to: "Products",
//   //     text: "0..N",
//   //     toText: "1",
//   //     // fromEndSegmentLength: 30,
//   //     // toEndSegmentLength: 30
//   //   }
//   // ];
//
//
//   /**
//    * 添加对象点击事件，获取对象信息
//    */
//   myDiagram.addDiagramListener("ObjectSingleClicked",
//       function (e) {
//         let part = e.subject.part;
//         if (part instanceof go.Node) {
//           console.log("Clicked on Node：" + part.data.key);
//           state.clickedNode = part.data
//           console.log('state.clickedNode', state.clickedNode)
//         }
//         if (part instanceof go.Link) {
//           console.log("Clicked on Link：" + part.data.from + " to " + part.data.to);
//           state.clickedLink = part.data
//           console.log('state.clickedLink', state.clickedLink)
//         }
//       });
//
//   /**
//    * 添加对象右键事件，获取对象信息
//    */
//   myDiagram.addDiagramListener("ObjectContextClicked",
//       function (e) {
//         let part = e.subject.part;
//         if (part instanceof go.Node) {
//           console.log("right Clicked on Node：" + part.data.key);
//           state.rightClickedNode = part.data
//           console.log('state.rightClickedNode', state.rightClickedNode)
//         }
//         if (part instanceof go.Link) {
//           console.log("right Clicked on Link：" + part.data.from + " to " + part.data.to);
//           state.rightClickedLink = part.data
//           console.log('state.rightClickedLink', state.rightClickedLink)
//         }
//       });
//
//   /**
//    * 创建图表模型
//    */
//   myDiagram.model = $(go.GraphLinksModel,
//       {
//         copiesArrays: true,
//         copiesArrayObjects: true,
//         nodeDataArray: nodeDataArray,
//         linkDataArray: linkDataArray
//       });
// }


/*********************************** 对象右键菜单回调函数 ***********************************/
// Rotate the selected node's color through a predefined sequence of colors.
function changeColor(e, obj) {
  alert('changeColor')
  myDiagram.commit((d) => {
    // 获取被点击的菜单
    let contextmenu = obj.part;
    // 获取节点信息
    let nodeData = contextmenu.data;
    // 计算下一种颜色
    let newColor = "lightblue";
    switch (nodeData.color) {
      case "lightblue":
        newColor = "lightgreen";
        break;
      case "lightgreen":
        newColor = "lightyellow";
        break;
      case "lightyellow":
        newColor = "orange";
        break;
      case "orange":
        newColor = "lightblue";
        break;
    }
    // 修改节点数据
    d.model.set(nodeData, "color", newColor);
  }, "changed color");
}


/*********************************** 背景右键菜单回调函数 ***********************************/
/**
 * 修改布局
 * @param e
 * @param obj
 */
function reLayout(e, obj) {
  console.log('reLayout')
}

/**
 * 新增节点
 * @param e
 * @param obj
 */
function newNode(e, obj) {
  e.diagram.commit(function (d) {
    let data = {};
    d.model.addNodeData(data);
    let part = d.findPartForData(data);  // must be same data reference, not a new {}
    // set location to saved mouseDownPoint in ContextMenuTool
    part.location = d.toolManager.contextMenuTool.mouseDownPoint;
  }, 'new node');
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
  state.selectedLayout = 'LayeredDigraphLayout',

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
        children: item.fields.map(field => {
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
</style>
