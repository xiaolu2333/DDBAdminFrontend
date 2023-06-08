<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <el-switch
              v-model="isComplete"
              size="large"
              active-text="完整"
              inactive-text="简易"
          />
          <el-tree
              :data="treeData"
              :props="defaultProps"
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
import {onMounted, toRefs, reactive} from "vue";

import {GetDataTree, CreateNode} from '../../../api/dataManage/dataTree.js'


const state = reactive({
  isComplete: true,
  treeData: [] as any[],
  defaultProps: {
    children: 'children',
    label: 'name',
  }
})
const {
  isComplete,
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
