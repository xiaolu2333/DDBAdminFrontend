<template>
  <div class="common-layout">
    <div class="left-item">
      <el-card class="item">
        <el-form
            :model="formData"
        >
          <el-form-item label="仿真" label-width="100">
            <el-select v-model="formData.emulation">
              <el-option
                  v-for="item in emulationOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="轮次" label-width="100">
            <el-select v-model="formData.round">
              <el-option
                  v-for="item in roundOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="队伍" label-width="100">
            <el-radio-group
                v-model="formData.team"
                @change="handleTeamChang"
            >
              <el-radio
                  v-for="item in teamOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="导弹编号" label-width="100">
            <el-select v-model="formData.missileCode">
              <el-option
                  v-for="item in missileCodeOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="绘制项" label-width="100">
            <el-select
                v-model="formData.drawItem"
            >
              <el-option
                  v-for="item in drawItemOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="100">
            <el-button type="primary" @click="onSubmit">确认</el-button>
          </el-form-item>
        </el-form>
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
import {reactive, toRefs, onMounted} from "vue";
import {ElMessage} from 'element-plus'
import * as echarts from "echarts";

import {getMissileAllOptions, getMissileData} from '../../../api/visual/index.js'

const handleTeamChang = (val) => {
  console.log('val:', val)
}

interface FormDataType {
  // 仿真
  emulation: number,
  // 轮次
  round: number,
  // 队伍
  team: number,
  // 导弹编号
  missileCode: number,
  // 绘制项目
  drawItem: number
}

const state = reactive({
  // X轴时间数据
  xAxisTimeData: [] as string[],
  // Y轴项目数据
  yAxisItemData: [] as any[],

  formData: {
    emulation: 1,
    round: 1,
    team: 1,
    missileCode: 1,
    drawItem: 1,
  } as FormDataType,

  // 仿真选项
  emulationOptions: [] as any[],
  // 轮次选项
  roundOptions: [] as any[],
  // 队伍
  teamOptions: [
    {id: 1, label: '红方', value: 1},
    {id: 2, label: '蓝方', value: 2},
  ],
  // 导弹编号选项
  missileCodeOptions: [] as any[],
  // 绘制项目
  drawItemOptions: [] as any[],
})

const {
  xAxisTimeData,
  yAxisItemData,

  formData,
  emulationOptions,
  roundOptions,
  teamOptions,
  missileCodeOptions,
  drawItemOptions,
} = toRefs(state)

/*************************************** 事件 ***************************************/
const onSubmit = () => {
  console.log('formData:', formData.value)
  init()
}


/*************************************** 初始化 ***************************************/
// 折线图
async function initChart(
    chartDom: HTMLElement,
    title: string,
    chartXData: any[],
    chartYData: any[],
    xAxisName: string,
    yAxisName: string,
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

    // 图例组件
    legend: {
      data: [yAxisName]
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

  chart.setOption(option)
  window!.addEventListener('resize', () => {
    chart.resize()
  })
}

// 获取选项数据
function handleOptionsQuery() {
  getMissileAllOptions().then(res => {
    console.log('res:', res)
    state.emulationOptions = []
    state.roundOptions = []
    state.missileCodeOptions = []
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
    res.data.data.missileCode.forEach((item: any) => {
      state.missileCodeOptions.push({
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

  // 获取图的数据
  getMissileData(state.formData).then(res => {
    console.log('res:', res)
    state.xAxisTimeData = res.data.data.xData
    state.yAxisItemData = res.data.data.yData
  }).catch(err => {
    ElMessage.error(err.msg)
  })
}


function init() {
  // 获取选项数据
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
  // 队伍
  state.teamOptions = [
    {id: 1, label: '红方', value: 1},
    {id: 2, label: '蓝方', value: 2}
  ]
  // 导弹编号选项
  state.missileCodeOptions = [
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
  // handleDataQuery()
  // 生成50个hh:mm:ss格式的时间
  state.xAxisTimeData = []
  for (let i = 0; i < 50; i++) {
    state.xAxisTimeData.push(`${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`)
  }
  // 随机生成50个整数
  state.yAxisItemData = []
  for (let i = 0; i < 50; i++) {
    state.yAxisItemData.push(Math.floor(Math.random() * 1000))
  }

  initChart(
      document.getElementById("chart-1"),
      'AAAA',
      state.xAxisTimeData,
      state.yAxisItemData,
      '时间',
      state.formData.drawItem === 1 ? '高度' : state.formData.drawItem === 2 ? '速度' : '偏转角'
  )
}

onMounted(() => {
  init();
});
</script>

<style scoped>
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
  height: 80vh;
  margin: 0 auto;
}
</style>