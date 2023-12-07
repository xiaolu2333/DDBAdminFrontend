<template>
  <div>
    <el-button @click="showObjs">获取所有关系</el-button>
  </div>
  <div id="myDiagramDiv">
    <canvas tabindex="0" width="1234" height="407"
            style="position: absolute; top: 0; left: 0; z-index: 2; user-select: none; width: 905px; height: 299px; cursor: auto;">
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
  // 实体/节点数据
  nodeDataList: [],
  // 关系/边数据
  linkDataList: [],
  // 节点背景颜色
  nodeColor: "#ffffff",
  // 眼睛
  isOpenEye: true,
  eyeStatus: 'eye-open',

  clickCount: 0,
})

const {
  selectedLayout,
  nodeDataList,
  linkDataList,
  nodeColor,
  isOpenEye,
  eyeStatus,

  clickCount,
} = toRefs(state)

let myDiagram = ref(null)


/***************************** 事件 ******************************/
const showObjs = () => {
  console.log(myDiagram.model.linkDataArray)
}

const handleButtonClick = (e, obj) => {
  let node = obj.part;
  console.log('node', node)
  let data = node.data;

  if (data && typeof (data.clickCount) === "number") {
    node.diagram.model.commit(function (m) {
      m.set(data, "clickCount", data.clickCount + 1);

      //
      if (data.isEyeOpen) {
        m.set(data, "isEyeOpen", false);
      } else {
        m.set(data, "isEyeOpen", true);
      }

      m.set(data, "isEyeOpen", data.clickCount + 1);
    }, "clicked");
  }
}


/***************************** diagram 初始化 ******************************/
/**
 * diagram 初始化
 */
function init1() {
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
          "TableRow",
          // 指定Panel为TableRow，使用Table布局
          new go.Binding("portId", "name"),  // 绑定portId为nodeDataArray中的每项的name，设置连线端点
          {                                                       // Panel属性
            background: "transparent",                              // 使得portId的背景透明
            fromSpot: go.Spot.Right,                                // 只允许从右边出
            toSpot: go.Spot.Left,                                   // 只允许从左边进
            fromLinkable: true,                                    // 不允许从重新选择出
            toLinkable: true,                                      // 不允许从重新选择进
          },
          $(go.Shape,
              "RoundedRectangle",                               // 形状为圆角矩形
              {width: 18, height: 18},
              {margin: new go.Margin(5, 10), column: 0},     // 设置margin和column，使得图标和文本在同一列
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
          ),
          // $(go.Panel, "Horizontal",
          //     $(go.Shape,  // the "A" port
          //         {margin: new go.Margin(0, 0, 0, 0)},
          //         {column: 1, row: 1, rowSpan: 1},
          //         {
          //           width: 1, height: 1, portId: "A", toSpot: go.Spot.Left,
          //           toLinkable: true, toMaxLinks: 1
          //         }),  // allow user-drawn links to here
          //     // $(go.TextBlock, "A")  // "A" port label
          // ),
          // $(go.Panel, "Horizontal",
          //     $(go.Shape,  // the "B" port
          //         {margin: new go.Margin(0, 0, 0, 0)},
          //         {column: 1, row: 1, rowSpan: 1},
          //         {
          //           width: 1, height: 1, portId: "B", toSpot: go.Spot.Left,
          //           toLinkable: true, toMaxLinks: 1
          //         }),  // allow user-drawn links to here
          //     // $(go.TextBlock, "B")  // "B" port label
          // ),
          // $(go.Panel, "Horizontal",
          //     {margin: new go.Margin(0, 0, 0, 0)},
          //     {column: 3, row: 1, rowSpan: 1},
          //     // $(go.TextBlock, "Out"),  // "Out" port label
          //     $(go.Shape,  // the "Out" port
          //         {
          //           fill: "lightgray",
          //           width: 6, height: 6, portId: "Out", fromSpot: go.Spot.Right,
          //           fromLinkable: true
          //         })  // allow user-drawn links from here
          // )
      );

  /**
   * 3，定义节点模板
   */
  myDiagram.nodeTemplate =
      $(go.Node, "Auto",
          {
            copyable: false,
            deletable: false
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
              // $(go.Panel, "Vertical",
              //     {margin: 3},
              //     $("Button",
              //         {
              //           margin: 2,
              //           click: handleButtonClick
              //         },
              //         $(go.Picture,
              //             // 根据icon字段来显示不同的图标
              //             new go.Binding("source", "clickCount", function (clickCount) {
              //               if ((Number(clickCount) % 2 === 0) || Number(clickCount) === 0) {
              //                 return "/static/img/睁眼.svg";
              //               } else {
              //                 return "/static/img/闭眼.svg";
              //               }
              //             }),
              //             {
              //               width: 25,
              //               height: 25,
              //             }
              //         )
              //     ),
              //     // $(go.TextBlock,
              //     //     {// 左对齐
              //     //       alignment: go.Spot.Left,
              //     //     },
              //     //     new go.Binding("text", "clickCount",
              //     //         function (c) {
              //     //           return "Clicked " + c + " times.";
              //     //         })
              //     // )
              // ),
              $(go.Panel, "Auto",                         // schema
                  {stretch: go.GraphObject.Horizontal},     // 水平拉伸，使得宽度与父节点一致
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
              )
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
   * 5，定义模型
   */
  myDiagram.model =
      $(go.GraphLinksModel,
          {
            copiesArrays: true,                 // 可以复制数组
            copiesArrayObjects: true,           // 可以复制数组中的对象
            linkFromPortIdProperty: "fromPort", // 连线起始端口属性
            linkToPortIdProperty: "toPort",     // 连线结束端口属性
            nodeDataArray: state.nodeDataList,  // 节点数据
            linkDataArray: state.linkDataList,   // 连线数据
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
}

function init() {
  let $ = go.GraphObject.make;

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

  myDiagram.nodeTemplate =
      $(go.Node, "Auto",
          $(go.Shape, "Rectangle", {fill: "lightgray"}),
          $(go.Panel, "Table",
              $(go.RowColumnDefinition,
                  {column: 0, alignment: go.Spot.Left}),
              $(go.RowColumnDefinition,
                  {column: 2, alignment: go.Spot.Right}),
              $(go.TextBlock,  // the node title
                  {
                    column: 0, row: 0, columnSpan: 3, alignment: go.Spot.Center,
                    font: "bold 10pt sans-serif", margin: new go.Margin(4, 2)
                  },
                  new go.Binding("text", "key")),
              $(go.Panel, "Horizontal",
                  {column: 0, row: 1},
                  $(go.Shape,  // the "A" port
                      {
                        width: 6, height: 6, portId: "A", toSpot: go.Spot.Left,
                        toLinkable: true, toMaxLinks: 1
                      }),  // allow user-drawn links to here
                  $(go.TextBlock, "A")  // "A" port label
              ),
              $(go.Panel, "Horizontal",
                  {column: 0, row: 2},
                  $(go.Shape,  // the "B" port
                      {
                        width: 6, height: 6, portId: "B", toSpot: go.Spot.Left,
                        toLinkable: true, toMaxLinks: 1
                      }),  // allow user-drawn links to here
                  $(go.TextBlock, "B")  // "B" port label
              ),
              $(go.Panel, "Horizontal",
                  {column: 2, row: 1, rowSpan: 2},
                  $(go.TextBlock, "Out"),  // "Out" port label
                  $(go.Shape,  // the "Out" port
                      {
                        width: 6, height: 6, portId: "Out", fromSpot: go.Spot.Right,
                        fromLinkable: true
                      })  // allow user-drawn links from here
              )
          )
      );

  myDiagram.linkTemplate =
      $(go.Link,
          {routing: go.Link.Orthogonal, corner: 3},
          $(go.Shape),
          $(go.Shape, {toArrow: "Standard"})
      );

  myDiagram.layout = $(go.LayeredDigraphLayout, {columnSpacing: 10, alignOption: go.LayeredDigraphLayout.AlignAll});

  myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;

  myDiagram.model =
      new go.GraphLinksModel(
          {
            linkFromPortIdProperty: "fromPort",  // required information:
            linkToPortIdProperty: "toPort",      // identifies data property names
            nodeDataArray: [
              {key: "Add1"},
              {key: "Add2"},
              {key: "Subtract1"}
            ],
            linkDataArray: [
              // no predeclared links
            ]
          });
}


onMounted(() => {
  state.selectedLayout = 'LayeredDigraphLayout'

  GetERDData().then(res => {
    // console.log('res.data.data: ', res.data.data)
    state.nodeDataList = res.data.data.nodeDataArray
    console.log('节点数据 nodeDataList', state.nodeDataList)
    linkDataList.value = res.data.data.linkDataArray
    console.log('边数据 linkDataList', linkDataList.value)

    init1()
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
</style>
