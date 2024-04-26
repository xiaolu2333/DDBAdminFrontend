<template>
  <el-card>
    <el-form
        ref="formRef"
        style="max-width: 600px"
        :model="dynamicValidateForm"
        :rules="dynamicValidateFormRules"
        label-width="auto"
        class="demo-dynamic"
    >
      <el-form-item label="认证方式" prop="linkWay">
        <el-select v-model="dynamicValidateForm.linkWay" @change="changeLinkWay">
          <el-option v-for="item in linkWays" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <div v-if="dynamicValidateForm.linkWay === '1'">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dynamicValidateForm.name"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dynamicValidateForm.password"/>
        </el-form-item>
      </div>
      <div v-if="dynamicValidateForm.linkWay === '2'">
        <el-form-item label="二维码" prop="qrCode">
          <qrcode-vue :value="qcCodeValue" :size="200" level="H"></qrcode-vue>
        </el-form-item>
      </div>
      <div v-if="dynamicValidateForm.linkWay === '3'">
        <el-form-item label="令牌" prop="token">
          <el-input v-model="dynamicValidateForm.token"/>
        </el-form-item>
      </div>

      <el-form-item label="记住我" prop="rememberMe">
        <el-checkbox v-model="dynamicValidateForm.rememberMe"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {ElMessage, FormInstance} from 'element-plus'
import QrcodeVue from 'qrcode.vue'

const formRef = ref<FormInstance>()
const whiteFileList = [
  'linkWay',
  'rememberMe',
]
const dynamicValidateForm = reactive({
  linkWay: '1',
  name: '',
  password: '',
  rememberMe: false,
} as any)
const dynamicValidateFormRules = reactive({
  linkWay: [
    {required: true, message: '选择认证方式', trigger: 'change'},
  ],
  name: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ]
} as any)

// 认证方式选项
const linkWays = [
  {value: '1', label: '用户名+密码'},
  {value: '2', label: '扫码登录'},
  {value: '3', label: '令牌登录'},
]
// 二维码信息
const qcCodeValue = JSON.stringify({name: 'Tom', age: 14})

const changeLinkWay = (value: string) => {
  configFormAndRules(value)
}

const configFormAndRules = (linkWayValue: string) => {
  // 删除 dynamicValidateForm 中除 whiteFileList 之外的属性
  Object.keys(dynamicValidateForm).forEach((key) => {
    if (!whiteFileList.includes(key)) {
      delete dynamicValidateForm[key]
    }
  })

  // 删除 dynamicValidateFormRules 中除 whiteFileList 之外的属性
  Object.keys(dynamicValidateFormRules).forEach((key) => {
    if (!whiteFileList.includes(key)) {
      delete dynamicValidateFormRules[key]
    }
  })

  if (linkWayValue === '1') {
    dynamicValidateForm.name = ''
    dynamicValidateForm.password = ''

    dynamicValidateFormRules.name = [
      {required: true, message: '请输入用户名', trigger: 'blur'},
    ]
    dynamicValidateFormRules.password = [
      {required: true, message: '请输入密码', trigger: 'blur'},
    ]
  } else if (linkWayValue === '2') {
  } else if (linkWayValue === '3') {
    dynamicValidateForm.token = ''

    dynamicValidateFormRules.token = [
      {required: true, message: '请输入令牌', trigger: 'blur'},
    ]
  }
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('dynamicValidateForm', dynamicValidateForm)
    } else {
      ElMessage.error('表单验证失败，请完成必填项')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
