<template>
  <div id="container"></div>
</template>

<script setup>
import {onMounted} from "vue";
import {Graph} from '@antv/x6';
import {GridLayout} from '@antv/layout' // umd模式下， const { GridLayout } = window.layout


const init = () => {
  // 定义数据集
  const data = {
    // 节点数据
    nodes: [
      {
        id: 'node1',
        label: 'node1',
        size: {
          width: 40,
          height: 40,
        }
      },
      {
        id: 'node2',
        label: 'node2',
        size: {
          width: 40,
          height: 40,
        }
      }
    ],
    // 边数据
    edges: [
      {
        source: 'node1',
        target: 'node2',
      }
    ]
  }

  // 使用GridLayout布局
  const gridLayout = new GridLayout({
    type: 'grid',
    width: 600,
    height: 400,
    rows: 4,
    cols: 4,
  })

  // 使用布局对数据进行布局计算
  const newModel = gridLayout.layout(data)

  // 创建画布
  const graph = new Graph({
    // 指定容器
    container: document.getElementById('container'),
    // 背景设置
    background: {
      color: '#fffbe6', // 设置画布背景颜色
    },
    // 使用网格
    grid: {
      size: 10,      // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  });

  // 渲染布局结果
  graph.fromJSON(newModel)
}

onMounted(() => {
  init()
})
</script>

<style scoped>
/*#container {*/
/*  background-color: #f1fff5;*/
/*}*/
</style>