<template>
  <h2>业务授权</h2>
  <vxe-table
      border
      ref="xTable1"
      :data="tableData"
      :header-align="'center'"
      :align="'center'"
      :height="430"
      :row-config="{keyField: 'id', isHover: true}"
      :tooltip-config="tooltipConfig"
      @checkbox-all="selectAllChangeEvent1"
      @checkbox-change="selectChangeEvent1"
  >
    <vxe-column type="checkbox" width="60"/>
    <vxe-column field="tableName" title="数据表名"/>
    <vxe-column field="select" title="select">
      <template #default="{row}">
        <vxe-checkbox v-model="row.select" v-if="row.select" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="insert" title="insert">
      <template #default="{row}">
        <vxe-checkbox v-model="row.insert" v-if="row.insert" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="delete" title="delete">
      <template #default="{row}">
        <vxe-checkbox v-model="row.delete" v-if="row.delete" size="medium"/>
      </template>
    </vxe-column>
    <vxe-column field="update" title="update">
      <template #default="{row}">
        <vxe-checkbox v-model="row.update" v-if="row.update" size="medium"/>
      </template>
    </vxe-column>
  </vxe-table>
  <span class="dialog-footer">
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
  </span>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs, watch} from "vue";
import {VxeTableEvents, VxeTablePropTypes} from 'vxe-table'

const state = reactive({
  dis_s: false,
  dis_d: false,
  dis_i: false,
  dis_u: false,
  records: [] as any[],

  // 存储从 tableList 转换过来的数据
  tableData: [] as any[],

  // 从 getRegisterToCenterTable 接口获取的数据
  tableList: [] as any[],
  data: [] as any[],
  dialogVisible: false,
  dbId: '',
  title: '业务授权',
  height: 600,
  rules: {
    userName: [{required: true, message: '业务用户名不能为空', trigger: 'blur'}],
    password: [{required: true, message: '登录密码不能为空', trigger: 'blur'}],
  },
})

const {
  userInfo,
  dis_s,
  dis_d,
  dis_i,
  dis_u,
  records,
  tableData,
  tableList,
  data,
  dialogVisible,
  dbId,
  title,
  height,
  rules,
} = toRefs(state);

/************************************** table 事件 **************************************/
// 首列checkbox全选事件
const xTable1 = ref('xTable1');
const selectAllChangeEvent1: VxeTableEvents.CheckboxAll = ({checked}) => {
  const $table = xTable1.value
  const records = $table?.getCheckboxRecords()
  console.log(checked ? '所有勾选事件' : '所有取消事件', records)
  state.records = records
}


// 单独选择某行checkbox时，默认设置该行的select为true
const selectChangeEvent1: VxeTableEvents.CheckboxChange = ({checked}) => {
  const $table = xTable1.value
  const records = $table?.getCheckboxRecords()

  console.log(checked ? '勾选事件' : '取消事件', records)
  state.records = records
}

// 提交
const submit = () => {
  const submitData = convertSrToSd()
  console.log('submitData：', submitData)
}

// 重置
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
}


/**************************** utils ******************************/
// 将初始数据构造为 state.tableData
function convertOtToSt() {
  state.tableData = []

  const testTable = [
    {'tablename': 'table1', 'privlege': 'select'},
    {'tablename': 'table2', 'privlege': 'select,insert'},
    {'tablename': 'table3', 'privlege': 'select,insert,delete'},
    {'tablename': 'table4', 'privlege': 'select,insert,delete,update'},
  ]

  testTable.forEach(item => {
    const privilege = item.privlege.split(',')
    console.log('privilege:', privilege)
    // 创建对象，将权限字符串转换为对象属性
    let infoObj = {}
    if (privilege.indexOf('select') !== -1) {
      infoObj['select'] = true
      state.dis_s = false
    } else {
      infoObj['select'] = false
      state.dis_s = true
    }

    if (privilege.indexOf('delete') !== -1) {
      infoObj['delete'] = true
      state.dis_d = true
    } else {
      infoObj['delete'] = false
      state.dis_d = false
    }

    if (privilege.indexOf('insert') !== -1) {
      infoObj['insert'] = true
      state.dis_i = true
    } else {
      infoObj['insert'] = false
      state.dis_i = false
    }

    if (privilege.indexOf('update') !== -1) {
      infoObj['update'] = true
      state.dis_u = true
    } else {
      infoObj['update'] = false
      state.dis_u = false
    }

    infoObj['tableName'] = item.tablename

    state.tableData.push(infoObj)
  })
  console.log('state.tableData:', state.tableData)
}

function convertSrToSd() {
  // 将tableData中的select,insert,delete,update为true的项，拼接为用 , 分隔的字符串，赋值给perms
  state.data = state.records.filter(item => item.select || item.insert || item.delete || item.update)
  // 去除data中的id
  state.data.forEach(item => {
    delete item.id
  })
  let result = [] as any[]
  state.data.forEach(item => {
    let obj = {
      tableName: item.tableName,
      privlege: '',
    }
    item.privlege = ''
    if (item.select) {
      obj.privlege += 'select,'
    }
    if (item.insert) {
      obj.privlege += 'insert,'
    }
    if (item.delete) {
      obj.privlege += 'delete,'
    }
    if (item.update) {
      obj.privlege += 'update,'
    }
    // 去除最后一个逗号
    obj.privlege = obj.privlege.substring(0, obj.privlege.length - 1)
    result.push(obj)
  })

  let tableList = ''
  let privilege = ''
  result.forEach(item => {
    tableList += item.tableName + ','
    privilege += item.privlege.split(',').sort().join(',') + ';'
  })
  tableList = tableList.substring(0, tableList.length - 1)
  privilege = privilege.substring(0, privilege.length - 1)
  const data = {
    'tableList': tableList,
    'privilege': privilege,
  }

  return data
}

const tooltipConfig = reactive<VxeTablePropTypes.TooltipConfig>({
  showAll: true,
})


onMounted(() => {
  convertOtToSt()

  state.height = 650
  state.title = '业务授权'
  state.dialogVisible = true
});
</script>

<style scoped>
</style>