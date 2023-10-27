<template>
  <div class="common-layout">
    <div class="echarts-box">
      <div id="chart-1" class="chart-div"></div>
    </div>
  </div>
  <!--  <el-button type="primary" @click="handleDraw">打开新窗口</el-button>-->
</template>


<script lang="ts" setup>
import {ref, reactive, toRefs, onMounted, onUnmounted} from "vue";
import * as echarts from "echarts";

const state = reactive({
  // 容器节点
  chartDom: null as unknown as HTMLElement,

  // 一般折线图数据
  ordinaryData: [],
})

const {
  chartDom,
  ordinaryData,
} = toRefs(state)

/*************************************** 事件 ***************************************/
// 重新渲染页面
const handleResize = () => {
  location.reload();
}

async function handleDraw() {
  const newWindow = window.open('', '_blank', 'width=700,height=500')
  // 等待窗口大小初始化完成
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  const chartDiv = document.createElement('div')
  chartDiv.style.width = '95vw'
  chartDiv.style.height = '95vh'
  newWindow!.document.body.appendChild(chartDiv)
  const chart = echarts.init(chartDiv)
  const option = {
    // 标题
    title: {
      text: "AAAA",
      // 以下两项设置标题位置
      left: 'center',
      top: 'bottom'
    },

    xAxis: {
      // 坐标轴类型: category-类目轴
      type: 'category',
      name: '轮次',
      data: ['12:02:21', '12:02:22', '12:02:23', '12:02:24', '12:02:25', '12:02:26', '12:02:27', '12:02:28', '12:02:29', '12:02:30', '12:02:31', '12:02:32']
    },
    // 纵坐标配置
    yAxis: {
      // 坐标轴类型: value-数值轴
      type: 'value',
      name: '数值'
    },

    series: [
      {
        // Y轴数据
        data: state.ordinaryData,
        // 线条类型: line-折线图
        type: 'line',
        // 平滑曲线
        smooth: true,
      }
    ]
  }

  // console.log(option)
  chart.setOption(option)
  newWindow!.addEventListener('resize', () => {
    chart.resize()
  })
}


// 一般折线图
async function initChartOne() {
  state.chartDom = document.getElementById("chart-1");
  // 等待窗口大小初始化完成
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })

  const chart = echarts.init(state.chartDom)
  const option = {
    // 标题
    title: {
      text: "AAAA",
      // 以下两项设置标题位置
      left: 'center',
      top: 'bottom'
    },

    // 图例组件
    legend: {
      data: ['数值']
    },
    // 提示框组件
    tooltip: {
      // 显示提示框组件
      show: true,
      // 触发类型: axis-坐标轴触发
      trigger: 'axis'
    },

    xAxis: {
      // 坐标轴类型: category-类目轴
      type: 'category',
      name: '时间',
      data: ['12:02:21', '12:02:22', '12:02:23', '12:02:24', '12:02:25', '12:02:26', '12:02:27', '12:02:28', '12:02:29', '12:02:30', '12:02:31', '12:02:32']
    },

    // 纵坐标配置
    yAxis: {
      // 坐标轴类型: value-数值轴
      type: 'value',
      name: '数值'
    },

    series: [
      {
        // Y轴数据
        data: state.ordinaryData,
        // 线条类型: line-折线图
        type: 'line',
        // 平滑曲线
        smooth: true,
      }
    ]
  }

  chart.setOption(option)
  window!.addEventListener('resize', () => {
    chart.resize()
  })
}

async function init() {
  // Y轴数据
  state.ordinaryData = [13, 25, 33, 45, 67, 89, 100, 120, 130, 140, 150, 160];
  initCharts();
}

// 初始化所有图表
function initCharts() {
  initChartOne();
}

onMounted(() => {
  init();
});
onUnmounted(() => {
  // 销毁容器
  // state.chartDom?.dispose();
  state.chartDom = null as unknown as HTMLElement;
  // 移除监听
  window.removeEventListener('resize', function () {
  });
});
</script>

<style scoped>
.chart-div {
  width: 90%;
  height: 80vh;
  margin: 0 auto;
}
</style>