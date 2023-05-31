<template>
  <p>【数据库操作员】授权——阶段二</p>
  <div>
    <el-form :model='dbUserForm' :rules='rules' ref='dataFormRef'>
      <el-row>
        <el-col :span="12">
          <el-form-item label="数据库用户" prop='name'>
            <vxe-input v-model="dbUserForm.name" clearable :disabled="!useForm"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户密码" prop='password'>
            <vxe-input v-model="dbUserForm.password" type="password" clearable :disabled="!useForm"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div>
    <span style="margin-right: 13px">选择schema</span>
    <vxe-select
        v-model="selectedSchema"
        :options="schemaOptions"
        placeholder="选择或搜索schema"
        filterable
        @change="handleSchemaChange"
    />
  </div>
  <br/>

  <vxe-table
      ref="xTable"
      border
      :data="tableData"
      :header-align="'center'"
      :height="430"
      :row-config="{isHover: true, isCurrent:true}"
      :tooltip-config="tooltipConfig"
      align="center"
      empty-text="暂无数据！"
      @current-change="currentChangeEvent"
  >
    <vxe-column field="tablename" title="数据表名"/>
    <vxe-column field="select" title="select">
      <template #default="{row}">
        <vxe-checkbox v-model="row.select" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="insert" title="insert">
      <template #default="{row}">
        <vxe-checkbox v-model="row.insert" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="delete" title="delete">
      <template #default="{row}">
        <vxe-checkbox v-model="row.delete" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="update" title="update">
      <template #default="{row}">
        <vxe-checkbox v-model="row.update" size="medium"/>
      </template>
    </vxe-column>
  </vxe-table>
  <div>
    <el-row>
      <el-col :span="12" style="text-align: left!important;">
        <el-button @click="cancelForm" :icon="WarningFilled" :size="20"/>
        <el-button @click="cancelForm" :icon="QuestionFilled" :size="20"/>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" @click="reset" :icon="RefreshRight">重置</el-button>
        <el-button type="primary" @click="submit" :icon="Checked">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {ElForm} from 'element-plus'
import {Checked, QuestionFilled, RefreshRight, WarningFilled} from '@element-plus/icons-vue'
import {VxeTableInstance, VxeTablePropTypes} from 'vxe-table'

const props = {
  dialogData: {
    table: [
      {
        schema: "schema1",
        children: [
          {
            tablename: "table1", powers: "select,insert,delete,update"
          },
          {
            tablename: "table2", powers: "select,insert"
          },
          {
            tablename: "table3", powers: "select"
          }
        ]
      },
      {
        schema: "schema2",
        children: [
          {
            tablename: "table4", powers: "select,insert,delete,update"
          },
          {
            tablename: "table5", powers: "select,insert"
          },
          {
            tablename: "table6"
          },
          {
            tablename: "table7"
          },
          {
            tablename: "table8"
          }
        ]
      }
    ],
    id: "",
    userCoed: "",
  }
}

const dataFormRef = ref(ElForm)

const state = reactive({
  useForm: false,
  selectedSchema: "",
  schemaOptions: [] as any[],
  dbUserForm: {
    name: '',
    password: '',
  } as any,
  records: [] as any[],
  curRow: {} as any,
  tableData: [] as any[],
  data: [] as any[],
  dialogVisible: false,
  height: 600,

  rules: {
    name: [{required: true, message: '数据库用户名不能为空', trigger: 'blur'}],
    password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
  }
})

const {
  useForm,
  dbUserForm,
  selectedSchema,
  schemaOptions,
  records,
  curRow,
  tableData,
  data,
  dialogVisible,
  height,
  rules,
} = toRefs(state);

/************************* select事件 *************************/
/**
 * 根据schemaName刷新表格数据
 * @param data
 */
function handleSchemaChange(data) {
  // console.log('selectedSchema:', state.selectedSchema)
  createTableDataBySchemaName(data.value)
}


/************************* table事件 *************************/
const xTable = ref<VxeTableInstance>()
/**
 * 获取当前选中的行
 */
const currentChangeEvent = () => {
  const $table: any = xTable.value;
  curRow.value = $table.getCurrentRecord();

  // 如果 curRow.value.schema 和 curRow.value.tyablename 在 records 中不存在，则将其添加到 records 中
  const index = records.value.findIndex(item => item.schema === curRow.value.schema && item.tablename === curRow.value.tablename);
  if (index === -1) {
    records.value.push(curRow.value);
  } else {
    records.value.splice(index, 1, curRow.value);
  }
}


// 提交
const submit = () => {
  const temp = formatSubmitData()

  let data = {
    id: temp.id,
    tableData: temp.tableData,
    schemas: temp.schemas,
    name: '',
    password: '',
  }

  if (state.useForm) {
    data.name = dbUserForm.value.name
    data.password = dbUserForm.value.password
  } else {
    data.name = ""
    data.password = ""
  }

}

const reset = () => {
  // 把所有的checkbox都置为false
  const $table = xTable.value
  $table?.clearCheckboxRow()
}

const closeDialog = () => {
  state.useForm = false
  state.dbUserForm = {
    name: '',
    password: '',
  }
  state.dialogVisible = false
  state.schemaOptions = [] as any[]
  state.tableData = [] as any[]
  state.data = [] as any[]
  state.records = [] as any[]
}


/**************************** utils ******************************/
// 构造被提交的数据
function formatSubmitData() {
  // 将tableData中的select,insert,delete,update为true的项，拼接为用 , 分隔的字符串，赋值给perms
  state.data = state.records.filter(item => item.select || item.insert || item.delete || item.update)
  console.log('state.data:', state.data)
  // state.data = state.tableData.filter(item => item.select || item.insert || item.delete || item.update)

  // 去除data中的id
  state.data.forEach(item => {
    delete item.id
  })
  let schemas = ""
  let result = [] as any[]
  state.data.forEach(item => {
    let obj = {
      tablename: item.schema + '.' + item.tablename,
      perms: '',
    }
    item.perms = ''
    if (item.select) {
      obj.perms += 'select,'
    }
    if (item.insert) {
      obj.perms += 'insert,'
    }
    if (item.delete) {
      obj.perms += 'delete,'
    }
    if (item.update) {
      obj.perms += 'update,'
    }
    // 去除最后一个逗号
    obj.perms = obj.perms.substring(0, obj.perms.length - 1)
    result.push(obj)

    if (!schemas.includes(item.schema)) {
      schemas += item.schema + ','
    }
  })

  return {
    id: props.dialogData.id,
    schemas: schemas.substring(0, schemas.length - 1),
    tableData: result
  }
}


// 根据schema筛选与构造表格数据 state.tableData
function createTableDataBySchemaName(schemaName: string) {
  // console.log('schemaName: ', schemaName)
  state.schemaOptions = []
  state.tableData = []
  props.dialogData.table.forEach(item => {
    // 获取schema下拉选项schemaOptions
    let schemaTemp = {
      value: item.schema,
      label: item.schema,
    }
    state.schemaOptions.push(schemaTemp)
    // console.log('state.schemaOptions: ', state.schemaOptions)

    // 构造表格数据
    if (item.schema === schemaName) {
      item?.children.forEach(child => {
        let temp = {
          schema: item.schema,
          select: false,
          delete: false,
          insert: false,
          update: false,
          tablename: child.tablename
        }

        if (child?.powers) {
          console.log('child.powers: ', child.powers)
          const powers = child.powers.split(',')
          // // 去除powers中所有元素左右两侧的空格
          // powers.forEach((item, index) => {
          //   powers[index] = item.trim()
          // })
          temp.select = powers.includes('select')
          temp.delete = powers.includes('delete')
          temp.insert = powers.includes('insert')
          temp.update = powers.includes('update')
        }
        state.tableData.push(temp)
      })
    }
  })

  // 根据已经选择的数据更新 state.tableData
  if (state.records.length === 0) {
    props.dialogData.table.forEach(item => {
      item?.children.forEach(child => {
        if (child?.powers) {
          let te = {
            schema: item.schema,
            select: false,
            delete: false,
            insert: false,
            update: false,
            tablename: child.tablename
          }
          const powers = child.powers.split(',')
          // // 去除powers中所有元素左右两侧的空格
          // powers.forEach((item, index) => {
          //   powers[index] = item.trim()
          // })
          te.select = powers.includes('select')
          te.delete = powers.includes('delete')
          te.insert = powers.includes('insert')
          te.update = powers.includes('update')

          state.records.push(te)
        }
      })
    })
  }
  console.log('state.records: ', state.records)
}

//
function convertOtToSt2() {
  if (props.dialogData.table.length > 0) {
    state.selectedSchema = props.dialogData.table[0].schema
    createTableDataBySchemaName(state.selectedSchema)
  }
}

const tooltipConfig = reactive<VxeTablePropTypes.TooltipConfig>({
  showAll: true,
})

onMounted(() => {
  // console.log('props:', props)
  convertOtToSt2()

  state.dbUserForm.name = ""
  state.dbUserForm.password = "123456"
  state.useForm = true
});
</script>

<style scoped>
</style>








<!--<template>-->
<!--  <el-dialog-->
<!--      title="授权表"-->
<!--      :close-on-click-modal="false"-->
<!--      v-model="dialogVisible"-->
<!--      style="width: 700px;"-->
<!--      :draggable="true"-->
<!--  >-->
<!--    <div>-->
<!--      <el-form :model='dbUserForm' :rules='rules' ref='dataFormRef'>-->
<!--        <el-row>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="数据库用户" prop='name'>-->
<!--              <vxe-input v-model="dbUserForm.name" clearable :disabled="!useForm"/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="12">-->
<!--            <el-form-item label="用户密码" prop='password'>-->
<!--              <vxe-input v-model="dbUserForm.password" type="password" clearable :disabled="!useForm"/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-form>-->
<!--    </div>-->
<!--    <div>-->
<!--      <span style="margin-right: 13px">选择schema</span>-->
<!--      <vxe-select-->
<!--          v-model="selectedSchema"-->
<!--          :options="schemaOptions"-->
<!--          placeholder="选择或搜索schema"-->
<!--          filterable-->
<!--          @change="handleSchemaChange"-->
<!--      />-->
<!--    </div>-->
<!--    <br/>-->

<!--    <vxe-table-->
<!--        ref="xTable"-->
<!--        border-->
<!--        :data="tableData"-->
<!--        :header-align="'center'"-->
<!--        :height="430"-->
<!--        :row-config="{isHover: true, isCurrent:true}"-->
<!--        :tooltip-config="tooltipConfig"-->
<!--        align="center"-->
<!--        empty-text="暂无数据！"-->
<!--        @current-change="currentChangeEvent"-->
<!--    >-->
<!--      <vxe-column field="tablename" title="数据表名"/>-->
<!--      <vxe-column field="select" title="select" width="80">-->
<!--        <template #default="{row}">-->
<!--          <vxe-checkbox v-model="row.select" size="medium"/>-->
<!--        </template>-->
<!--      </vxe-column>-->
<!--      <vxe-column field="insert" title="insert" width="80">-->
<!--        <template #default="{row}">-->
<!--          <vxe-checkbox v-model="row.insert" size="medium"/>-->
<!--        </template>-->
<!--      </vxe-column>-->
<!--      <vxe-column field="delete" title="delete" width="80">-->
<!--        <template #default="{row}">-->
<!--          <vxe-checkbox v-model="row.delete" size="medium"/>-->
<!--        </template>-->
<!--      </vxe-column>-->
<!--      <vxe-column field="update" title="update" width="80">-->
<!--        <template #default="{row}">-->
<!--          <vxe-checkbox v-model="row.update" size="medium"/>-->
<!--        </template>-->
<!--      </vxe-column>-->
<!--    </vxe-table>-->
<!--    <template #footer>-->
<!--      <el-row>-->
<!--        <el-col :span="12" style="text-align: left!important;">-->
<!--          <el-button @click="cancelForm" :icon="WarningFilled" :size="20"/>-->
<!--          <el-button @click="cancelForm" :icon="QuestionFilled" :size="20"/>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-button type="danger" @click="clear" :icon="SemiSelect">清除</el-button>-->
<!--          <el-button type="primary" @click="reset" :icon="RefreshRight">重置</el-button>-->
<!--          <el-button type="primary" @click="submit" :icon="Checked">提交</el-button>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </template>-->
<!--  </el-dialog>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {onMounted, reactive, ref, toRefs, watch} from "vue";-->
<!--import {ElForm, ElMessage, ElMessageBox} from 'element-plus'-->
<!--import {RefreshRight, Checked, WarningFilled, QuestionFilled, SemiSelect} from '@element-plus/icons-vue'-->
<!--import {VxeTableInstance, VxeTablePropTypes} from 'vxe-table'-->
<!--import {checkDbOperatorUsers} from '@/api/dbManage/registerCenter'-->

<!--const props = defineProps<{-->
<!--  dialogData: {-->
<!--    table: [],-->
<!--    id: string,    // dbConnectionId-->
<!--    userCoed: string,-->
<!--    dialogVisible: boolean,-->
<!--  }-->
<!--}>()-->
<!--const emit = defineEmits(['submit-perms'])-->

<!--const dataFormRef = ref(ElForm)-->

<!--const state = reactive({-->
<!--  // 选中的schema，用于刷新表格数据-->
<!--  selectedSchema: "",-->
<!--  // schema下拉框选项-->
<!--  schemaOptions: [] as any[],-->
<!--  // 是否使用表单-->
<!--  useForm: false,-->
<!--  // 保存带创建的数据库用户表单信息-->
<!--  dbUserForm: {-->
<!--    name: '',-->
<!--    password: '',-->
<!--  } as any,-->
<!--  // 保存所有已选中权限的表格数据-->
<!--  records: [] as any[],-->
<!--  curRow: {} as any,-->
<!--  // 表格数据-->
<!--  tableData: [] as any[],-->
<!--  // 保存用于构建提交的数据-->
<!--  data: [] as any[],-->
<!--  // props.dialogData.table-->
<!--  originalTable: [] as any[],-->
<!--  // 保存原始授权信息-->
<!--  originalAuthData: [] as any[],-->
<!--  dialogVisible: false,-->
<!--  height: 600,-->

<!--  rules: {-->
<!--    name: [{required: true, message: '数据库用户名不能为空', trigger: 'blur'}],-->
<!--    password: [{required: true, message: '密码不能为空', trigger: 'blur'}],-->
<!--  }-->
<!--})-->

<!--const {-->
<!--  useForm,-->
<!--  dbUserForm,-->
<!--  selectedSchema,-->
<!--  schemaOptions,-->
<!--  records,-->
<!--  curRow,-->
<!--  tableData,-->
<!--  data,-->
<!--  originalTable,-->
<!--  originalAuthData,-->
<!--  dialogVisible,-->
<!--  height,-->
<!--  rules,-->
<!--} = toRefs(state);-->

<!--watch(props, () => {-->
<!--  // console.log('props:', props)-->

<!--  props.dialogData.table.forEach(item => {-->
<!--    // 获取schema下拉选项schemaOptions-->
<!--    let schemaTemp = {-->
<!--      value: item.schema,-->
<!--      label: item.schema,-->
<!--    }-->
<!--    state.schemaOptions.push(schemaTemp)-->
<!--  })-->


<!--  state.originalTable = []-->
<!--  props.dialogData.table.forEach(item => {-->
<!--    // 构造表格数据-->
<!--    item?.children.forEach(child => {-->
<!--      let temp = {-->
<!--        schema: item.schema,-->
<!--        select: false,-->
<!--        delete: false,-->
<!--        insert: false,-->
<!--        update: false,-->
<!--        tablename: child.tablename-->
<!--      }-->

<!--      if (child?.powers) {-->
<!--        // console.log('child.powers: ', child.powers)-->
<!--        const powers = child.powers.split(',')-->
<!--        // 去除powers中所有元素左右两侧的空格-->
<!--        powers.forEach((item, index) => {-->
<!--          powers[index] = item.trim()-->
<!--        })-->
<!--        temp.select = powers.includes('select')-->
<!--        temp.delete = powers.includes('delete')-->
<!--        temp.insert = powers.includes('insert')-->
<!--        temp.update = powers.includes('update')-->
<!--      }-->
<!--      state.originalTable.push(temp)-->
<!--    })-->
<!--  })-->


<!--  convertOtToSt2()-->

<!--  // 初始化 state.originalAuthData，保存原始授权信息-->
<!--  state.originalAuthData = []-->
<!--  props.dialogData.table.forEach(item => {-->
<!--    item?.children.forEach(child => {-->
<!--      let temp = {-->
<!--        schema: item.schema,-->
<!--        select: false,-->
<!--        delete: false,-->
<!--        insert: false,-->
<!--        update: false,-->
<!--        tablename: child.tablename-->
<!--      }-->

<!--      if (child?.powers) {-->
<!--        // console.log('child.powers: ', child.powers)-->
<!--        const powers = child.powers.split(',')-->
<!--        // 去除powers中所有元素左右两侧的空格-->
<!--        powers.forEach((item, index) => {-->
<!--          powers[index] = item.trim()-->
<!--        })-->
<!--        temp.select = powers.includes('select')-->
<!--        temp.delete = powers.includes('delete')-->
<!--        temp.insert = powers.includes('insert')-->
<!--        temp.update = powers.includes('update')-->
<!--      }-->
<!--      state.originalAuthData.push(temp)-->
<!--    })-->
<!--  })-->
<!--  console.log('originalAuthData: ', state.originalAuthData)-->

<!--  // 检查当前登录的用户是否存在对应的数据库用户-->
<!--  checkDbOperatorUsers(props.dialogData.id, props.dialogData.userCoed).then((response) => {-->
<!--    if (response.data) {-->
<!--      state.dbUserForm.name = response.data.name-->
<!--      state.useForm = false-->
<!--    } else {-->
<!--      state.dbUserForm.name = ""-->
<!--      state.dbUserForm.password = "123456"-->
<!--      state.useForm = true-->
<!--    }-->
<!--  })-->

<!--  state.dialogVisible = props.dialogData.dialogVisible-->
<!--})-->


<!--/************************* select事件 *************************/-->
<!--/**-->
<!-- * 根据schemaName刷新表格数据-->
<!-- * @param data-->
<!-- */-->
<!--function handleSchemaChange(data) {-->
<!--  // console.log('selectedSchema:', state.selectedSchema)-->
<!--  createTableDataBySchemaName(data.value)-->

<!--  // let temp = getLatestData()-->
<!--  // state.tableData = temp.filter(item => item.schema === data.value)-->
<!--}-->


<!--/************************* table事件 *************************/-->
<!--const xTable = ref<VxeTableInstance>()-->
<!--/**-->
<!-- * 获取当前选中的行-->
<!-- */-->
<!--const currentChangeEvent = () => {-->
<!--  const $table: any = xTable.value;-->
<!--  curRow.value = $table.getCurrentRecord();-->

<!--  const index = records.value.findIndex(item => item.schema === curRow.value.schema && item.tablename === curRow.value.tablename);-->
<!--  if (index === -1) {-->
<!--    records.value.push(curRow.value);-->
<!--  } else {-->
<!--    records.value.splice(index, 1, curRow.value);-->
<!--  }-->
<!--}-->


<!--// 提交-->
<!--const submit = () => {-->
<!--  const temp = formatSubmitData()-->

<!--  let data = {-->
<!--    id: temp.id,-->
<!--    tableData: temp.tableData,-->
<!--    schemas: temp.schemas,-->
<!--    name: '',-->
<!--    password: '',-->
<!--  }-->

<!--  console.log('dbUserForm: ', dbUserForm.value)-->
<!--  if (state.useForm) {-->
<!--    data.name = dbUserForm.value.name-->
<!--    data.password = dbUserForm.value.password-->
<!--  } else {-->
<!--    data.name = ""-->
<!--    data.password = ""-->
<!--  }-->

<!--  emit('submit-perms', data)-->
<!--  closeDialog()-->

<!--}-->

<!--/**-->
<!-- * 清除所有选中-->
<!-- */-->
<!--const clear = () => {-->
<!--  ElMessageBox.confirm(`确认清除所有表授权信息?`, '警告', {-->
<!--    confirmButtonText: '确定',-->
<!--    cancelButtonText: '取消',-->
<!--    type: 'warning'-->
<!--  })-->
<!--      .then(() => {-->
<!--        state.originalTable.forEach(item => {-->
<!--          item.select = false-->
<!--          item.delete = false-->
<!--          item.insert = false-->
<!--          item.update = false-->
<!--        })-->
<!--        // // 把所有的checkbox都置为false-->
<!--        // const $table = xTable.value-->
<!--        // $table?.clearCheckboxRow()-->
<!--        //-->
<!--        // let data = {-->
<!--        //   id: props.dialogData.id,-->
<!--        //   tableData: [],-->
<!--        //   schemas: '',-->
<!--        //   name: '',-->
<!--        //   password: '',-->
<!--        // }-->
<!--        // emit('submit-perms', data)-->
<!--        // closeDialog()-->
<!--      })-->
<!--      .catch(() => ElMessage.warning('已取消删除'))-->
<!--}-->

<!--/**-->
<!-- * 重置选中-->
<!-- */-->
<!--const reset = () => {-->
<!--  // props.dialogData.table.forEach(item => {-->
<!--  //   item?.children.forEach(child => {-->
<!--  //     if (child?.powers) {-->
<!--  //       let te = {-->
<!--  //         schema: item.schema,-->
<!--  //         select: false,-->
<!--  //         delete: false,-->
<!--  //         insert: false,-->
<!--  //         update: false,-->
<!--  //         tablename: child.tablename-->
<!--  //       }-->
<!--  //       const powers = child.powers.split(',')-->
<!--  //       // 去除powers中所有元素左右两侧的空格-->
<!--  //       powers.forEach((item, index) => {-->
<!--  //         powers[index] = item.trim()-->
<!--  //       })-->
<!--  //       te.select = powers.includes('select')-->
<!--  //       te.delete = powers.includes('delete')-->
<!--  //       te.insert = powers.includes('insert')-->
<!--  //       te.update = powers.includes('update')-->
<!--  //-->
<!--  //       state.records.push(te)-->
<!--  //     }-->
<!--  //   })-->
<!--  // })-->
<!--  //-->
<!--  // console.log('state.selectedSchema:', state.selectedSchema)-->
<!--  // state.tableData = [] as any[]-->
<!--  // state.tableData = state.originalAuthData.filter(item =>-->
<!--  //     item.schema === state.selectedSchema-->
<!--  // )-->
<!--}-->

<!--/**-->
<!-- * 关闭弹窗-->
<!-- */-->
<!--const closeDialog = () => {-->
<!--  state.useForm = false-->
<!--  state.dbUserForm = {-->
<!--    name: '',-->
<!--    password: '',-->
<!--  }-->
<!--  state.dialogVisible = false-->
<!--  state.schemaOptions = [] as any[]-->
<!--  state.tableData = [] as any[]-->
<!--  state.data = [] as any[]-->
<!--  state.records = [] as any[]-->
<!--  state.originalTable = [] as any[]-->
<!--}-->


<!--/**************************** utils ******************************/-->
<!--// 获取最新数据-->
<!--function getLatestData() {-->
<!--  console.log('state.originalAuthData:', state.originalAuthData)-->
<!--  // 根据 state.records 更新 state.originalAuthData 中的数据-->
<!--  state.originalAuthData.forEach(item => {-->
<!--    state.records.forEach(child => {-->
<!--      if (item.schema === child.schema && item.tablename === child.tablename) {-->
<!--        item.select = child.select-->
<!--        item.insert = child.insert-->
<!--        item.delete = child.delete-->
<!--        item.update = child.update-->
<!--      }-->
<!--    })-->
<!--  })-->
<!--  const LastAuthData = state.originalAuthData.filter(item => item.select || item.insert || item.delete || item.update)-->
<!--  return LastAuthData-->
<!--}-->

<!--// 构造被提交的数据-->
<!--function formatSubmitData() {-->
<!--  // 将tableData中的select,insert,delete,update为true的项，拼接为用 , 分隔的字符串，赋值给perms-->
<!--  // state.data = state.records.filter(item => item.select || item.insert || item.delete || item.update)-->
<!--  // console.log('state.data:', state.data)-->
<!--  // state.data = state.tableData.filter(item => item.select || item.insert || item.delete || item.update)-->

<!--  state.data = getLatestData()-->
<!--  console.log('state.data:', state.data)-->

<!--  // 去除data中的id-->
<!--  state.data.forEach(item => {-->
<!--    delete item.id-->
<!--  })-->
<!--  let schemas = ""-->
<!--  let result = [] as any[]-->
<!--  state.data.forEach(item => {-->
<!--    let obj = {-->
<!--      tablename: item.schema + '.' + item.tablename,-->
<!--      perms: '',-->
<!--    }-->
<!--    item.perms = ''-->
<!--    if (item.select) {-->
<!--      obj.perms += 'select,'-->
<!--    }-->
<!--    if (item.insert) {-->
<!--      obj.perms += 'insert,'-->
<!--    }-->
<!--    if (item.delete) {-->
<!--      obj.perms += 'delete,'-->
<!--    }-->
<!--    if (item.update) {-->
<!--      obj.perms += 'update,'-->
<!--    }-->
<!--    // 去除最后一个逗号-->
<!--    obj.perms = obj.perms.substring(0, obj.perms.length - 1)-->
<!--    result.push(obj)-->
<!--  })-->

<!--  // 获取 state.data 中所有元素中不重复的schema-->
<!--  state.data.forEach(item => {-->
<!--    if (!schemas.includes(item.schema)) {-->
<!--      schemas += item.schema + ','-->
<!--    }-->
<!--  })-->

<!--  const data = {-->
<!--    id: props.dialogData.id,-->
<!--    schemas: schemas.substring(0, schemas.length - 1),-->
<!--    tableData: result-->
<!--  }-->
<!--  console.log('data:', data)-->

<!--  return data-->
<!--}-->

<!--// 根据schema筛选与构造表格数据 state.tableData-->
<!--function createTableDataBySchemaName(schemaName: string) {-->
<!--  // console.log('schemaName: ', schemaName)-->
<!--  state.tableData = []-->
<!--  state.originalTable.forEach(item => {-->
<!--    if (item.schema === schemaName) {-->
<!--      state.tableData.push(item)-->
<!--    }-->
<!--  })-->
<!--}-->

<!--//-->
<!--function convertOtToSt2() {-->
<!--  if (props.dialogData.table.length > 0) {-->
<!--    state.selectedSchema = props.dialogData.table[0].schema-->
<!--    createTableDataBySchemaName(state.selectedSchema)-->
<!--  }-->
<!--}-->

<!--const tooltipConfig = reactive<VxeTablePropTypes.TooltipConfig>({-->
<!--  showAll: true,-->
<!--})-->

<!--onMounted(() => {-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--</style>-->