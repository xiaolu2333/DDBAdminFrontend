<template>
  <el-table
      :data="showColumnsData"
      height="50"
      ref="refTableShow"
  >
    <el-table-column
        v-for="(item,index) in showColumns"
        :key="index"
        :prop="item.fieldShown"
        :label="item.fieldShown"
        width="200"
    >
      <template #header>
        <el-input v-model="item.fieldShown"/>
      </template>
    </el-table-column>
  </el-table>

  <el-table
      :data="resColumnsData"
      height="70"
      ref="refTableRes"
      :show-header="false"
  >
    <el-table-column
        v-for="(item,index) in resColumns"
        :key="index"
        :prop="item.field"
        :label="item.field"
        width="200"
    >
      <template #header>
        <el-input v-model="item.field"/>
      </template>
      <template #default="scope">
        <el-select
            v-if="scope.$index === 0"
            v-model="item.fieldType"
            filterable
            placeholder="请选择"
        >
          <el-option
              v-for="(dItem,dIndex) in PostgreSQLDataType"
              :key="dIndex"
              :label="dItem.label"
              :value="dItem.value"
          >
            {{ dItem.label }}
          </el-option>
        </el-select>
      </template>
    </el-table-column>
  </el-table>

  <br>
  <el-button @click="submit">提交</el-button>
</template>

<script setup>
import {ref, reactive, toRefs, onMounted} from 'vue'


const refTable = ref(null)
const inputRef = ref()

const PostgreSQLDataType = []
const state = reactive({
  resColumns: [
    // {
    //   name: "用户名",
    //   field: "yonghuming",
    //   fieldType: "character varying",
    //   remark: null
    // },
    {
      name: null,
      field: "username",
      fieldType: "character varying",
      remark: null
    },
    {
      name: null,
      field: "usercode",
      fieldType: "character varying",
      remark: null
    },
    {
      name: null,
      field: "sex",
      fieldType: "character varying",
      remark: null
    },
    {
      name: null,
      field: "age",
      fieldType: "integer",
      remark: null
    },
  ],
  resColumnsData: [
    {
      username: "character varying",
      usercode: "character varying",
      sex: "character varying",
      age: "integer",
    },
    {
      username: "李欣",
      usercode: "code_0",
      sex: "女",
      age: "57",
    },
    {
      username: "郭婷婷",
      usercode: "code_1",
      sex: "男",
      age: "53",
    },
  ],

  showColumns: [],
  showColumnsData: [],
})
const {
  resColumns,
  resColumnsData,

  showColumns,
  showColumnsData,
} = toRefs(state)


// 提交
const submit = () => {
  state.showColumns.forEach((item) => {
    // 重命名item的key
    Object.keys(item).forEach((key) => {
      item[key.replace('Shown', '')] = item[key]
      delete item[key]
    })
  })
  console.log('提交的showColumns', showColumns.value)
}

onMounted(() => {
  console.log('resColumnsData', resColumnsData.value)
  console.log('resColumns', resColumns.value)

  state.resColumns.forEach((item) => {
    console.log('item', item)

    let obj = {}
    // 获取item的key
    Object.keys(item).forEach((key) => {
      obj[key + 'Shown'] = item[key]
    })
    showColumns.value.push(obj)
  })
})
</script>
