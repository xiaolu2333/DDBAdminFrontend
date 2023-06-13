<template>
  <div>
    <el-card>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card>
            <template #header>
              【一般文件上传】
            </template>
            <input type="file" ref="file" @change="handleFileChange"/>
            <button @click="uploadFile">Upload</button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <template #header>
              【一般文件下载】
            </template>
            <button @click="downloadFile">Download</button>
          </el-card>
        </el-col>
      </el-row>
      <br/>

      <el-row :gutter="30">
        <el-col :span="12">
          <el-card>
            <template #header>
              【在表单数据中上传文件】
            </template>
            <el-form :model="formData1" ref='dataFormRef' label-width="120px">
              <el-form-item label="姓名" prop='name' @input="change">
                <el-input v-model="formData1.name"/>
              </el-form-item>
              <el-form-item label="密码" prop="password" type="password" show-password>
                <el-input v-model="formData1.password"/>
              </el-form-item>
              <el-form-item label="文件" prop="file">
                <el-input v-model="formData1.fileName"/>
                <input type="file" @change="handleFileUpload"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit1">提交</el-button>
              </el-form-item>
            </el-form>
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
import {ElMessage} from 'element-plus'
import {UploadFile, DownloadFile, UploadFormFile} from '@/api/learn/uploadAndDownloadFile.js'

const file = ref("file")
const state = reactive({
  formData1: {
    name: "",
    password: "",
    file: null,
    fileName: "",
  },
})
const {
  formData1,
} = toRefs(state)

/*************************** 一般文件上传与下载 ***************************/
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
        ElMessage.success("上传成功")
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
        // 获取文件名
        let fileNameEncode = response.headers['content-disposition'].split("filename=")[1];
        // 解码
        let fileName = decodeURIComponent(fileNameEncode)
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        // 释放内存
        window.URL.revokeObjectURL(link.href)

        ElMessage.success("下载成功")
      })
}


/*************************** 表单文件上传与下载 ***************************/
function handleFileUpload(event) {
  console.log("event:", event)
  const file = event.target.files[0]
  state.formData1.fileName = file.name
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    state.formData1.file = reader.result
  }
}


function submit1() {
  // 创建表单对象
  let formData = new FormData();
  // 添加要上传的文件到表单对象中
  formData.append("file", formData1.value.file);
  formData.append("name", formData1.value.name);
  formData.append("password", formData1.value.password);
  formData.append("fileName", formData1.value.fileName);
  UploadFormFile(formData)
      .then((response) => {
        console.log(response.data);
        ElMessage.success("上传成功")
      })
      .catch((error) => {
        console.log(error);
      });
}

function change(data) {
  console.log("data:", data)
  console.log("formData1:", formData1)
}

</script>