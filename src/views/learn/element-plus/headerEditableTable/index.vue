<template>
  <el-table
      :data="resColumnsData"
      height="200"
      width="300"
      ref="refTableRes"
  >
    <el-table-column
        v-for="(item,index) in resColumns"
        :key="index"
        :prop="item.field"
        :label="item.field"
        width="200"
    >
      <template #header>
        <el-input v-model="item.fieldFake"/>
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
import {ref, reactive, toRefs, onMounted, nextTick} from 'vue'


// 通过 ref="refTableRes" 获取dom
const refTableRes = ref()

const PostgreSQLDataType = [
  {
    label: "character varying",
    value: "character varying",
  },
  {
    label: "integer",
    value: "integer",
  },
]
const state = reactive({
  resColumns: [
    // {
    //   name: "用户名",
    //   field: "yonghuming",
    //   fieldFake: "yonghuming",
    //   fieldType: "character varying",
    //   remark: null
    // },
    {
      name: null,
      field: "username",
      fieldFake: "username",
      fieldType: "character varying",
      remark: null
    },
    {
      name: null,
      field: "usercode",
      fieldFake: "usercode",
      fieldType: "character varying",
      remark: null
    },
    {
      name: null,
      field: "sex",
      fieldFake: "sex",
      fieldType: "character varying",
      remark: null
    },
    {
      name: null,
      field: "age",
      fieldFake: "age",
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
    {
      username: "李娜",
      usercode: "code_2",
      sex: "女",
      age: "53",
    },
    {
      username: "李娜",
      usercode: "code_2",
      sex: "女",
      age: "53",
    },
    {
      username: "李娜",
      usercode: "code_2",
      sex: "女",
      age: "53",
    },
    {
      username: "李娜",
      usercode: "code_2",
      sex: "女",
      age: "53",
    }, {
      username: "李娜",
      usercode: "code_2",
      sex: "女",
      age: "53",
    },
  ],

  showColumns: [],
  showColumnsData: [],
})
const {
  resColumns,
  resColumnsData,
} = toRefs(state)


// 提交
const submit = () => {
  state.resColumns.forEach((item) => {
    item.name = item.fieldFake
    // 删除无用的字段
    delete item.fieldFake
  })
}

onMounted(() => {
  let tableRes = refTableRes.value.layout.table.refs.bodyWrapper;
  // 监听横向滚动事件
  tableRes.addEventListener(
      "scroll",
      () => {
        // 设置横向滚动条的位置
        console.log("resres");
      },
      true
  );

})
</script>
