<template>
  <div class="common-layout">
    <div class="left-item">
      <el-card class="item">
        <el-form
            :model="formData"
        >
          <el-form-item label="仿真" label-width="80">
            <el-select v-model="formData.emulation">
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
            <el-select v-model="formData.round">
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
            <el-select v-model="formData.drawItem">
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
import {onMounted, reactive, toRefs} from "vue";
import {ElForm, ElMessage} from 'element-plus'
import * as echarts from "echarts";
import {getAircraftAllOptions, getAircraftDataOne} from '../../../api/visual/index.js'

interface FormDataType {
  // 仿真
  emulation: number,
  // 轮次
  round: number,
  // 绘制项目
  drawItem: any
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
  emulationOptions: [] as any[],
  // 轮次选项
  roundOptions: [] as any[],
  // 绘制项目
  drawItemOptions: [] as any[],

  // 折线图数据
  chartOneXData: [] as any[],
  chartOneYData: [] as any[],
  chartTwoXData: [] as any[],
  chartTwoYData: [] as any[],
  chartThreeXData: [] as any[],
  chartThreeYData: [] as any[],
  chartFourXData: [] as any[],
  chartFourYData: [] as any[],
})

const {
  formData,
  emulationOptions,
  roundOptions,
  drawItemOptions,

  chartOneXData,
  chartOneYData,
  chartTwoXData,
  chartTwoYData,
  chartThreeXData,
  chartThreeYData,
  chartFourXData,
  chartFourYData,
} = toRefs(state)


/*************************************** 事件 ***************************************/
const onSubmit = () => {
  console.log('formData:', formData.value)

  echarts.init(document.getElementById("chart-1")).dispose();
  echarts.init(document.getElementById("chart-2")).dispose();
  echarts.init(document.getElementById("chart-3")).dispose();
  echarts.init(document.getElementById("chart-4")).dispose();
  init();
}


/*************************************** 初始化 ***************************************/
// 获取选项数据
function handleOptionsQuery() {
  getAircraftAllOptions().then(res => {
    console.log('res:', res)
    state.emulationOptions = []
    state.roundOptions = []
    state.drawItemOptions = []
    res.data.data.emulation.forEach((item: any) => {
      state.emulationOptions.push({
        id: item.id,
        label: item.name,
        value: item.id
      })
    })
    res.data.data.round.forEach((item: any) => {
      state.roundOptions.push({
        id: item.id,
        label: item.name,
        value: item.id
      })
    })
    res.data.data.drawItem.forEach((item: any) => {
      state.drawItemOptions.push({
        id: item.id,
        label: item.name,
        value: item.id
      })
    })
  }).catch(err => {
    ElMessage.error(err.msg)
  })
}

// 获取图表数据
function handleDataQuery() {
  console.log('formData:', formData.value)

  // 获取第一个图的数据
  getAircraftDataOne(state.formData).then(res => {
    console.log('res:', res)
    state.chartOneXData = res.data.data.xData
    state.chartOneYData = res.data.data.yData
  }).catch(err => {
    ElMessage.error(err.msg)
  })
}

// 折线图
function setChartOptions(
    chartDom: any,
    title: string,
    chartXData: any[],
    chartYData: any[],
    xAxisName: string,
    yAxisName: string,
) {
  // // 等待窗口大小初始化完成
  // await new Promise<void>(resolve => {
  //   setTimeout(() => {
  //     resolve()
  //   }, 500)
  // })
  const option = {
    // 标题
    title: {
      text: title,
      // 以下两项设置标题位置
      left: 'center',
      top: 'bottom'
    },

    // 图例组件
    // legend: {
    //   data: [yAxisName]
    // },
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
      name: xAxisName,
      data: chartXData
    },

    // 纵坐标配置
    yAxis: {
      // 坐标轴类型: value-数值轴
      type: 'value',
      name: yAxisName
    },

    series: [
      {
        // Y轴数据
        data: chartYData,
        // 线条类型: line-折线图
        type: 'line'
      }
    ]
  }

  chartDom.setOption(option)
  window!.addEventListener('resize', () => {
    chartDom.resize()
  })
}

function init() {
  // // 获取选项数据
  // handleOptionsQuery()
  // 仿真选项
  state.emulationOptions = [
    {id: 1, label: '1', value: 1},
    {id: 2, label: '2', value: 2},
    {id: 3, label: '3', value: 3},
    {id: 4, label: '4', value: 4},
  ]
  // 轮次选项
  state.roundOptions = [
    {id: 1, label: '1', value: 1},
    {id: 2, label: '2', value: 2},
    {id: 3, label: '3', value: 3},
    {id: 4, label: '4', value: 4},
  ]
  // 绘制项目
  state.drawItemOptions = [
    {id: 1, label: '高度', value: 1},
    {id: 2, label: '速度', value: 2},
    {id: 2, label: '偏转角', value: 3},
  ]

  // 获取图表数据
  handleDataQuery()
  // // 生成50个hh:mm:ss格式的时间
  // state.chartOneXData = []
  // for (let i = 0; i < 50; i++) {
  //   state.chartOneXData.push(`${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`)
  // }
  // // 随机生成50个整数
  // state.chartOneYData = []
  // for (let i = 0; i < 50; i++) {
  //   state.chartOneYData.push(Math.floor(Math.random() * 1000))
  // }


  let chart1 = echarts.init(document.getElementById("chart-1"))
  let chart2 = echarts.init(document.getElementById("chart-2"))
  let chart3 = echarts.init(document.getElementById("chart-3"))
  let chart4 = echarts.init(document.getElementById("chart-4"))

  let charts = [chart1, chart2, chart3, chart4]
  charts.forEach(item => {
    setChartOptions(
        item,
        'AAAA',
        state.chartOneXData,
        state.chartOneYData,
        '时间',
        '高度'
    )
    charts[0].setOption({
      title: {
        text: 'AAAA',
        // 以下两项设置标题位置
        left: 'center',
        top: 'bottom'
      },
      // 图例组件
      legend: {
        data: ['高度']
      },
    })
  })
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