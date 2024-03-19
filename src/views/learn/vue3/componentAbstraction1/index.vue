<template>
  <el-tabs type="border-card" :before-leave="beforeLeave">
    <el-tab-pane label="User">User</el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const beforeLeave = (activeName: string, oldActiveName: string) => {
  console.log('beforeLeave', activeName, oldActiveName)

  return false
}

</script>


<!--<template>-->
<!--  <div>-->
<!--    <div v-show="showMainPage">-->
<!--      <el-card>-->
<!--        事故类型：-->
<!--        <el-select v-model="currentAccTypeQuery" style="width: 150px">-->
<!--          <el-option-->
<!--              v-for="item in accTypeOptions"-->
<!--              :key="item.val"-->
<!--              :label="item.label"-->
<!--              :value="item.val"-->
<!--          />-->
<!--        </el-select>-->
<!--        事故等级：-->
<!--        <el-select v-model="currentAccLevelQuery" style="width: 150px">-->
<!--          <el-option-->
<!--              v-for="item in accLevelOptions"-->
<!--              :key="item.val"-->
<!--              :label="item.label"-->
<!--              :value="item.val"-->
<!--          />-->
<!--        </el-select>-->
<!--        <el-button type="primary" @click="onQuery">-->
<!--          <ivy-icon name="search"/>-->
<!--          查询-->
<!--        </el-button>-->
<!--        <el-button type="primary" @click="onReset">-->
<!--          <ivy-icon name="refreshLeft"/>-->
<!--          重置-->
<!--        </el-button>-->
<!--      </el-card>-->

<!--      <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">-->
<!--        <template #operations="{ row }">-->
<!--          <vxe-button @click="handleEdit(row)" type="text" status="primary" content="编辑" icon="vxe-icon-edit"/>-->
<!--          <vxe-button @click="handleDelete(row)" type="text" status="danger" content="删除" icon="vxe-icon-delete"/>-->
<!--        </template>-->

<!--        <template #pager>-->
<!--          <vxe-pager-->
<!--              :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"-->
<!--              v-model:current-page="tablePage.pageNumber"-->
<!--              v-model:page-size="tablePage.pageSize"-->
<!--              :total="tablePage.total"-->
<!--              @page-change="handlePageChange"-->
<!--          >-->
<!--          </vxe-pager>-->
<!--        </template>-->
<!--      </vxe-grid>-->
<!--    </div>-->

<!--    <TestComp-->
<!--        v-if="dialogControl.visible"-->
<!--        :dialogControl="dialogControl"-->
<!--        :data="baseData"-->
<!--        @close-dialog="closeDialog"-->
<!--        @type-change="handleTypeChange"-->
<!--        @level-change="handleLevelChange"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {ref, reactive, onBeforeMount} from 'vue';-->
<!--import {VxeGridInstance, VxeGridProps, VxeGridListeners, VxePagerEvents} from 'vxe-table';-->
<!--import IvyIcon from "@/components/smart4j/Icon/IvyIcon.vue";-->
<!--import {ElMessage, ElMessageBox} from "element-plus";-->

<!--import {-->
<!--  getAccidentTypeApi, getTasksListApi, deleteTaskApi, getEditDataByTagOrIdApi-->
<!--} from "@/api/accidentEmergency/measure/generalMeasure";-->
<!--import {TestComp} from "@/views/learn/vue3/componentAbstraction1/index.js";-->


<!--const xGrid = ref<VxeGridInstance>()-->
<!--const showMainPage = ref(true)-->

<!--/************************************ 查询 ***********************************/-->
<!--const currentAccTypeQuery = ref()-->
<!--const currentAccLevelQuery = ref()-->

<!--// 事故决策类型选项-->
<!--const accMeasureDecisionTypeOptions = ref([])-->

<!--const onQuery = () => {-->
<!--  handleQuery()-->
<!--}-->

<!--const onReset = () => {-->
<!--  currentAccTypeQuery.value = null-->
<!--  currentAccLevelQuery.value = null-->
<!--  handleQuery()-->
<!--}-->

<!--// 类型选项-->
<!--const accTypeOptions = ref([])-->
<!--// 选中的类型-->
<!--const currentAccType = ref()-->

<!--// 等级选项-->
<!--const accLevelOptions = ref([])-->
<!--// 选中的等级-->
<!--const currentAccLevel = ref()-->

<!--/************************************ 表格定义 ***********************************/-->
<!--const gridOptions = reactive({-->
<!--  id: 'GeneralDisposition',-->
<!--  height: window.innerHeight - 53.61 - 50.79 - 45,-->
<!--  align: 'center',-->
<!--  border: true,-->
<!--  keepSource: true,-->
<!--  loading: false,-->
<!--  importConfig: {},-->
<!--  exportConfig: {},-->
<!--  columnConfig: {-->
<!--    resizable: true-->
<!--  },-->
<!--  rowConfig: {-->
<!--    isCurrent: true-->
<!--  },-->
<!--  customConfig: {-->
<!--    storage: true-->
<!--  },-->
<!--  editConfig: {-->
<!--    trigger: 'click',-->
<!--    mode: 'row',-->
<!--    showStatus: true-->
<!--  },-->
<!--  columns: [-->
<!--    {type: 'checkbox', width: 50},-->
<!--    {type: 'seq', width: 60},-->
<!--    {field: 'type', title: '类型', width: 150},-->
<!--    {field: 'level', title: '等级', width: 100},-->
<!--    {field: 'tag', title: '标识', width: 100},-->
<!--    {field: 'expression', title: '事故表述'},-->
<!--    {title: '操作', width: 250, slots: {default: 'operations'}},-->
<!--  ],-->
<!--  data: [],-->
<!--  toolbarConfig: {-->
<!--    buttons: [-->
<!--      {code: 'handleAdd', name: '添加', status: 'primary', icon: 'vxe-icon-add'}-->
<!--    ],-->
<!--    tools: [],-->
<!--    import: true,-->
<!--    export: true-->
<!--  }-->
<!--})-->

<!--const gridEvents: VxeGridListeners = {-->
<!--  toolbarButtonClick({code}) {-->
<!--    const $grid = xGrid.value-->
<!--    if ($grid) {-->
<!--      switch (code) {-->
<!--        case 'handleAdd': {-->
<!--          handleAdd()-->
<!--          break-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  toolbarToolClick({code}) {-->
<!--    const $grid = xGrid.value-->
<!--    if ($grid) {-->
<!--      switch (code) {-->
<!--        case 'handleAdd': {-->
<!--          handleAdd()-->
<!--          break-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->


<!--/********************************* 表格分页 *********************************/-->
<!--const tablePage = reactive({-->
<!--  total: 0,-->
<!--  pageNumber: 1,-->
<!--  pageSize: 10-->
<!--})-->

<!--// 查询-->
<!--const handleQuery = () => {-->
<!--  getTasksListApi(-->
<!--      {-->
<!--        type: currentAccTypeQuery.value,-->
<!--        level: currentAccLevelQuery.value,-->
<!--        classify: 0,-->
<!--        pageNumber: tablePage.pageNumber,-->
<!--        pageSize: tablePage.pageSize-->
<!--      }-->
<!--  ).then(res => {-->
<!--    if (res.code === 200) {-->
<!--      gridOptions.data = res.data.dataList-->

<!--      tablePage.total = res.data.totalRow-->
<!--      tablePage.pageNumber = res.data.pageNumber-->
<!--      tablePage.pageSize = res.data.pageSize-->
<!--    }-->
<!--  }).finally(() => {-->
<!--    gridOptions.loading = false-->
<!--  })-->
<!--}-->

<!--const handlePageChange: VxePagerEvents.PageChange = ({pageNumber, pageSize}) => {-->
<!--  tablePage.pageNumber = pageNumber-->
<!--  tablePage.pageSize = pageSize-->
<!--  handleQuery()-->
<!--}-->


<!--/********************************* 对话框 ************************************/-->
<!--const dialogControl = reactive({-->
<!--  visible: false,-->
<!--  title: '添加通用处理程序',-->
<!--})-->

<!--const baseData = ref({})-->

<!--const handleTypeChange = (val: string) => {-->
<!--  currentAccType.value = val-->
<!--  baseData.value.type = val-->
<!--  baseData.value.level = currentAccLevel.value-->
<!--  baseData.value.tag = val + '-' + currentAccLevel.value-->
<!--  baseData.value.expression = val + '-' + currentAccLevel.value + '级事故'-->
<!--}-->

<!--const handleLevelChange = (val: string) => {-->
<!--  currentAccLevel.value = val-->
<!--  baseData.value.type = currentAccType.value-->
<!--  baseData.value.level = val-->
<!--  baseData.value.tag = currentAccType.value + '-' + val-->
<!--  baseData.value.expression = currentAccType.value + '-' + val + '级事故'-->
<!--}-->


<!--const closeDialog = (data: any) => {-->
<!--  dialogControl.visible = false-->
<!--  showMainPage.value = true-->

<!--  handleQuery()-->
<!--  resetBaseData()-->
<!--}-->


<!--/************************************ 表格行操作 ***********************************/-->
<!--// 添加-->
<!--const handleAdd = () => {-->
<!--  showMainPage.value = false-->

<!--  baseData.value = {}-->

<!--  dialogControl.visible = true-->
<!--  dialogControl.title = '添加通用处理程序'-->
<!--}-->

<!--// 编辑-->
<!--const handleEdit = (row: any) => {-->
<!--  baseData.value = row-->
<!--  baseData.value.measureDecision = accMeasureDecisionTypeOptions.value[0].val-->

<!--  console.log('基础数据：', row)-->
<!--  showMainPage.value = false-->
<!--  dialogControl.visible = true-->
<!--  dialogControl.title = '编辑通用处理程序'-->
<!--}-->

<!--// 删除-->
<!--const handleDelete = (row: any) => {-->
<!--  ElMessageBox.confirm('确定要删除该数据吗？', '警告', {-->
<!--    confirmButtonText: '确定',-->
<!--    cancelButtonText: '取消',-->
<!--    type: 'warning'-->
<!--  }).then(() => {-->
<!--    deleteTaskApi(row.id).then(res => {-->
<!--      if (res.code === 200) {-->
<!--        ElMessage.success('删除成功')-->
<!--        handleQuery()-->
<!--      }-->
<!--    })-->
<!--  })-->
<!--}-->

<!--const resetBaseData = () => {-->
<!--  baseData.value = {}-->
<!--}-->


<!--/************************************ 生命周期 ***********************************/-->
<!--onBeforeMount(() => {-->
<!--  // // 获取事故应急处置决策类型选项-->
<!--  // getAccidentTypeApi('accMeasureDecision').then(res => {-->
<!--  //   if (res.code === 200) {-->
<!--  //     accMeasureDecisionTypeOptions.value = res.data.map((item: any, index: number) => {-->
<!--  //       return {-->
<!--  //         id: item.id,-->
<!--  //         label: item.name,-->
<!--  //         val: item.code-->
<!--  //       }-->
<!--  //     })-->
<!--  //   }-->
<!--  // })-->
<!--  //-->
<!--  // // 获取事故类型选项-->
<!--  // getAccidentTypeApi('accType').then(res => {-->
<!--  //   if (res.code === 200) {-->
<!--  //     accTypeOptions.value = res.data.map((item: any) => {-->
<!--  //       return {-->
<!--  //         id: item.id,-->
<!--  //         label: item.name,-->
<!--  //         val: item.code-->
<!--  //       }-->
<!--  //     })-->
<!--  //   }-->
<!--  //   currentAccType.value = accTypeOptions.value[0].val-->
<!--  // })-->
<!--  //-->
<!--  // // 获取事故等级选项-->
<!--  // getAccidentTypeApi('accLevel').then(res => {-->
<!--  //   if (res.code === 200) {-->
<!--  //     accLevelOptions.value = res.data.map((item: any) => {-->
<!--  //       return {-->
<!--  //         id: item.id,-->
<!--  //         label: item.name,-->
<!--  //         val: item.code-->
<!--  //       }-->
<!--  //     })-->
<!--  //   }-->
<!--  //   currentAccLevel.value = accLevelOptions.value[0].val-->
<!--  // })-->
<!--  //-->
<!--  // // 分页查询-->
<!--  // handleQuery()-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->