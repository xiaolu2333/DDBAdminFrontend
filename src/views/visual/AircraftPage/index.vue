<template>
  <div class="common-layout">
    <el-container>
      <el-main width="80%">
      </el-main>
    </el-container>
  </div>

  <div class="common-layout">
    <div class="left-item">
      <el-card class="item">
        <el-form
            :model="formData"
            :rules="rules"
        >
          <el-form-item label="仿真" label-width="80">
            <el-select v-model="formData.emulation" placeholder="">
              <el-option
                  v-for="item in emulationOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="轮次" label-width="80">
            <el-select v-model="formData.round" placeholder="">
              <el-option
                  v-for="item in roundOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绘制项" label-width="80">
            <el-select v-model="formData.drawItem" placeholder="">
              <el-option
                  v-for="item in drawItemOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="80">
            <el-button class="" type="primary" @click="onSubmit">确认</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="right-item">
      <el-row>
        <el-col :span="12">
          <span class="team-diff team-red">红</span>
        </el-col>
        <el-col :span="12">
          <span class="team-diff team-blue">蓝</span>
        </el-col>
      </el-row>
      <div class="echarts-box">
        <el-row>
          <el-col :span="12">
            <div id="chart-1" class="chart-div"></div>
          </el-col>
          <el-col :span="12">
            <div id="chart-2" class="chart-div"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div id="chart-3" class="chart-div"></div>
          </el-col>
          <el-col :span="12">
            <div id="chart-4" class="chart-div"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRefs, onMounted} from "vue";
import * as echarts from "echarts";

interface FormDataType {
  // 仿真
  emulation: number,
  // 轮次
  round: number,
  // 绘制项目
  drawItem: number
}

const state = reactive({
  // 容器节点
  chartDomOne: null as unknown as HTMLElement,
  chartDomTwo: null as unknown as HTMLElement,
  chartDomThree: null as unknown as HTMLElement,
  chartDomFour: null as unknown as HTMLElement,

  formData: {
    // 仿真
    emulation: 1,
    // 轮次
    round: 1,
    // 绘制项目
    drawItem: 1,
  } as FormDataType,

  // 仿真选项
  emulationOptions: [
    {id: 1, label: '1', value: 1},
    {id: 2, label: '2', value: 2},
    {id: 3, label: '3', value: 3},
    {id: 4, label: '4', value: 4},
  ],
  // 轮次选项
  roundOptions: [
    {id: 1, label: '1', value: 1},
    {id: 2, label: '2', value: 2},
    {id: 3, label: '3', value: 3},
    {id: 4, label: '4', value: 4},
  ],
  // 绘制项目
  drawItemOptions: [
    {id: 1, label: '高度', value: 1},
    {id: 2, label: '速度', value: 2},
    {id: 2, label: '偏转角', value: 3},
  ],

  // 一般折线图数据
  ordinaryData: [],

  rules: [] as any
})

const {
  chartDomOne,
  chartDomTwo,
  chartDomThree,
  chartDomFour,

  formData,
  emulationOptions,
  roundOptions,
  drawItemOptions,

  ordinaryData,
  dynamicData,

  rules
} = toRefs(state)


// 一般折线图
async function initChartOne() {
  state.chartDomOne = document.getElementById("chart-1");
  // 等待窗口大小初始化完成
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })

  const chart = echarts.init(state.chartDomOne)
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
      name: state.formData.drawItem === 1 ? '高度' : state.formData.drawItem === 2 ? '速度' : '偏转角'
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

async function initChartTwo() {
  state.chartDomTwo = document.getElementById("chart-2");
  // 等待窗口大小初始化完成
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })

  const chart = echarts.init(state.chartDomTwo)
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
      name: state.formData.drawItem === 1 ? '高度' : state.formData.drawItem === 2 ? '速度' : '偏转角'
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

async function initChartThree() {
  state.chartDomThree = document.getElementById("chart-3");
  // 等待窗口大小初始化完成
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })

  const chart = echarts.init(state.chartDomThree)
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
      name: state.formData.drawItem === 1 ? '高度' : state.formData.drawItem === 2 ? '速度' : '偏转角'
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

async function initChartFour() {
  state.chartDomFour = document.getElementById("chart-4");
  // 等待窗口大小初始化完成
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })

  const chart = echarts.init(state.chartDomFour)
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
      name: state.formData.drawItem === 1 ? '高度' : state.formData.drawItem === 2 ? '速度' : '偏转角'
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

const onSubmit = () => {
  console.log('formData:', formData.value)
}

function init() {
  // 十二个随机数字
  state.ordinaryData = [502, 274, 236, 455, 67, 89, 563, 75, 130, 140, 150, 160];
  initCharts();
  initChartTwo();
  initChartThree();
  initChartFour();
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
.team-diff {
  margin-left: 49%;
  font-weight: bold;
  font-size: 35px
}

.team-red {
  color: red;
}

.team-blue {
  color: blue;
}

.common-layout {
  display: flex;
}

.left-item {
  width: 20%; /* Adjust the width as per your requirement */
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
  height: 40vh;
  margin: 0 auto;
}
</style>