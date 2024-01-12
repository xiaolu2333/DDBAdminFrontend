<template>
  <el-card>
    <p>常规数组项，无法避免名称重复的问题：</p>
    <el-checkbox
        v-model="checkAll1"
        @change="handleCheckAllChange1"
    >是否全选
    </el-checkbox>
    <el-checkbox-group
        v-model="checkedCities1"
    >
      <el-checkbox
          v-for="city in cities1"
          :key="city"
          :label="city"
      >
        {{ city }}
      </el-checkbox>
    </el-checkbox-group>
    <div>{{ checkedCities1 }}</div>
  </el-card>

  <el-card>
    <p>使用对象数组，可避免名称重复的问题：</p>
    <el-checkbox
        v-model="checkAll2"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange2"
    >是否全选
    </el-checkbox>
    <el-checkbox-group
        v-model="checkedCities2"
        @change="handleCheckedCitiesChange2"
    >
      <!--使用对象数组与label主键可避免名称重复的问题-->
      <el-checkbox
          v-for="city in cities2"
          :key="city.label"
          :label="city.id"
          :value="city.value"
      >
        {{ city.label }}
      </el-checkbox>
    </el-checkbox-group>
    <div>{{ checkedCities2 }}</div>
  </el-card>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

// 所有选中的城市
const checkedCities1 = ref(['Shanghai', 'Beijing'])
// 常规项，无法避免名称重复的问题
const cities1 = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Shenzhen']
// 是否全选
const checkAll1 = ref(false)
const checkAll2 = ref(false)
// 表示中间状态
const isIndeterminate = ref(true)
const checkedCities2 = ref([1, 3])
// 为了避免名称重复的问题，使用对象数组
const cities2 = [
  {
    id: 1,
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    id: 2,
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    id: 3,
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
  {
    id: 4,
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    id: 5,
    value: 'Shenzhen',
    label: 'Shenzhen',
  }
]

const handleCheckAllChange1 = (val: boolean) => {
  // 获取由cities中的每个元素的id组成的数组
  checkedCities1.value = val ? cities1 : []
  const checkedCount = checkedCities1.value.length
  checkAll1.value = checkedCount === cities1.length
}
const handleCheckedCitiesChange1 = (value: any[]) => {
}

const handleCheckAllChange2 = (val: boolean) => {
  // 获取由cities中的每个元素的id组成的数组
  checkedCities2.value = val ? cities2.map((item) => item.id) : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange2 = (value: any[]) => {
  const checkedCount = value.length
  checkAll2.value = checkedCount === cities2.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities2.length
}
</script>
