<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <p>11111</p>
          <el-tree
              :data="treeData"
              :props="{label: 'name', children: 'children'}"
              @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <p>2222222</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, toRefs} from "vue";

import {GetDataTree, CreateNode} from '../../../api/dataManage/dataTree.js'


const state = {
  treeData: [] as any[],
  defaultProps: {
    children: 'children',
    label: 'name',
    value: 'name',
  }
}
const {
  treeData,
  defaultProps,
} = toRefs(state)


/************************ tree ************************/
const handleNodeClick = (data: any) => {
  console.log(data)
}


/************************ init ************************/
onMounted(() => {
  GetDataTree().then(res => {
    console.log('res:', res)
    state.treeData = res.data.data
  })
})

</script>
