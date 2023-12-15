<template>
  <div class="m-4">
    <p>支持多选</p>
    <el-select
        v-model="value1"
        multiple
        placeholder="Select"
        style="width: 240px"
        @change="handleChange"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <div>{{ value1 }}</div>
  </div>
  <div class="m-4">
    <p>仅单选</p>
    <el-select
        v-model="value2"
        placeholder="Select"
        style="width: 240px"
        @change="handleChange"
    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <div>{{ value2 }}</div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

// 默认多选时，value是数组
const value1 = ref(['1'])
// 默认单选时，value是字符串
const value2 = ref('3')
const options = [
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

function handleChange(val: any) {
  console.log(val)
}
</script>
