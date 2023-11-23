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

/* gojs 2.3.8 去除水印的方法
1，打开 node_modules/gojs/release/go-module.js 文件。
2，node_modules/gojs/release 下有多个 js 文件，可分别在这些文件顶部添加 console.log 语句。
3，删除 node_modules/.vite 目录，删除旧文件。
4，npm run dev 重新启动项目，去产生新文件。
5，node_modules/.vite/goja.js 查看具体使用的是 node_modules/gojs/release 下的哪个 js 文件，
6，确定后进入 node_modules/gojs/release 下对应文件，搜索 document.createElement("canvas") ，找到下面这个地方：
    function ni() {
        if (Ng) {
            var a = x.document.createElement("canvas"), b = a.getContext("2d"), c = Ma("7ca11abfd022028846");
            b[c] = Ma("398c3597c01238");
            for (var d = ["5da73c80a36455d7038e4972187c3cae51fd22", ra.Dx + "4ae6247590da4bb21c324ba3a84e385776", ld.xF + "fb236cdfda5de14c134ba1a95a2d4c7cc6f93c1387", K.za], e = 1; 5 > e; e++) b[Ma("7ca11abfd7330390")](Ma(d[e - 1]), 10, 15 * e);
            b[c] = Ma("39f046ebb36e4b");
            for (c = 1; 5 > c; c++) b[Ma("7ca11abfd7330390")](Ma(d[c - 1]), 10, 15 * c);
            if (4 !== d.length || "5" !== d[0][0] || "7" !== d[3][0]) ld.prototype.Cd = ld.prototype.Cu;
            aj = a
        }
    }
7，修改最后一行：
    function ni() {
        if (Ng) {
            var a = x.document.createElement("canvas"), b = a.getContext("2d"), c = Ma("7ca11abfd022028846");
            b[c] = Ma("398c3597c01238");
            for (var d = ["5da73c80a36455d7038e4972187c3cae51fd22", ra.Dx + "4ae6247590da4bb21c324ba3a84e385776", ld.xF + "fb236cdfda5de14c134ba1a95a2d4c7cc6f93c1387", K.za], e = 1; 5 > e; e++) b[Ma("7ca11abfd7330390")](Ma(d[e - 1]), 10, 15 * e);
            b[c] = Ma("39f046ebb36e4b");
            for (c = 1; 5 > c; c++) b[Ma("7ca11abfd7330390")](Ma(d[c - 1]), 10, 15 * c);
            if (4 !== d.length || "5" !== d[0][0] || "7" !== d[3][0]) ld.prototype.Cd = ld.prototype.Cu;
            // aj = a
            aj = x.document.createElement("canvas");
        }
    }
8，vite build --mode 打包项目
9，另存修改后的 node_modules/gojs 以备后用
 */

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
