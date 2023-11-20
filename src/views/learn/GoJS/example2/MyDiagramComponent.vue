<template>
  <div id="myDiagramTest">
    <canvas
        tabindex="0" width="1234" height="407"
        style="position: absolute; top: 0; left: 0; z-index: 2; user-select: none; width: 905px; height: 299px; cursor: auto;">
      This text is displayed if your browser does not support the Canvas HTML element.
    </canvas>
    <div style="position: absolute; overflow: auto; width: 905px; height: 299px; z-index: 1;">
      <div style="position: absolute; width: 1px; height: 1px;"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, toRefs, ref, inject, watch} from 'vue'

const draggedNodeData = ref()


// 外键类型选项
const fkTypeOptions = [
  {label: "1M", value: "1M"},
  {label: "MM", value: "MM"},
]
const dataMergeFormRef = ref()

const state = reactive({
  // 选中的布局方式
  selectedLayout: "ForceDirectedLayout",
  // 实体/节点数据
  nodeDataList: [],
  // 关系/边数据
  linkDataList: [],
  // 边数据，显示用
  edgeDataList: [],
})

const {
  nodeDataList,
  linkDataList,
  edgeDataList,
} = toRefs(state)

let dragged = ref(null)
let myDiagram = ref(null)


/***************************** utils ******************************/
/**
 * 供父组件调用，从父组件传入节点数据
 */
const getDraggedNodeFromParent = (nodeData) => {
  console.log('nodeData:', nodeData)

  draggedNodeData.value = nodeData
  console.log('子组件中draggedNodeData：', draggedNodeData.value)
}
defineExpose({
  getDraggedNodeFromParent
});


/***************************** diagram 初始化 ******************************/
const initData = () => {
  state.nodeDataList = [
    {
      // schema 名
      schema: "public",
      // table 名
      key: "Record1",
      // table 字段名
      fields: [
        {name: "field1", dataType: "integer", constType: 'primary_key'},
        {name: "field2", dataType: "inet", constType: 'catalog_object_column'},
        {name: "field3", dataType: "character varying", constType: 'foreign_key'},
      ],
    },
    {
      schema: "public",
      key: "Record2",
      fields: [
        {name: "fieldA", dataType: "character varying", constType: 'primary_key'},
        {name: "fieldB", dataType: "integer", constType: 'catalog_object_column'},
        {name: "fieldC", dataType: "character varying", constType: 'catalog_object_column'},
        {name: "fieldD", dataType: "date", constType: 'catalog_object_column'}
      ],
    }
  ]

  state.linkDataList = [
    {
      fromSchema: "public", from: "Record1", fromPort: "field3", fromText: "1",
      toSchema: "public", to: "Record2", toPort: "fieldC", toText: "M"
    },
  ]
}

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
  const div = document.getElementById("myDiagramTest");

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

      // const nodeData = state.draggedNode.data.data
      const nodeData = draggedNodeData.value
      draggedNodeData.value = {}

      myDiagram.model.addNodeData(nodeData);
      onDrop(nodeData, point);
      updateModelData()

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
          "myDiagramTest",                                 // 挂载画布的元素
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
                fill: '#fff',  // 填充色
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
}

// 更新模型数据：节点与边
function updateModelData() {
  let model = myDiagram.model;
  state.nodeDataList = model.nodeDataArray
  console.log('更新节点state.nodeDataList', state.nodeDataList)

  // 更新节点选项
  state.entryOptions = []
  state.nodeDataList.forEach(item => {
    state.entryOptions.push({
      value: item.key,
      label: item.key,
    })
  })
}


onMounted(() => {
  state.selectedLayout = 'LayeredDigraphLayout'

  let da =
      [
        {
          // schema 名
          schema: "public",
          // table 名
          key: "Record1",
          // table 字段
          fields: [
            {
              // 字段名
              name: "field1",
              // 字段数据类型
              dataType: "integer",
              // 字段约束类型
              constType: 'primary_key', // 主键字段
            },
            {
              name: "field2", dataType: "inet",
              constType: 'catalog_object_column' // 普通字段
            },
            {
              name: "field3", dataType: "character varying",
              constType: 'foreign_key'    // 外键
            },
          ],
        },
        {
          schema: "public",
          key: "Record2",
          fields: [
            {name: "fieldA", dataType: "character varying", constType: 'primary_key'},
            {name: "fieldB", dataType: "integer", constType: 'catalog_object_column'},
            {name: "fieldC", dataType: "character varying", constType: 'catalog_object_column'},
            {name: "fieldD", dataType: "date", constType: 'catalog_object_column'}
          ],
        }
      ]

  state.nodeDataList = [
    {
      "schema": "public",
      "key": "Record3",
      "fields": [
        {"name": "fieldA", "info": "char var", "color": "#FFB900", "figure": "Diamond", 'icon': '主键'},
        {"name": "fieldB", "info": "char var", "color": "#F25022", "figure": "Rectangle", 'icon': '字段'},
        {"name": "fieldD", "info": "real", "color": "#00BCF2", "figure": "Rectangle", 'icon': '字段'}
      ],
      "loc": "280 0",
      "clickCount": 0,
    }
  ]

  linkDataList.value = []
  edgeDataList.value = linkDataList.value

  init()
});
</script>

<style scoped>
#myDiagramTest {
  background-color: #F8F8F8;
  border: 1px solid #aaa;
  height: 70vh;
  position: relative;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  cursor: auto;
  z-index: 1000;
}
</style>
