<template>
  <div class="common-layout">
    <div class="echarts-box">
      <div id="chart-1" class="chart-div"></div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref, reactive, toRefs, onMounted, onUnmounted} from "vue";
import * as echarts from "echarts";

const state = reactive({
  // 一般折线图数据
  ordinaryData: [],
})

const {
  ordinaryData,
} = toRefs(state)

/*************************************** 事件 ***************************************/
// 重新渲染页面
const handleResize = () => {
  location.reload();
}

// 一般折线图
function initChartOne() {
  let chartDom = document.getElementById("chart-1");

  let chartOne = echarts.init(chartDom);
  let option;

  option = {
    // 标题
    title: {
      text: "AAAA",
      // 以下两项设置标题位置
      left: 'center',
      top: 'bottom'
    },

    // 提示框组件
    tooltip: {
      // 显示提示框组件
      show: true,
      // 触发类型: axis-坐标轴触发
      trigger: 'axis'
    },

    // 图例组件
    legend: {
      data: ['数值']
    },

    // 横坐标配置
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
  };

  option && chartOne.setOption(option);
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
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize);
});
onUnmounted(() => {
  // 移除监听
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.chart-div {
  width: 90%;
  height: 80vh;
  margin: 0 auto;
}
</style>