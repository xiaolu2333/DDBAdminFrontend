<template>
  <div>
    <el-card>
      <el-row :gutter=30>
        <el-col :span=6>
          <el-card>
            <template #header>
              【一般文件上传】
            </template>
            <input type="file" ref="file" @change="handleFileChange"/>
            <button @click="uploadFile">Upload</button>
          </el-card>
        </el-col>
        <el-col :span=6>
          <el-card>
            <template #header>
              【一般文件流式下载】
            </template>
            <button @click="DownloadFileStream">Download File By Stream</button>
          </el-card>
        </el-col>
        <el-col :span=6>
          <el-card>
            <template #header>
              【一般文件URL式下载】
            </template>
            <button @click="DownloadFileURL">Download File By Url</button>
          </el-card>
        </el-col>
      </el-row>
      <br/>

      <el-row :gutter=30>
        <el-col :span=12>
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
        <el-col :span=12>
          <el-card>
            <template #header>
              【使用element plus的el-upload组件山川文件】
            </template>
            <el-form :model="formData2" ref='dataFormRef2' label-width="120px">
              <el-form-item label="姓名" prop='name' @input="change">
                <el-input v-model="formData2.name"/>
              </el-form-item>
              <el-form-item label="密码" prop="password" type="password" show-password label-width='120px'>
                <el-input v-model="formData2.password"/>
              </el-form-item>
              <el-form-item label='文件' prop='file' label-width='120px'>
                <div style="width: 100%">
                  <el-row :gutter=6>
                    <el-col :span=17>
                      <el-input
                          v-model="formData2.fileName"
                          disabled
                      />
                    </el-col>
                    <el-col :span=7>
                      <el-upload
                          ref="upload"
                          class="upload-demo"
                          action=""
                          :auto-upload="false"
                          :file-list="dataFileList"
                          :on-change="handleFileChange2"
                          :limit="1"
                          style="width: 70%"
                      >
                        <el-button type="primary">选择文件</el-button>
                      </el-upload>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit2">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter=30>
        <el-col :span=12>
<!--          <el-card>-->
<!--            <template #header>-->
<!--              【文件断点续传】-->
<!--            </template>-->
<!--            选择文件<input type="file" ref="">-->
<!--            <el-button type="primary" @click="startUploadFile">开始</el-button>-->
<!--            <el-button type="primary" @click="pauseUploadFile">暂停</el-button>-->
<!--          </el-card>-->
        </el-col>
        <el-col :span=12>
          <el-card>
            <template #header>
              【文件分片上传】
            </template>
            选择文件<input type="file" ref="file2">
            <el-button type="primary" @click="uploadFileByBlock">上传</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script setup>
import {reactive, ref, toRefs} from 'vue'
import {ElMessage} from 'element-plus'
import {
  UploadFile, UploadFormFile, UploadFileByBreakpoint,
  DownloadFileByStream, DownloadFileByURL
} from '@/api/learn/uploadAndDownloadFile.js'

const file = ref("file")
const upload = ref()
const file2 = ref("file2")
const state = reactive({
  fileObj: null,
  // 原生文件上传
  formData1: {
    name: "",
    password: "",
    file: null,
    fileName: "",
  },
  // ep upload 组件上传
  formData2: {
    name: "",
    password: "",
    fileName: "",
    file: null,
  },
  // 原生文件断点续传
  formData3: {
    name: "",
    password: "",
    file: null,
    fileName: "",
  },
  dataFileList: [],
})
const {
  fileObj,
  formData1,
  formData2,
  formData3,
  dataFileList,
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

  console.log("formData1.value.file:", formData1.value.file)
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


/*************************** ep upload 组件上传与下载 ***************************/
/**
 * 文件选择事件
 * @param file
 */
const handleFileChange2 = (file) => {
  // 先清空待上传的文件列表
  upload.value.clearFiles()
  state.formData2 = {
    name: state.formData2.name,
    password: state.formData2.password,
    fileName: file.name,
    file: file.raw,
  }
  console.log('state.formData2: ', state.formData2)
}

function submit2() {
  // 创建表单对象
  let formData = new FormData();

  console.log('formData2.value: ', formData2.value)
  // 添加要上传的文件到表单对象中
  formData.append("file", formData2.value.file);
  formData.append("name", formData2.value.name);
  formData.append("password", formData2.value.password);
  formData.append("fileName", formData2.value.fileName);

  console.log('待提交的formData: ', formData)
  UploadFormFile(formData)
      .then((response) => {
        console.log(response.data);
        ElMessage.success("上传成功")
      })
      .catch((error) => {
        console.log(error);
      });
}


/*************************** 文件断点续传 ***************************/
function handleFileUpload2(event) {
  console.log("event:", event)
  const file = event.target.files[0]
  state.formData3.fileName = file.name
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    state.formData3.file = reader.result
  }
}


function submit3() {
  // 创建表单对象
  let formData = new FormData();
  // 添加要上传的文件到表单对象中
  formData.append("file", formData3.value.file);
  formData.append("name", formData3.value.name);
  formData.append("password", formData3.value.password);
  formData.append("fileName", formData3.value.fileName);
  UploadFormFile(formData)
      .then((response) => {
        console.log(response.data);
        ElMessage.success("上传成功")
      })
      .catch((error) => {
        console.log(error);
      });
}

function change3(data) {
  console.log("data:", data)
  console.log("formData1:", formData1)
}

/*************************** 文件分块上传 ***************************/
async function uploadFileByBlock() {
  console.log('file2:', file2.value)
  // 获取文件
  state.fileObj = file2.value.files[0];
  console.log("state.fileObj:", state.fileObj)
  const CHUNK_SIZE = 1024 * 1024 * 2; // 每个文件块的大小（这里设置为1MB）
  // 获取文件信息
  const fileSize = state.fileObj.size;
  const fileName = state.fileObj.name;
  // 计算文件块数量
  const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
  // 上传文件块
  for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
    const start = chunkNumber * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, fileSize);
    const chunk = state.fileObj.slice(start, end);
    // 创建FormData对象并添加文件块
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('fileName', fileName);
    formData.append('chunkNumber', chunkNumber);
    formData.append('totalChunks', totalChunks);
    // 发送文件块到后端
    UploadFileByBreakpoint(formData).then((response) => {
      console.log(response.data);
      if (response.code === 200) {
        ElMessage.success("上传成功")
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  // 文件上传完成后的操作
  // ...
}

</script>