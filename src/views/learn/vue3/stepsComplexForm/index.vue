<template>
  <div>
    <el-card class="cart-container">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"/>
        <el-step title="步骤 2"/>
        <el-step title="步骤 3"/>
      </el-steps>

      <el-form
          :model="formData"
          :rules="rules"
          label-width="80px"
          v-loading="loading"
          :element-loading-text="elementLoadingText"
      >
        <div v-if="active === 0" class="step">
          <el-form-item label="文件">
            <div style="width: 100%">
              <el-row>
                <el-col :span="20">
                  <el-input disabled v-model="formData.fileName"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-upload
                      class="upload-file"
                      :limit=1
                      :show-file-list="false"
                      @change="fileChange"
                  >
                    <el-button type="primary">点击上传</el-button>
                  </el-upload>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="表名" prop="tableName">
            <el-input v-model="formData.tableName"/>
          </el-form-item>
          <el-form-item label="格式" prop="fileFormat">
            <el-input v-model="formData.fileFormat" disabled/>
          </el-form-item>
          <el-form-item label="编码" prop="fileEncoding">
            <el-select v-model="formData.fileEncoding">
              <el-option
                  v-for="item in fileEncodingOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="预览" prop="previewNumber">
            <el-select v-model="formData.previewNumber" placeholder="请选择">
              <el-option
                  v-for="item in previewNumberOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            条数据
          </el-form-item>
        </div>
        <div v-else-if="active === 1" class="step">
          <el-form-item label="分隔符" prop="dilimiter">
            <el-select v-model="formData.dilimiter" placeholder="请选择">
              <el-option
                  v-for="item in dilimiterOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否追加" prop="isAppend">
            <el-switch v-model="formData.isAppend"/>
          </el-form-item>
        </div>
        <div v-else-if="active === 2" class="step">
          <el-checkbox
              @change="handleCheckAllFieldsChange"
          >全选
          </el-checkbox>
          <el-checkbox-group v-model="formData.checkedFileList">
            <el-checkbox
                v-for="(item,index) in previewTable.columns"
                :key="index"
                :label="item.field"
            >
              {{ item.field }}
            </el-checkbox>
          </el-checkbox-group>
          <el-table
              ref="previewTableRef"
              :data="previewTable.data"
              @header-click="handlePreviewTableHeaderClick"
              height="350"
          >
            <el-table-column
                v-for="(item,index) in previewTable.columns"
                :key="index"
                :prop="item.field"
                :label="item.field"
                width="200"
            >
              <template #header>
                <div>
                  <el-input v-model="item.title" @change="handleFieldInputChange"/>
                  <el-select v-model="item.dataType" filterable>
                    <el-option
                        v-for="dItem in postgreSQLDataType"
                        :key="dItem.value"
                        :label="dItem.label"
                        :value="dItem.value"
                    />
                  </el-select>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <div class="btn-controller">
        <el-button v-if="active === 1 || active === 2" type="primary" @click="prev">上一步</el-button>
        <el-button type="primary" @click="next">{{ nextMsg }}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, reactive, ref} from 'vue'

// 表单展示控制
const loading = ref(false)
const elementLoadingText = ref('加载中...')
const nextMsg = ref('下一步')

const fileFormatOptions = [
  {label: 'CSV', value: 'csv'},
  {label: 'xlsx', value: 'excel'},
  {label: 'JSON', value: 'json'},
  {label: 'XML', value: 'xml'},
  {label: 'SQL', value: 'sql'},
  {label: 'TXT', value: 'txt'},
]
const fileEncodingOptions = [
  {label: 'UTF-8', value: 'utf-8'},
  {label: 'GBK', value: 'gbk'},
  {label: 'GB2312', value: 'gb2312'},
  {label: 'ISO-8859-1', value: 'iso-8859-1'},
]
const previewNumberOptions = [
  {label: '10', value: 10},
  {label: '20', value: 20},
  {label: '50', value: 50},
  {label: '100', value: 100},
]
const dilimiterOptions = [
  {label: '英文逗号', value: '英文逗号'},
  {label: '中文逗号', value: '中文逗号'},
  {label: '英文分号', value: '英文分号'},
  {label: '中文分号', value: '中文分号'},
  {label: '英文冒号', value: '英文冒号'},
  {label: '中文冒号', value: '中文冒号'},
  {label: '空格', value: ' '},
  {label: '制表符', value: '\t'},
  {label: '|', value: '|'},
]
const postgreSQLDataType = [
  {label: 'boolean', value: 'boolean'},
  {label: 'character', value: 'character'},
  {label: 'character varying', value: 'character varying'},
  {label: 'date', value: 'date'},
  {label: 'integer', value: 'integer'},
  {label: 'money', value: 'money'},
  {label: 'numeric', value: 'numeric'},
  {label: 'polygon', value: 'polygon'},
  {label: 'real', value: 'real'},
  {label: 'text', value: 'text'},
]

const previewTableRef = ref()
const previewTable = reactive({
  columns: [
    {field: 'id', name: null, title: 'id', dataType: 'integer', remark: null},
    {field: 'name', name: null, title: 'name', dataType: 'text', remark: null},
    {field: 'age', name: null, title: 'age', dataType: 'integer', remark: null},
    {field: 'enable', name: null, title: 'enable', dataType: 'boolean', remark: null},
  ],
  data: [
    {id: 1, name: '张三', age: 18, enable: true},
    {id: 2, name: '李四', age: 20, enable: false},
    {id: 3, name: '王五', age: 22, enable: true},
  ],
})

const formData = ref({
  tableName: '',
  fileName: '',
  fileObj: undefined as any,
  fileFormat: '',
  fileEncoding: 'UTF-8',
  dilimiter: '',
  isAppend: false,
  previewNumber: 0,
  checkedFileList: [] as any,
} as any)
const rules = ref({} as any)

const fileChange = (file: any) => {
  formData.value.fileObj = file.raw
  formData.value.fileName = file.name
}

const handlePreviewTableHeaderClick = (val: string) => {
  console.log('handlePreviewTableHeaderClick', val)
}

const handleFieldInputChange = (val: string) => {
  console.log('handleFieldInputChange', val)
}

const handleCheckAllFieldsChange = (val: any) => {
  formData.checkedFileList = val ? previewTable.columns.map((item) => item.field) : []
}

// 步骤控制
const active = ref(0)
const prev = () => {
  active.value--

  if (active.value === 0) {

  }

  if (active.value === 1) {

  }
}
const next = () => {
  if (nextMsg.value === '下一步' && active.value < 3) {
    active.value++
  } else if (nextMsg.value === '完成') {
    active.value = 0
    nextMsg.value = '下一步'
  }

  if (active.value === 1) {
    // 选择文件
  }
  if (active.value === 2) {
    // 选择额外参数

    // 上传文件等信息

    // 展示解析出的文件内容
  }
  if (active.value === 3) {
    // 上传完成定制的选中的字段、字段名、字段类型等信息


    nextMsg.value = '完成'
  }
}

onBeforeMount(() => {
  // 请求数据
})
</script>

<style scoped>
.cart-container {
  width: 100vh;
  height: 90vh;
}

.step {
  padding: 20px;
}

.btn-controller {
  align-items: center;
  position: absolute;
  left: 40%;
  bottom: 0;
}
</style>
