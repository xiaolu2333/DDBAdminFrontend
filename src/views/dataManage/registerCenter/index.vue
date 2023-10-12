<template>
  <div>
    <el-tabs type="border-card" v-model="hba">
      <el-tab-pane label="注册管理" name="registerCenter">
        <div>
          <vxe-toolbar>
            <template #buttons>
              <vxe-button>创建</vxe-button>
              <vxe-button>编辑</vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-table
              align="center"
              :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
            <vxe-column title="操作">
              <el-button-group>
                <el-button type="primary">发布</el-button>
                <el-button type="primary">用户授权</el-button>
                <el-button type="primary">初始化为中心库</el-button>
                <el-button type="primary">提交注册</el-button>
                <el-button type="primary">提交注销</el-button>
                <el-button type="primary">表共享</el-button>
                <el-button type="primary">业务授权</el-button>
              </el-button-group>
            </vxe-column>
            <vxe-column title="管理">
              <el-button-group>
                <el-button type="primary">同意注册</el-button>
                <el-button type="primary">拒绝注册</el-button>
                <el-button type="primary">等待注册</el-button>
                <el-button type="primary">同意注销</el-button>
                <el-button type="primary">拒绝注销</el-button>
                <el-button type="primary">等待注销</el-button>
              </el-button-group>
            </vxe-column>
          </vxe-table>
          <!--        <vxe-pager-->
          <!--            :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"-->
          <!--            v-model:current-page="tablePage.pageIndex"-->
          <!--            v-model:page-size="tablePage.pageSize"-->
          <!--            :total="tablePage.totalRow"-->
          <!--            @page-change="handleMdPageChange"-->
          <!--        />-->
        </div>
      </el-tab-pane>
      <el-tab-pane label="实例管理" name="instanceManagement">
        <div style="padding: 20px">
          <el-row>
            <el-col :span="6">
              <el-statistic title="总数" :value="268500"/>
            </el-col>
            <el-col :span="6">
              <el-statistic title="运行中" :value="138"/>
            </el-col>
            <el-col :span="6">
              <el-statistic title="未连接" :value="172000"/>
            </el-col>
            <el-col :span="6">
              <el-statistic title="已注销" :value="562"/>
            </el-col>
          </el-row>
        </div>
        <div>
          <vxe-table
              align="center"
              :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
            <vxe-column title="操作">
              <el-button type="primary">数据服务</el-button>
            </vxe-column>
          </vxe-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {VxeTablePropTypes} from 'vxe-table'
import {ChatLineRound, Male} from '@element-plus/icons-vue'

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const allAlign = ref<VxeTablePropTypes.Align>(null)

const tableData = ref<RowVO[]>([
  {id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc'},
  {id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
  {id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
  {id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai'}
])
</script>

<style scoped>
.el-col {
  text-align: center;
}
</style>