<template>
  <div id="myDiagramDiv"></div>
</template>

<script setup>
import {onMounted, reactive, toRefs, ref} from 'vue'

const state = reactive({})

const {} = toRefs(state)


/***************************** diagram 初始化 ******************************/
function init() {
  let $ = go.GraphObject.make;
  let myDiagram = $(go.Diagram, "myDiagramDiv");

  // 节点模板
  myDiagram.nodeTemplate =
      $(go.Node, "Auto",
          new go.Binding("location", "loc", go.Point.parse),
          $(go.Shape, "RoundedRectangle", {fill: "lightgray"}),
          $(go.TextBlock, {margin: 5},
              new go.Binding("text", "key"))
      );
  myDiagram.linkTemplate =
      $(go.Link,
          $(go.Shape),
          $(go.Shape, {toArrow: "Standard"}),
          {
            routing: go.Link.AvoidsNodes    // 设置整个画布链接的routing
          },
      );
  var nodeDataArray = [
    {key: "Alpha", loc: "0 0"},
    {key: "Beta", loc: "250 40"},
    {key: "Gamma", loc: "100 0"},
    {key: "Delta", loc: "75 50"},
    {key: "Epsilon", loc: "150 30"}
  ];
  var linkDataArray = [
    {from: "Alpha", to: "Beta"},      // 在具体的链接上设置routing
    {from: "Alpha", to: "Gamma"},
    {from: "Beta", to: "Beta"},
  ];
  myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

  /*********************************** 画布属性配置 ***********************************/
  // 1，显示网格
  myDiagram.grid.visible = true;
  // 2，拖动时对齐网格
  myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;
  // 3，置大小时对齐网格
  myDiagram.toolManager.resizingTool.isGridSnapEnabled = true;
}

onMounted(() => {
  init()
});
</script>

<style scoped>

#myDiagramDiv {
  /* 居中 */
  margin: 0 auto;
  /* 宽度 */
  width: 100%;
  /* 高度 */
  height: 80vh;
}
</style>
