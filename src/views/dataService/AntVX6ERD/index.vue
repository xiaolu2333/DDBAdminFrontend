<template>
  <div id="container"></div>
</template>

<script setup>
import {onMounted} from "vue";
import {Graph} from '@antv/x6';
import {GridLayout} from '@antv/layout' // umd模式下， const { GridLayout } = window.layout


const init = () => {
  const data = {
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

  const graph = new Graph({
    container: document.getElementById('container'),
    width: 600,
    height: 400,
  });

  const newModel = gridLayout.layout(data)

  graph.fromJSON(newModel)
}

onMounted(() => {
  init()
})
</script>

<style scoped>
#container {
  background-color: #f1fff5;
}
</style>