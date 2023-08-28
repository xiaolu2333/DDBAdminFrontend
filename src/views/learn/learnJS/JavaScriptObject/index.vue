<template>

  <el-card style="height: 300px">
    <template #header>通过一个对象来更新另一个对象
      <el-button type="success" @click="updateObjOne">更新</el-button>
    </template>
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
  </el-card>

  <el-card style="height: 300px">
    <template #header>比较对象属性值
      <el-button type="success" @click="checkObject">获取比较结果</el-button>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table :data="objKeysSame">
          <el-table-column label="属性名" prop="prop"></el-table-column>
          <el-table-column label="objOne" prop="objOne"></el-table-column>
          <el-table-column label="objThree" prop="objThree"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="objKeysDiff">
          <el-table-column label="属性名" prop="prop"></el-table-column>
          <el-table-column label="objOne" prop="objOne"></el-table-column>
          <el-table-column label="objThree" prop="objThree"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>


</template>

<script setup>

import {onMounted, reactive, ref, toRefs} from "vue";

let objOne = {
  name: '张三',
  age: 18,
  sex: '男',
}

let objThree = {
  name: '张三',
  age: 20,
  sex: '女'
}

const state = reactive({
  objTwo: {
    age: 20
  }
})

const {
  objTwo
} = toRefs(state)

/****************************************************************************************/
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
  objOne.value = {
    ...objOne,
    ...objTwo.value
  }
  console.log('objOne:', objOne)
}

/****************************************************************************************/
// 保存属性值相同的属性名
let objKeysSame = ref([])
// 保存属性值不相同的属性名
let objKeysDiff = ref([])

let tableData = [
  {prop: '属性名1', objOne: 'objOne属性值1', objThree: 'objThree属性值1'},
  {prop: '属性名2', objOne: 'objOne属性值2', objThree: 'objThree属性值2'},
  // 添加更多数据行...
]

// 比较对象属性值
function checkObject() {
  let objOneKeys = Object.keys(objOne)
  let objThreeKeys = Object.keys(objThree)
  objKeysSame.value = []
  objKeysDiff.value = []

  console.log(objOneKeys)
  console.log(objThreeKeys)

  // 判断 objOneKeys 和 objThreeKeys 是否相等
  if (objOneKeys.length !== objThreeKeys.length) {
    console.log('两个对象的属性数量不相等')
    return false
  } else {
    for (let i = 0; i < objOneKeys.length; i++) {
      if (objOneKeys[i] !== objThreeKeys[i]) {
        console.log('两个对象的属性名不相等')
        return false
      }
    }
  }

  // 判断 objOne 和 objThree 的属性值是否相等
  for (let key in objOne) {
    if (objOne[key] !== objThree[key]) {
      console.log(`两个对象的属性 ${key} 的值不相等`)
      let obj = {
        prop: key,
        objOne: objOne[key],
        objThree: objThree[key]
      }
      objKeysDiff.value.push(obj)
    } else {
      console.log(`两个对象的属性 ${key} 的值相等`)
      let obj = {
        prop: key,
        objOne: objOne[key],
        objThree: objThree[key]
      }
      objKeysSame.value.push(obj)
    }
  }

  console.log('objKeysSame:', objKeysSame.value)
  console.log('objKeysDiff:', objKeysDiff.value)
}


onMounted(() => {
})
</script>

<style scoped>

</style>