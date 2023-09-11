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
  age: 7,
  sex: '男',
  grade: 1,
  // 是否是班长
  isMonitor: true
}

let objThree = {
  name: '张三',
  age: 6,
  sex: '女',
  grade: 1,
  nikeName: '珊珊',
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

  // 判断两个对象是否相等
  if (JSON.stringify(objOne) === JSON.stringify(objThree)) {
    console.log('两个对象相等')
    // 将objOneKeys 放入 objKeysSame
    objOneKeys.forEach(item => {
      let obj = {
        prop: item,
        objOne: objOne[item],
        objThree: objThree[item]
      }
      objKeysSame.value.push(obj)
    })
  } else {
    console.log('两个对象不相等')
    // 判断两个对象的属性个数是否相等
    if (objOneKeys.length === objThreeKeys.length) {
      console.log('两个对象的属性个数相等')
      // 判断所有属性名是否相等
      if (objOneKeys.every(item => objThreeKeys.includes(item))) {
        console.log('两个对象的属性名相等')
        // 获取在 objOneKeys 和 objThreeKeys 中都存在的属性且属性值相等的属性名
        let objSameKeys = objOneKeys.filter(item => objThreeKeys.includes(item))
        if (objSameKeys.length > 0) {
          objSameKeys.forEach(item => {
            if (objOne[item] === objThree[item]) {
              let obj = {
                prop: item,
                objOne: objOne[item],
                objThree: objThree[item]
              }
              objKeysSame.value.push(obj)
            }
          })
        }

        // 获取在 objOneKeys 和 objThreeKeys 中都存在的属性但属性值不相等的属性名
        let objDiffKeys = objOneKeys.filter(item => objThreeKeys.includes(item))
        if (objDiffKeys.length > 0) {
          objDiffKeys.forEach(item => {
            if (objOne[item] !== objThree[item]) {
              let obj = {
                prop: item,
                objOne: objOne[item],
                objThree: objThree[item]
              }
              objKeysDiff.value.push(obj)
            }
          })
        }

        // 获取在 objOneKeys 中存在，但在 objThreeKeys 中不存在的属性名
        let objOneOnlyKeys = objOneKeys.filter(item => !objThreeKeys.includes(item))
        console.log('objOneOnlyKeys:', objOneOnlyKeys)
        console.log('objOne 比 objThree 多的属性名：', objOneOnlyKeys)
        if (objOneOnlyKeys.length > 0) {
          objOneOnlyKeys.forEach(item => {
            let obj = {
              prop: item,
              objOne: objOne[item],
              objThree: ''
            }
            objKeysDiff.value.push(obj)
          })
        }

        // 获取在 objThreeKeys 中存在，但在 objOneKeys 中不存在的属性名
        let objThreeOnlyKeys = objThreeKeys.filter(item => !objOneKeys.includes(item))
        console.log('objThreeOnlyKeys:', objThreeOnlyKeys)
        console.log('objThree 比 objOne 多的属性名：', objThreeOnlyKeys)
        if (objThreeOnlyKeys.length > 0) {
          objThreeOnlyKeys.forEach(item => {
            let obj = {
              prop: item,
              objOne: '',
              objThree: objThree[item]
            }
            objKeysDiff.value.push(obj)
          })
        }
      } else {
        console.log('两个对象的属性名不相等')
        // 获取在 objOneKeys 和 objThreeKeys 中都存在的属性且属性值都相等的属性名
        let objSameKeys = objOneKeys.filter(item => objThreeKeys.includes(item))
        if (objSameKeys.length > 0) {
          objSameKeys.forEach(item => {
            if (objOne[item] === objThree[item]) {
              let obj = {
                prop: item,
                objOne: objOne[item],
                objThree: objThree[item]
              }
              objKeysSame.value.push(obj)
            }
          })
        }

        // 获取在 objOneKeys 和 objThreeKeys 中都存在的属性但属性值不相等的属性名
        let objDiffKeys = objOneKeys.filter(item => objThreeKeys.includes(item))
        if (objDiffKeys.length > 0) {
          objDiffKeys.forEach(item => {
            if (objOne[item] !== objThree[item]) {
              let obj = {
                prop: item,
                objOne: objOne[item],
                objThree: objThree[item]
              }
              objKeysDiff.value.push(obj)
            }
          })
        }

        // 获取在 objOneKeys 中存在，但在 objThreeKeys 中不存在的属性名
        let objOneOnlyKeys = objOneKeys.filter(item => !objThreeKeys.includes(item))
        console.log('objOneOnlyKeys:', objOneOnlyKeys)
        console.log('objOne 比 objThree 多的属性名：', objOneOnlyKeys)
        if (objOneOnlyKeys.length > 0) {
          objOneOnlyKeys.forEach(item => {
            let obj = {
              prop: item,
              objOne: objOne[item],
              objThree: ''
            }
            objKeysDiff.value.push(obj)
          })
        }

        // 获取在 objThreeKeys 中存在，但在 objOneKeys 中不存在的属性名
        let objThreeOnlyKeys = objThreeKeys.filter(item => !objOneKeys.includes(item))
        console.log('objThreeOnlyKeys:', objThreeOnlyKeys)
        console.log('objThree 比 objOne 多的属性名：', objThreeOnlyKeys)
        if (objThreeOnlyKeys.length > 0) {
          objThreeOnlyKeys.forEach(item => {
            let obj = {
              prop: item,
              objOne: '',
              objThree: objThree[item]
            }
            objKeysDiff.value.push(obj)
          })
        }
      }
    }
    // 属性个数不相等时，取出所有差异（A比B多的属性，A比B少的属性）
    else {
      console.log('两个对象的属性个数不相等')
      // 获取在 objOneKeys 和 objThreeKeys 中都存在的属性且属性值相等的属性名
      let objSameKeys = objOneKeys.filter(item => objThreeKeys.includes(item))
      if (objSameKeys.length > 0) {
        objSameKeys.forEach(item => {
          if (objOne[item] === objThree[item]) {
            let obj = {
              prop: item,
              objOne: objOne[item],
              objThree: objThree[item]
            }
            objKeysSame.value.push(obj)
          }
        })
      }

      // 获取在 objOneKeys 和 objThreeKeys 中都存在的属性但属性值不相等的属性名
      let objDiffKeys = objOneKeys.filter(item => objThreeKeys.includes(item))
      if (objDiffKeys.length > 0) {
        objDiffKeys.forEach(item => {
          if (objOne[item] !== objThree[item]) {
            let obj = {
              prop: item,
              objOne: objOne[item],
              objThree: objThree[item]
            }
            objKeysDiff.value.push(obj)
          }
        })
      }

      // 获取在 objOneKeys 中存在，但在 objThreeKeys 中不存在的属性名
      let objOneOnlyKeys = objOneKeys.filter(item => !objThreeKeys.includes(item))
      console.log('objOneOnlyKeys:', objOneOnlyKeys)
      console.log('objOne 比 objThree 多的属性名：', objOneOnlyKeys)
      if (objOneOnlyKeys.length > 0) {
        objOneOnlyKeys.forEach(item => {
          let obj = {
            prop: item,
            objOne: objOne[item],
            objThree: ''
          }
          objKeysDiff.value.push(obj)
        })
      }

      // 获取在 objThreeKeys 中存在，但在 objOneKeys 中不存在的属性名
      let objThreeOnlyKeys = objThreeKeys.filter(item => !objOneKeys.includes(item))
      console.log('objThreeOnlyKeys:', objThreeOnlyKeys)
      console.log('objThree 比 objOne 多的属性名：', objThreeOnlyKeys)
      if (objThreeOnlyKeys.length > 0) {
        objThreeOnlyKeys.forEach(item => {
          let obj = {
            prop: item,
            objOne: '',
            objThree: objThree[item]
          }
          objKeysDiff.value.push(obj)
        })
      }
    }
  }

  console.log('objKeysSame:', objKeysSame.value)
  console.log('objKeysDiff:', objKeysDiff.value)
}


// 获取
function diffProps(oldObj, newObj) {

  const keys1 = Object.keys(oldObj);
  const keys2 = Object.keys(newObj);

  const keys = new Set([...keys1, ...keys2]);

  return [...keys].filter(key => {
    return oldObj[key] !== newObj[key];
  }).map(key => {
    return {
      key,
      owner: keys1.includes(key) ? 'oldObj' : 'newObj'
    };
  });
}

console.log(diffProps(objOne, objThree));

onMounted(() => {
})
</script>

<style scoped>

</style>