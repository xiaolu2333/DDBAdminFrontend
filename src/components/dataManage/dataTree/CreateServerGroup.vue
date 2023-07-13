<template>
  <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      draggable
      destroy-on-close
      @close="closeDialog"
      style="height: 500px; width: 600px;position: relative;"
      class="dialogTab"
  >
    <p>{{ propData.id }}</p>
    <p>{{ propData.name }}</p>
    <template #footer>
      <el-row style="position: absolute; bottom: 0; width: 100%; margin-left: -20px; padding: 20px 10px;">
        <el-col :span="12" style="text-align: left!important;">
          <el-button @click="cancelForm1" :icon="WarningFilled" :size="20"/>
          <el-button @click="cancelForm1" :icon="QuestionFilled" :size="20"/>
        </el-col>
        <el-col :span="12">
          <el-button @click="closeDialog" :icon="CircleClose">关闭</el-button>
          <el-button type="primary" @click="submit" :icon="Checked">提交</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import {onMounted, ref, toRefs, watch, reactive, computed, h} from 'vue'
import {ElForm, ElMessage, ElMessageBox, UploadFile} from 'element-plus'
import {WarningFilled, QuestionFilled, CircleClose, Checked} from '@element-plus/icons-vue'

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
  dialogVisible.value = false

  // 抛出关闭事件
  let isDialogVisible = false
  emit('clear-customComponent', (isDialogVisible))
}

/************************* init *************************/
function init() {
  console.log('propData.value', propData.value)
  dialogVisible.value = true
}

onMounted(() => {
  init()
})
</script>

<style scoped>

</style>