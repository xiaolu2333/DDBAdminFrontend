<template>
  <div>
    <el-card>
      <el-row :gutter="30">
        <el-col :span="6">
          <el-card>
            <template #header>
              【一般文件上传】
            </template>
            <input type="file" ref="file" @change="handleFileChange"/>
            <button @click="uploadFile">Upload</button>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <template #header>
              【一般文件流式下载】
            </template>
            <button @click="DownloadFileStream">Download File By Stream</button>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <template #header>
              【一般文件URL式下载】
            </template>
            <button @click="DownloadFileURL">Download File By Url</button>
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
import {UploadFile, UploadFormFile, DownloadFileByStream, DownloadFileByURL} from '@/api/learn/uploadAndDownloadFile.js'

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

function DownloadFileStream() {
  // 下载文件
  DownloadFileByStream()
      .then((response) => {
        console.log(response);
        // 获取文件名
        let fileNameEncode = response.headers['content-disposition'].split("filename=")[1];
        // 解码
        let fileName = decodeURIComponent(fileNameEncode)
        // 指定文件类型
        const fileType = getContentType(fileName.split('.')[1])
        let blob = new Blob([response.data], {
          type: fileType
        })

        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        // 释放内存
        window.URL.revokeObjectURL(link.href)

        ElMessage.success("下载成功")
      })
}

function DownloadFileURL() {
  // 下载文件
  DownloadFileByURL()
      .then((response) => {
        console.log(response);
        const link = document.createElement('a') // 创建一个 a 标签用来模拟点击事件
        link.style.display = 'none'
        link.href = response.data // 下载地址
        link.setAttribute('download', '文件名')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        ElMessage.success("下载成功")
      })
}

function getContentType(filename) {
  const extension = filename.substring(filename.lastIndexOf('.') + 1);
  switch (extension) {
    case 'html':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'js':
      return 'text/javascript';
    case 'json':
      return 'application/json';
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'wav':
      return 'audio/wav';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc':
      return 'application/msword';
    case 'pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'ppt':
      return 'application/vnd.ms-powerpoint';
    case 'zip':
      return 'application/zip';
    default:
      return 'application/octet-stream';
  }
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