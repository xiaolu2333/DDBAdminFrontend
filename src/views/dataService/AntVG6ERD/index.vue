<template>
  <div id="mountNode"></div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted} from 'vue'
import G6, {GraphData, TreeGraphData} from "@antv/g6";

const data = {
  // 节点集
  nodes: [
    {
      // String，该节点存在则必须，节点的唯一标识
      id: 'node1',
      // 节点文本
      label: '起始点',
      // 指定节点类型，内置节点类型名称或自定义节点的名称。默认为 'circle'
      type: 'rect',
      // 指定边连入节点的连接点的位置（相对于该节点而言），可以为空。
      anchorPoints: [],
      //节点的样式属性
      style: {
        fill: '#96b1eb',          // 节点填充色
        stroke: '#4983ff',        // 节点的描边颜色
        lineWidth: 2,             // 描边宽度
      },
      //	文本配置项
      labelCfg: {
        position: 'bottom',       // 文本相对于节点的位置
        offset: 10,               // 文本的偏移
        style: {                  // 标签的样式属性。
          fill: 'red',              // 文本颜色
        },
      },
    },
    {
      id: 'node2',
      label: '目标点',
    },
  ],

  // 边集
  edges: [
    // 表示一条从 node1 节点连接到 node2 节点的边
    {
      // String，该边存在则必须，边的源节点 id
      source: 'node1',
      // String，该边存在则必须，边的目标节点 id
      target: 'node2',
      // 边的文本
      label: '我是连线',
      // 边的样式属性
      style: {
        stroke: '#000000',      // 边的描边颜色
        lineWidth: 2,           // 边的描边宽度
        // ... 其他样式属性
      },
      labelCfg: {
        autoRotate: true,       // 边上的标签文本根据边的方向旋转
        offset: 10,               // 文本的偏移
        style: {
          // ... 其他文本样式属性
        },
      },
    },
  ],
}

onMounted(() => {
  g6(data)
})


const g6 = (data: GraphData | TreeGraphData | undefined) => {
  // 实例化 minimap 插件
  const minimap = new G6.Minimap({
    size: [100, 100],
    className: 'minimap',
    type: 'delegate',
  });
  // 实例化 grid 插件
  const grid = new G6.Grid();

  // 图实例化，至少需要为图设置挂载容器、宽、高
  const graph = new G6.Graph({
    // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    container: 'mountNode',
    // Number，必须，图的宽度
    width: 800,
    // Number，必须，图的高度
    height: 500,
    // 布局配置项 https://antv-g6.gitee.io/zh/docs/manual/tutorial/layout
    layout: {
      type: 'dagre',          // 分层布局
      preventOverlap: true,   // 防止节点重叠
    },
    // 画布的交互模式配置项 https://antv-g6.gitee.io/zh/docs/manual/tutorial/behavior
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
    },
    // 节点不同状态下的样式集合
    nodeStateStyles: {
      // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
      hover: {
        fill: '#d3adf7',
      },
      // 鼠标点击节点，即 click 状态为 true 时的样式
      click: {
        stroke: '#aa1b1b',
        lineWidth: 3,
      },
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
      // 鼠标点击边，即 click 状态为 true 时的样式
      click: {
        stroke: 'steelblue',
      },
    },
    plugins: [minimap, grid], // 将 grid 实例配置到图上
  });


  // 数据加载和图的渲染
  graph.data(data);
  graph.render();

  // 鼠标进入节点
  graph.on('node:mouseenter', (e) => {
    const nodeItem = e.item; // 获取鼠标进入的节点元素对象
    graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
  });

  // 鼠标离开节点
  graph.on('node:mouseleave', (e) => {
    const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
  });

  // 点击节点
  graph.on('node:click', (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState('node', 'click');
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, 'click', false);
    });
    // 获取被点击的节点元素对象
    const nodeItem = e.item;
    console.log(nodeItem.getModel())
    // 设置当前节点的 click 状态为 true
    graph.setItemState(nodeItem, 'click', true);
  });

  // 点击边
  graph.on('edge:click', (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.findAllByState('edge', 'click');
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, 'click', false);
    });
    // 获取被点击的边元素对象
    const edgeItem = e.item;
    // 设置当前边的 click 状态为 true
    graph.setItemState(edgeItem, 'click', true);
  });
}


</script>

<style scoped>
#mountNode {
  background-color: #f1fff5;
}
</style>
