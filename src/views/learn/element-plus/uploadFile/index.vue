<template>
  <el-card>
    <el-form :model="form" :close-on-click-modal="false" label-width="120" label-position="left">
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
            accept=".txt, .pdf, .doc, .docx, .md"
            :auto-upload="false"
            :limit="1"
            :file-list="form.schemeFile"
            :on-change="handleSchemaFileChange"
            :on-remove="handleSchemaFileRemove"
            :on-exceed="handleSchemaFileExceed"
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
  <el-button type="warning" @click="cancel">取消</el-button>
  <el-button :disabled="loading" type="primary" @click="submit">保存</el-button>
</template>

<script setup>
import {reactive, ref} from "vue";

import {interruptUploadRequest} from "@/api/learn/uploadAndDownloadFile"
import {ElMessage} from "element-plus";

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


  console.log('form:', form)
  form.name = ''
  form.description = ''
  form.schemeFile = []
  form.dataFiles = []
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
    console.log('formData:', formData)

    loading.value = true
    interruptUploadRequest(formData).then((res) => {
      console.log('res:', res)
      if (res.data.code === 200) {
        ElMessage.success('上传成功！')
      }
      loading.value = false
    }).catch((err) => {
      ElMessage.error(err.message)
      loading.value = false
    })
  }
}

const getFileInputField = (field) => {
  console.log(field + '文件字段')
  currentFileField.value = field
}
</script>

<style scoped>

</style>