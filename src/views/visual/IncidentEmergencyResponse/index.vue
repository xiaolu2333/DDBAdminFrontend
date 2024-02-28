<template>
  <div>
    <!--居中标题-->
    <h1 class="header-title">事件应急响应</h1>
    <el-card class="box-card">
      <vxe-grid v-bind="gridOptions" v-on="gridEvents">
        <template #level_default="{ row, column }">
          <span @click="handleRouteChange(row, column)" class="code-cell">{{ row[column.field] }}</span>
        </template>
      </vxe-grid>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive} from 'vue';
import {useRouter} from 'vue-router'
import {VxeGridListeners, VxeGridProps} from 'vxe-table';

import {
  getDataListApi
} from "@/api/accidentEmergency/measure/emergResponse";

interface RowType {
  id?: number
  // 事件类型
  type: number
  // 事件产品
  product: string
  // 等级
  level: number
  // 作业id
  taskId: number
  // 作业名称
  name: string
}

const gridOptions = reactive<VxeGridProps>({
  id: 'IncidentEmergencyResponse',
  border: true,
  keepSource: true,
  showOverflow: true,
  height: 700,
  align: 'center',
  loading: false,
  spanMethod: ({
                 row,
                 items,
                 seq,
                 rowIndex,
                 $rowIndex,
                 _rowIndex,
                 column,
                 visibleData,
                 data
               }) => {
    // 需要合并的列字段
    let fields = ["type"];
    const cellValue = row[column.property];
    if (cellValue && fields.includes(column.property)) {
      const prevRow = visibleData[_rowIndex - 1];
      let nextRow = visibleData[_rowIndex + 1];
      if (prevRow && prevRow[column.property] === cellValue) {
        return {rowspan: 0, colspan: 0};
      } else {
        let countRowspan = 1;
        while (nextRow && nextRow[column.property] === cellValue) {
          nextRow = visibleData[++countRowspan + _rowIndex];
        }
        if (countRowspan > 1) {
          return {rowspan: countRowspan, colspan: 1};
        }
      }
    }
  },
  columnConfig: {
    resizable: true
  },
  columns: [
    {field: 'type', title: '事件类型', width: 100},
    {field: 'product', title: '事件产品', width: 200},
    {field: 'levelOne', title: 'I级', slots: {default: 'level_default'}},
    {field: 'levelTwo', title: 'II级', slots: {default: 'level_default'}},
    {field: 'levelThree', title: 'III级', slots: {default: 'level_default'}}
  ],
  data: []
})


/********************************* 表格事件 *********************************/
const gridEvents: VxeGridListeners = {
  // headerCellClick(params) {
  //   const {column} = params
  //   console.log(`表头单元格点击${column.title}`)
  // },
  // cellClick(params) {
  //   console.log('params:', params)
  //   const {row, column} = params
  //   console.log(`单元格点击${row[column.field]}`)
  // }
}


const router = useRouter()

// 点击跳转到
const handleRouteChange = (row: any, column: any) => {
  console.log('row:', row)
  console.log('column:', column)

  let path = {
    path: '/accEmergency/measure/sceneMeasure',
    query: {
      rowId: row.id,
      taskId: row.taskId,
    }
  }
  router.push(path)
  // 在目标页:
  // import {useRoute} from 'vue-router'
  // const route = useRoute()
  // const {rowId, taskId} = route.query
}


/********************************* 初始化数据 *********************************/
// 查询
const handleQuery = () => {
  // getDataListApi().then((res) => {
  //   console.log('res:', res)
  // })

  const data = [
    {
      id: 1,
      type: '跌落',
      product: 'x1状态',
      level: 1,
      taskId: 10001,
      name: 'x1-DL-1',
    },
    {
      id: 2,
      type: '跌落',
      product: 'x1状态',
      level: 2,
      taskId: 10002,
      name: 'x1-DL-2'
    },
    {
      id: 3,
      type: '跌落',
      product: 'x2状态',
      level: 1,
      taskId: 10003,
      name: 'x2-DL-1'
    },
    {
      id: 4,
      type: '跌落',
      product: '其他',
      level: 1,
      taskId: 10004,
      name: 'xxx-DL-1'
    },
    {
      id: 5,
      type: '冲击',
      product: 'x1状态',
      level: 1,
      taskId: 10005,
      name: 'x1-CJ-1'
    },
    {
      id: 6,
      type: '冲击',
      product: 'x2状态',
      level: 3,
      taskId: 10006,
      name: 'x2-CJ-3'
    },
    {
      id: 7,
      type: '冲击',
      product: '其他',
      level: 1,
      taskId: 10007,
      name: 'xxx-CJ-1'
    },
    {
      id: 8,
      type: '火烧',
      product: 'x1状态',
      level: 3,
      taskId: 10008,
      name: 'x1-HS-3'
    },
    {
      id: 9,
      type: '水淹',
      product: '其他',
      level: 3,
      taskId: 10009,
      name: 'xxx-SY-3'
    },
    {
      id: 10,
      type: '复合',
      product: '其他',
      level: 1,
      taskId: 10010,
      name: 'xxx-FH-1'
    },
  ]

  gridOptions.data = []
  data.forEach((item) => {
    let obj = {
      id: item.id,
      type: item.type,
      product: item.product,
      levelOne: item.level === 1 ? item.name : '',
      levelTwo: item.level === 2 ? item.name : '',
      levelThree: item.level === 3 ? item.name : ''
    }
    gridOptions.data.push(obj)
  })
}


/********************************* 生命周期 *********************************/
onBeforeMount(() => {
  handleQuery()
})
</script>

<style scoped>
.header-title {
  text-align: center;
  font-size: large;
  font-weight: bolder;
  margin: 20px;
}

.code-cell {
  color: #036cd6
}

.code-cell:hover {
  color: #419dff;
  cursor: pointer;
  /*font-size: x-large;*/
}

.box-card {
  width: 80%;
  margin: 0 auto;
}
</style>
