<template>
  <div>
    <el-card>
      <el-card>
        <template #header>
          【大文件分片上传】
        </template>
        选择文件<input type="file" ref="" @change="handleFileChange">
        <el-button type="primary" @click="startUploadFile">开始分片上传大文件</el-button>
        <el-progress :percentage="state.percentage" :status="state.progressStatus"/>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, toRefs} from 'vue'

import {uploadBigFileSliceApi} from "@/api/learn/udData/uploadBigFileSlice.js";

const file = ref("file")
const state = reactive({
  // 文件对象
  fileObj: undefined,
  // 进度条
  percentage: 0,
  // 进度条状态
  progressStatus: ''
})

/*************************** 大文件分片上传 ***************************/
function handleFileChange(event) {
  state.fileObj = event.target.files[0];
}

function startUploadFile() {
  handleUploadBigFileSlice()
}

async function handleUploadBigFileSlice() {
  const fileName = state.fileObj.name;
  const fileSize = state.fileObj.size;
  let chunkSize = 1024 * 1024; // 每个分块的大小（2MB）
  let start = 0; // 分块的起始位置

  while (start < fileSize) {

    if (start + chunkSize >= fileSize) {
      chunkSize = fileSize - start + 1;
      const chunk = state.fileObj.slice(start, start + chunkSize);
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('filename', fileName);
      formData.append('chunkSize', chunkSize.toString());

      const response = await uploadBigFileSliceApi(formData, start, chunkSize, fileSize);
      console.log('response: ', response)

      if (response.data.code === 200) {
        // 文件上传完成
        state.percentage = 100;
        state.progressStatus = 'success'
        break;
      }
    }

    const chunk = state.fileObj.slice(start, start + chunkSize);
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('filename', fileName);
    formData.append('chunkSize', chunkSize.toString());

    const response = await uploadBigFileSliceApi(formData, start, chunkSize, fileSize);

    if (response.data.code === 308) {
      state.percentage = Number(((start + chunkSize) / fileSize * 100).toFixed(2))
      // 获取下一块的起始位置
      start = parseInt(response.headers.range.split('=')[1].split('-')[0]);
    } else {
      // 文件上传完成
      break;
    }
  }
}


/*************************** 初始化 ***************************/
onMounted(() => {
})

</script>