<template>
  <el-card>
    <el-form
        :model="form"
        :close-on-click-modal="false" label-width="120" label-position="left"
        v-loading="loading"
        element-loading-text="上传中..."
    >
      <el-form-item
          label="名称"
          prop="name"
      >
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item
          label="描述"
          prop="description"
      >
        <el-input v-model="form.description" placeholder="请输入描述" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item
          label="方案"
          prop="schemeFile"
          @click="getFileInputField('schema')"
      >
        <el-upload
            ref="schemeFileUploadRef"
            name="schemeFile"
            :auto-upload="false"
            :limit="1"
            :file-list="form.schemeFile"
            :on-change="handleSchemaFileChange"
            :on-remove="handleSchemaFileRemove"
            style="width: 90%"
        >
          <el-button type="primary" @click="getFileInputField('schema')">选择方案文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item
          label="数据文件"
          prop="dataFiles"
          @click="getFileInputField('dataFiles')"
      >
        <el-upload
            ref="dataFilesUploadRef"
            name="dataFiles"
            :auto-upload="false"
            :multiple="true"
            :file-list="form.dataFiles"
            :on-change="handleDataFileChange"
            :on-remove="handleDataFileRemove"
            style="width: 90%"
        >
          <el-button type="primary" @click="getFileInputField('dataFiles')">选择数据文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="warning" @click="cancel">取消</el-button>
    <el-button :disabled="loading" type="primary" @click="submit">保存</el-button>
  </el-card>
  <el-card>
    <el-progress
        v-show="showProgress"
        :percentage="percentage" :status="status"
        :format="format"
        :text-inside="true" :stroke-width="24"
    />
  </el-card>
</template>

<script setup>
import {reactive, ref} from "vue";

import {interruptUploadRequest} from "@/api/learn/uploadAndDownloadFile"
import {ElMessage} from "element-plus";
import axios from "axios";


const showProgress = ref(false)
const percentage = ref(0)
const status = ref("")
const schemeFileUploadRef = ref()
const dataFilesUploadRef = ref()
const form = reactive({
  name: '',
  description: '',
  schemeFile: [],
  dataFiles: [],
})
const currentFileField = ref("")
const loading = ref(false)
let controller = new AbortController();


/****************************************** schemaFile 文件操作 ******************************************/
const handleSchemaFileChange = (file) => {
  console.log('currentFileField:', currentFileField.value)
  console.log('上传方案文件:', file)
  form.schemeFile = [file]
  console.log('form.schemeFile:', form.schemeFile)
}

const handleSchemaFileRemove = (file) => {
  console.log('currentFileField:', currentFileField.value)
  console.log('删除方案文件:', file)
  form.schemeFile = []
  console.log('删除方案文件后form.schemeFile:', form.schemeFile)
}

const handleSchemaFileExceed = (files, fileList) => {
  console.log('修改文件:', files)
  form.schemeFile = []
  form.schemeFile.push(files[0])
  console.log('修改后form.schemeFile:', form.schemeFile)
}


/****************************************** dataFiles 文件操作 ******************************************/
const handleDataFileChange = (file, files) => {
  console.log('currentFileField:', currentFileField.value)
  console.log('上传数据文件:', file)
  console.log('上传数据文件列表:', files)
  form.dataFiles.push(file)
  console.log('form.dataFiles:', form.dataFiles)
}

const handleDataFileRemove = (file) => {
  console.log('currentFileField:', currentFileField.value)
  console.log('删除数据文件:', file)
  const index = form.dataFiles.indexOf(file)
  if (index > -1) {
    form.dataFiles.splice(index, 1)
  }
  console.log('删除数据文件后form.dataFiles:', form.dataFiles)
}

const cancel = () => {
  // 取消请求
  controller.abort()
  ElMessage.warning('取消上传！')
  loading.value = false
  percentage.value = 0
  showProgress.value = false

  // form.name = ''
  // form.description = ''
  // form.schemeFile = []
  // form.dataFiles = []
}

const submit = () => {
  console.log('form:', form)
  let formData = new FormData()
  formData.append('name', form.name)
  formData.append('description', form.description)

  if (form.schemeFile.length > 0) {
    formData.append('schemeFile', form.schemeFile[0].raw)
  }

  if (form.dataFiles.length > 0) {
    for (let i = 0; i < form.dataFiles.length; ++i) {
      // 打印文件名
      console.log('form.dataFiles[i].name:', form.dataFiles[i].name)
      formData.append('dataFiles', form.dataFiles[i].raw)
    }
  }

  loading.value = true
  showProgress.value = true
  interruptUploadRequest(
      formData,
      {
        signal: controller.signal
      },
      function (progress) {
        let proData = Number(Math.floor(progress.loaded / progress.total * 100).toFixed(0))
        console.log('proData:', proData)
        percentage.value = proData
        if (percentage.value === 100) {
          status.value = "success"
        }
      }
  ).then((res) => {
    console.log('res:', res)
    if (res.data.code === 200) {
      ElMessage.success('上传成功！')
      loading.value = false
      percentage.value = 0
      showProgress.value = false
    } else {
      ElMessage.error('上传失败！')
      loading.value = false
    }
  });
}

const getFileInputField = (field) => {
  console.log(field + '文件字段')
  currentFileField.value = field
}

/************************************ utils ************************************/
const format = (percentage) => (percentage === 100 ? '完成' : `${percentage}%`)

// // 通过定时器模拟进度条的变化
// setInterval(() => {
//   percentage.value += 10
//   if (percentage.value >= 100) {
//     percentage.value = 100
//     status.value = 'success'
//     // percentage.value = 0
//   }
// }, 1000)
</script>

<style scoped>
.el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>