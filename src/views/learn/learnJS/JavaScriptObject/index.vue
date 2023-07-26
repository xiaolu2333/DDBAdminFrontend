<template>

  <el-card style="height: 250px">
    <template #header>通过一个对象来更新另一个对象
      <el-button type="success" @click="updateObjOne">更新</el-button>
    </template>
    <el-scrollbar height="200px">
      <el-row>
        <el-col :span=12>
          <div>
            更新前：
            <pre>{{ objOne }}</pre>
            <pre>{{ objTwo }}</pre>
          </div>
        </el-col>
        <el-col :span=12>
          <div>
            更新后：
            <pre>{{ objOne }}</pre>
            <pre>{{ objTwo }}</pre>
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-card>

</template>

<script setup>

import {onMounted, reactive, toRefs} from "vue";

let objOne = {
    name: '张三',
    age: 18,
    sex: '男',
  }
const state = reactive({
  objTwo: {
    age: 20
  }
})

const {
  objTwo
} = toRefs(state)

// 通过一个对象来更新另一个对象
function updateObjOne() {
  console.log(objOne)
  console.log(objTwo.value)

  // // 方法一：用Object.assign()方法复制自有属性值
  // Object.assign(objOne.value, objTwo.value)
  // console.log(objOne.value)

  // 方法二：用for...in...循环遍历赋值
  // for (let key in objTwo.value) {
  //   objOne.value[key] = objTwo.value[key]
  // }
  // console.log(objOne.value)

  // 方法三：用解构赋值
  objOne.value= {
    ...objOne,
    ...objTwo.value
  }
  console.log('objOne:',objOne)
}

onMounted(() => {
})
</script>

<style scoped>

</style>