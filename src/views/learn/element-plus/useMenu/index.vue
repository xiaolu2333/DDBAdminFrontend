<template>
  <el-row :gutter="50">
    <el-col :span="12">
      <el-menu
          class="el-menu-vertical-demo"
          :background-color="menuConfig.backgroundColor"
          :text-color="menuConfig.textColor"

          :default-openeds="menuConfig.defaultOpeneds"

          :default-active="menuConfig.defaultActive"
          :active-text-color="menuConfig.activeTextColor"

          @open="handleOpen"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item index="1-1">
            <el-icon>
              <location/>
            </el-icon>
            item one
          </el-menu-item>
          <el-menu-item index="1-2">
            <el-icon>
              <location/>
            </el-icon>
            item two
          </el-menu-item>
          <el-menu-item index="1-3">
            <el-icon>
              <location/>
            </el-icon>
            item three
          </el-menu-item>
          <el-sub-menu index="1-4">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              item four
            </template>
            <el-menu-item index="1-4-1">
              <el-icon>
                <location/>
              </el-icon>
              item one
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>Navigator Two</span>
          </template>
          <el-menu-item index="2-1">
            <el-icon>
              <icon-menu/>
            </el-icon>
            item one
          </el-menu-item>
          <el-menu-item index="2-2">
            <el-icon>
              <icon-menu/>
            </el-icon>
            item two
          </el-menu-item>
          <el-menu-item index="2-3">
            <el-icon>
              <icon-menu/>
            </el-icon>
            item three
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <document/>
            </el-icon>
            <span>Navigator Three</span>
          </template>
          <el-menu-item index="3-1">
            <el-icon>
              <document/>
            </el-icon>
            item one
          </el-menu-item>
          <el-menu-item index="3-2">
            <el-icon>
              <document/>
            </el-icon>
            item two
          </el-menu-item>
          <el-menu-item index="3-3">
            <el-icon>
              <document/>
            </el-icon>
            item three
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
          <el-icon>
            <setting/>
          </el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="12">
      <span>背景色：</span>
      <el-color-picker v-model="menuConfig.backgroundColor"/>
      <br/>
      <span>文字颜色：</span>
      <el-color-picker v-model="menuConfig.textColor"/>
      <br/>
      <span>激活文字颜色：</span>
      <el-color-picker v-model="menuConfig.activeTextColor"/>
      <br/>
      <span>默认展开项：</span>
      <el-checkbox-group v-model="menuConfig.defaultOpeneds" @change="handleCheckboxChange">
        <el-checkbox label="1"/>
        <el-checkbox label="1-4"/>
        <el-checkbox label="2"/>
        <el-checkbox label="3"/>
        <el-checkbox label="4"/>
      </el-checkbox-group>
      <br/>
      <span>默认选中项：</span>
      <el-input v-model="menuConfig.defaultActive"/>
      <br/>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import {reactive, nextTick, onMounted} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const menuConfig = reactive({
  defaultOpeneds: ['1', '1-4', '2'],
  defaultActive: '',
  activeTextColor: '#ffd04b',
  backgroundColor: '#545c64',
  textColor: '#fff',
})


const handleOpen = (val) => {
  // console.log(val)
}

const handleCheckboxChange = async (val) => {
  // console.log(val)
  // await nextTick();
  // console.log(menuConfig.defaultOpeneds)
}

const routers = [
  {
    "id": "1630094044786851840",
    "parentId": "0",
    "appCode": "SYSTEM",
    "moduleCode": "",
    "name": "系统管理",
    "pageType": 1,
    "menuType": 32,
    "menuLevel": null,
    "authType": 1,
    "menuDesc": "",
    "menuIcon": "ant-design:laptop",
    "menuUrl": "/system",
    "componentUrl": "",
    "helpUrl": "",
    "sortNum": 99,
    "enabled": true,
    "visibled": true,
    "delFlag": -1,
    "remark": "",
    "children": [
      {
        "id": "1630124436818493440",
        "parentId": "1630094044786851840",
        "appCode": "SYSTEM",
        "moduleCode": "",
        "name": "运行管理",
        "pageType": 1,
        "menuType": 16,
        "menuLevel": null,
        "authType": 1,
        "menuDesc": "",
        "menuIcon": "ant-design:book",
        "menuUrl": "workManage",
        "componentUrl": "",
        "helpUrl": "",
        "sortNum": 90,
        "enabled": true,
        "visibled": true,
        "delFlag": -1,
        "remark": "",
        "children": [
          {
            "id": "1630141970619826176",
            "parentId": "1630124436818493440",
            "appCode": "SYSTEM",
            "moduleCode": "",
            "name": "字典管理",
            "pageType": 1,
            "menuType": 16,
            "menuLevel": null,
            "authType": 1,
            "menuDesc": "",
            "menuIcon": "ant-design:book",
            "menuUrl": "dict",
            "componentUrl": "",
            "helpUrl": "",
            "sortNum": 1,
            "enabled": true,
            "visibled": true,
            "delFlag": -1,
            "remark": "",
            "children": [
              {
                "id": "1630143181980958720",
                "parentId": "1630141970619826176",
                "appCode": "SYSTEM",
                "moduleCode": "",
                "name": "数据字典管理",
                "pageType": 2,
                "menuType": 16,
                "menuLevel": null,
                "authType": 1,
                "menuDesc": "",
                "menuIcon": "ant-design:book",
                "menuUrl": "dictData",
                "componentUrl": "framework/dict/DataDict",
                "helpUrl": "",
                "sortNum": 1,
                "enabled": true,
                "visibled": true,
                "delFlag": -1,
                "remark": "",
                "children": [],
                "treeId": "1630143181980958720",
                "treeParentId": "1630141970619826176"
              },
              {
                "id": "1630143336834662400",
                "parentId": "1630141970619826176",
                "appCode": "SYSTEM",
                "moduleCode": "",
                "name": "系统常量管理",
                "pageType": 2,
                "menuType": 16,
                "menuLevel": null,
                "authType": 1,
                "menuDesc": "",
                "menuIcon": "ant-design:book",
                "menuUrl": "constDict",
                "componentUrl": "framework/dict/SystemConstance",
                "helpUrl": "",
                "sortNum": 2,
                "enabled": true,
                "visibled": true,
                "delFlag": -1,
                "remark": "",
                "children": [],
                "treeId": "1630143336834662400",
                "treeParentId": "1630141970619826176"
              }
            ],
            "treeId": "1630141970619826176",
            "treeParentId": "1630124436818493440"
          },
          {
            "id": "1630124817703239680",
            "parentId": "1630124436818493440",
            "appCode": "SYSTEM",
            "moduleCode": "",
            "name": "资源管理",
            "pageType": 1,
            "menuType": 16,
            "menuLevel": null,
            "authType": 1,
            "menuDesc": "",
            "menuIcon": "ant-design:book",
            "menuUrl": "resource",
            "componentUrl": "",
            "helpUrl": "",
            "sortNum": 3,
            "enabled": true,
            "visibled": true,
            "delFlag": -1,
            "remark": "",
            "children": [
              {
                "id": "1631475748415995904",
                "parentId": "1630124817703239680",
                "appCode": "SYSTEM",
                "moduleCode": "",
                "name": "角色管理",
                "pageType": 2,
                "menuType": 16,
                "menuLevel": null,
                "authType": 1,
                "menuDesc": "",
                "menuIcon": "ant-design:appstore",
                "menuUrl": "roleManage",
                "componentUrl": "framework/resource/Role",
                "helpUrl": "",
                "sortNum": 1,
                "enabled": true,
                "visibled": true,
                "delFlag": -1,
                "remark": "",
                "children": [],
                "treeId": "1631475748415995904",
                "treeParentId": "1630124817703239680"
              },
              {
                "id": "1631476858665041920",
                "parentId": "1630124817703239680",
                "appCode": "SYSTEM",
                "moduleCode": "",
                "name": "菜单管理",
                "pageType": 2,
                "menuType": 16,
                "menuLevel": null,
                "authType": 1,
                "menuDesc": "",
                "menuIcon": "ant-design:appstore",
                "menuUrl": "menu",
                "componentUrl": "framework/resource/Menu",
                "helpUrl": "",
                "sortNum": 1,
                "enabled": true,
                "visibled": true,
                "delFlag": -1,
                "remark": "",
                "children": [],
                "treeId": "1631476858665041920",
                "treeParentId": "1630124817703239680"
              }
            ],
            "treeId": "1630124817703239680",
            "treeParentId": "1630124436818493440"
          }
        ],
        "treeId": "1630124436818493440",
        "treeParentId": "1630094044786851840"
      }
    ],
    "treeId": "1630094044786851840",
    "treeParentId": "0"
  }
]
// 根据routers中元素的menuUrl递归拼接完整的路由地址
let fullPath = []
const getFullPath = (routers) => {
  routers.forEach((item) => {
    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => {
        fullPath.push(pathResolve(item.menuUrl, child.menuUrl))
      })
      getFullPath(item.children)
    }
  })
}

const pathResolve = (parentPath: string, path: string) => {
  const childPath = path.startsWith('/') || !path ? path : `/${path}`
  return `${parentPath}${childPath}`.replace(/\/\//g, '/')
}

onMounted(() => {
  getFullPath(routers)
  console.log('fullPath:', fullPath)
})

</script>
