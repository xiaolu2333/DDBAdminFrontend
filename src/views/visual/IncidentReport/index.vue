<template>
  <div>
    <h1 class="header-title">事故报表</h1>
    <el-card class="box-card">
      <el-form
          ref="formRef"
          :model="form"
          label-width="120px"
          status-icon
      >
        <el-scrollbar height="70vh">
          <el-form-item label="上报单位" prop="department">
            <el-input v-model="form.department" placeholder="XX部门"/>
          </el-form-item>
          <el-form-item label="责任人" prop="leader">
            <el-input v-model="form.leader" placeholder="XX领导"/>
          </el-form-item>
          <el-form-item label="事故地点" prop="location">
            <el-input v-model="form.location" placeholder="详细描述事故发生的具体位置，包括城市、区域和街道名称。"/>
          </el-form-item>
          <el-form-item label="事故时间" prop="time">
            <el-date-picker
                v-model="form.time"
                type="datetime"
                placeholder="事故发生时间"
                value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="事故类型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="1">I级事故</el-radio>
              <el-radio label="2">II级事故</el-radio>
              <el-radio label="3">III级事故</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="事故情况" prop="desc">
            <el-input v-model="form.desc" placeholder="说明事故发生的原因，如运输过程中的意外跌落等。"/>
          </el-form-item>
          <el-form-item label="人员伤亡" prop="hurt">
            <el-input v-model="form.hurt"
                      placeholder="如果事故导致了人员伤亡，应提供人员伤亡的简要情况，包括人员类型、数量和程度等。"/>
          </el-form-item>
          <el-form-item label="初步处理" prop="handle">
            <el-input v-model="form.handle" placeholder="说明目前采取的措施，包括对人员的救治，对产品的安全处理等。"/>
          </el-form-item>
          <el-form-item label="其他" prop="add">
            <el-upload
                class="report-upload-files"
                v-model:file-list="fileList"
                action=""
                :auto-upload="false"
                multiple
                :on-change="handleFileChange"
                :on-remove="handleFileRemove"
            >
              <el-button type="primary">上传</el-button>
              <template #tip>
                <div class="el-upload__tip">
                  提供所有与事故有关的信息，包括现场照片、视频、地形图等。
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="支援要求" prop="help">
            <el-input v-model="form.help" placeholder="灭火要求、医疗救援、防护用品需求等。"/>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="其他需要说明的事项。"/>
          </el-form-item>
        </el-scrollbar>
      </el-form>
      <el-button class="report-submit-btn" type="primary" @click="handleSubmit">提交</el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive} from 'vue';

import {uploadImg, uploadVideo} from '../../../api/visual/index.js'

interface ReportType {
  id: number;
  // 上报单位
  department: string;
  // 责任人
  leader: string;
  // 事故地点
  location: string;
  // 事故时间
  time: string;
  // 事故类型
  type: number;
  // 事故情况
  desc: string;
  // 人员伤亡
  hurt: string;
  // 初步处理
  handle: string;
  // 其他
  add: string;
  // 支援要求
  help: string;
  // 备注
  remark: string;
}

const form = reactive<ReportType>({
  id: 0,
  department: '',
  leader: '',
  location: '',
  time: '',
  type: 0,
  desc: '',
  hurt: '',
  handle: '',
  add: '',
  help: '',
  remark: ''
})

const fileList = reactive([] as any[])

const rules = reactive({
  department: [
    {required: true, message: '请输入上报单位', trigger: 'blur'}
  ],
  leader: [
    {required: true, message: '请输入责任人', trigger: 'blur'}
  ],
  location: [
    {required: true, message: '请输入事故地点', trigger: 'blur'}
  ],
  time: [
    {required: true, message: '请输入事故时间', trigger: 'blur'}
  ],
  type: [
    {required: true, message: '请输入事故类型', trigger: 'blur'}
  ],
  desc: [
    {required: true, message: '请输入事故情况', trigger: 'blur'}
  ],
  hurt: [
    {required: true, message: '请输入人员伤亡情况', trigger: 'blur'}
  ],
  handle: [
    {required: true, message: '请输入初步处理', trigger: 'blur'}
  ],
  help: [
    {required: true, message: '请输入支援要求', trigger: 'blur'}
  ],
})

// 文件变更
const handleFileChange = (file, fileList) => {
  console.log(file, fileList)
}

// 文件移除
const handleFileRemove = (file, fileList) => {
  console.log(file, fileList)
}

// 提交
const handleSubmit = () => {
  // console.log(form)
  // postTableDataApi(form).then((res) => {
  //   if (res.code === 200) {
  //     console.log('提交成功')
  //   }
  // })
}


/********************************* 生命周期 *********************************/
onBeforeMount(() => {

})
</script>

<style scoped>
.header-title {
  text-align: center;
  font-size: large;
  font-weight: bolder;
  margin: 20px;
}

.report-submit-btn {
  float: right;
  margin: 20px 20px;
}

.box-card {
  width: 80%;
  margin: 0 auto;
}
</style>
