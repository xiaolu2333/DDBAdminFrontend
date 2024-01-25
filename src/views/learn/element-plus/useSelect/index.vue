<template>
  <el-card>
    <p>支持多选</p>
    <el-select
        v-model="value1"
        multiple
        placeholder="Select"
        style="width: 240px"
        @change="handleChange"
    >
      <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <div>{{ value1 }}</div>
  </el-card>
  <el-card>
    <p>仅单选</p>
    <el-select
        v-model="value2"
        placeholder="Select"
        style="width: 240px"
        @change="handleChange"
    >
      <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <div>{{ value2 }}</div>
  </el-card>
  <el-card>
    <p>树形选择器</p>
    <el-tree-select
        v-model="value3"
        :data="options2"
        :props="{children: 'children',label: 'id'}"
        :render-after-expand="false"
        style="width: 240px"
    />

  </el-card>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

// 默认多选时，value是数组
const value1 = ref(['1'])
// 默认单选时，value是字符串
const value2 = ref('3')
const options1 = [
  {
    value: '1',
    label: 'Option1',
  },
  {
    value: '2',
    label: 'Option2',
  },
  {
    value: '3',
    label: 'Option3',
  },
  {
    value: '4',
    label: 'Option4',
  },
  {
    value: '5',
    label: 'Option5',
  },
]

const value3 = ref()
const options2 = [
  {
    id: '1',
    name: 'Level one 1',
    disabled: true,
    children: [
      {
        id: '1-1',
        name: 'Level two 1-1',
      },
    ],
  },
  {
    id: '2',
    name: 'Level one 2',
    disabled: true,
    children: [
      {
        id: '2-1',
        name: 'Level two 2-1',
      },
      {
        id: '2-2',
        name: 'Level two 2-2',
      },
    ],
  },
  {
    id: '3',
    name: 'Level one 3',
    children: [
      {
        id: '3-1',
        name: 'Level two 3-1',
      },
      {
        id: '3-2',
        name: 'Level two 3-2',
      },
    ],
  },
]

function handleChange(val: any) {
  console.log(val)
}
</script>
