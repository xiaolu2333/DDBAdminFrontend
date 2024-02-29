<template>
  <div>
    <el-card>
      <el-card>
        <template #header>
          【大文件分片上传】
        </template>
        选择文件<input type="file" @change="handleFileChange">
        <el-button type="primary" @click="startUploadFile">开始分片上传大文件</el-button>
        <el-progress :percentage="state.percentage" :status="state.progressStatus"/>
      </el-card>
      <el-table :data="state.fileSliceList" height="550" style="width: 100%">
        <el-table-column type="index" width="50"/>
        <el-table-column prop="start" label="切片起点"/>
        <el-table-column prop="end" label="切片终点"/>
        <el-table-column prop="size" label="切片大小"/>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import SparkMD5 from 'spark-md5'

import {uploadBigFileSliceApi} from "@/api/learn/udData/uploadBigFileSlice.js";

const file = ref("file")
const state = reactive({
  // 文件对象
  fileObj: undefined,
  // 文件切片列表
  fileSliceList: [],
  // 进度条
  percentage: 0,
  // 进度条状态
  progressStatus: ''
})

// interface FileSliceType {
//   start: number
//   end: number
//   size: number
//   index: number
//   obj: any
//   hash: string
//   fileName: string
// }

/*************************** 大文件分片上传 ***************************/
function handleFileChange(event) {
  console.log('event:', event)
  state.fileObj = event.target.files[0];

  // 切片
  sliceFileObj()

  // 计算 hash
  calculateHash()
}

// 文件对象切片
const sliceFileObj = () => {
  const fileName = state.fileObj.name
  const fileSize = state.fileObj.size

  let chunkSize = 1024 * 1024 * 2; // 每个切片的大小（2MB）
  let start = 0; // 切片的起始位置
  let chunk = 0; // 切片大小
  let fileSliceIndex = 0; // 当前分片索引

  state.fileSliceList = []

  while (start < fileSize) {
    fileSliceIndex++

    if (start + chunkSize <= fileSize) {
      state.fileSliceList.push({
        start: start,
        end: start + chunkSize,
        size: chunkSize,
        index: fileSliceIndex,
        obj: state.fileObj.slice(start, start + chunkSize),
        fileName: fileName
      })
    } else {
      state.fileSliceList.push({
        start: start,
        end: fileSize,
        size: fileSize - start,
        index: fileSliceIndex,
        obj: state.fileObj.slice(start, fileSize - start),
        fileName: fileName
      })
    }

    start += chunkSize
  }
}

const calculateHash = () => {
  // 分片 hash，直接读取文件内容来生成 md5 值
  state.fileSliceList.forEach((item) => {
    let sparkMD5 = new SparkMD5()
    let reader = new FileReader()
    reader.readAsText(item.obj)
    reader.onload = (event) => {
      console.log('event:', event)

      //获取文件MD5
      let str = event.target.result
      sparkMD5.append(str)
      item.hash = sparkMD5.end()
    }
  })
}


const startUploadFile = async () => {
  console.log(state.fileSliceList)

  let concurrent = 2 // 并发数
  let index = 0 // 当前上传的索引
  let len = state.fileSliceList.length // 文件切片的长度
  let promiseList = []

  while (index < len) {

    const formData = new FormData();

    formData.append('start', state.fileSliceList[index].start);
    formData.append('end', state.fileSliceList[index].end);
    formData.append('size', state.fileSliceList[index].size);
    formData.append('index', state.fileSliceList[index].index);
    formData.append('file', state.fileSliceList[index].obj);
    formData.append('hash', state.fileSliceList[index].hash);
    formData.append('fileName', state.fileSliceList[index].fileName);

    let promise = uploadBigFileSliceApi(formData)
    promiseList.push(promise)

    if (promiseList.length === concurrent || index === len - 1) {
      Promise.all(promiseList).then((res) => {
        console.log('res:', res)
      })

      promiseList = []
    }

    index++
  }

  // state.fileSliceList.forEach(item => {
  //   const formData = new FormData();
  //   formData.append('file', item.chunk);
  //   formData.append('filename', item.fileName);
  //   formData.append('chunkSize', item.chunkSize.toString());
  //
  //   uploadBigFileSliceApi(formData, start, chunkSize, fileSize).then(res => {
  //     console.log('response: ', response)
  //     if (response.data.code === 200) {
  //       // 文件上传完成
  //       state.percentage = 100;
  //       state.progressStatus = 'success'
  //     }
  //   })
  // })
}


/*************************** 初始化 ***************************/
onMounted(() => {
})

</script>