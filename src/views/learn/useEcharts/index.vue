<template>
  <div class="echarts-box">
    <div id="chart-1" style="width: 1200px; height: 400px"></div>
    <div id="chart-2" style="width: 1200px; height: 400px"></div>
  </div>
</template>

<script setup>
import {onMounted, reactive, toRefs, watch} from "vue";
import * as echarts from "echarts";
import {getLineChartData} from "@/api/learn/useEcharts.js";

const state = reactive({
  // 一般折线图数据
  data: [],
  // 动态折线图数据
  dynamicData: [],
});
const {
  data,
} = toRefs(state)


async function init() {
  await getLineChartData()
      .then((response) => {
        state.data = response.data.data
        // state.dynamicData = response.data.data
        initCharts();
      })
}

// 初始化所有图表
function initCharts() {
  initChartOne();
  // initChartTwo();
}

function initChartOne() {
  let chartDom = document.getElementById("chart-1");

  let chartOne = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: state.data,
        type: 'line',
        smooth: true
      }
    ]
  };

  option && chartOne.setOption(option);
}

// function initChartTwo() {
//   let chartDom = document.getElementById("chart-2");
//
//   let chartOne = echarts.init(chartDom);
//   let option;
//
//   option = {
//     xAxis: {
//       type: 'category',
//       data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         data: state.dynamicData,
//         type: 'line',
//         smooth: true
//       }
//     ]
//   };
//
//   option && chartOne.setOption(option);
// }

onMounted(() => {
  init();
});

</script>

