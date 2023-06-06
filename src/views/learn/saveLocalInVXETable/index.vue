<template>
  <vxe-toolbar>
    <template #buttons>
      <vxe-button @click="insertEvent">新增</vxe-button>
      <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
      <vxe-button @click="getInsertEvent">获取新增</vxe-button>
      <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
      <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      <vxe-button @click="saveEvent">保存</vxe-button>
    </template>
  </vxe-toolbar>

  <vxe-table
      border
      show-overflow
      keep-source
      ref="xTable"
      :loading="loading"
      :data="tableData"
      :row-config="{isHover: true, isCurrent:true}"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
      @current-change="currentChangeEvent"
  >
    <vxe-column type="checkbox" width="60"></vxe-column>
    <vxe-column type="seq" width="60"></vxe-column>
    <vxe-column field="name" title="Name" :edit-render="{autofocus: '.myinput'}">
      <template #edit="scope">
        <input type="text" class="myinput" v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"/>
      </template>
    </vxe-column>
    <vxe-column field="status" title="Status" :edit-render="{autofocus: '.myinput'}">
      <template #edit="scope">
        <input type="text" class="myinput" v-model="scope.row.status" @input="$refs.xTable.updateStatus(scope)"/>
      </template>
    </vxe-column>
    <vxe-column title="操作" width="300">
      <template #default="{ row }">
        <vxe-button @click="handleDirectUpdate(row)">点击status更新</vxe-button>
        <template v-if="$refs.xTable.isUpdateByRow(row)">
          <vxe-button @click="saveTheUpdate(row)" :loading="row.loading">更新编辑</vxe-button>
        </template>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<script setup lang="ts">

import {onMounted, ref} from 'vue'
import {VXETable, VxeTableInstance, VxeColumnPropTypes} from 'vxe-table'
import XEUtils from 'xe-utils'

import {GetTestData, DirectUpdate, SaveTheUpdate} from "../../../api/learn/saveLocalInVXETable.js";


const loading = ref(false)
const tableData = ref<any[]>(null)

const xTable = ref<VxeTableInstance>();

const formatDate: VxeColumnPropTypes.Formatter = ({cellValue}) => {
  return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
}

/********************* 局部更新 *********************/
// 直接更新
const handleDirectUpdate = (row: any) => {
  console.log('row:', row)
  const $table = xTable.value
  row.loading = true
  let data = {
    id: row.id,
    name: row.name,
    status: row.status
  }
  const dataForm = {
    data: data
  }
  DirectUpdate(dataForm).then(response => {
    console.log('response:', response)
    row.loading = false
    tableData.value.find(item => item.id === row.id).status = response.data.data.status
    // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true
    $table.reloadRow(row, {})
    VXETable.modal.message({content: '保存成功！', status: 'success'})
  }).catch(error => {
    console.log(error)
  })
}

// 保存更新
const saveTheUpdate = (row: any) => {
  const $table = xTable.value
  if ($table.isUpdateByRow(row)) {
    row.loading = true
    let data = {
      id: row.id,
      name: row.name,
      status: row.status
    }
    const dataForm = {
      data: data
    }
    SaveTheUpdate(dataForm).then(response => {
      console.log('response:', response)
      row.loading = false
      tableData.value.find(item => item.id === row.id).status = response.data.data.status
      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true
      $table.reloadRow(row, {})
      VXETable.modal.message({content: '保存成功！', status: 'success'})
    }).catch(error => {
      console.log(error)
    })
  } else {
    VXETable.modal.message({content: '数据未改动！', status: 'info'})
  }
}

/******************** 顶部工具栏按钮事件 ********************/
const insertEvent = async () => {
  const $table = xTable.value
  const record = {}
  const {row: newRow} = await $table.insert(record)
  await $table.setEditCell(newRow, 'name')
}


const saveEvent = () => {
  loading.value = true
  // 默认异步
  setTimeout(() => {
    loading.value = false
    // 保存完成后重新刷新数据
    tableData.value = []
  }, 300)
}

const getInsertEvent = () => {
  const $table = xTable.value
  const insertRecords = $table.getInsertRecords()
  VXETable.modal.alert(`新增：${insertRecords.length}`)
}

const getRemoveEvent = () => {
  const $table = xTable.value
  const removeRecords = $table.getRemoveRecords()
  VXETable.modal.alert(`删除：${removeRecords.length}`)
}

const getUpdateEvent = () => {
  const $table = xTable.value
  const updateRecords = $table.getUpdateRecords()
  VXETable.modal.alert(`更新：${updateRecords.length}`)
}


/**
 * 获取当前选中的行
 */
// 表格当前选中行数据
const curRow: any = ref();
const currentChangeEvent = () => {
  const $table: any = xTable.value;
  curRow.value = $table.getCurrentRecord();
}


onMounted(() => {
  GetTestData().then(response => {
    console.log('response:', response)
    tableData.value = response.data.dataList
  }).catch(error => {
    console.log(error)
  })

})
</script>

<style scoped>

</style>


<!--<template>-->
<!--  <el-dialog-->
<!--      title="【数据库管理员】用户授权"-->
<!--      width='800px'-->
<!--      :close-on-click-modal="false"-->
<!--      v-model="dialogIsVisible"-->
<!--      style="height: 680px; width: 700px;"-->
<!--      :destroy-on-close="true"-->
<!--      @close="closeDialog"-->
<!--      @opened="openDialogHandler"-->
<!--  >-->
<!--    <div style="height: 510px;">-->
<!--      <el-scrollbar max-height='500px'>-->
<!--        <el-tree-->
<!--            ref='userTreeRef'-->
<!--            node-key='id'-->
<!--            :data='userOptions'-->
<!--            :check='checkedChange'-->
<!--            show-checkbox-->
<!--            :props="{ children: 'nodes', label: 'text', disabled: ''}"-->
<!--            :expand-on-click-node='false'-->
<!--            default-expand-all-->
<!--        />-->
<!--      </el-scrollbar>-->
<!--    </div>-->
<!--    <template #footer>-->
<!--      <el-row>-->
<!--        <el-col :span="12" style="text-align: left!important;">-->
<!--          <el-button @click="closeDialog1" :icon="WarningFilled" :size="20"/>-->
<!--          <el-button @click="closeDialog1" :icon="QuestionFilled" :size="20"/>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-button @click="closeDialog" :icon="CircleClose">关闭</el-button>-->
<!--          <el-button type='primary' @click='submit' :icon="Checked">确定</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </template>-->
<!--  </el-dialog>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {onMounted, reactive, ref, toRefs, watch, computed} from "vue";-->
<!--import {ElForm, ElMessage, ElTree} from 'element-plus'-->
<!--import {Checked, QuestionFilled, WarningFilled, CircleClose} from '@element-plus/icons-vue'-->

<!--import {getDbAdminUsersTree, saveDbAdminUsers} from '@/api/dbManage/registerCenter'-->
<!--import {user} from "@/api/framework/resource/role/types";-->
<!--import {isCenterAdmin, isRoleA, isRoleB, isRoleC, isSubAdmin} from "@/utils/auth";-->


<!--// const props = defineProps<{-->
<!--//   dialogData: {-->
<!--//     dbid: undefined,-->
<!--//     dialogVisible: boolean,-->
<!--//   }-->
<!--// }>()-->

<!--const props = defineProps({-->
<!--  dbid: {-->
<!--    type: String,-->
<!--    required: true-->
<!--  },-->
<!--  dialogVisible: {-->
<!--    type: Boolean,-->
<!--    default: false-->
<!--  },-->
<!--})-->

<!--const dialogIsVisible = computed(() => {-->
<!--  console.log('props.dialogVisible:', props.dialogVisible)-->
<!--  return props.dialogVisible-->
<!--})-->

<!--const emit = defineEmits(['clean-dialog-data'])-->

<!--const dataFormRef = ref(ElForm)-->
<!--// 授权用户树-->
<!--const userTreeRef = ref(ElTree)-->

<!--const state = reactive({-->
<!--  // 提示-->
<!--  placeholder: "数据库管理员",-->
<!--  // 可被分配权限的用户的列表-->
<!--  userOptions: [] as any[],-->
<!--  dialogVisible: false,-->
<!--})-->

<!--const {-->
<!--  placeholder,-->
<!--  userOptions,-->
<!--  dialogVisible,-->
<!--} = toRefs(state);-->

<!--// watch(props, () => {-->
<!--//   // console.log('子组件接受到props.dialogData：', props.dialogData)-->
<!--//   state.dialogVisible = props.dialogVisible-->
<!--//   getDbAdminUsersTree(props.dbid).then((response) => {-->
<!--//     // console.log('response:', response)-->
<!--//     userOptions.value = response.data-->
<!--//-->
<!--//     setNodesChecked()-->
<!--//   })-->
<!--// })-->


<!--/********************************* tree事件 *********************************/-->
<!--// 选中事件-->
<!--function checkedChange(data: any, checked: any, indeterminate: any) {-->
<!--  console.log('checkedChange:', data, checked, indeterminate)-->
<!--}-->


<!--/********************************* dialog事件 *********************************/-->
<!--// 提交-->
<!--const submit = () => {-->
<!--  const userCodeList = getCheckedUsersCode()-->

<!--  console.log('userCodeList:', userCodeList)-->
<!--  saveDbAdminUsers(props.dbid, userCodeList).then((data) => {-->
<!--    ElMessage.success('数据库管理员设置成功')-->
<!--  }).finally(() => {-->
<!--    closeDialog()-->
<!--  })-->
<!--}-->

<!--function openDialogHandler() {-->
<!--  init()-->
<!--}-->

<!--const closeDialog = () => {-->
<!--  state.dialogVisible = false-->
<!--  state.placeholder = ""-->
<!--  state.userOptions = []-->
<!--  console.log('子组件抛出：', state.dialogVisible)-->
<!--  // emit('clean-dialog-data', state.dialogVisible, state.userOptions)-->
<!--  emit("clean-dialog-data", "AToBDbTableAuth", false);-->
<!--}-->


<!--/**************************** utils ******************************/-->
<!--// 根据 selectable 字段设置节点是否默认被选中-->
<!--function setNodesChecked() {-->
<!--  const list: any = []-->
<!--  let roleUserList = check(state.userOptions, list)-->
<!--  let listCode: any = []-->
<!--  for (let i = 0; i < roleUserList.length; i++) {-->
<!--    if (roleUserList[i].selectable == true) {-->
<!--      listCode[i] = roleUserList[i].id-->
<!--    }-->
<!--  }-->
<!--  // console.log('listCode:', listCode)-->
<!--  userTreeRef.value!.setCheckedKeys(listCode, false)-->
<!--}-->

<!--// 递归树形数据-->
<!--function check(data, list) {-->
<!--  data.forEach((item) => {-->
<!--    if (item.nodes && item.nodes.length > 0) {-->
<!--      check(item.nodes, list)-->
<!--    } else {-->
<!--      list.push(item)-->
<!--    }-->
<!--  })-->
<!--  return list-->
<!--}-->

<!--// 获取被选中的用户的code-->
<!--function getCheckedUsersCode(): string {-->
<!--  // 获取被选中的节点-->
<!--  const userNode = userTreeRef.value!.getCheckedNodes(false, false)-->
<!--  // console.log('userNode:', userNode)-->

<!--  let userCodeNode: any = []-->
<!--  let temp = 0-->
<!--  for (let i = 0; i < userNode.length; i++) {-->
<!--    // 从用户节点中获取用户code-->
<!--    if (userNode[i].type == 'user') {-->
<!--      userCodeNode[temp] = userNode[i].userCode-->
<!--      temp++-->
<!--    }-->
<!--  }-->
<!--  return userCodeNode.join(',')-->
<!--}-->


<!--/********************************* init *********************************/-->
<!--// 表格当前选中行数据-->
<!--const curRow: any = ref();-->
<!--// 当前用户是否为中心管理员-->
<!--const center_admin = isCenterAdmin();-->
<!--// 当前用户是否为子管理员-->
<!--const sub_admin = isSubAdmin();-->
<!--// 当前用户是否为数据库系统管理员（A）-->
<!--const db_sys_admin = isRoleA()-->
<!--// 当前用户是否为数据库管理员（B）-->
<!--const db_admin = isRoleB()-->
<!--// 当前用户是否为数据库操作员（C）-->
<!--const db_operator = isRoleC()-->

<!--function init() {-->
<!--  state.dialogVisible = dialogIsVisible.value-->
<!--  getDbAdminUsersTree(props.dbid).then((response) => {-->
<!--    // console.log('response:', response)-->
<!--    userOptions.value = response.data-->

<!--    setNodesChecked()-->
<!--  })-->
<!--  state.placeholder = db_sys_admin ? "数据库系统管理员" : "数据库操作员"-->
<!--}-->


<!--onMounted(() => {-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->
