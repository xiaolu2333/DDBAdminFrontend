<template>
  <h2>共享表</h2>
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
  <span class="dialog-footer">
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
  </span>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from "vue";
import {VxeTableEvents, VxeTablePropTypes} from 'vxe-table'

const state = reactive({
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
  state.tableData.forEach(item => {
    records.forEach(record => {
      if (item.tableName === record.tableName) {
        item.select = true
      }
    })
  })
}

// 单独选择某行checkbox时，默认设置该行的select为true
const selectChangeEvent1: VxeTableEvents.CheckboxChange = ({checked}) => {
  const $table = xTable1.value
  const records = $table?.getCheckboxRecords()
  console.log(checked ? '勾选事件' : '取消事件', records)

  state.records = records
  if (records) {
    console.log('选中')
    // 将state.tableData中的tableName为records中的tableName的项的select置为true
    state.tableData.forEach(item => {
      records.forEach(record => {
        if (item.tableName === record.tableName) {
          item.select = true
        }
      })
    })
  }
  console.log('state.tableData：', state.tableData)
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
// 找出在inRecords中，但不在notInRecords中的项
const setSelectByDiff = (inRecords, notInRecords) => {
  inRecords.forEach(item => {
    if (!notInRecords.includes(item)) {
      return item
    }
  })
}

// 将初始数据构造为 state.tableData
function convertOtToSt() {
  state.tableData = []

  const testTable = [
    {'tablename': 'table1'},
    {'tablename': 'table2'},
    {'tablename': 'table3'},
    {'tablename': 'table4'},
  ]

  testTable.forEach(item => {
    // 创建对象，将权限字符串转换为对象属性
    let infoObj = {}
    infoObj['select'] = false;
    infoObj['insert'] = false;
    infoObj['delete'] = false;
    infoObj['update'] = false;
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
  return {
    'tableList': tableList,
    'privilege': privilege,
  }
}

const tooltipConfig = reactive<VxeTablePropTypes.TooltipConfig>({
  showAll: true,
})


onMounted(() => {
  convertOtToSt()

  state.height = 650
  state.title = '业务授权'
});
</script>

<style scoped>
</style>