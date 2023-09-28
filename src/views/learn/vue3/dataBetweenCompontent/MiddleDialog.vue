<template>
  <el-dialog
      v-model="parent.dialogVisible"
      :title="parent.title"
      :height="parent.height"
  >
    <Grandson/>
    <template #footer>
      <el-button @click="parent.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="parent.dialogVisible = false">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs} from "vue";

import Grandson from "./Grandson.vue";

const props = defineProps<{
  dialogData: {
    dialogVisible: boolean,
    title: string,
    height: number
  }
}>()
const parent: any = ref(props.dialogData)

const state = reactive({})
const {} = toRefs(state)

</script>

<style scoped>

</style>