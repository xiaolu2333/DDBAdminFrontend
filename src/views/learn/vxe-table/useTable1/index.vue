<template>
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
      align="center"
      empty-text="暂无数据！"
      @current-change="currentChangeEvent"
  >
    <vxe-column field="tablename" title="数据表名"/>
    <vxe-column field="select" title="select" width="80">
      <template #default="{row}">
        <vxe-checkbox v-model="row.select" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="insert" title="insert" width="80">
      <template #default="{row}">
        <vxe-checkbox v-model="row.insert" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="delete" title="delete" width="80">
      <template #default="{row}">
        <vxe-checkbox v-model="row.delete" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="update" title="update" width="80">
      <template #default="{row}">
        <vxe-checkbox v-model="row.update" size="medium"/>
      </template>
    </vxe-column>
  </vxe-table>
  <el-row>
    <el-col :span="12" style="text-align: left!important;">
      <el-button @click="cancelForm" :icon="WarningFilled" :size="20"/>
      <el-button @click="cancelForm" :icon="QuestionFilled" :size="20"/>
    </el-col>
    <el-col :span="12">
      <el-button type="danger" @click="clear" :icon="SemiSelect">清除</el-button>
      <el-button type="primary" @click="reset" :icon="RefreshRight">重置</el-button>
      <el-button type="primary" @click="submit" :icon="Checked">提交</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {ElForm, ElMessage, ElMessageBox} from 'element-plus'
import {Checked, QuestionFilled, RefreshRight, SemiSelect, WarningFilled} from '@element-plus/icons-vue'
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
            tablename: "table3"
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
    id: "",    // dbConnectionId
    userCoed: "",
  }
}

const dataFormRef = ref(ElForm)

const state = reactive({
  // 选中的schema，用于刷新表格数据
  selectedSchema: "",
  // schema下拉框选项
  schemaOptions: [] as any[],
  // 是否使用表单
  useForm: false,
  // 保存带创建的数据库用户表单信息
  dbUserForm: {
    name: '',
    password: '',
  } as any,
  // 保存所有已选中权限的表格数据
  records: [] as any[],
  curRow: {} as any,
  // 表格数据
  tableData: [] as any[],
  // 保存用于构建提交的数据
  data: [] as any[],
  // props.dialogData.table
  originalTable: [] as any[],
  // 保存原始授权信息
  originalAuthData: [] as any[],
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
  originalTable,
  originalAuthData,
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
    name: state.useForm ? dbUserForm.value.name : '',
    password: state.useForm ? dbUserForm.value.password : '',
  };

  console.log('data:', data)
}

/**
 * 清除所有选中
 */
const clear = () => {
  ElMessageBox.confirm(`确认清除所有表授权信息?`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
      .then(() => {
        const resetProps = {
          select: false,
          delete: false,
          insert: false,
          update: false
        };

        [state.originalTable, state.originalAuthData].forEach(arr =>
            arr.forEach(item => Object.assign(item, resetProps))
        );
      })
      .catch(() => ElMessage.warning('已取消删除'))
}

/**
 * 重置选中
 */
const reset = () => {
  init()
}

/**
 * 关闭弹窗
 */
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
  state.originalTable = [] as any[]
}


/**************************** utils ******************************/
// 获取最新数据
function getLatestData() {
  // 根据 state.records 更新 state.originalAuthData 中的数据
  const updatedAuthData = state.originalAuthData.map(item => {
    const record = state.records.find(child => item.schema === child.schema && item.tablename === child.tablename);
    if (record) {
      return {
        ...item,
        select: record.select,
        insert: record.insert,
        delete: record.delete,
        update: record.update,
      };
    }
    return item;
  });
  state.originalAuthData = updatedAuthData;
  return updatedAuthData.filter(item => item.select || item.insert || item.delete || item.update);
}

// 构造被提交的数据
function formatSubmitData() {
  state.data = getLatestData()

  // 去除data中的id
  const result = state.data.map(item => {
    const {schema, tablename, select, insert, delete: del, update} = item;
    return {
      tablename: `${schema}.${tablename}`,
      perms: [select && 'select', insert && 'insert', del && 'delete', update && 'update']
          .filter(Boolean)
          .join(','),
    };
  });
  const schemas = [...new Set(state.data.map(item => item.schema))].join(',');
  state.data = state.data.map(({id, ...rest}) => rest);

  return {
    id: props.dialogData.id,
    schemas: schemas.substring(0, schemas.length - 1),
    tableData: result
  }
}

// 根据schema筛选与构造表格数据 state.tableData
function createTableDataBySchemaName(schemaName: string) {
  state.tableData = []
  state.originalTable.forEach(item => {
    if (item.schema === schemaName) {
      state.tableData.push(item)
    }
  })
}

function init() {
  // 获取schema下拉选项schemaOptions
  const schemaOptions = props.dialogData.table.map(item => ({
    value: item.schema,
    label: item.schema,
  }));

  // 初始化state.originalTable和state.originalAuthData
  const originalTable = [];
  const originalAuthData = [];
  props.dialogData.table.forEach(item => {
    item.children.forEach(child => {
      const temp = {
        schema: item.schema,
        select: false,
        delete: false,
        insert: false,
        update: false,
        tablename: child.tablename,
      };
      if (child.powers) {
        const powers = child.powers.split(',').map(power => power.trim());
        temp.select = powers.includes('select');
        temp.delete = powers.includes('delete');
        temp.insert = powers.includes('insert');
        temp.update = powers.includes('update');
      }
      originalTable.push(temp);
      originalAuthData.push({...temp});
    });
  });
  // 更新state
  state.schemaOptions = schemaOptions;
  state.originalTable = originalTable;
  state.originalAuthData = originalAuthData;

  if (props.dialogData.table.length > 0) {
    state.selectedSchema = props.dialogData.table[0].schema
    createTableDataBySchemaName(state.selectedSchema)
  }

  console.log('originalAuthData: ', state.originalAuthData)
}

onMounted(() => {
  init()
});
</script>

<style scoped>
</style>