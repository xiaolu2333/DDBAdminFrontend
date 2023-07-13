<template>
  <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      draggable
      destroy-on-close
      @close="closeDialog"
      style="height: 650px; width: 800px;"
      class="dialogTab"
  >
    1111111111
  </el-dialog>

</template>

<script lang="ts" setup>
import {onMounted, ref, toRefs, watch, reactive, computed, h} from 'vue'
import {ElForm, ElMessage, ElMessageBox, UploadFile} from 'element-plus'
import {ArrowLeft, ArrowRight} from '@element-plus/icons-vue'

const props = defineProps<{
  componentData: any
}>()
const propData = ref(props.componentData)

const emit = defineEmits(['clear-customComponent'])

watch(props, () => {
  (props.componentData.dialogVisible !== false) && (dialogVisible.value = true);
  propData.value = props.componentData
})

const state = reactive({
  // 对话框是否可见
  dialogVisible: false,
})
const {
  dialogVisible,
} = toRefs(state)


function closeDialog() {
  console.log('closeDialog')
  dialogVisible.value = false

  // 抛出关闭事件
  let isDialogVisible = false
  emit('clear-customComponent', (isDialogVisible))
}

/************************* init *************************/
function init() {
  dialogVisible.value = true
  console.log('propData.value', propData.value)
}

onMounted(() => {
  init()
})
</script>

<style scoped>

</style>