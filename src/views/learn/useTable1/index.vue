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
  if (!records.value.some(item => item.schema === curRow.value.schema && item.tablename === curRow.value.tablename)) {
    records.value.push(curRow.value)
  } else {
    // 如果 curRow.value.schema 和 curRow.value.tyablename 在 records 中存在，先将其从 records 中删除，再将其添加到 records 中
    records.value = records.value.filter(item => !(item.schema === curRow.value.schema && item.tablename === curRow.value.tablename))
    records.value.push(curRow.value)
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