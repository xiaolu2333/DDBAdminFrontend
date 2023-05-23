<template>
  <div>
    <el-card>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card>
            <input type="file" ref="file" @change="handleFileChange"/>
            <button @click="uploadFile">Upload</button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <button @click="downloadFile">Download</button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script setup>
import {reactive, ref, toRefs} from 'vue'
import {UploadFile, DownloadFile} from '@/api/learn/uploadAndDownloadFile.js'

const file = ref("file")
const state = reactive({
  fileObj: null,
})
const {
  fileObj
} = toRefs(state)

function handleFileChange() {
  console.log("file:", file)
  // 获取文件
  state.fileObj = file.value.files[0];
  console.log("state.fileObj:", state.fileObj)
}

function uploadFile() {
  // 创建表单对象
  let formData = new FormData();
  // 添加要上传的文件到表单对象中
  formData.append("file", state.fileObj);
  UploadFile(formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}

function downloadFile() {
  // 下载文件
  DownloadFile()
      .then((response) => {
        console.log(response);
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        // 切割出文件名
        let fileNameEncode = response.headers['content-disposition'].split("filename=")[1];
        // 解码
        let fileName = decodeURIComponent(fileNameEncode)
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        // 释放内存
        window.URL.revokeObjectURL(link.href)
      })
}
</script>