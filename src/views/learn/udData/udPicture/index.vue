<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-card>
        <template #header><span>上传图片</span></template>
        <el-upload
            v-model:file-list="fileList"
            :auto-upload="false"
            multiple
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
          <el-icon>
            <Plus/>
          </el-icon>
        </el-upload>
        <el-button type="primary" @click="onSubmit">点击上传</el-button>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header><span>图片预览</span></template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'

import type {UploadProps, UploadUserFile} from 'element-plus'

const fileList = ref<UploadUserFile[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const onSubmit = () => {
  console.log(fileList.value)
}
</script>
