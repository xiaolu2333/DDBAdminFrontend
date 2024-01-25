<template>
  <el-card class="login-form-wrapper">
    <el-form
        ref="dataFormRef"
        :model="formData"
        :rules='rules'
        label-width="120px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button type="primary" @click="onSubmitTest">测试登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import {ref, reactive, toRefs, onMounted} from 'vue'
import {ElForm} from 'element-plus'
import {JSEncrypt} from "jsencrypt";

import {getPublicKey, loginApi} from '../../../api/system/login.js'

const dataFormRef = ref(ElForm) // 数据库表单
const publicKey = ref('') // 公钥

const state = reactive({
  formData: {
    name: '',
    password: ''
  },

  rules: {
    name: [
      {required: true, message: '请输入用户名', trigger: 'blur'},
      {pattern: /^[a-zA-Z0-9_]+$/, message: '不能包含特殊字符', trigger: 'blur'}
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
      // 不能包含空格
      {pattern: /^[^\s]*$/, message: '不能包含空格', trigger: 'blur'}
    ]
  }
})

const {
  formData,

  rules
} = toRefs(state)


const onSubmit = () => {
  dataFormRef.value.validate((valid: any) => {
    if (valid) {
      let encryptor = new JSEncrypt()
      // 加密
      encryptor.setPublicKey(publicKey.value)
      console.log('加密前的密码：', state.formData.password)
      let password = encryptor.encrypt(state.formData.password)
      console.log('加密后的密码：', password)
      loginApi({
        name: state.formData.name,
        password: password
      }).then(res => {
        console.log('res:', res)
      })
    }
  })
}

const onSubmitTest = () => {
  // 获取路由树信息
  const routes = [
    {
      "id": 2,
      "name": "数据服务",
      "path": "/dataService",
      "pageType": 1,
      "menuType": 1,
      "authType": 2,
      "component": "",
      "icon": null,
      "parentId": 0,
      "parentCode": 0,
      "enable": true,
      "sort": 1,
      "createTime": "2024-01-18T04:22:46.812Z",
      "updateTime": "2024-01-18T12:29:48.535Z",
      "children": [
        {
          "id": 3,
          "name": "数据操作",
          "path": "/dataService/dataOperation",
          "pageType": 2,
          "menuType": 1,
          "authType": 2,
          "component": "@/views/dataService/dataOperation/index.vue",
          "icon": null,
          "parentId": 2,
          "parentCode": 2,
          "enable": true,
          "sort": 1,
          "createTime": "2024-01-18T04:29:30.106Z",
          "updateTime": "2024-01-18T04:29:30.106Z",
          "children": []
        },
        {
          "id": 12,
          "name": "ERD",
          "path": "/dataService/ERD",
          "pageType": 2,
          "menuType": 1,
          "authType": 2,
          "component": "@/views/dataService/ERD/index.vue",
          "icon": null,
          "parentId": 2,
          "parentCode": 2,
          "enable": true,
          "sort": 2,
          "createTime": "2024-01-18T04:39:30.106Z",
          "updateTime": "2024-01-18T04:39:30.106Z",
          "children": []
        }
      ]
    }
  ]

  // // 是否使用动态路由
  // if (appStore.getDynamicRouter) {
  //   await permissionStore.generateRoutesFromServer().catch(() => {
  //   })
  // } else {
  //   await permissionStore.generateRoutes('admin', [] as AppCustomRouteRecordRaw[])
  // }
}

onMounted(() => {
  // 获取公钥
  getPublicKey()
      .then(res => {
        console.log('res:', res)
        publicKey.value = res.data.data.public_key
      })
      .catch(err => {
        console.log('err:', err)
      })
})
</script>

<style scoped>
.login-form-wrapper {
  width: 500px;
  margin: 100px auto;
}
</style>