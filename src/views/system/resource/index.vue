<template>
  <div class="page-wrapper">
    <el-card class="card-container">
      <template #header>
        <div class='cus-card-header'>
          <el-button-group class="function-toolbar">
            <el-button
                type='primary' @click='handleCreateRole' :icon="Plus"
            >新增
            </el-button>
          </el-button-group>
          <div class="query-box">
            <el-form
                ref='queryFormRef'
                :model='queryForm'
                :inline='true'
            >
              <el-form-item prop='ipAddress'>
                <el-input v-model='queryForm.name' placeholder='请输入角色名称' clearabl/>
              </el-form-item>
              <el-form-item>
                <el-button type='primary' :icon='Search' @click='searchRoleByName'>搜索</el-button>
                <el-button :icon='Refresh' @click='resetQuery'>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
      <div class="table-wrapper">
        <vxe-table
            ref="xTable"
            :loading="loading"
            border
            show-header-overflow
            show-overflow
            :row-config="{height: 100, isCurrent:true, isHover:true}"
            :data="tableData"
            align="center"
            empty-text="暂无数据！"
            @current-change="currentChangeEvent"
        >
          <vxe-column type="seq" title="序号" align="center" width="70"/>
        </vxe-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

import {reactive, ref, toRefs, onMounted} from "vue";
import {VxeTableInstance} from 'vxe-table'
import {Plus, Refresh, Search} from '@element-plus/icons-vue'

// table实例
const xTable = ref<VxeTableInstance>()

const state = reactive({
  queryForm: {
    name: ""
  },
  loading: false,
  tableData: undefined as {},
})
const {
  queryForm,
  loading,
  tableData
} = toRefs(state)


/********************************* card header *********************************/
function handleCreateRole() {

}

function searchRoleByName() {

}

function resetQuery() {

}


onMounted(() => {

})
</script>

<style lang="scss" scoped>
.query-box {
  float: right;
  height: 20px;
  margin-right: 10px;
}
</style>