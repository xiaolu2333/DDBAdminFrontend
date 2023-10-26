<template>
  <div class="common-layout">
    <div class="echarts-box">
      <div id="chart-1" class="chart-div"></div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref, reactive, toRefs, onMounted} from "vue";
import * as echarts from "echarts";


const state = reactive({
  // 一般折线图数据
  ordinaryData: [],
})

const {
  ordinaryData,
} = toRefs(state)

/*************************************** 事件 ***************************************/
const handleTeamChange = (val: number) => {
  console.log('val:', val)
}


// 一般折线图
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
        data: state.ordinaryData,
        type: 'line',
        smooth: true
      }
    ]
  };

  option && chartOne.setOption(option);
}


async function init() {
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
</script>

<style scoped>

.chart-div {
  /*垂直居中*/
  display: flex;
  width: 90%;
  height: 400px;
  margin: 0 auto;
}
</style>