<template>
  <el-card>
    前端排序
    <vxe-table
        border
        class="my-sort"
        ref="xTable1"
        height="300"
        :data="tableData1"
        :row-config="{isCurrent: true, isHover: true}"
        :column-config="{resizable: true}"
        :sort-config="{showIcon: false, multiple: true}"
        @header-cell-click="headerCellClickEvent"
        @sort-change="sortChangeEvent1"
    >
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable>
        <template #header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i :class="[column.order ? `vxe-icon-sort-alpha-${column.order}` : 'vxe-icon-sort']"></i>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="age" title="Age" sortable>
        <template #header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i :class="[column.order ? `vxe-icon-sort-numeric-${column.order}` : 'vxe-icon-sort']"></i>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="salary" title="Salary" sortable>
        <template #header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i :class="[column.order ? `vxe-icon-sort-numeric-${column.order}` : 'vxe-icon-sort']"></i>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex" :filters="sexOptions"></vxe-column>
      <vxe-column field="role" title="Role" :filters="roleOptions" :filter-method="filterRoleMethod" sortable>
        <template #filter="{ $panel, column }">
          <select class="my-select" v-model="option.data" v-for="(option, index) in column.filters" :key="index"
                  @change="$panel.changeOption($event, !!option.data, option)">
            <option v-for="(label, cIndex) in roleList" :key="cIndex" :value="label">{{ label }}</option>
          </select>
        </template>
      </vxe-column>
      <vxe-column
          field="department" title="Department"
          :filters="departmentOptions"
          :filter-method="filterDepartmentMethod"
          :filter-recover-method="filterDepartmentRecoverMethod"
      >
        <template #filter="{ $panel, column }">
          <input class="my-input" type="type" v-for="(option, index) in column.filters" :key="index"
                 v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"
                 @keyup.enter="$panel.confirmFilter()" placeholder="按回车确认筛选">
        </template>
      </vxe-column>
    </vxe-table>
  </el-card>
  <el-card>
    后端排序
    <vxe-table
        border
        :data="tableData2"
        align="center"
        height="400"
        :sort-config="{remote: true}"
        @sort-change="sortChangeEvent2">
      >
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column
          v-for="(head, index) in tableHeader"
          :key="index"
          :field="head.field"
          :title="head.title"
          :sortable="canSort(head.field)"
      >
        <template #default="{ row, column }">
          <template v-if="head.fieldType === 'select'">
            <span>{{ row[head.field].join('，') }}</span>
            <!--            <vxe-select v-model="head.field" disabled>-->
            <!--              <vxe-option-->
            <!--                  v-for="option in head.options"-->
            <!--                  :key="option.id"-->
            <!--                  :value="option.value"-->
            <!--                  :label="option.label"-->
            <!--              />-->
            <!--            </vxe-select>-->
          </template>
          <template v-else><span>{{ row[head.field] }}</span></template>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="150">
        <el-button disabled>1</el-button>
        <el-button disabled>2</el-button>
      </vxe-column>
    </vxe-table>
  </el-card>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import {VxeTableInstance, VxeColumnPropTypes, VxeTableEvents} from 'vxe-table'
import XEUtils from 'xe-utils'

import {
  getGeneralTableHeaderApi,
  getGeneralTableDataApi
} from '@/api/learn/vxeTable'

/**************************************** 前端排序与过滤 ****************************************/
interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  department: string
  salary: number
  sex: string
  age: number
  address: string
}

const xTable1 = ref<VxeTableInstance>()
const tableData1 = ref<RowVO[]>([
  {
    id: 10001,
    name: '张三',
    nickname: '小张',
    role: 'Develop',
    sex: 'Man',
    age: 22,
    address: 'test abc',
    salary: 1240,
    department: 'Development'
  },
  {
    id: 10002,
    name: '李四',
    nickname: '小李',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Shanghai',
    salary: 34500,
    department: 'Test'
  },
  {
    id: 10003,
    name: '王五',
    nickname: '小王',
    role: 'PM',
    sex: 'Man',
    age: 22,
    address: 'Beijing',
    salary: 45004,
    department: 'PM'
  },
  {
    id: 10004,
    name: '赵六',
    nickname: '小赵',
    role: 'Designer',
    sex: 'Women',
    age: 23,
    address: 'test abc',
    salary: 46330,
    department: 'Design'
  },
  {
    id: 10005,
    name: '钱七',
    nickname: '小钱',
    role: 'Develop',
    sex: 'Women',
    age: 33,
    address: 'Shenzhen',
    salary: 5000,
    department: 'Development'
  },
  {
    id: 10006,
    name: '孙八',
    nickname: '小孙',
    role: 'Designer',
    sex: 'Women',
    age: 34,
    address: 'test abc',
    salary: 6000,
    department: 'Design'
  },
  {
    id: 10007,
    name: '周十',
    nickname: '小周',
    role: 'Test',
    sex: 'Man',
    age: 42,
    address: 'test abc',
    salary: 7000,
    department: 'Test'
  },
  {
    id: 10008,
    name: '吴十一',
    nickname: '小吴',
    role: 'Develop',
    sex: 'Man',
    age: 45,
    address: 'test abc',
    salary: 8000,
    department: 'Development'
  },
])
const sexOptions = ref([
  {label: 'Women', value: 'Women'},
  {label: 'Man', value: 'Man'}
])
const roleList = ref(['', 'Develop', 'PM', 'Test', 'Designer'])
const roleOptions = ref([
  {data: ''}
])
const departmentOptions = ref([
  {data: ''}
])

const headerCellClickEvent: VxeTableEvents.HeaderCellClick = ({
                                                                column,
                                                                triggerResizable,
                                                                triggerSort,
                                                                triggerFilter
                                                              }) => {
  const $table = xTable1.value
  if ($table) {
    // 如果触发了列的其他功能按钮
    if (column.sortable && !(triggerResizable || triggerSort || triggerFilter)) {
      if (column.order === 'desc') {
        $table.clearSort()
      } else if (column.order === 'asc') {
        $table.sort(column.field, 'desc')
      } else {
        $table.sort(column.field, 'asc')
      }
    }
  }
}

// @ts-ignore
const sortChangeEvent1: VxeTableEvents.SortChange<RowVO> = ({sortList}) => {
  console.info(sortList.map((item) => `${item.field},${item.order}`).join('; '))
}

// @ts-ignore
const filterRoleMethod: VxeColumnPropTypes.FilterMethod<RowVO> = ({option, row}) => {
  return row.role === option.data
}

// @ts-ignore
const filterDepartmentMethod: VxeColumnPropTypes.FilterMethod<RowVO> = ({option, row}) => {
  return row.department === Number(option.data)
}

// @ts-ignore
const filterDepartmentRecoverMethod: VxeColumnPropTypes.FilterRecoverMethod<RowVO> = ({option}) => {
  // 如果是自定义筛选模板，当为点击确认时，该选项将被恢复为默认值
  option.data = ''
}


/**************************************** 后端排序与过滤 ****************************************/
const tableHeader = ref([])
const tableData2 = ref([])

const canSort = (field) => {
  const canSortField = ['id', 'name', 'number', 'price', 'manu', 'date', 'time', 'datetime']
  return canSortField.includes(field)
}

const sortChangeEvent2 = async ({field, order}) => {
  await getList(field, order)
}

const getList = async (field, order) => {
  const res2 = await getGeneralTableDataApi(field, order)
  tableData2.value = res2.data.data
}

onBeforeMount(async () => {
  const res1 = await getGeneralTableHeaderApi()
  tableHeader.value = res1.data.data

  await getList("", "")
})
</script>

<style>
.my-sort .custom-sort {
  padding: 0 4px;
}

.my-sort .custom-sort.is-order {
  color: #409eff;
}
</style>

