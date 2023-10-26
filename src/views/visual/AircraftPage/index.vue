<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="20%">
        <el-card>
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
      </el-aside>
      <el-main width="80%">
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
      </el-main>
    </el-container>
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
  drawItem: string
}

const state = reactive({
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
    {id: 2, label: '偏转角', value: 2},
  ],

  // 一般折线图数据
  ordinaryData: [],
  // 动态折线图数据
  dynamicData: [],

  rules: [] as any
})

const {
  formData,
  emulationOptions,
  roundOptions,
  drawItemOptions,

  ordinaryData,
  dynamicData,

  rules
} = toRefs(state)


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

function initChartTwo() {
  let chartDom = document.getElementById("chart-2");

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

function initChartThree() {
  let chartDom = document.getElementById("chart-3");

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

function initChartFore() {
  let chartDom = document.getElementById("chart-4");

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


const onSubmit = () => {
  console.log('formData:', formData.value)
}

async function init() {
  state.ordinaryData = [13, 25, 33, 45, 67, 89, 100, 120, 130, 140, 150, 160];
  initCharts();
  initChartTwo();
  initChartThree();
  initChartFore();
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

.chart-div {
  /*垂直居中*/
  display: flex;
  width: 90%;
  /*最大宽度*/
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
}
</style>