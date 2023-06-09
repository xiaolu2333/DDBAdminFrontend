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
<!--  <el-tabs-->
<!--      v-model="activeName"-->
<!--      type="card"-->
<!--      class="demo-tabs"-->
<!--      @tab-click="handleClick"-->
<!--  >-->
<!--    <el-tab-pane label="pgbouncer.ini" name="first" style="width:100%">-->
<!--      <el-card>-->
<!--        <template #header>-->
<!--          <el-button type="primary" @click="syncAllItem">同步所有配置项至文件</el-button>-->
<!--          <el-button type="primary" @click="loadAllItem">加载</el-button>-->
<!--          <el-button type="primary" @click="showFile">浏览本地ini文件</el-button>-->
<!--        </template>-->
<!--        <div>-->
<!--          <el-card text-align="center" style="width: 100%">-->
<!--            <template #header>-->
<!--              <span>【database】</span>-->
<!--            </template>-->
<!--            <vxe-table-->
<!--                border-->
<!--                show-overflow-->
<!--                keep-source-->
<!--                align="center"-->
<!--                :data="showDatabasesList"-->
<!--            >-->
<!--              <vxe-column type="seq" width="60"/>-->
<!--              <vxe-column field="name" title="name" sortable>-->
<!--                <template #default="scope">-->
<!--                  {{ scope.row.name }}-->
<!--                </template>-->
<!--              </vxe-column>-->
<!--              <vxe-column field="host" title="host">-->
<!--                <template #default="scope">-->
<!--                  {{ scope.row.host }}-->
<!--                </template>-->
<!--              </vxe-column>-->
<!--              <vxe-column field="port" title="port">-->
<!--                <template #default="scope">-->
<!--                  {{ scope.row.port }}-->
<!--                </template>-->
<!--              </vxe-column>-->
<!--              <vxe-column field="dbName" title="dbName">-->
<!--                <template #default="scope">-->
<!--                  {{ scope.row.dbName }}-->
<!--                </template>-->
<!--              </vxe-column>-->
<!--              <vxe-column field="connectQuery" title="connectQuery">-->
<!--                <template #default="scope">-->
<!--                  {{ scope.row.connectQuery }}-->
<!--                </template>-->
<!--              </vxe-column>-->
<!--            </vxe-table>-->
<!--          </el-card>-->
<!--          <br/>-->

<!--          <el-card>-->
<!--            <template #header>-->
<!--              <span>【pgbouncer】</span>-->
<!--            </template>-->
<!--            <div>-->
<!--              <vxe-table-->
<!--                  border-->
<!--                  :data="showPgbouncerItem2"-->
<!--                  align="center"-->
<!--                  height="650"-->
<!--              >-->
<!--                <vxe-column type="seq" width="60"/>-->
<!--                <vxe-column field="key" title="key">-->
<!--                  <template #edit="scope">-->
<!--                    {{ scope.row.key }}-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--                <vxe-column field="value" title="value">-->
<!--                  <template #edit="scope">-->
<!--                    {{ scope.row.value }}-->
<!--                  </template>-->
<!--                </vxe-column>-->
<!--              </vxe-table>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </el-tab-pane>-->
<!--    <el-tab-pane label="编辑配置" name="second">-->
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <el-card>-->
<!--            <el-button type="primary" @click="syncDatabaseItem">同步database配置项</el-button>-->
<!--            <el-button type="primary" @click="syncPgbouncerItem">同步pgbouncer配置项</el-button>-->
<!--          </el-card>-->
<!--          <el-card shadow="never" class="editconfig">-->
<!--            <el-tree-->
<!--                ref="dbTreeRef"-->
<!--                :data="dbTreeData"-->
<!--                :props="{ label: 'name', value: 'id'}"-->
<!--                :expand-on-click-node="false"-->
<!--                default-expand-all-->
<!--                @node-click="handleDbNodeClick"-->
<!--            >-->
<!--              <template #default="{node}">-->
<!--                <div style="width: 120px;">-->
<!--                  <el-row>-->
<!--                    <el-col :span="3">-->
<!--                      <svg-icon name="database" size="16" style="margin-top: 3px"/>-->
<!--                    </el-col>-->
<!--                    <el-col :span="2"/>-->
<!--                    <el-col :span="19">-->
<!--                      <div style="text-align:left">-->
<!--                        {{ node.label }}-->
<!--                      </div>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                </div>-->
<!--              </template>-->
<!--            </el-tree>-->
<!--          </el-card>-->
<!--        </el-col>-->

<!--        <el-col :span="18">-->
<!--          <el-card>-->
<!--            <el-row>-->
<!--              <el-col :span="22">-->
<!--                <el-button type="primary" style="margin: auto auto 10px auto">-->
<!--                  正在编辑【{{ selectedDb.name }}】配置项-->
<!--                </el-button>-->
<!--                &lt;!&ndash;                  <el-tooltip&ndash;&gt;-->
<!--                &lt;!&ndash;                      class="box-item"&ndash;&gt;-->
<!--                &lt;!&ndash;                      effect="dark"&ndash;&gt;-->
<!--                &lt;!&ndash;                      content="下发需要数据处于非编辑状态"&ndash;&gt;-->
<!--                &lt;!&ndash;                      placement="top-start"&ndash;&gt;-->
<!--                &lt;!&ndash;                  >&ndash;&gt;-->
<!--                &lt;!&ndash;                    <el-button&ndash;&gt;-->
<!--                &lt;!&ndash;                        type="primary" :icon="ArrowDownBold" :disabled="sqlShowDistribute"&ndash;&gt;-->
<!--                &lt;!&ndash;                        @click="distribute(0)">下发&ndash;&gt;-->
<!--                &lt;!&ndash;                    </el-button>&ndash;&gt;-->
<!--                &lt;!&ndash;                  </el-tooltip>&ndash;&gt;-->
<!--                <el-divider direction="vertical"/>-->
<!--              </el-col>-->
<!--              <el-col :span="1">-->
<!--                <el-tooltip-->
<!--                    class="box-item"-->
<!--                    effect="dark"-->
<!--                    content="帮助"-->
<!--                    placement="top-start"-->
<!--                >-->
<!--                  <el-icon size="26" @click="showVisble = true">-->
<!--                    <QuestionFilled/>-->
<!--                  </el-icon>-->
<!--                </el-tooltip>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-scrollbar class="editconfig-scoll">-->
<!--              <el-card text-align="center" style="width: 100%">-->
<!--                <template #header>-->
<!--                  <span>【database】</span>-->
<!--                  <vxe-button-->
<!--                      v-show="useDatabaseItemAddBtn" status="primary"-->
<!--                      @click="insertEvent()">新增-->
<!--                  </vxe-button>-->
<!--                </template>-->
<!--                <vxe-table-->
<!--                    border-->
<!--                    show-overflow-->
<!--                    keep-source-->
<!--                    ref="xTable"-->
<!--                    align="center"-->
<!--                    :data="showDatabasesItem"-->
<!--                    :row-config="{isHover: true, isCurrent:true}"-->
<!--                    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"-->
<!--                    @current-change="databaseItemChangeEvent"-->
<!--                >-->
<!--                  <vxe-column-->
<!--                      field="name" title="name" sortable-->
<!--                      :edit-render="{autofocus: '.myinput'}">-->
<!--                    <template #edit="scope">-->
<!--                      <input-->
<!--                          type="text" class="myinput" v-model="scope.row.name"-->
<!--                          @input="DatabaseItem.updateStatus(scope)"/>-->
<!--                    </template>-->
<!--                  </vxe-column>-->
<!--                  <vxe-column field="host" title="host">-->
<!--                    <template #edit="scope">-->
<!--                      {{ scope.row.host }}-->
<!--                    </template>-->
<!--                  </vxe-column>-->
<!--                  <vxe-column field="port" title="port">-->
<!--                    <template #edit="scope">-->
<!--                      {{ scope.row.port }}-->
<!--                    </template>-->
<!--                  </vxe-column>-->
<!--                  <vxe-column field="dbName" title="dbName">-->
<!--                    <template #edit="scope">-->
<!--                      {{ scope.row.dbName }}-->
<!--                    </template>-->
<!--                  </vxe-column>-->
<!--                  <vxe-column field="connectQuery" title="connectQuery" :edit-render="{autofocus: '.myinput'}">-->
<!--                    <template #edit="scope">-->
<!--                      <input-->
<!--                          type="text" class="myinput" v-model="scope.row.connectQuery"-->
<!--                          @input="xTable.updateStatus(scope)"/>-->
<!--                    </template>-->
<!--                  </vxe-column>-->
<!--                  <vxe-column title="操作" width="200">-->
<!--                    <template #default="{ row }">-->
<!--                      <vxe-button status="danger" @click="deleteDatabaseItem(row)">删除</vxe-button>-->
<!--                      <vxe-button-->
<!--                          v-if="xTable.isUpdateByRow(row)"-->
<!--                          status="success"-->
<!--                          @click="saveDatabaseItemUpdate(row)"-->
<!--                          :loading="row.loading">保存编辑-->
<!--                      </vxe-button>-->
<!--                      <vxe-button-->
<!--                          v-if="!xTable.isUpdateByRow(row) && xTable.getInsertRecords().length === 1"-->
<!--                          status="success"-->
<!--                          @click="saveDatabaseItemInsert(row)"-->
<!--                          :loading="row.loading">保存新增-->
<!--                      </vxe-button>-->
<!--                    </template>-->
<!--                  </vxe-column>-->
<!--                </vxe-table>-->
<!--              </el-card>-->
<!--              <br/>-->

<!--              <el-card>-->
<!--                <template #header>-->
<!--                  <span>【pgbouncer】</span>-->
<!--                  <vxe-button-->
<!--                      status="success"-->
<!--                      @click="savePgbouncerItemUpdate2">保存修改-->
<!--                  </vxe-button>-->
<!--                </template>-->
<!--                <div>-->
<!--                  <vxe-table-->
<!--                      border-->
<!--                      show-overflow-->
<!--                      keep-source-->
<!--                      ref="xTable2"-->
<!--                      :data="showPgbouncerItem2"-->
<!--                      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"-->
<!--                      align="center"-->
<!--                      height="600"-->
<!--                  >-->
<!--                    <vxe-column type="seq" width="60"/>-->
<!--                    <vxe-column field="key" title="key">-->
<!--                      <template #edit="scope">-->
<!--                        <span v-if="scope.row.key === 'id'">1111</span>-->
<!--                      </template>-->
<!--                    </vxe-column>-->
<!--                    <vxe-column field="value" title="value" :edit-render="{autofocus: '.myinput'}">-->
<!--                      <template #edit="scope">-->
<!--                        <input-->
<!--                            type="text" class="myinput" v-model="scope.row.value"-->
<!--                            @input="xTable2.updateStatus(scope)"/>-->
<!--                      </template>-->
<!--                    </vxe-column>-->
<!--                    &lt;!&ndash;                    <vxe-column title="操作" width="100">&ndash;&gt;-->
<!--                    &lt;!&ndash;                      <template #default="{ row }">&ndash;&gt;-->
<!--                    &lt;!&ndash;                        <template v-if="xTable2.isUpdateByRow(row)">&ndash;&gt;-->
<!--                    &lt;!&ndash;                          <vxe-button status="success" @click="savePgbouncerItemUpdate(row)" :loading="row.loading">保存&ndash;&gt;-->
<!--                    &lt;!&ndash;                          </vxe-button>&ndash;&gt;-->
<!--                    &lt;!&ndash;                        </template>&ndash;&gt;-->
<!--                    &lt;!&ndash;                      </template>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </vxe-column>&ndash;&gt;-->
<!--                  </vxe-table>-->
<!--                </div>-->
<!--              </el-card>-->
<!--            </el-scrollbar>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-tab-pane>-->
<!--  </el-tabs>-->

<!--  <el-dialog-->
<!--      v-model="showDialogVisible"-->
<!--      title="本地pgBouncer配置文件"-->
<!--  >-->
<!--    <el-scrollbar style="height: 60vh">-->
<!--      <el-card class="pgBouncerIniText">-->
<!--        {{ pgBouncerIniText }}-->
<!--      </el-card>-->
<!--    </el-scrollbar>-->
<!--    <template #footer>-->
<!--      <el-row>-->
<!--        <el-col :span="12" style="text-align: left!important;">-->
<!--          <el-button @click="closeDialog1" :icon="WarningFilled" :size="20"/>-->
<!--          <el-button @click="closeDialog1" :icon="QuestionFilled" :size="20"/>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-button @click="closeShowDialog" :icon="CircleClose">关闭</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </template>-->
<!--  </el-dialog>-->

<!--  <el-dialog-->
<!--      v-model="previewDialogVisible"-->
<!--      title="本地pgBouncer配置文件预览"-->
<!--      style="height: 770px"-->
<!--  >-->
<!--    <el-scrollbar style="height: 600px">-->
<!--      <el-card class="pgBouncerIniText">-->
<!--        {{ pgBouncerIniText }}-->
<!--      </el-card>-->
<!--    </el-scrollbar>-->
<!--    <template #footer>-->
<!--      <el-row>-->
<!--        <el-col :span="12" style="text-align: left!important;">-->
<!--          <el-button @click="closeDialog1" :icon="WarningFilled" :size="20"/>-->
<!--          <el-button @click="closeDialog1" :icon="QuestionFilled" :size="20"/>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-button @click="closePreviewDialog" :icon="CircleClose">关闭</el-button>-->
<!--          <el-button type='primary' @click='submit' :icon="Checked">确定</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </template>-->
<!--  </el-dialog>-->

<!--</template>-->


<!--<script lang="ts" setup>-->
<!--import {onBeforeUnmount, onMounted, reactive, ref, toRefs} from 'vue'-->
<!--import type {TabsPaneContext} from 'element-plus'-->
<!--import {ElMessage} from 'element-plus'-->

<!--import {VXETable, VxeTableInstance} from 'vxe-table'-->
<!--import {Checked, QuestionFilled, WarningFilled, CircleClose} from '@element-plus/icons-vue'-->


<!--import {DBInfo} from '@/api/dbManage/registerCenter/types'-->
<!--import {-->
<!--  getBouncerFile,-->
<!--  getBouncerDatabase,-->
<!--  getBouncerPgbouncer,-->
<!--  getDbTree,-->
<!--  getBouncerDatabaseById,-->
<!--  deleteBouncerDatabaseById,-->
<!--  saveBouncerDatabaseById,-->
<!--  saveBouncerPgbouncer,-->
<!--  syncBouncer,-->
<!--  loadingBouncer,-->
<!--  syncBouncerPgbouncer,-->
<!--  syncBouncerDatabase,-->
<!--} from '@/api/system/configManage'-->

<!--const activeName = ref('first')-->
<!--const timer = ref(null)-->

<!--interface DatabaseItem {-->
<!--  dbid: string-->
<!--  id: string-->
<!--  name: string-->
<!--  host: string-->
<!--  port: number-->
<!--  dbName: string-->
<!--  connectQuery: string-->
<!--}-->

<!--const state = reactive({-->
<!--  // 当前激活的tab名-->
<!--  activeTab: 'first',-->
<!--  // pgbouncer预览模式，默认表格模式-->
<!--  previewMode: true,-->
<!--  pgBouncerIniText: '',-->
<!--  // 展示的所有Database配置项-->
<!--  showDatabasesList: [] as any[],-->
<!--  // 可编辑的的Database配置项-->
<!--  showDatabasesItem: [] as DatabaseItem[],-->
<!--  // 可编辑的的pgbouncer配置项-->
<!--  showPgbouncerItem: [] as any[],-->
<!--  // 展示的pgbouncer配置项-->
<!--  showPgbouncerItem2: [] as any[],-->
<!--  PgbouncerItemId: '-1' as string,-->

<!--  // 数据库树数据-->
<!--  dbTreeData: [] as DBInfo[],-->
<!--  // 选中的数据库-->
<!--  selectedDb: {} as DBInfo,-->
<!--  useDatabaseItemAddBtn: false,-->
<!--  usePgbouncerItemAddBtn: false,-->
<!--  showDialogVisible: false,-->
<!--  previewDialogVisible: false,-->
<!--})-->
<!--const {-->
<!--  activeTab,-->
<!--  previewMode,-->
<!--  pgBouncerIniText,-->
<!--  showDatabasesList,-->
<!--  showDatabasesItem,-->
<!--  showPgbouncerItem2,-->
<!--  // usersData,-->
<!--  showPgbouncerItem,-->
<!--  PgbouncerItemId,-->
<!--  dbTreeData,-->
<!--  selectedDb,-->
<!--  useDatabaseItemAddBtn,-->
<!--  usePgbouncerItemAddBtn,-->
<!--  showDialogVisible,-->
<!--  previewDialogVisible,-->
<!--} = toRefs(state)-->

<!--const xTable = ref<VxeTableInstance>();-->
<!--const xTable2 = ref<VxeTableInstance>();-->
<!--const DatabaseItem = ref<VxeTableInstance>();-->
<!--const PgbouncerItem = ref<VxeTableInstance>();-->


<!--/***************************** tab 事件 ******************************/-->
<!--const handleClick = (tab: TabsPaneContext) => {-->
<!--  if (tab.paneName === 'second') {-->
<!--    // 获取编辑页树形数据-->
<!--    getDbTree().then(({data}) => {-->
<!--      for (let i = 0; i < data.length; i++) {-->
<!--        if (data[i].isLocal === 0) {-->
<!--          data[i].name = data[i].name + "(ip:" + data[i].ip + ")" + "&#45;&#45;本地库"-->
<!--        } else if (data[i].isLocal === 1) {-->
<!--          data[i].name = data[i].name + "(ip:" + data[i].ip + ")" + "&#45;&#45;域内库"-->
<!--        } else if (data[i].isLocal === 2) {-->
<!--          data[i].name = data[i].name + "(ip:" + data[i].ip + ")" + "&#45;&#45;域外库"-->
<!--        }-->
<!--      }-->
<!--      state.dbTreeData = data-->
<!--    })-->
<!--  }-->
<!--  if (tab.paneName === 'first') {-->
<!--    init()-->
<!--  }-->
<!--}-->

<!--function goToEditTab(row: any) {-->
<!--  state.selectedDb = state.dbTreeData.filter((item: any) => item.name === row.name)[0]-->

<!--  const tabs = ['first', 'second']-->
<!--  activeName.value = tabs[1]-->
<!--}-->

<!--/**-->
<!-- * 开关预览模式-->
<!-- */-->
<!--function changePreviewMode(val: any) {-->
<!--  state.previewMode = val-->
<!--  if (!state.previewMode) {-->
<!--    // 获取pgbouncer配置文件-->
<!--    getBouncerFile().then((res) => {-->
<!--      state.pgBouncerIniText = res.data-->
<!--    })-->
<!--  }-->
<!--}-->

<!--/**-->
<!-- * 同步所有配置项-->
<!-- */-->
<!--const syncAllItem = () => {-->
<!--  syncBouncer().then((res) => {-->
<!--    console.log('syncBouncer res:', res)-->
<!--    if (res.code === 200) {-->
<!--      ElMessage.success('同步成功')-->
<!--    }-->
<!--  })-->
<!--}-->

<!--/**-->
<!-- * 加载所有配置项-->
<!-- */-->
<!--const loadAllItem = () => {-->
<!--  getBouncerFile().then((res) => {-->
<!--    state.pgBouncerIniText = res.data-->
<!--  })-->
<!--  state.previewDialogVisible = true-->
<!--}-->

<!--/**-->
<!-- * 展示配置文件-->
<!-- */-->
<!--const showFile = () => {-->
<!--  getBouncerFile().then((res) => {-->
<!--    state.pgBouncerIniText = res.data-->
<!--  })-->
<!--  state.showDialogVisible = true-->
<!--}-->

<!--/**-->
<!-- * 同步database配置项-->
<!-- */-->
<!--const syncDatabaseItem = () => {-->
<!--  syncBouncerDatabase().then((res) => {-->
<!--    console.log('syncBouncerDatabase res:', res)-->
<!--    if (res.code === 200) {-->
<!--      ElMessage.success('同步成功')-->
<!--    }-->
<!--  })-->
<!--}-->

<!--/**-->
<!-- * 同步pgbouncer配置项-->
<!-- */-->
<!--const syncPgbouncerItem = () => {-->
<!--  syncBouncerPgbouncer().then((res) => {-->
<!--    console.log('syncBouncerPgbouncer res:', res)-->
<!--    if (res.code === 200) {-->
<!--      ElMessage.success('同步成功')-->
<!--    }-->
<!--  })-->
<!--}-->


<!--/***************************** tree事件 ******************************/-->
<!--const handleDbNodeClick = (data: any) => {-->
<!--  state.showDatabasesItem = []-->
<!--  state.selectedDb = data-->

<!--  getBouncerDatabaseById(state.selectedDb.id).then((res) => {-->
<!--    // console.log('DatabaseItem res:', res)-->
<!--    if (res.data === null) {-->
<!--      state.showDatabasesItem = []-->
<!--      state.useDatabaseItemAddBtn = true-->
<!--    } else {-->
<!--      let temp = {-->
<!--        name: res.data.name,-->
<!--        host: res.data.host,-->
<!--        port: res.data.port,-->
<!--        dbName: res.data.dbname,-->
<!--        connectQuery: res.data.connect_query,-->
<!--        id: res.data.id,-->
<!--        dbid: res.data.dbid-->
<!--      }-->
<!--      state.showDatabasesItem.push(temp)-->
<!--      state.useDatabaseItemAddBtn = false-->
<!--    }-->
<!--    console.log('state.showDatabasesItem:', state.showDatabasesItem)-->
<!--  })-->
<!--}-->


<!--/***************************** Table 事件 ******************************/-->
<!--/**-->
<!-- * 获取当前选中的行-->
<!-- */-->
<!--// 表格当前选中行数据-->
<!--const curRow: any = ref();-->
<!--const databaseItemChangeEvent = () => {-->
<!--  const $table: any = DatabaseItem.value;-->
<!--  curRow.value = $table.getCurrentRecord();-->
<!--}-->

<!--/**-->
<!-- * 删除DatabaseItem-->
<!-- */-->
<!--const deleteDatabaseItem = async (row: any) => {-->
<!--  const $table = xTable.value-->

<!--  if ($table) {-->
<!--    const type = await VXETable.modal.confirm('您确定要删除该数据?')-->

<!--    const insertRecords = $table.getInsertRecords()-->
<!--    insertRecords.forEach((item: any) => {-->
<!--      if (item === row) {-->
<!--        $table.remove(item)-->
<!--      }-->
<!--    })-->

<!--    if (type === 'confirm') {-->
<!--      deleteBouncerDatabaseById(state.showDatabasesItem[0].id).then((res) => {-->
<!--        // console.log('deleteBouncerDatabase res:', res)-->
<!--        $table.remove(row)-->
<!--        state.showDatabasesItem = []-->
<!--        state.useDatabaseItemAddBtn = true-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->

<!--/**-->
<!-- * 新增 DatabaseItem-->
<!-- */-->
<!--const insertEvent = async (row?: any) => {-->
<!--  const $table = xTable.value-->
<!--  if ($table) {-->
<!--    const record = {-->
<!--      name: "",-->
<!--      host: state.selectedDb.ip,-->
<!--      port: 5432,-->
<!--      dbName: state.selectedDb.databaseName,-->
<!--      connectQuery: "",-->
<!--      id: "",-->
<!--      dbid: state.selectedDb.id-->
<!--    }-->
<!--    const {row: newRow} = await $table.insertAt(record, row)-->
<!--  }-->
<!--}-->


<!--/**-->
<!-- * 保存DatabaseItem更新-->
<!-- */-->
<!--const saveDatabaseItemUpdate = (row: any) => {-->
<!--  const $table = xTable.value-->
<!--  if ($table.isUpdateByRow(row)) {-->
<!--    row.loading = true-->

<!--    let updateRecords = $table.getUpdateRecords()-->
<!--    let record = {-->
<!--      dbid: state.selectedDb.id,-->
<!--      id: updateRecords[0].id,-->
<!--      name: updateRecords[0].name,-->
<!--      host: updateRecords[0].host,-->
<!--      port: updateRecords[0].port,-->
<!--      dbName: updateRecords[0].dbName,-->
<!--      connectQuery: updateRecords[0].connectQuery,-->
<!--    }-->

<!--    saveBouncerDatabaseById(record).then(response => {-->
<!--      // console.log('response:', response)-->
<!--      row.loading = false-->

<!--      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--      $table.reloadRow(row, {})-->
<!--      VXETable.modal.message({content: '保存成功！', status: 'success'})-->
<!--    }).catch(error => {-->
<!--      console.log(error)-->
<!--    })-->
<!--  } else {-->
<!--    VXETable.modal.message({content: '数据未改动！', status: 'info'})-->
<!--  }-->
<!--  row.loading = false-->
<!--}-->

<!--/**-->
<!-- * 保存DatabaseItem新增-->
<!-- */-->
<!--const saveDatabaseItemInsert = (row: any) => {-->
<!--  const $table = xTable.value-->
<!--  let record = {-->
<!--    dbid: state.selectedDb.id,-->
<!--    id: row.id,-->
<!--    name: row.name,-->
<!--    host: row.host,-->
<!--    port: row.port,-->
<!--    dbName: row.dbName,-->
<!--    connectQuery: row.connectQuery,-->
<!--  }-->
<!--  // console.log('待新增：', record)-->

<!--  // // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--  $table.reloadRow(row, record)-->

<!--  saveBouncerDatabaseById(record).then(response => {-->
<!--    // console.log('response:', response)-->
<!--    row.loading = false-->
<!--    // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--    $table.reloadRow(row, record)-->

<!--    state.showDatabasesItem = []-->
<!--    state.showDatabasesItem.push(record)-->
<!--    state.useDatabaseItemAddBtn = false-->
<!--    VXETable.modal.message({content: '保存成功！', status: 'success'})-->

<!--  }).catch(error => {-->
<!--    console.log(error)-->
<!--  })-->
<!--}-->

<!--/**-->
<!-- * PgbouncerItem局部更新-->
<!-- */-->
<!--const savePgbouncerItemUpdate = (row: any) => {-->
<!--  const $table = xTable2.value-->
<!--  if ($table.isUpdateByRow(row)) {-->
<!--    row.loading = true-->

<!--    let updateRecords = $table.getUpdateRecords()-->
<!--    let temp = state.showPgbouncerItem-->
<!--    temp[updateRecords[0].key] = updateRecords[0].value-->
<!--    // 以temp中key为属性名，value为属性值，组成对象-->
<!--    let record = {}-->
<!--    temp.forEach((item: any) => {-->
<!--      record[item.key] = item.value-->
<!--    })-->

<!--    record['id'] = state.PgbouncerItemId-->
<!--    record['dbid'] = state.selectedDb.id-->

<!--    // console.log('待提交：', record)-->

<!--    saveBouncerPgbouncer(record).then(response => {-->
<!--      // console.log('response:', response)-->
<!--      row.loading = false-->

<!--      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--      $table.reloadRow(row, {})-->
<!--      VXETable.modal.message({content: '保存成功！', status: 'success'})-->
<!--    }).catch(error => {-->
<!--      console.log(error)-->
<!--    })-->
<!--  } else {-->
<!--    VXETable.modal.message({content: '数据未改动！', status: 'info'})-->
<!--  }-->
<!--  row.loading = false-->
<!--}-->

<!--/**-->
<!-- * PgbouncerItem全部更新-->
<!-- */-->
<!--const savePgbouncerItemUpdate2 = () => {-->
<!--  const $table = xTable2.value-->
<!--  if ($table) {-->
<!--    const updateRecords = $table.getUpdateRecords()-->

<!--    let record = {}-->
<!--    // 以showPgbouncerItem2中key为属性名，value为属性值，组成对象-->
<!--    state.showPgbouncerItem2.forEach((item: any) => {-->
<!--      record[item.key] = item.value-->
<!--    })-->
<!--    // 更新-->
<!--    updateRecords.forEach((item: any) => {-->
<!--      record[item.key] = item.value-->
<!--    })-->

<!--    record['id'] = state.PgbouncerItemId-->

<!--    console.log('待保存：', record)-->

<!--    saveBouncerPgbouncer(record).then(response => {-->
<!--      // console.log('response:', response)-->

<!--      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--      updateRecords.forEach((item: any) => {-->
<!--        $table.reloadRow(item, {})-->
<!--      })-->

<!--      // 获取pgbouncer配置项-->
<!--      getBouncerPgbouncer().then((res) => {-->
<!--        if (res.data === null) {-->
<!--          state.showPgbouncerItem2 = [-->
<!--            {key: 'admin_users', value: ''},-->
<!--            {key: 'auth_file', value: ''},-->
<!--            {key: 'auth_type', value: ''},-->
<!--            {key: 'client_tls_ca_file', value: ''},-->
<!--            {key: 'client_tls_cert_file', value: ''},-->
<!--            {key: 'client_tls_ciphers', value: ''},-->
<!--            {key: 'client_tls_key_file', value: ''},-->
<!--            {key: 'client_tls_sslmode', value: ''},-->
<!--            {key: 'ignore_startup_parameters', value: ''},-->
<!--            {key: 'listen_addr', value: ''},-->
<!--            {key: 'listen_port', value: ''},-->
<!--            {key: 'logfile', value: ''},-->
<!--            {key: 'pidfile', value: ''},-->
<!--            {key: 'max_client_conn', value: ''},-->
<!--            {key: 'pool_mode', value: ''},-->
<!--          ]-->
<!--        } else {-->
<!--          state.showPgbouncerItem2 = [-->
<!--            {key: 'admin_users', value: res.data.admin_users},-->
<!--            {key: 'auth_file', value: res.data.auth_file},-->
<!--            {key: 'auth_type', value: res.data.auth_type},-->
<!--            {key: 'client_tls_ca_file', value: res.data.client_tls_ca_file},-->
<!--            {key: 'client_tls_cert_file', value: res.data.client_tls_cert_file},-->
<!--            {key: 'client_tls_ciphers', value: res.data.client_tls_ciphers},-->
<!--            {key: 'client_tls_key_file', value: res.data.client_tls_key_file},-->
<!--            {key: 'client_tls_sslmode', value: res.data.client_tls_sslmode},-->
<!--            {key: 'ignore_startup_parameters', value: res.data.ignore_startup_parameters},-->
<!--            {key: 'listen_addr', value: res.data.listen_addr},-->
<!--            {key: 'listen_port', value: res.data.listen_port},-->
<!--            {key: 'logfile', value: res.data.logfile},-->
<!--            {key: 'max_client_conn', value: res.data.max_client_conn},-->
<!--            {key: 'pidfile', value: res.data.pidfile},-->
<!--            {key: 'pool_mode', value: res.data.pool_mode},-->
<!--          ]-->
<!--          state.PgbouncerItemId = res.data.id-->
<!--          console.log('state.PgbouncerItemId:', state.PgbouncerItemId)-->
<!--        }-->
<!--        // console.log('state.showPgbouncerItem2:', state.showPgbouncerItem2)-->
<!--      })-->

<!--      // state.showPgbouncerItem = [-->
<!--      //   {key: 'admin_users', value: record['admin_users']},-->
<!--      //   {key: 'auth_file', value: record['auth_file']},-->
<!--      //   {key: 'auth_type', value: record['auth_type']},-->
<!--      //   {key: 'client_tls_ca_file', value: record['client_tls_ca_file']},-->
<!--      //   {key: 'client_tls_cert_file', value: record['client_tls_cert_file']},-->
<!--      //   {key: 'client_tls_ciphers', value: record['client_tls_ciphers']},-->
<!--      //   {key: 'client_tls_key_file', value: record['client_tls_key_file']},-->
<!--      //   {key: 'client_tls_sslmode', value: record['client_tls_sslmode']},-->
<!--      //   {key: 'ignore_startup_parameters', value: record['ignore_startup_parameters']},-->
<!--      //   {key: 'listen_addr', value: record['listen_addr']},-->
<!--      //   {key: 'listen_port', value: record['listen_port']},-->
<!--      //   {key: 'logfile', value: record['logfile']},-->
<!--      //   {key: 'max_client_conn', value: record['max_client_conn']},-->
<!--      //   {key: 'pidfile', value: record['pidfile']},-->
<!--      //   {key: 'pool_mode', value: record['pool_mode']},-->
<!--      // ]-->
<!--      //-->
<!--      VXETable.modal.message({content: '保存成功！', status: 'success'})-->
<!--    }).catch(error => {-->
<!--      console.log(error)-->
<!--    })-->
<!--  }-->
<!--}-->


<!--/***************************** dialog ******************************/-->
<!--const closeShowDialog = () => {-->
<!--  state.showDialogVisible = false-->
<!--}-->

<!--const closePreviewDialog = () => {-->
<!--  state.previewDialogVisible = false-->
<!--}-->

<!--const submit = () => {-->
<!--  ElMessage.warning('功能开发中...')-->
<!--  state.previewDialogVisible = false-->
<!--}-->


<!--/***************************** init ******************************/-->
<!--function init() {-->
<!--  // 获取database配置项-->
<!--  getBouncerDatabase().then((res) => {-->
<!--    state.showDatabasesList = []-->
<!--    res.data.forEach((item: any) => {-->
<!--      let temp = {-->
<!--        id: item.id,-->
<!--        name: item.name,-->
<!--        host: item.host,-->
<!--        port: item.port,-->
<!--        dbName: item.dbname,-->
<!--        connectQuery: item.connect_query,-->
<!--      }-->
<!--      state.showDatabasesList.push(temp)-->
<!--    })-->
<!--    console.log('state.showDatabasesItem:', state.showDatabasesItem)-->
<!--  })-->
<!--  // 获取pgbouncer配置项-->
<!--  getBouncerPgbouncer().then((res) => {-->
<!--    if (res.data === null) {-->
<!--      state.showPgbouncerItem2 = [-->
<!--        {key: 'admin_users', value: ''},-->
<!--        {key: 'auth_file', value: ''},-->
<!--        {key: 'auth_type', value: ''},-->
<!--        {key: 'client_tls_ca_file', value: ''},-->
<!--        {key: 'client_tls_cert_file', value: ''},-->
<!--        {key: 'client_tls_ciphers', value: ''},-->
<!--        {key: 'client_tls_key_file', value: ''},-->
<!--        {key: 'client_tls_sslmode', value: ''},-->
<!--        {key: 'ignore_startup_parameters', value: ''},-->
<!--        {key: 'listen_addr', value: ''},-->
<!--        {key: 'listen_port', value: ''},-->
<!--        {key: 'logfile', value: ''},-->
<!--        {key: 'pidfile', value: ''},-->
<!--        {key: 'max_client_conn', value: ''},-->
<!--        {key: 'pool_mode', value: ''},-->
<!--      ]-->
<!--    } else {-->
<!--      state.showPgbouncerItem2 = [-->
<!--        {key: 'admin_users', value: res.data.admin_users},-->
<!--        {key: 'auth_file', value: res.data.auth_file},-->
<!--        {key: 'auth_type', value: res.data.auth_type},-->
<!--        {key: 'client_tls_ca_file', value: res.data.client_tls_ca_file},-->
<!--        {key: 'client_tls_cert_file', value: res.data.client_tls_cert_file},-->
<!--        {key: 'client_tls_ciphers', value: res.data.client_tls_ciphers},-->
<!--        {key: 'client_tls_key_file', value: res.data.client_tls_key_file},-->
<!--        {key: 'client_tls_sslmode', value: res.data.client_tls_sslmode},-->
<!--        {key: 'ignore_startup_parameters', value: res.data.ignore_startup_parameters},-->
<!--        {key: 'listen_addr', value: res.data.listen_addr},-->
<!--        {key: 'listen_port', value: res.data.listen_port},-->
<!--        {key: 'logfile', value: res.data.logfile},-->
<!--        {key: 'max_client_conn', value: res.data.max_client_conn},-->
<!--        {key: 'pidfile', value: res.data.pidfile},-->
<!--        {key: 'pool_mode', value: res.data.pool_mode},-->
<!--      ]-->
<!--      state.PgbouncerItemId = res.data.id-->
<!--      console.log('state.PgbouncerItemId:', state.PgbouncerItemId)-->
<!--    }-->
<!--    // console.log('state.showPgbouncerItem2:', state.showPgbouncerItem2)-->
<!--  })-->
<!--}-->

<!--onMounted(() => {-->
<!--  init()-->
<!--})-->

<!--onBeforeUnmount(() => {-->
<!--  // clearInterval(timer.value)-->
<!--})-->
<!--</script>-->

<!--<style>-->
<!--/*.demo-tabs > .el-tabs__content {*/-->
<!--/*  padding: 32px;*/-->
<!--/*  color: #6b778c;*/-->
<!--/*  font-size: 32px;*/-->
<!--/*  font-weight: 600;*/-->
<!--/*}*/-->

<!--.pgBouncerIniText {-->
<!--  white-space: pre-line;-->
<!--  height: 80vh;-->
<!--  font-size: 20px;-->
<!--  /*子元素居中*/-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->
<!--</style>-->





<!--<script lang="ts" setup>-->
<!--import {onBeforeUnmount, onMounted, reactive, ref, toRefs} from 'vue'-->
<!--import type {TabsPaneContext} from 'element-plus'-->
<!--import {ElMessage} from 'element-plus'-->

<!--import {VXETable, VxeTableInstance} from 'vxe-table'-->
<!--import {QuestionFilled} from '@element-plus/icons-vue'-->

<!--import {DBInfo} from '@/api/dbManage/registerCenter/types'-->
<!--import {-->
<!--  getBouncerFile,-->
<!--  getBouncerDatabase,-->
<!--  getBouncerPgbouncer,-->
<!--  getDbTree,-->
<!--  getBouncerDatabaseById,-->
<!--  deleteBouncerDatabaseById,-->
<!--  saveBouncerDatabaseById,-->
<!--  saveBouncerPgbouncer,-->
<!--  syncBouncer,-->
<!--  loadingBouncer,-->
<!--  syncBouncerPgbouncer,-->
<!--  syncBouncerDatabase,-->
<!--} from '@/api/system/configManage'-->

<!--const activeName = ref('first')-->
<!--const timer = ref(null)-->

<!--interface DatabaseItem {-->
<!--  dbid: string-->
<!--  id: string-->
<!--  name: string-->
<!--  host: string-->
<!--  port: number-->
<!--  dbName: string-->
<!--  connectQuery: string-->
<!--}-->

<!--const state = reactive({-->
<!--  // 当前激活的tab名-->
<!--  activeTab: 'first',-->
<!--  // pgbouncer预览模式，默认表格模式-->
<!--  previewMode: true,-->
<!--  pgBouncerIniText: '',-->
<!--  // 展示的所有Database配置项-->
<!--  showDatabasesList: [] as any[],-->
<!--  // 可编辑的的Database配置项-->
<!--  showDatabasesItem: [] as DatabaseItem[],-->
<!--  // 可编辑的的pgbouncer配置项-->
<!--  showPgbouncerItem: [] as any[],-->
<!--  // 展示的pgbouncer配置项-->
<!--  showPgbouncerItem2: [] as any[],-->
<!--  PgbouncerItemId: '-1' as string,-->

<!--  // 数据库树数据-->
<!--  dbTreeData: [] as DBInfo[],-->
<!--  // 选中的数据库-->
<!--  selectedDb: {} as DBInfo,-->
<!--  useDatabaseItemAddBtn: false,-->
<!--  usePgbouncerItemAddBtn: false,-->
<!--})-->
<!--const {-->
<!--  activeTab,-->
<!--  previewMode,-->
<!--  pgBouncerIniText,-->
<!--  showDatabasesList,-->
<!--  showDatabasesItem,-->
<!--  showPgbouncerItem2,-->
<!--  // usersData,-->
<!--  showPgbouncerItem,-->
<!--  PgbouncerItemId,-->
<!--  dbTreeData,-->
<!--  selectedDb,-->
<!--  useDatabaseItemAddBtn-->
<!--} = toRefs(state)-->

<!--const xTable = ref<VxeTableInstance>();-->
<!--const xTable2 = ref<VxeTableInstance>();-->
<!--const DatabaseItem = ref<VxeTableInstance>();-->
<!--const PgbouncerItem = ref<VxeTableInstance>();-->


<!--/***************************** tab 事件 ******************************/-->
<!--const handleClick = (tab: TabsPaneContext) => {-->
<!--  if (tab.paneName === 'second') {-->
<!--    // 获取编辑页树形数据-->
<!--    getDbTree().then(({data}) => {-->
<!--      for (let i = 0; i < data.length; i++) {-->
<!--        if (data[i].isLocal === 0) {-->
<!--          data[i].name = data[i].name + "(ip:" + data[i].ip + ")" + "&#45;&#45;本地库"-->
<!--        } else if (data[i].isLocal === 1) {-->
<!--          data[i].name = data[i].name + "(ip:" + data[i].ip + ")" + "&#45;&#45;域内库"-->
<!--        } else if (data[i].isLocal === 2) {-->
<!--          data[i].name = data[i].name + "(ip:" + data[i].ip + ")" + "&#45;&#45;域外库"-->
<!--        }-->
<!--      }-->
<!--      state.dbTreeData = data-->
<!--    })-->
<!--  }-->
<!--  if (tab.paneName === 'first') {-->
<!--    init()-->
<!--  }-->
<!--}-->

<!--function goToEditTab(row: any) {-->
<!--  state.selectedDb = state.dbTreeData.filter((item: any) => item.name === row.name)[0]-->

<!--  const tabs = ['first', 'second']-->
<!--  activeName.value = tabs[1]-->
<!--}-->

<!--/**-->
<!-- * 开关预览模式-->
<!-- */-->
<!--function changePreviewMode(val: any) {-->
<!--  state.previewMode = val-->
<!--  if (!state.previewMode) {-->
<!--    // 获取pgbouncer配置文件-->
<!--    getBouncerFile().then((res) => {-->
<!--      state.pgBouncerIniText = res.data-->
<!--    })-->
<!--  }-->
<!--}-->

<!--/**-->
<!-- * 同步所有配置项-->
<!-- */-->
<!--const syncAllItem = () => {-->
<!--  syncBouncer().then((res) => {-->
<!--    console.log('syncBouncer res:', res)-->
<!--    if (res.code === 200) {-->
<!--      ElMessage.success('同步成功')-->
<!--    }-->
<!--  })-->
<!--}-->

<!--/**-->
<!-- * 加载所有配置项-->
<!-- */-->
<!--const loadAllItem = () => {-->
<!--  ElMessage.warning('功能开发中...')-->
<!--}-->

<!--/**-->
<!-- * 同步database配置项-->
<!-- */-->
<!--const syncDatabaseItem = () => {-->
<!--  syncBouncerDatabase().then((res) => {-->
<!--    console.log('syncBouncerDatabase res:', res)-->
<!--    if (res.code === 200) {-->
<!--      ElMessage.success('同步成功')-->
<!--    }-->
<!--  })-->
<!--}-->

<!--/**-->
<!-- * 同步pgbouncer配置项-->
<!-- */-->
<!--const syncPgbouncerItem = () => {-->
<!--  syncBouncerPgbouncer().then((res) => {-->
<!--    console.log('syncBouncerPgbouncer res:', res)-->
<!--    if (res.code === 200) {-->
<!--      ElMessage.success('同步成功')-->
<!--    }-->
<!--  })-->
<!--}-->


<!--/***************************** tree事件 ******************************/-->
<!--const handleDbNodeClick = (data: any) => {-->
<!--  state.showDatabasesItem = []-->
<!--  state.selectedDb = data-->

<!--  getBouncerDatabaseById(state.selectedDb.id).then((res) => {-->
<!--    // console.log('DatabaseItem res:', res)-->
<!--    if (res.data === null) {-->
<!--      state.showDatabasesItem = []-->
<!--      state.useDatabaseItemAddBtn = true-->
<!--    } else {-->
<!--      let temp = {-->
<!--        name: res.data.name,-->
<!--        host: res.data.host,-->
<!--        port: res.data.port,-->
<!--        dbName: res.data.dbname,-->
<!--        connectQuery: res.data.connect_query,-->
<!--        id: res.data.id,-->
<!--        dbid: res.data.dbid-->
<!--      }-->
<!--      state.showDatabasesItem.push(temp)-->
<!--      state.useDatabaseItemAddBtn = false-->
<!--    }-->
<!--    console.log('state.showDatabasesItem:', state.showDatabasesItem)-->
<!--  })-->
<!--}-->


<!--/***************************** Table 事件 ******************************/-->
<!--/**-->
<!-- * 获取当前选中的行-->
<!-- */-->
<!--// 表格当前选中行数据-->
<!--const curRow: any = ref();-->
<!--const databaseItemChangeEvent = () => {-->
<!--  const $table: any = DatabaseItem.value;-->
<!--  curRow.value = $table.getCurrentRecord();-->
<!--}-->

<!--/**-->
<!-- * 删除DatabaseItem-->
<!-- */-->
<!--const deleteDatabaseItem = async (row: any) => {-->
<!--  const $table = xTable.value-->

<!--  if ($table) {-->
<!--    const type = await VXETable.modal.confirm('您确定要删除该数据?')-->

<!--    const insertRecords = $table.getInsertRecords()-->
<!--    insertRecords.forEach((item: any) => {-->
<!--      if (item === row) {-->
<!--        $table.remove(item)-->
<!--      }-->
<!--    })-->

<!--    if (type === 'confirm') {-->
<!--      deleteBouncerDatabaseById(state.showDatabasesItem[0].id).then((res) => {-->
<!--        // console.log('deleteBouncerDatabase res:', res)-->
<!--        $table.remove(row)-->
<!--        state.showDatabasesItem = []-->
<!--        state.useDatabaseItemAddBtn = true-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->

<!--/**-->
<!-- * 新增 DatabaseItem-->
<!-- */-->
<!--const insertEvent = async (row?: any) => {-->
<!--  const $table = xTable.value-->
<!--  if ($table) {-->
<!--    const record = {-->
<!--      name: "",-->
<!--      host: state.selectedDb.ip,-->
<!--      port: 5432,-->
<!--      dbName: state.selectedDb.databaseName,-->
<!--      connectQuery: "",-->
<!--      id: "",-->
<!--      dbid: state.selectedDb.id-->
<!--    }-->
<!--    const {row: newRow} = await $table.insertAt(record, row)-->
<!--  }-->
<!--}-->


<!--/**-->
<!-- * 保存DatabaseItem更新-->
<!-- */-->
<!--const saveDatabaseItemUpdate = (row: any) => {-->
<!--  const $table = xTable.value-->
<!--  if ($table.isUpdateByRow(row)) {-->
<!--    row.loading = true-->

<!--    let updateRecords = $table.getUpdateRecords()-->
<!--    let record = {-->
<!--      dbid: state.selectedDb.id,-->
<!--      id: updateRecords[0].id,-->
<!--      name: updateRecords[0].name,-->
<!--      host: updateRecords[0].host,-->
<!--      port: updateRecords[0].port,-->
<!--      dbName: updateRecords[0].dbName,-->
<!--      connectQuery: updateRecords[0].connectQuery,-->
<!--    }-->

<!--    saveBouncerDatabaseById(record).then(response => {-->
<!--      // console.log('response:', response)-->
<!--      row.loading = false-->

<!--      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--      $table.reloadRow(row, {})-->
<!--      VXETable.modal.message({content: '保存成功！', status: 'success'})-->
<!--    }).catch(error => {-->
<!--      console.log(error)-->
<!--    })-->
<!--  } else {-->
<!--    VXETable.modal.message({content: '数据未改动！', status: 'info'})-->
<!--  }-->
<!--  row.loading = false-->
<!--}-->

<!--/**-->
<!-- * 保存DatabaseItem新增-->
<!-- */-->
<!--const saveDatabaseItemInsert = (row: any) => {-->
<!--  const $table = xTable.value-->
<!--  let record = {-->
<!--    dbid: state.selectedDb.id,-->
<!--    id: row.id,-->
<!--    name: row.name,-->
<!--    host: row.host,-->
<!--    port: row.port,-->
<!--    dbName: row.dbName,-->
<!--    connectQuery: row.connectQuery,-->
<!--  }-->
<!--  // console.log('待新增：', record)-->

<!--  // // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--  $table.reloadRow(row, record)-->

<!--  saveBouncerDatabaseById(record).then(response => {-->
<!--    // console.log('response:', response)-->
<!--    row.loading = false-->
<!--    // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--    $table.reloadRow(row, record)-->

<!--    state.showDatabasesItem = []-->
<!--    state.showDatabasesItem.push(record)-->
<!--    state.useDatabaseItemAddBtn = false-->
<!--    VXETable.modal.message({content: '保存成功！', status: 'success'})-->

<!--  }).catch(error => {-->
<!--    console.log(error)-->
<!--  })-->
<!--}-->

<!--/**-->
<!-- * PgbouncerItem局部更新-->
<!-- */-->
<!--const savePgbouncerItemUpdate = (row: any) => {-->
<!--  const $table = xTable2.value-->
<!--  if ($table.isUpdateByRow(row)) {-->
<!--    row.loading = true-->

<!--    let updateRecords = $table.getUpdateRecords()-->
<!--    let temp = state.showPgbouncerItem-->
<!--    temp[updateRecords[0].key] = updateRecords[0].value-->
<!--    // 以temp中key为属性名，value为属性值，组成对象-->
<!--    let record = {}-->
<!--    temp.forEach((item: any) => {-->
<!--      record[item.key] = item.value-->
<!--    })-->

<!--    record['id'] = state.PgbouncerItemId-->
<!--    record['dbid'] = state.selectedDb.id-->

<!--    // console.log('待提交：', record)-->

<!--    saveBouncerPgbouncer(record).then(response => {-->
<!--      // console.log('response:', response)-->
<!--      row.loading = false-->

<!--      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--      $table.reloadRow(row, {})-->
<!--      VXETable.modal.message({content: '保存成功！', status: 'success'})-->
<!--    }).catch(error => {-->
<!--      console.log(error)-->
<!--    })-->
<!--  } else {-->
<!--    VXETable.modal.message({content: '数据未改动！', status: 'info'})-->
<!--  }-->
<!--  row.loading = false-->
<!--}-->

<!--/**-->
<!-- * PgbouncerItem全部更新-->
<!-- */-->
<!--const savePgbouncerItemUpdate2 = () => {-->
<!--  const $table = xTable2.value-->
<!--  if ($table) {-->
<!--    const updateRecords = $table.getUpdateRecords()-->

<!--    let record = {}-->
<!--    // 以showPgbouncerItem2中key为属性名，value为属性值，组成对象-->
<!--    state.showPgbouncerItem2.forEach((item: any) => {-->
<!--      record[item.key] = item.value-->
<!--    })-->
<!--    // 更新-->
<!--    updateRecords.forEach((item: any) => {-->
<!--      record[item.key] = item.value-->
<!--    })-->

<!--    record['id'] = state.PgbouncerItemId-->

<!--    console.log('待保存：', record)-->

<!--    saveBouncerPgbouncer(record).then(response => {-->
<!--      // console.log('response:', response)-->

<!--      // 保存完成后将行恢复到初始状态，避免触发 $table.isUpdateByRow(row) === true-->
<!--      updateRecords.forEach((item: any) => {-->
<!--        $table.reloadRow(item, {})-->
<!--      })-->

<!--      // 获取pgbouncer配置项-->
<!--      getBouncerPgbouncer().then((res) => {-->
<!--        if (res.data === null) {-->
<!--          state.showPgbouncerItem2 = [-->
<!--            {key: 'admin_users', value: ''},-->
<!--            {key: 'auth_file', value: ''},-->
<!--            {key: 'auth_type', value: ''},-->
<!--            {key: 'client_tls_ca_file', value: ''},-->
<!--            {key: 'client_tls_cert_file', value: ''},-->
<!--            {key: 'client_tls_ciphers', value: ''},-->
<!--            {key: 'client_tls_key_file', value: ''},-->
<!--            {key: 'client_tls_sslmode', value: ''},-->
<!--            {key: 'ignore_startup_parameters', value: ''},-->
<!--            {key: 'listen_addr', value: ''},-->
<!--            {key: 'listen_port', value: ''},-->
<!--            {key: 'logfile', value: ''},-->
<!--            {key: 'pidfile', value: ''},-->
<!--            {key: 'max_client_conn', value: ''},-->
<!--            {key: 'pool_mode', value: ''},-->
<!--          ]-->
<!--        } else {-->
<!--          state.showPgbouncerItem2 = [-->
<!--            {key: 'admin_users', value: res.data.admin_users},-->
<!--            {key: 'auth_file', value: res.data.auth_file},-->
<!--            {key: 'auth_type', value: res.data.auth_type},-->
<!--            {key: 'client_tls_ca_file', value: res.data.client_tls_ca_file},-->
<!--            {key: 'client_tls_cert_file', value: res.data.client_tls_cert_file},-->
<!--            {key: 'client_tls_ciphers', value: res.data.client_tls_ciphers},-->
<!--            {key: 'client_tls_key_file', value: res.data.client_tls_key_file},-->
<!--            {key: 'client_tls_sslmode', value: res.data.client_tls_sslmode},-->
<!--            {key: 'ignore_startup_parameters', value: res.data.ignore_startup_parameters},-->
<!--            {key: 'listen_addr', value: res.data.listen_addr},-->
<!--            {key: 'listen_port', value: res.data.listen_port},-->
<!--            {key: 'logfile', value: res.data.logfile},-->
<!--            {key: 'max_client_conn', value: res.data.max_client_conn},-->
<!--            {key: 'pidfile', value: res.data.pidfile},-->
<!--            {key: 'pool_mode', value: res.data.pool_mode},-->
<!--          ]-->
<!--          state.PgbouncerItemId = res.data.id-->
<!--          console.log('state.PgbouncerItemId:', state.PgbouncerItemId)-->
<!--        }-->
<!--        // console.log('state.showPgbouncerItem2:', state.showPgbouncerItem2)-->
<!--      })-->

<!--      // state.showPgbouncerItem = [-->
<!--      //   {key: 'admin_users', value: record['admin_users']},-->
<!--      //   {key: 'auth_file', value: record['auth_file']},-->
<!--      //   {key: 'auth_type', value: record['auth_type']},-->
<!--      //   {key: 'client_tls_ca_file', value: record['client_tls_ca_file']},-->
<!--      //   {key: 'client_tls_cert_file', value: record['client_tls_cert_file']},-->
<!--      //   {key: 'client_tls_ciphers', value: record['client_tls_ciphers']},-->
<!--      //   {key: 'client_tls_key_file', value: record['client_tls_key_file']},-->
<!--      //   {key: 'client_tls_sslmode', value: record['client_tls_sslmode']},-->
<!--      //   {key: 'ignore_startup_parameters', value: record['ignore_startup_parameters']},-->
<!--      //   {key: 'listen_addr', value: record['listen_addr']},-->
<!--      //   {key: 'listen_port', value: record['listen_port']},-->
<!--      //   {key: 'logfile', value: record['logfile']},-->
<!--      //   {key: 'max_client_conn', value: record['max_client_conn']},-->
<!--      //   {key: 'pidfile', value: record['pidfile']},-->
<!--      //   {key: 'pool_mode', value: record['pool_mode']},-->
<!--      // ]-->
<!--      //-->
<!--      VXETable.modal.message({content: '保存成功！', status: 'success'})-->
<!--    }).catch(error => {-->
<!--      console.log(error)-->
<!--    })-->
<!--  }-->
<!--}-->


<!--/***************************** init ******************************/-->
<!--function init() {-->
<!--  // 获取database配置项-->
<!--  getBouncerDatabase().then((res) => {-->
<!--    state.showDatabasesList = []-->
<!--    res.data.forEach((item: any) => {-->
<!--      let temp = {-->
<!--        id: item.id,-->
<!--        name: item.name,-->
<!--        host: item.host,-->
<!--        port: item.port,-->
<!--        dbName: item.dbname,-->
<!--        connectQuery: item.connect_query,-->
<!--      }-->
<!--      state.showDatabasesList.push(temp)-->
<!--    })-->
<!--    console.log('state.showDatabasesItem:', state.showDatabasesItem)-->
<!--  })-->
<!--  // 获取pgbouncer配置项-->
<!--  getBouncerPgbouncer().then((res) => {-->
<!--    if (res.data === null) {-->
<!--      state.showPgbouncerItem2 = [-->
<!--        {key: 'admin_users', value: ''},-->
<!--        {key: 'auth_file', value: ''},-->
<!--        {key: 'auth_type', value: ''},-->
<!--        {key: 'client_tls_ca_file', value: ''},-->
<!--        {key: 'client_tls_cert_file', value: ''},-->
<!--        {key: 'client_tls_ciphers', value: ''},-->
<!--        {key: 'client_tls_key_file', value: ''},-->
<!--        {key: 'client_tls_sslmode', value: ''},-->
<!--        {key: 'ignore_startup_parameters', value: ''},-->
<!--        {key: 'listen_addr', value: ''},-->
<!--        {key: 'listen_port', value: ''},-->
<!--        {key: 'logfile', value: ''},-->
<!--        {key: 'pidfile', value: ''},-->
<!--        {key: 'max_client_conn', value: ''},-->
<!--        {key: 'pool_mode', value: ''},-->
<!--      ]-->
<!--    } else {-->
<!--      state.showPgbouncerItem2 = [-->
<!--        {key: 'admin_users', value: res.data.admin_users},-->
<!--        {key: 'auth_file', value: res.data.auth_file},-->
<!--        {key: 'auth_type', value: res.data.auth_type},-->
<!--        {key: 'client_tls_ca_file', value: res.data.client_tls_ca_file},-->
<!--        {key: 'client_tls_cert_file', value: res.data.client_tls_cert_file},-->
<!--        {key: 'client_tls_ciphers', value: res.data.client_tls_ciphers},-->
<!--        {key: 'client_tls_key_file', value: res.data.client_tls_key_file},-->
<!--        {key: 'client_tls_sslmode', value: res.data.client_tls_sslmode},-->
<!--        {key: 'ignore_startup_parameters', value: res.data.ignore_startup_parameters},-->
<!--        {key: 'listen_addr', value: res.data.listen_addr},-->
<!--        {key: 'listen_port', value: res.data.listen_port},-->
<!--        {key: 'logfile', value: res.data.logfile},-->
<!--        {key: 'max_client_conn', value: res.data.max_client_conn},-->
<!--        {key: 'pidfile', value: res.data.pidfile},-->
<!--        {key: 'pool_mode', value: res.data.pool_mode},-->
<!--      ]-->
<!--      state.PgbouncerItemId = res.data.id-->
<!--      console.log('state.PgbouncerItemId:', state.PgbouncerItemId)-->
<!--    }-->
<!--    // console.log('state.showPgbouncerItem2:', state.showPgbouncerItem2)-->
<!--  })-->
<!--}-->

<!--onMounted(() => {-->
<!--  init()-->
<!--})-->

<!--onBeforeUnmount(() => {-->
<!--  // clearInterval(timer.value)-->
<!--})-->
<!--</script>-->

<!--<style>-->
<!--/*.demo-tabs > .el-tabs__content {*/-->
<!--/*  padding: 32px;*/-->
<!--/*  color: #6b778c;*/-->
<!--/*  font-size: 32px;*/-->
<!--/*  font-weight: 600;*/-->
<!--/*}*/-->

<!--.pgBouncerIniText {-->
<!--  white-space: pre-line;-->
<!--  height: 80vh;-->
<!--  font-size: 20px;-->
<!--  /*子元素居中*/-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->
<!--</style>-->








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
