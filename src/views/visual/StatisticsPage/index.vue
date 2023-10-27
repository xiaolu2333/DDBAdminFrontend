<template>
  <div class="common-layout">
    <div class="left-item">
      <el-card class="item">
        <el-button type="primary" @click="refresh">刷新仿真结果</el-button>
      </el-card>
    </div>
    <div class="right-item">
      <div class="echarts-box">
        <div id="chart-1" class="chart-div"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRefs, onMounted, onUnmounted} from "vue";
import {ElMessage} from 'element-plus'
import * as echarts from "echarts";

import {getStatisticsData} from '../../../api/visual/index.js'

const state = reactive({
  // 轮次数据
  roundData: [] as number[],
  // 红方胜率数据
  redTeamWinRateData: [] as number[],
  // 蓝方胜率数据
  blueTeamWinRateData: [] as number[],
})

const {
  roundData,
  redTeamWinRateData,
  blueTeamWinRateData,
} = toRefs(state)

/*************************************** 事件 ***************************************/
const refresh = () => {
  init()
}

/*************************************** 初始化 ***************************************/
// 柱状图
async function initChart(
    chartDom: HTMLElement,
    title: string,
    chartXData: any[],
    chartYRedData: any[],
    chartYBlueData: any[]
) {
  // 等待窗口大小初始化完成
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })

  const chart = echarts.init(chartDom)
  const option = {
    // 标题
    title: {
      text: title,
      // 以下两项设置标题位置
      left: 'center',
      top: 'bottom'
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['红方', '蓝方']
    },
    xAxis: [
      {
        type: 'category',
        name: '轮次',
        data: chartXData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '胜率',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value} %'
        }
      },
    ],
    series: [
      {
        name: '红方',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %';
          }
        },
        data: chartYRedData,
        itemStyle: {
          normal: {
            color: 'red',
          }
        }
      },
      {
        name: '蓝方',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %';
          }
        },
        data: chartYBlueData,
        itemStyle: {
          normal: {
            color: 'blue',
          }
        }
      }
    ]
  }

  chart.setOption(option)
  window!.addEventListener('resize', () => {
    chart.resize()
  })
}


// 获取图表数据
function handleDataQuery() {
  // 获取图的数据
  getStatisticsData().then(res => {
    console.log('res:', res)
    state.redTeamWinRateData = res.data.data.xData
    state.blueTeamWinRateData = res.data.data.yData
  }).catch(err => {
    ElMessage.error(err.msg)
  })
}


function init() {
  // 获取图表数据
  // handleDataQuery()
  // 随机生成50个100以内的正整数
  state.redTeamWinRateData = []
  state.blueTeamWinRateData = []
  // 随机生成50个100以内的正整数
  for (let i = 0; i < 50; i++) {
    let num = Math.floor(Math.random() * 100)
    state.redTeamWinRateData.push(num)
    state.blueTeamWinRateData.push(100 - num)
  }
  // 生成50个轮次
  state.roundData = []
  for (let i = 0; i < 50; i++) {
    state.roundData.push(i + 1)
  }

  initChart(
      document.getElementById("chart-1"),
      'AAA',
      state.roundData,
      state.redTeamWinRateData,
      state.blueTeamWinRateData
  )
}

onMounted(() => {
  init();
});
onUnmounted(() => {
  // 移除监听
  window.removeEventListener('resize', function () {
  });
});
</script>

<style scoped>
.common-layout {
  display: flex;
}

.left-item {
  width: 10%; /* Adjust the width as per your requirement */
  background-color: #ccc;
  padding: 10px;
  display: grid;
  place-items: center;
}

.right-item {
  /* 占满剩余空间 */
  flex-grow: 1;
  background-color: #eee;
  padding: 20px;
}

.item {
  text-align: center;
}

.echarts-box {
  text-align: center;
}

.chart-div {
  /*垂直居中*/
  display: flex;
  width: 100%;
  height: 80vh;
  margin: 0 auto;
}
</style>