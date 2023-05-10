<template>
  <el-dialog
      :close-on-click-modal="false"
      v-model="dialogVisible"
      style="height:550px;width:500px;"
  >
    <vxe-table
        border
        ref="xTable1"
        :data="tableData"
        :header-align="'center'"
        :align="'center'"
        :height="400"
        :row-config="{keyField: 'id', isHover: true}"
        :tooltip-config="tooltipConfig"
        @checkbox-all="selectAllChangeEvent1"
        @checkbox-change="selectChangeEvent1"
    >
      <vxe-column type="checkbox" width="60"/>
      <vxe-column field="tableName" title="数据表名"/>
      <vxe-column field="select" title="select">
        <template #default="{row}">
          <vxe-checkbox v-model="row.select" size="medium" @change="addPerms(row.tableName, 'select')"/>
        </template>
      </vxe-column>
      <vxe-column field="insert" title="insert">
        <template #default="{row}">
          <vxe-checkbox v-model="row.insert" size="medium" @change="addPerms(row.tableName, 'insert')"/>
        </template>
      </vxe-column>
      <vxe-column field="delete" title="delete">
        <template #default="{row}">
          <vxe-checkbox v-model="row.delete" size="medium" @change="addPerms(row.tableName, 'delete')"/>
        </template>
      </vxe-column>
      <vxe-column field="update" title="update">
        <template #default="{row}">
          <vxe-checkbox v-model="row.update" size="medium" @change="addPerms(row.tableName, 'update')"/>
        </template>
      </vxe-column>
    </vxe-table>
    <el-button-group>
      <el-button type="primary" @click="reset">重置</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-button-group>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs, watch} from "vue";
import {ElForm, ElMessage} from 'element-plus'
import {VxeTableEvents, VxeTablePropTypes} from 'vxe-table'

const props = defineProps<{
  dialogData: {
    table: [],
    id: string,
    dialogVisible: boolean,
  }
}>()
watch(props, () => {
  state.tableData = []
  if (props.dialogData.table.length) {
    props.dialogData.table.forEach(item => {
      state.tableData.push({
        'tableName': item,
        'select': false,
        'insert': false,
        'delete': false,
        'update': false,
      })
    })

    state.dialogVisible = props.dialogData.dialogVisible
    console.log('state.tableData:', state.tableData)
  }
})

const emit = defineEmits(['submit-perms'])

let oldRecords = [] as any[]
let newRecords = [] as any[]
const dataFormRef = ref(ElForm)

const state = reactive({
  userInfo: {} as businessUserInfo,
  tableData: [] as any[],
  data: [] as any[],
  dialogVisible: false,
  title: '共享子节点表权限',
  height: 550,
  rules: {
    userName: [{required: true, message: '业务用户名不能为空', trigger: 'blur'}],
    password: [{required: true, message: '登录密码不能为空', trigger: 'blur'}],
  },
})

const {
  userInfo,
  tableData,
  data,
  dialogVisible,
  title,
  height,
  rules,
} = toRefs(state);


// 首列checkbox全选事件
const xTable1 = ref('xTable1');
const selectAllChangeEvent1: VxeTableEvents.CheckboxAll = ({checked}) => {
  const $table = xTable1.value
  const records = $table?.getCheckboxRecords()
  console.log(checked ? '所有勾选事件' : '所有取消事件', records)
  // 如果是勾选事件，则将所有tableData的select置为true
  if (checked) {
    state.tableData.forEach(item => {
      item.select = true
    })
  } else {
    // 如果是取消事件，则将所有tableData的select置为false
    state.tableData.forEach(item => {
      item.select = false
    })
  }
  console.log('state.tableData in select all: ', state.tableData)
}


// 单独选择某行checkbox时，默认设置该行的select为true
const selectChangeEvent1: VxeTableEvents.CheckboxChange = ({checked}) => {
  const $table = xTable1.value
  const records = $table?.getCheckboxRecords()

  // 找出在records中，但不在oldRecords中的数据
  newRecords = records?.filter(item => {
    const index = oldRecords.findIndex(item1 => item1.tableName === item.tableName)
    return index === -1
  })

  // 如果是勾选事件，找出在records中，但不在oldRecords中的元素，将其select置为true
  if (checked) {
    setSelectByDiff(records, oldRecords, true)
  } else {
    // 如果是取消事件，找出在oldRecords中，但不在records中的元素，将其select置为false
    setSelectByDiff(oldRecords, records, false)
  }

  oldRecords = records

  // console.log('state.tableData in select: ', state.tableData)
}

// 为指定tableName添加指定权限
const addPerms = (tableName, perm) => {
  // 根据parm名称，设置对应为true
  const index = state.tableData.findIndex(item => item.tableName === tableName)

  // perm为false，则设置对应的perm为true
  if (index !== -1 && !state.tableData[index][perm]) {
    state.tableData[index][perm] = true
  }
  // perm为false，则设置对应的perm为false
  else if (index !== -1 && state.tableData[index][perm]) {
    state.tableData[index][perm] = false
  }

  console.log('state.tableData in add: ', state.tableData)
}

// 提交
const submit = () => {
  // 将tableData中的select,insert,delete,update为true的项，拼接为用 , 分隔的字符串，赋值给perms
  state.data = state.tableData.filter(item => item.select || item.insert || item.delete || item.update)
  console.log('state.data in submit: ', state.data)
  // 去除data中的id
  state.data.forEach(item => {
    delete item.id
  })
  let result = [] as any[]
  state.data.forEach(item => {
    let obj = {
      tableName: item.tableName,
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
  })

  console.log('result in submit: ', result)

  const data = {
    "id": props.dialogData.id,
    "formData": result
  }

  console.log('data in submit: ', data)

  let isFinish = true
  emit('submit-perms', isFinish)
}

const reset = () => {
  // 将tableData中的select,insert,delete,update为true的项，都置为false
  state.tableData.forEach(item => {
    item.select = false
    item.insert = false
    item.delete = false
    item.update = false
  })
  // 把所有的checkbox都置为false
  const $table = xTable1.value
  $table?.clearCheckboxRow()
  oldRecords = [] as any[]
  newRecords = [] as any[]
  state.userInfo = {
    userName: '',
    password: '',
    tablePerms: [],
  }
}

const closeDialog = () => {
  state.dialogVisible = false
  state.tableData = [] as any[]
  oldRecords = [] as any[]
  newRecords = [] as any[]
  state.userInfo = {
    userName: '',
    password: '',
    tablePerms: [],
  }
}


/**************************** utils ******************************/
// 根据首列checkbox的选中后的差异设置tableData中的select
const setSelectByDiff = (inRecords, notInRecords, isTrue) => {
  const diff = inRecords.filter(value => !notInRecords.includes(value));
  console.log('diff: ', diff)
  // 将tableData中tableName为diff.tableName的select置为true
  state.tableData.forEach(item => {
    const index = diff?.findIndex(item1 => item1.tableName === item.tableName)
    // 如果找到，则设置对应的select为true
    if (index !== -1) {
      item.select = isTrue
    }
  })
}

const tooltipConfig = reactive<VxeTablePropTypes.TooltipConfig>({
  showAll: true,
})

onMounted(() => {
});
</script>

<style scoped>
.el-button-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>