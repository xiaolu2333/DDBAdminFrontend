<template>
  <el-table
      :data="tableData" style="width: 100%"
      @row-click="handleRowClick"
  >
    <el-table-column prop="name" label="Name"/>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
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
import {
  interruptDownloadRequest
} from '@/api/learn/uploadAndDownloadFile.js'
import {ElMessage} from "element-plus";
import {ref} from "vue";

const tableData = [
  {
    id: '2016-05-03',
    name: 'Tom',
  },
  {
    id: '2016-05-02',
    name: 'Tom',
  },
  {
    id: '2016-05-04',
    name: 'Tom',
  },
  {
    id: '2016-05-01',
    name: 'Tom',
  }
]
const showProgress = ref(false)
const percentage = ref(0)
const status = ref("")

const handleRowClick = (row) => {

}

const handleClick = () => {

  showProgress.value = true
  percentage.value = 0
  interruptDownloadRequest(
      "1",
      function (progress) {
        let proData = Math.floor((progress.loaded / progress.total) * 100);
        percentage.value = proData
        if (proData === 100) {
          status.value = "success"

        }
      }
  ).then((response) => {
    if (response.data.type === 'application/json') {
      // 获取 response.data 中的具体内容
      const reader = new FileReader()
      reader.readAsText(response.data)
      reader.onload = () => {
        const res = JSON.parse(reader.result)
        ElMessage.error(res.msg)
      }
      showProgress.value = false
      percentage.value = 0
    } else if (response.data.type === 'application/octet-stream') {
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
      showProgress.value = false
    }
  })
}


/************************************ utils ************************************/
const format = (percentage) => (percentage === 100 ? '完成' : `${percentage}%`)

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
    case 'xml':
      return 'application/xml';
    case 'txt':
      return 'text/plain';
    case 'csv':
      return 'text/csv';
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
</script>
