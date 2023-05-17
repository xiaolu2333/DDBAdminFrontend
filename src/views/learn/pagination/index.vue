<template>
  <div class='container'>
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
        <div v-if="dbExtendedInfo.managementDynamic.length > 0">
          <vxe-column type="seq" title="序号" width="60"/>
          <vxe-column field="name" title="用户"/>
          <vxe-column field="status" title="状态"/>
        </div>
      </vxe-table>
      <vxe-pager
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          v-model:current-page="tablePage.pageIndex"
          v-model:page-size="tablePage.pageSize"
          :total="tablePage.totalRow"
          @page-change="handleMdPageChange"
      />
    </div>
    <div class='usage-dynamic' style='margin-top: 30px'>
      <p style='font-size: 15px; font-weight: bolder'>使用操作动态</p>
      <ul style='overflow: auto'>
        <li
            v-for='item in dbExtendedInfo.usageDynamic'
            :key='item.time'
            style='padding: 5px'
        >
          <hr/>
          <div style='margin-top: 10px'>
            <el-row>
              <el-col :span='1'>
                <el-icon style="margin-top: 3px" size="20">
                  <User/>
                </el-icon>
              </el-col>
              <el-col :span='23'>
                <div style="font-size: 15px">
                  <p>{{ item.user }}</p>
                  <p v-html="highlightKeyWord(item.operation)" style="margin-top: 10px"></p>
                </div>
                <p style="margin-top: 10px; color: #c0c5ce">{{ showFormattedTime(item.time) }}</p>
              </el-col>
            </el-row>
          </div>
        </li>
      </ul>
      <div
          v-infinite-scroll='loadNextPage'
          :infinite-scroll-disabled='loading'
          style='text-align: center; margin-top: 10px'
      >
        <p v-if='loading' style='color: #87bdff'>加载中......</p>
        <!--                  <p v-if='hasMore && loading'>加载中......</p>-->
        <!--                  <p v-else>暂无更多数据！</p>-->
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import {useRoute} from 'vue-router'
import {onMounted, reactive, toRefs} from 'vue'
import {ElMessage} from 'element-plus'
import {getPageData, getScrollPageData} from "../../../api/learn/pagination.js";

// 使用动态操作关键字
const KEYWORD = ['导入', '导出', '创建', '删除', '修改', '查询', '注销', '连接', '断开', '申请'];

const state = reactive({
  dbExtendedInfo: {
    managementDynamic: [],
    usageDynamic: [
      {
        user: '张三',
        operation: '申请查询xxx表权限',
        time: '2023-03-10 17:44:46'
      },
      {
        user: '张三',
        operation: '导入2225条数据到xxx表中',
        time: '2023-03-10 17:44:46'
      },
    ],
  },

  // 分页数据
  tablePage: {
    pageIndex: 1,
    pageSize: 20,
    totalPage: 0,
    totalRow: 0,
  },

  // 滚动加载
  pageNumber: 1,
  pageSize: 10,
  loading: false,
  hasMore: false
})
const {
  dbExtendedInfo,
  tablePage,
  pageNumber,
  pageSize,
  loading,
  hasMore
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
        state.dbExtendedInfo.managementDynamic = response.data.dataList
        state.tablePage.pageIndex = response.data.pageIndex
        state.tablePage.pageSize = response.data.pageSize
        state.tablePage.totalPage = response.data.totalPage
        state.tablePage.totalRow = response.data.totalRow
      })
  // 获取使用动态详情
  // await getScrollPageData({
  //   "pageIndex": state.pageNumber,
  //   "pageSize": state.pageSize,
  // })
  //     .then((response) => {
  //       console.log('response', response)
  //       state.dbExtendedInfo.usageDynamic.push(...response.data.dataList)
  //     })
}


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
      .then((response) => {
        console.log('response', response)
        state.dbExtendedInfo.managementDynamic = response.data.dataList
        state.tablePage.pageIndex = response.data.pageIndex
        state.tablePage.pageSize = response.data.pageSize
        state.tablePage.totalPage = response.data.totalPage
        state.tablePage.totalRow = response.data.totalRow
      })
}


/******************************** usage-dynamic **************************/
/**
 * 获取使用操作动态
 */
const loadNextPage = async () => {
  if (loading.value) return
  state.loading = true

  // // 模拟后端数据
  // setTimeout(() => {
  //       for (let i = 0; i < state.pageSize; i++) {
  //         state.dbExtendedInfo.usageDynamic.push({
  //           user: '李四',
  //           operation: 'XXX修改操作',
  //           time: (new Date()).toLocaleString()
  //         })
  //         state.pageNumber++
  //         // state.loading = false
  //       }
  //     },
  //     2000
  // )

  // 保留！
  // 异步请求数据
  await getScrollPageData({
    "pageIndex": state.pageNumber += 1,
    "pageSize": state.pageSize,
  })
      .then((response) => {
        console.log('response', response)
        state.dbExtendedInfo.usageDynamic.push(...response.data.dataList)
        state.pageNumber += 1
        state.loading = false
        state.hasMore = (response.data.dataList.length < state.pageSize)
      })
}

/**
 * 高亮操作关键词
 */
function highlightKeyWord(contents: string): string {
  let content = ""
  // 检查contents是否包含关键词
  for (let i = 0; i < KEYWORD.length; i++) {
    if (contents.indexOf(KEYWORD[i]) !== -1) {
      content = contents.replace(KEYWORD[i], '<span style="color:#4983ff;">' + KEYWORD[i] + '</span>');
    }
  }
  return content
}

/**
 * 操作时间格式化
 */
function showFormattedTime(time: string): string {
  const now = new Date()

  const diff = now.getTime() - new Date(time).getTime()

  if (diff > 24 * 60 * 60 * 1000) {
    return time
  }

  if (diff > 60 * 60 * 1000) {
    return Math.floor(diff / (60 * 60 * 1000)) + '小时前'
  }

  if (diff > 60 * 1000) {
    return Math.floor(diff / (60 * 1000)) + '分钟前'
  }

  return '刚刚'
}

onMounted(() => {
  init()
})

</script>

<style scoped lang="less">
</style>