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
  entryOptions,
  cfieldOptions,
  dfieldOptions,
  cfkFromEntry,
  cfkToEntry,
  dfkFromEntry,
  dfkToEntry,
  nodeDataList,
  linkDataList,
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
  // 节点数据数组中每个属性的模板
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

  /**
   * 定义节点模板与边模板
   */
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


  /**
   * 获取节点数据与边数据
   */
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


  /**
   * 添加对象点击事件，获取对象信息
   */
  myDiagram.addDiagramListener("ObjectSingleClicked",
      function (e) {
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
   * 创建图表模型
   */
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
