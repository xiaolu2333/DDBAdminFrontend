<template>
  <el-card
      shadow="hover"
      style="height: 500px"
  >
    <vxe-table
        border
        ref="xTable1"
        :data="tableData"
        :header-align="'center'"
        :align="'center'"
        :height="400"
        :row-config="{keyField: 'id', isHover: true}"
        :checkbox-config="{highlight: true, range: true}"
        @checkbox-all="selectAllChangeEvent1"
        @checkbox-change="selectChangeEvent1"
    >
      <vxe-column type="checkbox" width="60"/>
      <vxe-column field="tableName" title="数据表名"/>
      <vxe-column field="select" title="select">
        <template #default="{row}">
          <vxe-checkbox v-model="row.select" size="medium" @change="addPerms(row.tableName, 'select')"></vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="insert" title="insert">
        <template #default="{row}">
          <vxe-checkbox v-model="row.insert" size="medium" @change="addPerms(row.tableName, 'insert')"></vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="delete" title="delete">
        <template #default="{row}">
          <vxe-checkbox v-model="row.delete" size="medium" @change="addPerms(row.tableName, 'delete')"></vxe-checkbox>
        </template>
      </vxe-column>
      <vxe-column field="update" title="update">
        <template #default="{row}">
          <vxe-checkbox v-model="row.update" size="medium" @change="addPerms(row.tableName, 'update')"></vxe-checkbox>
        </template>
      </vxe-column>
    </vxe-table>
    <el-button-group>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-button-group>
  </el-card>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs, ref} from "vue";
import {VXETable, VxeTableInstance, VxeTableEvents} from 'vxe-table'

const state = reactive({
  defaultSelecteRows5: [10002, 10003],
  tableData: [
    {
      'tableName': 'table 1',
      'perms': ''
    },
    {
      'tableName': 'table 2',
      'perms': ''
    },
    {
      'tableName': 'table 3',
      'perms': ''
    },
    {
      'tableName': 'table 4',
      'perms': ''
    },
    {
      'tableName': 'table 5',
      'perms': ''
    },
    {
      'tableName': 'table 6',
      'perms': ''
    },
    {
      'tableName': 'table 7',
      'perms': ''
    },
    {
      'tableName': 'table 8',
      'perms': ''
    },
    {
      'tableName': 'table 9',
      'perms': ''
    },
    {
      'tableName': 'table 10',
      'perms': ''
    },
    {
      'tableName': 'table 11',
      'perms': ''
    },
    {
      'tableName': 'table 12',
      'perms': ''
    }
  ],
  data: [],
})

const {
  tableData,
  data,
} = toRefs(state);

// 首列checkbox改变事件
const xTable1 = ref('xTable1');
const selectAllChangeEvent1: VxeTableEvents.CheckboxAll = ({checked}) => {
  const $table = xTable1.value
  const records = $table?.getCheckboxRecords()
  console.log(checked ? '所有勾选事件' : '所有取消事件', records)
  // 如果是勾选事件，则将所有perms置为select,insert,delete,update
  if (checked) {
    records?.forEach(item => {
      item.perms = 'select,'
    })
  }
  state.data = records
  console.log('state.data in select all: ', state.data)
}
const selectChangeEvent1: VxeTableEvents.CheckboxChange = ({checked}) => {
  const $table = xTable1.value
  const records = $table?.getCheckboxRecords()
  console.log(checked ? '勾选事件' : '取消事件', records)

  // 如果是勾选事件，则将所有perms置为select,insert,delete,update
  if (checked) {
    records?.forEach(item => {
      item.perms = 'select,'
    })
  } else {
    records?.forEach(item => {
      item.perms = ''
    })
  }

  // 将records加入data，如果tableName相同，则覆盖
  records?.forEach(item => {
    const index = data.value.findIndex(item2 => item2.tableName === item.tableName)
    if (index === -1) {
      data.value.push(item)
    } else {
      data.value[index] = item
    }
  })

  console.log('state.data in select: ', state.data)
}

// 为指定tableName添加指定权限
const addPerms = (tableName, perm) => {
  // 获取当前tableName的index
  const index = tableData.value.findIndex(item => item.tableName === tableName)
  if (index !== -1) {
    const perms = tableData.value[index].perms
    // 如果perms中没有该权限，则添加，否则删除
    if (perms.indexOf(perm) === -1) {
      tableData.value[index].perms = perms + perm + ','
    } else {
      tableData.value[index].perms = perms.replace(perm + ',', '')
    }
  }

  // 将tableData.value[index]加入data
  const index2 = data.value.findIndex(item => item.tableName === tableName)
  if (index2 === -1) {
    data.value.push(tableData.value[index])
  } else {
    data.value[index2] = tableData.value[index]
  }

  console.log('state.data in addPerms: ', state.data)
}

// 去除所有data的perms中的最后一个逗号
const removeLastComma = () => {
  state.data.forEach(item => {
    item.perms = item.perms.substring(0, item.perms.length - 1)
  })
}

// 提交
const submit = () => {
  // 去除所有tableName的perms中的最后一个逗号
  removeLastComma()
  // 去除perms不为空的tableName的信息
  state.data = state.data.filter(item => item.perms !== '')
  // 只保留tableName和perms
  state.data = state.data.map(item => {
    return {
      'tableName': item.tableName,
      'perms': item.perms
    }
  })
  console.log('state.data in submit: ', state.data)
}

onMounted(() => {
});
</script>

<style scoped>
.el-button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>