<template>
  <div class='app-container'>
    <el-row :gutter='5'>
      <!-- 机构树 -->
      <el-col :span='4' :xs='6'>
        <el-card shadow='never'>
          <template #header>
            <span>组织机构信息</span>
          </template>
          <el-tree
              ref='orgTreeRef'
              :data='orgTree'
              :props="{ children: 'children', label: 'name' }"
              :default-expand-all='true'
              :expand-on-click-node='false'
              @node-click='handleOrgNodeClick'
          />
        </el-card>
      </el-col>

      <!-- 部门数据 -->
      <el-col :span='20' :xs='18'>
        <!--        <el-card>-->
        <!--          <VxeTable-->
        <!--              :columns='columns'-->
        <!--              :data='deptList'-->
        <!--              :default-expand-all='true'-->
        <!--              :highlight-current-row='true'-->
        <!--              :stripe='true'-->
        <!--              :row-key='"id"'-->
        <!--              :selection='false'-->
        <!--              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"-->
        <!--              :loading='loading'-->
        <!--              @row-click='handleDeptNodeClick'-->
        <!--          >-->
        <!--            <template #operate='data'>-->
        <!--              <el-button-->
        <!--                  type='primary'-->
        <!--                  link-->
        <!--                  @click.stop='handleUpdate(data.row)'-->
        <!--              >-->
        <!--                编辑-->
        <!--              </el-button>-->
        <!--              <el-button type='danger' link @click.stop='handleDelete(data.row)'>-->
        <!--                删除-->
        <!--              </el-button>-->
        <!--            </template>-->
        <!--          </VxeTable>-->
        <!--        </el-card>-->
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import {h, onMounted, reactive, ref, toRefs} from 'vue'
import {ElForm, ElMessage, ElMessageBox, ElTag} from 'element-plus'

import {GetOrgList} from '../../../api/system/org.js'

const orgTreeRef = ref('orgTreeRef')
const dataFormRef = ref(ElForm)

interface DeptData {
  id: number,
  name: string,
  code: string,
  parentCode: string,
  enabled: boolean,
  org_id: number,
  createTime?: string,
  updateTime?: string,
}

const state = reactive({
  loading: false,
  orgTree: [],
  clickedOrg: {},
  // 表格树数据
  deptTree: [] as DeptData[],
  rules: {
    name: [{required: true, message: '部门名称不能为空', trigger: 'blur'}],
    code: [{required: true, message: '部门代码不能为空', trigger: 'blur'}],
    sortNum: [{required: true, message: '显示排序不能为空', trigger: 'blur'}]
  }
})

const {
  loading,
  orgTree,
  clickedOrg,
  deptList,
  rules,
} = toRefs(state)


/************************ tree ************************/
function handleOrgNodeClick(data) {
  console.log("handleOrgNodeClick:", data)
  state.clickedOrg = data
  // // 获取部门列表
  // GetDeptList({org_id: data.id}).then(res => {
  //   state.deptTree = res.data.dataList
  //   console.log("deptTree:", state.deptTree)
  // })
}


/************************ utils ************************/
// 构造机构树
function formatData(data) {
  let result = [];
  let map = {};
  data.forEach(function (item) {
    map[item.id] = item;
    item.children = [];
  });
  data.forEach(function (item) {
    if (item.parentCode !== "0") {
      map[item.parentCode]?.children.push(item);
    } else {
      result.push(item);
    }
  });
  console.log("result:", result);
  return result;
}


/************************ init ************************/


function init() {
  // 获取机构列表
  GetOrgList().then(res => {
    state.orgTree = formatData(res.data.dataList)
    console.log("orgTree:", state.orgTree)
  })
}

onMounted(async () => {
  init()
})
</script>

<style scoped>
.isCurrent {
  background-color: #f8fdff;
}
</style>
