<template>
  <div class='container' style='margin: 10px'>
    <div class='management-dynamic'>
      <p style='font-size: 15px; font-weight: bolder'>管理操作动态</p>
      <vxe-table
          border
          show-header-overflow
          show-overflow
          :row-config="{height: 40}"
          :data='dbExtendedInfo.managementDynamic'
          align="center"
          empty-text="暂无数据！"
      >
        <el-scrollbar>
          <div v-if="dbExtendedInfo.managementDynamic.length > 0">
            <vxe-column type="seq" title="序号" width="60"/>
            <vxe-column field="name" title="用户"/>
            <vxe-column field="status" title="状态"/>
          </div>
        </el-scrollbar>
      </vxe-table>
      <vxe-pager
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          v-model:current-page="tablePage.pageIndex"
          v-model:page-size="tablePage.pageSize"
          :total="tablePage.totalRow"
          @page-change="handleMdPageChange"
      />
    </div>
  </div>

</template>

<script setup lang='ts'>

import {useRoute} from 'vue-router'
import {onMounted, reactive, toRefs} from 'vue'
import {ElMessage} from 'element-plus'
import {getPageData} from "../../../api/learn/pagination.js";


const route = useRoute()

const state = reactive({
  dbExtendedInfo: {
    managementDynamic: [],
  },

  // 分页数据
  tablePage: {
    pageIndex: 1,
    pageSize: 20,
    totalPage: 0,
    totalRow: 0,
  },
})

const {
  dbExtendedInfo,
  tablePage,
} = toRefs(state)

/******************************** init **************************/
/**
 * 解析路由参数
 */
async function init() {
  const queryForm = {
    "pageIndex": 1,
    "pageSize": 20,
  }
  // 获取管理动态详情
  await getPageData(queryForm)
      .then((response) => {
        console.log('response', response)
        state.dbExtendedInfo.managementDynamic = response.data.dataList
        state.tablePage.pageIndex = response.data.pageIndex
        state.tablePage.pageSize = response.data.pageSize
        state.tablePage.totalPage = response.data.totalPage
        state.tablePage.totalRow = response.data.totalRow
      })
  // 获取使用动态详情
}


/******************************** basic detail **************************/


/******************************** management-dynamic **************************/
/**
 * management-dynamic页数改变事件
 */
async function handleMdPageChange({currentPage, pageSize}) {
  state.tablePage.pageIndex = currentPage
  state.tablePage.pageSize = pageSize
  const queryForm = {
    "pageIndex": state.tablePage.pageIndex,
    "pageSize": state.tablePage.pageSize,
  }
  // 获取管理动态详情
  await getPageData(queryForm)
  await getPageData(queryForm)
      .then((response) => {
        console.log('response', response)
        state.dbExtendedInfo.managementDynamic = response.data.dataList
        state.tablePage.pageIndex = response.data.pageIndex
        state.tablePage.pageSize = response.data.pageSize
        state.tablePage.totalPage = response.data.totalPage
        state.tablePage.totalRow = response.data.totalRow
      })
}

onMounted(() => {
  init()
})

</script>

<style scoped lang="less">
</style>