<template>
  <el-dialog
      v-model="parent.dialogVisible"
      :title="parent.title"
      :height="parent.height"
  >
    <Grandson ref="grandsonRef"/>
    <template #footer>
      <el-button @click="parent.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="parent.dialogVisible = false">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, getCurrentInstance} from "vue";

import Grandson from "./Grandson.vue";

const {proxy} = getCurrentInstance();
const props = defineProps<{
  dialogData: {
    dialogVisible: boolean,
    title: string,
    height: number
  }
}>()
const parent: any = ref(props.dialogData)
const grandsonRef = ref<InstanceType<typeof Grandson>>()
const state = reactive({})
const {} = toRefs(state)

/**
 * 在爷爷调用孙子的函数获取数据时，充当中间人的角色
 */
const middleMethod = () => {
  console.log('proxy:', proxy)
  console.log('refs:', proxy.$refs)
  return 'testtest'
}
defineExpose({
  middleMethod
});
</script>

<style scoped>

</style>