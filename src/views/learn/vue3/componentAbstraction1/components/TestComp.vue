<!--<template>-->
<!--  <div>-->
<!--    <el-card shadow="never">-->
<!--      <div class="head-container">-->
<!--        <span class="span">{{ props.dialogControl.title }}</span>-->
<!--        <el-button type="primary" @click="dialogClose">-->
<!--          <ivy-icon name="DArrowLeft"/>-->
<!--          返回-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </el-card>-->

<!--    <el-tabs-->
<!--        v-model="currentAccMeasureDecisionType" @tab-click="handleTabClick" type="border-card"-->
<!--        :before-leave="handleBeforeLeave"-->
<!--    >-->
<!--      <el-tab-pane v-for="tab in accMeasureDecisionTypeOptions" :key="tab.val" :label="tab.label" :name="tab.val"/>-->
<!--    </el-tabs>-->

<!--    <el-card shadow="never">-->
<!--      <div v-if="props.dialogControl.title === '添加通用处理程序'">-->
<!--        <div style="display: inline">-->
<!--          事故类型：-->
<!--          <el-select v-model="currentAccType" @change="handleTypeChange" style="width: 150px">-->
<!--            <el-option-->
<!--                v-for="item in accTypeOptions"-->
<!--                :key="item.val"-->
<!--                :label="item.label"-->
<!--                :value="item.val"-->
<!--            />-->
<!--          </el-select>-->
<!--        </div>-->
<!--        <div style="display: inline">-->
<!--          事故等级：-->
<!--          <el-select v-model="currentAccLevel" @change="handleLevelChange" style="width: 240px">-->
<!--            <el-option-->
<!--                v-for="item in accLevelOptions"-->
<!--                :key="item.val"-->
<!--                :label="item.label"-->
<!--                :value="item.val"-->
<!--            />-->
<!--          </el-select>-->
<!--        </div>-->
<!--      </div>-->
<!--      <vxe-grid-->
<!--          v-if="!hasTabChanged"-->
<!--          ref="xGrid1"-->
<!--          v-bind="taskTableOptions"-->
<!--          @cell-click="handleTaskTableCellClick"-->
<!--          @edit-closed="handleTaskTableCellEditClosed"-->
<!--      >-->
<!--        <template #toolbarButtons>-->

<!--          <span class="table-info">标识：{{ accidentIdentifying }}</span>-->
<!--          <span class="table-info">事故表述：{{ accidentDescription }}</span>-->

<!--          <el-button type="primary" size="small" icon="el-icon-plus" @click="insertTask">新增</el-button>-->
<!--          <el-button type="danger" size="small" icon="el-icon-delete" @click="removeTask">删除</el-button>-->
<!--        </template>-->

<!--        <template #taskName_edit="{ row }">-->
<!--          <vxe-select v-model="row.taskName" transfer @change="handleTaskNameChange">-->
<!--            <vxe-option-->
<!--                v-for="item in accTaskOptions" :key="item.val" :value="item.val"-->
<!--                :label="item.label"></vxe-option>-->
<!--          </vxe-select>-->
<!--        </template>-->
<!--        <template #taskName_default="{ row }">-->
<!--          <span>{{ getLabelByValue(accTaskOptions, row.taskName) }}</span>-->
<!--        </template>-->

<!--        <template #code_edit="{ row }">-->
<!--          <vxe-select v-model="row.code" transfer @change="handleTaskProgramChange" multiple>-->
<!--            <vxe-option v-for="item in accTaskProgramOptions" :key="item.val" :value="item.val" :label="item.label"/>-->
<!--          </vxe-select>-->
<!--        </template>-->
<!--        <template #code_default="{ row }">-->
<!--          <span>{{ row.code }}</span>-->
<!--        </template>-->

<!--        <template #fileDesc_default="{ row }">-->
<!--          <span>{{ row.fileDesc }}</span>-->
<!--        </template>-->

<!--        <template #fileName_default="{ row }">-->
<!--          <span class="existed-file-name">{{ row.fileName }}</span>-->
<!--        </template>-->
<!--      </vxe-grid>-->
<!--    </el-card>-->

<!--    <el-card shadow="never">-->
<!--      <vxe-grid v-if="!hasTabChanged" v-bind="equipmentTableOptions" ref="xGrid2">-->
<!--        <template #toolbarButtons>-->
<!--            <span class="table-info">-->
<!--              设备需求表格-->
<!--            </span>-->
<!--          <el-button type="primary" size="small" icon="el-icon-plus" @click="insertEquipment">新增</el-button>-->
<!--          <el-button type="danger" size="small" icon="el-icon-delete" @click="removeEquipment">删除</el-button>-->
<!--        </template>-->

<!--        <template #name_edit="{ row }">-->
<!--          <vxe-select v-model="row.name" transfer>-->
<!--            <vxe-option-->
<!--                v-for="item in equipmentOptions"-->
<!--                :key="item.label" :value="item.val" :label="item.label"-->
<!--            />-->
<!--          </vxe-select>-->
<!--        </template>-->
<!--        <template #name_default="{ row }">-->
<!--          <span>{{ getLabelByValue(equipmentOptions, row.name) }}</span>-->
<!--        </template>-->
<!--        <template #description_edit="{ row }">-->
<!--          <vxe-input v-model="row.description"/>-->
<!--        </template>-->
<!--        <template #number_edit="{ row }">-->
<!--          <vxe-input type="number" v-model="row.number" :min="0"/>-->
<!--        </template>-->
<!--      </vxe-grid>-->
<!--    </el-card>-->

<!--    <el-card shadow="never">-->
<!--      <vxe-grid v-if="!hasTabChanged" v-bind="personnelTableOptions" ref="xGrid3">-->
<!--        <template #toolbarButtons>-->
<!--            <span class="table-info">-->
<!--              人员需求表格-->
<!--            </span>-->
<!--          <el-button type="primary" size="small" icon="el-icon-plus" @click="insertPersonnel">新增</el-button>-->
<!--          <el-button type="danger" size="small" icon="el-icon-delete" @click="removePersonnel">删除</el-button>-->
<!--        </template>-->

<!--        <template #type_edit="{ row }">-->
<!--          <vxe-select v-model="row.type" transfer>-->
<!--            <vxe-option-->
<!--                v-for="item in personnelOptions"-->
<!--                :key="item.label" :value="item.val" :label="item.label"-->
<!--            />-->
<!--          </vxe-select>-->
<!--        </template>-->
<!--        <template #type_default="{ row }">-->
<!--          <span>{{ getLabelByValue(personnelOptions, row.type) }}</span>-->
<!--        </template>-->
<!--        <template #description_edit="{ row }">-->
<!--          <vxe-input v-model="row.description"/>-->
<!--        </template>-->
<!--        <template #number_edit="{ row }">-->
<!--          <vxe-input type="number" v-model="row.number" :min="0"/>-->
<!--        </template>-->
<!--      </vxe-grid>-->
<!--    </el-card>-->

<!--    <el-card v-if="!hasTabChanged" shadow="never">-->
<!--      <div style="display: flex; justify-content: center">-->
<!--        <el-button type="primary" @click="handleSubmit">-->
<!--          <ivy-icon name="Check"/>-->
<!--          提交-->
<!--        </el-button>-->
<!--        <el-button @click="dialogClose">-->
<!--          <ivy-icon name="Close"/>-->
<!--          取消-->
<!--        </el-button>-->
<!--      </div>-->
<!--    </el-card>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {onBeforeMount, ref, watch} from 'vue';-->
<!--import VXETable, {VxeGridInstance} from "vxe-table";-->
<!--import {ElMessage, ElMessageBox} from "element-plus";-->

<!--import {-->
<!--  getAccidentTypeApi,-->
<!--  saveTaskProgramApi,-->
<!--  checkExistApi,-->
<!--  getTaskOptionsApi,-->
<!--  getBaseTasksByNameApi,-->
<!--  getEditDataByTagOrIdApi,-->
<!--} from "@/api/accidentEmergency/measure/generalMeasure";-->
<!--import {-->
<!--  getBaseTaskListApi-->
<!--} from "@/api/accidentEmergency/measure/measurePrograms";-->
<!--import IvyIcon from "@/components/smart4j/Icon/IvyIcon.vue";-->


<!--const props = defineProps<{-->
<!--  dialogControl: {-->
<!--    visible: boolean,-->
<!--    title: string-->
<!--  },-->
<!--  data: any-->
<!--}>()-->
<!--const dialog = ref(props.dialogControl)-->
<!--const data = ref(props.data)-->

<!--const emit = defineEmits(['closeDialog', 'productChange', 'typeChange', 'levelChange', 'submit'])-->

<!--// 返回-->
<!--const dialogClose = () => {-->
<!--  dialog.value.visible = false-->
<!--  dialog.value.title = ""-->

<!--  emit('closeDialog', {-->
<!--    dialogType: 'addAndEdit',-->
<!--    visible: false-->
<!--  })-->
<!--}-->
<!--const showAddBtn = ref(true)-->


<!--/****************************************** 标签 ******************************************/-->
<!--// 阶段数据的id-->
<!--const stepDataId = ref()-->

<!--// 是否提交数据-->
<!--const hadSubmitted = ref(true)-->

<!--// 当前事故决策类型-->
<!--const currentAccMeasureDecisionType = ref()-->
<!--const accMeasureDecisionTypeOptions = ref([])-->
<!--let accMeasureTemp = ''-->

<!--// 控制表格重新渲染-->
<!--const hasTabChanged = ref(false)-->
<!--// 事故决策类型标签点击事件-->
<!--const handleTabClick = (tab: any) => {-->
<!--  hasTabChanged.value = true-->
<!--  if (props.dialogControl.title === "添加通用处理程序") {-->
<!--    getTabData(null, accidentIdentifying.value, 0, tab.props.name)-->
<!--  } else {-->
<!--    getTabData(null, data.value.tag, 0, tab.props.name)-->
<!--  }-->
<!--}-->
<!--// 事故决策类型标签切换前事件-->
<!--const handleBeforeLeave = (activeName, oldActiveName) => {-->
<!--  console.log('activeName:', activeName)-->
<!--  console.log('oldActiveName:', oldActiveName)-->

<!--  let td = xGrid1.value.getRecordset();-->
<!--  checkRecordset(td);-->

<!--  let ed = xGrid2.value.getRecordset();-->
<!--  checkRecordset(ed);-->

<!--  let pd = xGrid3.value.getRecordset();-->
<!--  checkRecordset(pd);-->

<!--  return hadSubmitted.value;-->

<!--  //-->
<!--  // if (hadSubmitted.value) {-->
<!--  //   return true-->
<!--  // } else {-->
<!--  //   ElMessage.warning('请先提交数据！')-->
<!--  //   return false-->
<!--  //   // // 提示是否保存-->
<!--  //   // ElMessageBox.confirm('是否保存当前数据？', '提示', {-->
<!--  //   //   confirmButtonText: '保存',-->
<!--  //   //   cancelButtonText: '不保存',-->
<!--  //   //   type: 'warning'-->
<!--  //   // }).then(() => {-->
<!--  //   //   handleSubmit()-->
<!--  //   // })-->
<!--  // }-->
<!--}-->


<!--/****************************************** 作业 ******************************************/-->
<!--// 当前事故类型-->
<!--const currentAccType = ref()-->
<!--const accTypeOptions = ref([])-->
<!--// 当前事故等级-->
<!--const currentAccLevel = ref()-->
<!--const accLevelOptions = ref([])-->

<!--// 标识-->
<!--const accidentIdentifying = ref('')-->
<!--// 事故表述-->
<!--const accidentDescription = ref('')-->

<!--const handleTypeChange = (val: any) => {-->
<!--  emit('typeChange', val)-->
<!--  preCheck(currentAccType.value + '-' + currentAccLevel.value, 0)-->
<!--}-->

<!--const handleLevelChange = (val: any) => {-->
<!--  emit('levelChange', val)-->
<!--  preCheck(currentAccType.value + '-' + currentAccLevel.value, 0)-->
<!--}-->

<!--// 作业选项-->
<!--const accTaskOptions = ref([])-->
<!--// 作业程序文件名称选项-->
<!--const accTaskProgramOptions = ref([])-->
<!--const currentTaskProgram = ref()-->
<!--const handleTaskNameChange = (val: any) => {-->
<!--  // 清空当前行的程序文件名称和文件描述-->
<!--  clickedTaskTableCell.value.fileName = ''-->
<!--  clickedTaskTableCell.value.fileDesc = ''-->
<!--  clickedTaskTableCell.value.code = ''-->

<!--  updateFileNameAndFileDesc(clickedTaskTableCell.value.rowid, null, null, null, null)-->

<!--  getBaseTasksByNameApi(val.value).then(res => {-->
<!--    if (res.code === 200) {-->
<!--      accTaskProgramOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item.id,-->
<!--          label: item.pname,-->
<!--          val: item.id,-->
<!--          tid: item.id,-->
<!--          // 所属作业名称-->
<!--          tName: item.name,-->
<!--          // 在作业中的序号-->
<!--          tSort: item.sort,-->
<!--          description: item.description,-->
<!--          fileName: item.fileName-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  })-->
<!--}-->

<!--const handleTaskProgramChange = (val: any) => {-->
<!--}-->

<!--const xGrid1 = ref<VxeGridInstance>()-->
<!--// 作业表格配置-->
<!--const taskTableOptions = ref({-->
<!--  id: 'taskTable',-->
<!--  border: true,-->
<!--  resizable: true,-->
<!--  align: "center",-->
<!--  keepSource: true,-->
<!--  showOverflow: true,-->
<!--  toolbarConfig: {-->
<!--    slots: {-->
<!--      buttons: 'toolbarButtons',-->
<!--    }-->
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
<!--    showStatus: true,-->
<!--    // beforeEditMethod({rowIndex}) {-->
<!--    //   // 仅新增的行才能编辑-->
<!--    //   return rowIndex >= taskTableOptions.value.data.length-->
<!--    // }-->
<!--  },-->
<!--  columns: [-->
<!--    {type: 'checkbox', field: "seqCheck", width: 50},-->
<!--    {type: 'seq', field: "seq", title: "作业序号", width: 80},-->
<!--    {field: 'taskName', title: '作业名称', editRender: {}, slots: {edit: 'taskName_edit', default: 'taskName_default'}},-->
<!--    // {field: "progSeq", title: "文件序号", width: 80},-->
<!--    {field: 'code', title: '作业程序文件名称', editRender: {}, slots: {edit: 'code_edit', default: 'code_default'}},-->
<!--    {field: 'fileDesc', title: '文件描述', slots: {default: 'fileDesc_default'}},-->
<!--    {field: 'fileName', title: '文件名', slots: {default: 'fileName_default'}}-->
<!--    // {-->
<!--    //   title: '操作',-->
<!--    //   width: 250,-->
<!--    //   align: "center",-->
<!--    //   slots: {-->
<!--    //     default: "operation"-->
<!--    //   }-->
<!--    // },-->
<!--  ],-->
<!--  data: [],-->
<!--})-->

<!--const insertTask = () => {-->
<!--  xGrid1.value.insertAt({-->
<!--    tid: null,-->
<!--    did: null,-->
<!--    id: null,-->
<!--    taskName: '',-->
<!--    code: '',-->
<!--    fileDesc: '',-->
<!--    fileName: '',-->
<!--    progSeq: xGrid1.value.getTableData().tableData.length + 1,-->
<!--  }, -1)-->
<!--}-->

<!--const removeTask = async () => {-->
<!--  //   ElMessageBox.confirm('确定要删除该数据吗？', '警告', {-->
<!--  //   confirmButtonText: '确定',-->
<!--  //   cancelButtonText: '取消',-->
<!--  //   type: 'warning'-->
<!--  // }).then(() => {-->
<!--  //   const $grid = xGrid1.value-->
<!--  //   if ($grid) {-->
<!--  //     const selectRecords = $grid.getCheckboxRecords()-->
<!--  //     if (selectRecords.length) {-->
<!--  //       $grid.remove(selectRecords)-->
<!--  //     }-->
<!--  //   }-->
<!--  // })-->

<!--  const type = await VXETable.modal.confirm('您确定要删除该数据?')-->
<!--  const $grid = xGrid1.value-->
<!--  if ($grid) {-->
<!--    if (type === 'confirm') {-->
<!--      const selectRecords = $grid.getCheckboxRecords()-->
<!--      if (selectRecords.length) {-->
<!--        await $grid.remove(selectRecords)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--// 当前点击的单元格-->
<!--const clickedTaskTableCell = ref<any>({})-->

<!--const handleTaskTableCellClick = (params: any) => {-->
<!--  clickedTaskTableCell.value = params-->
<!--  // 如果当前点击的行是新增的行，则根据作业名称获取作业程序文件名称-->
<!--  getBaseTasksByNameApi(params.row.taskName).then(res => {-->
<!--    if (res.code === 200) {-->
<!--      accTaskProgramOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item.id,-->
<!--          label: item.pname,-->
<!--          val: item.pname,-->
<!--          progSeq: params.$rowIndex + 1,-->
<!--          fileDesc: item.description,-->
<!--          sort: item.sort,-->
<!--          fileName: item.fileName-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  })-->
<!--}-->

<!--const handleTaskTableCellEditClosed = (params: any) => {-->
<!--  // 判断params.row.code是否为数组-->
<!--  if (Array.isArray(params.row.code)) {-->
<!--    params.row.code.forEach((item: any, index: any) => {-->
<!--      if (index > 0) {-->
<!--        let taskProgram = accTaskProgramOptions.value.find((i: any) => i.val === item)-->
<!--        let temp = {-->
<!--          tid: taskProgram.id,-->
<!--          did: null,-->
<!--          id: null,-->
<!--          taskName: clickedTaskTableCell.value.row.taskName,-->
<!--          code: taskProgram.val,-->
<!--          fileDesc: taskProgram.fileDesc,-->
<!--          fileName: taskProgram.fileName,-->
<!--          fromComm: false,-->
<!--          progSeq: xGrid1.value.getTableData().tableData.length + 1,-->
<!--        }-->

<!--        // 如果 xGrid1.value.getRecordset().insertRecords 中有元素的 taskName、code、fileDesc和fileName与 temp 中的相等，则不插入-->
<!--        let hasInserted = xGrid1.value.getRecordset().insertRecords.some((i: any) => i.taskName === temp.taskName && i.code === temp.code && i.fileDesc === temp.fileDesc && i.fileName === temp.fileName)-->
<!--        let hasExisted = xGrid1.value.getTableData().tableData.some((i: any) => i.taskName === temp.taskName && i.code === temp.code && i.fileDesc === temp.fileDesc && i.fileName === temp.fileName)-->
<!--        if (!hasInserted && !hasExisted) {-->
<!--          xGrid1.value.insertAt(temp, -1)-->
<!--        }-->

<!--        // if (!xGrid1.value.getRecordset().insertRecords.some((i: any) => i.taskName === temp.taskName && i.code === temp.code && i.fileDesc === temp.fileDesc && i.fileName === temp.fileName)) {-->
<!--        //   xGrid1.value.insertAt(temp, -1)-->
<!--        // }-->
<!--      }-->
<!--    })-->

<!--    let taskProgram = accTaskProgramOptions.value.find((i: any) => i.val === params.row.code[0])-->

<!--    for (let i = 0; i < xGrid1.value.getRecordset().insertRecords.length; i++) {-->
<!--      if (xGrid1.value.getRecordset().insertRecords[i]._X_ROW_KEY === clickedTaskTableCell.value.rowid) {-->
<!--        xGrid1.value.getRecordset().insertRecords[i].tid = taskProgram.id-->
<!--        xGrid1.value.getRecordset().insertRecords[i].taskName = clickedTaskTableCell.value.row.taskName-->
<!--        xGrid1.value.getRecordset().insertRecords[i].code = taskProgram.label-->
<!--        xGrid1.value.getRecordset().insertRecords[i].fileName = taskProgram.fileName-->
<!--        xGrid1.value.getRecordset().insertRecords[i].fileDesc = taskProgram.fileDesc-->
<!--        xGrid1.value.getRecordset().insertRecords[i].fromComm = false-->
<!--        break-->
<!--      }-->
<!--    }-->
<!--  } else {-->
<!--    let taskProgram = accTaskProgramOptions.value.find((i: any) => i.id === clickedTaskTableCell.value.row.tid)-->
<!--    let t = accTaskProgramOptions.value.map((item: any) => item.val)-->
<!--    let has = t.map((item: any) => {-->
<!--      return {code: item, flag: params.row.code.includes(item)}-->
<!--    })-->

<!--    if (has.length > 0) {-->
<!--      has.forEach((item: any, index: any) => {-->
<!--        if (item.flag && item.code !== taskProgram.val) {-->
<!--          let taskProgram = accTaskProgramOptions.value.find((i: any) => i.val === item.code)-->
<!--          let temp = {-->
<!--            tid: taskProgram.id,-->
<!--            did: null,-->
<!--            id: null,-->
<!--            taskName: clickedTaskTableCell.value.row.taskName,-->
<!--            code: taskProgram.val,-->
<!--            fileDesc: taskProgram.fileDesc,-->
<!--            fileName: taskProgram.fileName,-->
<!--            fromComm: false,-->
<!--            progSeq: xGrid1.value.getTableData().tableData.length + 1,-->
<!--          }-->

<!--          // 已新增或已存在的数据不插入，否则插入-->
<!--          let hasInserted = xGrid1.value.getRecordset().insertRecords.some((i: any) => i.taskName === temp.taskName && i.code === temp.code && i.fileDesc === temp.fileDesc && i.fileName === temp.fileName)-->
<!--          let hasExisted = xGrid1.value.getTableData().tableData.some((i: any) => i.taskName === temp.taskName && i.code === temp.code && i.fileDesc === temp.fileDesc && i.fileName === temp.fileName)-->
<!--          if (!hasInserted && !hasExisted) {-->
<!--            xGrid1.value.insertAt(temp, -1)-->
<!--          }-->
<!--        }-->
<!--      })-->

<!--      for (let i = 0; i < xGrid1.value.getTableData().tableData.length; i++) {-->
<!--        if (xGrid1.value.getTableData().tableData[i]._X_ROW_KEY === clickedTaskTableCell.value.rowid) {-->
<!--          xGrid1.value.getTableData().tableData[i].tid = taskProgram.id-->
<!--          xGrid1.value.getTableData().tableData[i].taskName = clickedTaskTableCell.value.row.taskName-->
<!--          xGrid1.value.getTableData().tableData[i].code = taskProgram.val-->
<!--          xGrid1.value.getTableData().tableData[i].fileName = taskProgram.fileName-->
<!--          xGrid1.value.getTableData().tableData[i].fileDesc = taskProgram.fileDesc-->
<!--          xGrid1.value.getTableData().tableData[i].fromComm = taskProgram.fromComm-->
<!--          break-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--/****************************************** 设备 ******************************************/-->
<!--const xGrid2 = ref<VxeGridInstance>()-->
<!--// 设备表格配置-->
<!--const equipmentTableOptions = ref({-->
<!--  id: 'equipmentTable',-->
<!--  border: true,-->
<!--  resizable: true,-->
<!--  align: "center",-->
<!--  keepSource: true,-->
<!--  showOverflow: true,-->
<!--  rowConfig: {-->
<!--    isCurrent: true-->
<!--  },-->
<!--  toolbarConfig: {-->
<!--    slots: {-->
<!--      buttons: 'toolbarButtons',-->
<!--    }-->
<!--  },-->
<!--  editConfig: {-->
<!--    trigger: 'click',-->
<!--    mode: 'row',-->
<!--    showStatus: true-->
<!--  },-->
<!--  columns: [-->
<!--    {type: 'checkbox', width: 120},-->
<!--    {type: 'seq', title: "序号", width: 120},-->
<!--    {-->
<!--      field: 'name',-->
<!--      title: '设备名称',-->
<!--      editRender: {autofocus: '.vxe-input&#45;&#45;inner'}, slots: {edit: 'name_edit', default: 'name_default'}-->
<!--    },-->
<!--    {-->
<!--      field: 'description',-->
<!--      title: '设备要求',-->
<!--      editRender: {}, slots: {edit: 'description_edit'}-->
<!--    },-->
<!--    {-->
<!--      field: 'number',-->
<!--      title: '数量',-->
<!--      editRender: {}, slots: {edit: 'number_edit'}-->
<!--    },-->
<!--    // {-->
<!--    //   title: '操作',-->
<!--    //   width: 150,-->
<!--    //   align: "center",-->
<!--    //   slots: {-->
<!--    //     default: "operation"-->
<!--    //   }-->
<!--    // },-->
<!--  ],-->
<!--  data: []-->
<!--})-->
<!--// 设备选项-->
<!--const equipmentOptions = ref([])-->

<!--const insertEquipment = (row) => {-->
<!--  xGrid2.value.insertAt({-->
<!--    name: '',-->
<!--    description: '',-->
<!--    count: 0-->
<!--  }, -1)-->
<!--}-->

<!--const removeEquipment = async (row) => {-->
<!--  const type = await VXETable.modal.confirm('您确定要删除该数据?')-->
<!--  const $grid = xGrid2.value-->
<!--  if ($grid) {-->
<!--    if (type === 'confirm') {-->
<!--      const selectRecords = $grid.getCheckboxRecords()-->
<!--      if (selectRecords.length) {-->
<!--        await $grid.remove(selectRecords)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->


<!--/****************************************** 人员 ******************************************/-->
<!--const xGrid3 = ref<VxeGridInstance>()-->
<!--// 人员表格配置-->
<!--const personnelTableOptions = ref({-->
<!--  id: 'personnelTable',-->
<!--  border: true,-->
<!--  resizable: true,-->
<!--  align: "center",-->
<!--  keepSource: true,-->
<!--  showOverflow: true,-->
<!--  rowConfig: {-->
<!--    isCurrent: true-->
<!--  },-->
<!--  toolbarConfig: {-->
<!--    slots: {-->
<!--      buttons: 'toolbarButtons',-->
<!--    }-->
<!--  },-->
<!--  editConfig: {-->
<!--    trigger: 'click',-->
<!--    mode: 'row',-->
<!--    showStatus: true-->
<!--  },-->
<!--  columns: [-->
<!--    {type: 'checkbox', width: 120},-->
<!--    {type: 'seq', title: "序号", width: 120},-->
<!--    {-->
<!--      field: 'type',-->
<!--      title: '作业人员类型',-->
<!--      editRender: {autofocus: '.vxe-input&#45;&#45;inner'}, slots: {edit: 'type_edit', default: 'type_default'}-->
<!--    },-->
<!--    {-->
<!--      field: 'description',-->
<!--      title: '人员要求',-->
<!--      editRender: {}, slots: {edit: 'description_edit'}-->
<!--    },-->
<!--    {-->
<!--      field: 'number',-->
<!--      title: '人数',-->
<!--      editRender: {}, slots: {edit: 'number_edit'}-->
<!--    },-->
<!--    // {-->
<!--    //   title: '操作',-->
<!--    //   width: 150,-->
<!--    //   align: "center",-->
<!--    //   slots: {-->
<!--    //     default: "operation"-->
<!--    //   }-->
<!--    // },-->
<!--  ],-->
<!--  data: []-->
<!--})-->

<!--// 人员选项-->
<!--const personnelOptions = ref([])-->

<!--const insertPersonnel = () => {-->
<!--  xGrid3.value.insertAt({-->
<!--    taskName: '',-->
<!--    programFileName: '',-->
<!--    fileDesc: 0-->
<!--  }, -1)-->
<!--}-->

<!--const removePersonnel = async () => {-->
<!--  const type = await VXETable.modal.confirm('您确定要删除该数据?')-->
<!--  const $grid = xGrid3.value-->
<!--  if ($grid) {-->
<!--    if (type === 'confirm') {-->
<!--      const selectRecords = $grid.getCheckboxRecords()-->
<!--      if (selectRecords.length) {-->
<!--        await $grid.remove(selectRecords)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->


<!--/****************************************** 提交 ******************************************/-->
<!--const handleSubmit = () => {-->
<!--  hadSubmitted.value = false-->
<!--  let dispositionTaskList = []-->
<!--  let dispositionDeviceList = []-->
<!--  let dispositionPersonList = []-->
<!--  // 获取作业表格数据-->
<!--  let td = xGrid1.value.getTableData()-->
<!--  let ed = xGrid2.value.getTableData()-->
<!--  let pd = xGrid3.value.getTableData()-->
<!--  td.tableData.forEach((item: any, index: any) => {-->
<!--    if (item.taskName && item.code) {-->
<!--      dispositionTaskList.push({tid: item.tid, fromComm: item.fromComm})-->
<!--    }-->
<!--  })-->
<!--  ed.tableData.forEach((item: any, index: any) => {-->
<!--    if (item.name) {-->
<!--      dispositionDeviceList.push({...item})-->
<!--    }-->
<!--  })-->
<!--  pd.tableData.forEach((item: any, index: any) => {-->
<!--    if (item.type) {-->
<!--      dispositionPersonList.push({...item})-->
<!--    }-->
<!--  })-->

<!--  const disposition = {-->
<!--    id: stepDataId.value,-->
<!--    // 事故处置决策类型-->
<!--    measureDecision: currentAccMeasureDecisionType.value,-->
<!--    classify: 0,-->
<!--    level: currentAccLevel.value,-->
<!--    type: currentAccType.value,-->
<!--    tag: accidentIdentifying.value,-->
<!--    expression: accidentDescription.value,-->
<!--    dispositionTaskList: dispositionTaskList,-->
<!--    dispositionDeviceList: dispositionDeviceList,-->
<!--    dispositionPersonList: dispositionPersonList,-->
<!--  }-->
<!--  let formData = new FormData()-->
<!--  formData.append('disposition', JSON.stringify(disposition))-->
<!--  saveTaskProgramApi(formData, false).then(res => {-->
<!--    if (res.code === 200) {-->
<!--      hadSubmitted.value = true-->
<!--      ElMessage.success('提交成功')-->

<!--      getTabData(null, accidentIdentifying.value, 0, currentAccMeasureDecisionType.value)-->

<!--      emit('submit', hadSubmitted.value)-->
<!--    }-->
<!--  })-->
<!--}-->

<!--/****************************************** utils ******************************************/-->
<!--// 根据选项值获取选项label-->
<!--const getLabelByValue = (options: any, value: any) => {-->
<!--  if (value) {-->
<!--    return options.find((item: any) => item.val === value)?.label-->
<!--  }-->
<!--}-->

<!--// 保存操作的预检查-->
<!--const preCheck = (tag: string, classify: number) => {-->
<!--  let canSave = true-->
<!--  checkExistApi(currentAccType.value + '-' + currentAccLevel.value, 0).then(res => {-->
<!--    if (res.code === 200) {-->
<!--      if (res.data > 0) {-->
<!--        ElMessage.warning(accidentIdentifying.value + '已存在！')-->
<!--        canSave = false-->
<!--      }-->
<!--    }-->
<!--  })-->
<!--  return canSave-->
<!--}-->

<!--// 查询标签下数据-->
<!--const getTabData = (id: any, tag: any, classify: any, measureDecision: any) => {-->
<!--  // 根据标签名称获取对应的数据-->
<!--  getEditDataByTagOrIdApi(null, tag, classify, measureDecision).then(res => {-->
<!--    if (res.code === 200) {-->
<!--      if (res.data) {-->
<!--        stepDataId.value = res.data.id-->

<!--        currentAccType.value = res.data.type-->
<!--        currentAccLevel.value = res.data.level-->
<!--        accidentIdentifying.value = res.data.tag-->
<!--        accidentDescription.value = res.data.expression-->

<!--        taskTableOptions.value.data = res.data.dispositionTaskList.map((item: any) => {-->
<!--          return {-->
<!--            id: item.id,-->
<!--            did: item.did,-->
<!--            tid: item.tid,-->
<!--            taskName: item.baseTask?.name,-->
<!--            code: item.baseTask?.pname,-->
<!--            fileDesc: item.baseTask?.description,-->
<!--            fileName: item.baseTask?.fileName,-->
<!--            sort: item.sort-->
<!--          }-->
<!--        })-->

<!--        equipmentTableOptions.value.data = res.data.dispositionDeviceList-->
<!--        personnelTableOptions.value.data = res.data.dispositionPersonList-->
<!--      } else {-->
<!--        stepDataId.value = null-->

<!--        currentAccType.value = data.value.type-->
<!--        currentAccLevel.value = data.value.level-->
<!--        accidentIdentifying.value = data.value.tag-->
<!--        accidentDescription.value = data.value.expression-->

<!--        taskTableOptions.value.data = []-->
<!--        equipmentTableOptions.value.data = []-->
<!--        personnelTableOptions.value.data = []-->
<!--      }-->
<!--    }-->
<!--    hasTabChanged.value = false-->
<!--  })-->
<!--}-->

<!--// 选择作业程序文件后更新文件名称与文件描述-->
<!--const updateFileNameAndFileDesc = (rowId: any, codeName: any, id: any, fileName: any, fileDesc: any) => {-->
<!--  // 如果 rowId 为 xGrid1.value.getRecordset().insertRecords 中某元素的 _X_ROW_KEY，则为新增数据-->
<!--  if (xGrid1.value.getRecordset().insertRecords.some((item: any) => item._X_ROW_KEY === rowId)) {-->
<!--    for (let item of xGrid1.value.getRecordset().insertRecords) {-->
<!--      if (item._X_ROW_KEY === rowId) {-->
<!--        // 作业程序名称-->
<!--        item.code = codeName-->
<!--        // 作业程序 id-->
<!--        item.tid = id-->
<!--        item.fileName = fileName-->
<!--        item.fileDesc = fileDesc-->
<!--        break-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  // 修改数据-->
<!--  if (xGrid1.value.getRecordset().updateRecords.some((item: any) => item._X_ROW_KEY === rowId)) {-->
<!--    for (let item of xGrid1.value.getRecordset().updateRecords) {-->
<!--      if (item._X_ROW_KEY === rowId) {-->
<!--        // 作业程序名称-->
<!--        item.code = codeName-->
<!--        // 作业程序 id-->
<!--        item.tid = id-->
<!--        item.fileName = fileName-->
<!--        item.fileDesc = fileDesc-->
<!--        item.fromComm = item.fromComm-->
<!--        break-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--// 检查表格数据是否有变动-->
<!--const checkRecordset = (recordset) => {-->
<!--  if (recordset.insertRecords.length > 0 || recordset.removeRecords.length > 0 || recordset.updateRecords.length > 0) {-->
<!--    hadSubmitted.value = false;-->
<!--  }-->
<!--}-->

<!--watch(-->
<!--    () => data.value,-->
<!--    (newVal, oldVal) => {-->
<!--      if (newVal) {-->
<!--        currentAccType.value = newVal.type-->
<!--        currentAccLevel.value = newVal.level-->
<!--        accidentIdentifying.value = newVal.tag-->
<!--        accidentDescription.value = newVal.expression-->
<!--      }-->
<!--    },-->
<!--    {deep: true, immediate: true}-->
<!--)-->


<!--/****************************************** 生命周期 ******************************************/-->
<!--onBeforeMount(() => {-->
<!--  if (props.dialogControl.title === "编辑通用处理程序") {-->
<!--    getTabData(null, data.value.tag, 0, data.value.measureDecision)-->
<!--  } else if (props.dialogControl.title === "添加通用处理程序") {-->
<!--    showAddBtn.value = true-->

<!--    taskTableOptions.value.data = []-->
<!--    equipmentTableOptions.value.data = []-->
<!--    personnelTableOptions.value.data = []-->
<!--  }-->

<!--  // 获取事故决策类型选项-->
<!--  getAccidentTypeApi('accMeasureDecision').then(res => {-->
<!--    if (res.code === 200) {-->
<!--      accMeasureDecisionTypeOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item.id,-->
<!--          label: item.name,-->
<!--          val: item.code-->
<!--        }-->
<!--      })-->
<!--      currentAccMeasureDecisionType.value = accMeasureDecisionTypeOptions.value[0].val-->
<!--      accMeasureTemp = accMeasureDecisionTypeOptions.value[0].val-->
<!--    }-->
<!--  })-->

<!--  // 获取事故类型选项-->
<!--  getAccidentTypeApi('accType').then(res => {-->
<!--    if (res.code === 200) {-->
<!--      // 事故类型-->
<!--      accTypeOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item.id,-->
<!--          label: item.name,-->
<!--          val: item.code-->
<!--        }-->
<!--      })-->
<!--      if (props.dialogControl.title === "添加通用处理程序") {-->
<!--        currentAccType.value = accTypeOptions.value[0].val-->
<!--        accidentIdentifying.value = accTypeOptions.value[0].val + '-1'-->
<!--      }-->
<!--    }-->
<!--  })-->

<!--  // 获取事故等级选项-->
<!--  getAccidentTypeApi('accLevel').then(res => {-->
<!--    if (res.code === 200) {-->
<!--      // 事故等级-->
<!--      accLevelOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item.id,-->
<!--          label: item.name,-->
<!--          val: item.code-->
<!--        }-->
<!--      })-->
<!--      if (props.dialogControl.title === "添加通用处理程序") {-->
<!--        currentAccLevel.value = accLevelOptions.value[0].val-->
<!--        accidentDescription.value = accidentIdentifying.value + '级事故'-->
<!--      } else if (props.dialogControl.title === "编辑通用处理程序") {-->
<!--        // 查询accLevelOptions.value中是否有某个元素的val与data.value.level相等-->
<!--        // 如果有，则将currentAccLevel.value设置为该元素的val-->
<!--        // 如果没有，则将currentAccLevel.value设置为accLevelOptions.value[0].val-->
<!--        currentAccLevel.value = accLevelOptions.value.find((item: any) => item.val === data.value.level)?.val || accLevelOptions.value[0].val-->
<!--      }-->
<!--    }-->
<!--  })-->

<!--  // 获取作业选项-->
<!--  getTaskOptionsApi().then(res => {-->
<!--    if (res.code === 200) {-->
<!--      accTaskOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item,-->
<!--          label: item,-->
<!--          val: item-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  })-->

<!--  // 获取设备选项-->
<!--  getAccidentTypeApi('accDevice').then(res => {-->
<!--    if (res.code === 200) {-->
<!--      equipmentOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item.id,-->
<!--          label: item.name,-->
<!--          val: item.code-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  })-->

<!--  // 获取人员选项-->
<!--  getAccidentTypeApi('accProfessional').then(res => {-->
<!--    if (res.code === 200) {-->
<!--      personnelOptions.value = res.data.map((item: any) => {-->
<!--        return {-->
<!--          id: item.id,-->
<!--          label: item.name,-->
<!--          val: item.code-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  })-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--.head-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.span {-->
<!--  flex: 1;-->
<!--  font-size: large;-->
<!--  font-weight: bolder;-->
<!--  text-align: center;-->
<!--}-->

<!--.table-info {-->
<!--  flex: 1;-->
<!--}-->

<!--:deep(.vxe-buttons&#45;&#45;wrapper) {-->
<!--  display: flex;-->
<!--}-->

<!--:deep(.el-tabs__nav-scroll) {-->
<!--  width: 50% !important;-->
<!--  margin: 0 auto !important;-->
<!--}-->

<!--:deep(.el-tabs__content) {-->
<!--  padding: 3px 5px;-->
<!--}-->

<!--.existed-file-name {-->
<!--  color: #186ec9;-->
<!--}-->

<!--.existed-file-name:hover {-->
<!--  cursor: pointer;-->
<!--  color: #618dfd;-->
<!--}-->
<!--</style>-->
