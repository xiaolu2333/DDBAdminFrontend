<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="20%">
        <el-card>
          <el-form
              :model="formData"
              :rules="rules"
          >
            <el-form-item label="仿真" label-width="100">
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
            <el-form-item label="轮次" label-width="100">
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
            <el-form-item label="队伍" label-width="100">
              <el-radio-group
                  v-model="formData.team"
                  @change="handleTeamChange"
              >
                <el-radio label="红方" value="1"/>
                <el-radio label="蓝方" value="2"/>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="导弹编号" label-width="100">
              <el-select v-model="formData.missileCode" placeholder="">
                <el-option
                    v-for="item in missileCodeOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="绘制项" label-width="100">
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
            <el-form-item label-width="100">
              <el-button type="primary" @click="onSubmit">确认</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-aside>
      <el-main width="80%">
        <div class="echarts-box">
          <div id="chart-1" class="chart-div"></div>
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
  // 队伍
  team: number,
  // 导弹编号
  missileCode: string,
  // 绘制项目
  drawItem: string
}

const state = reactive({
  formData: {
    emulation: 1,
    round: 1,
    team: 1,
    missileCode: 1,
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

  // 导弹编号
  missileCodeOptions: [
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

  // 折线图数据
  ordinaryData: [],

  rules: [] as any
})

const {
  formData,
  emulationOptions,
  roundOptions,
  missileCodeOptions,
  drawItemOptions,

  ordinaryData,
  dynamicData,

  rules
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
    // 标题
    title: {
      text: "AAAA",
      // 以下两项设置标题位置
      left:'center',
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

const onSubmit = () => {
  console.log('formData:', formData.value)
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