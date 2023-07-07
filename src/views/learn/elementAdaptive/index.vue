<template>
  <!--  <div class="ac_coupon-wrap">-->
  <!--    <div class="ac_coupon-content">-->
  <!--      <img src="/static/img/coupon.svg" alt="优惠券"/>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--  <br/>-->

  <el-card class='app-card-container' shadow='never'>
    <template #header>
      <div class='cus-card-header'>
        <el-button-group class="function-toolbar">
          <el-button>功能一</el-button>
          <el-button>功能二</el-button>
          <el-button>功能三</el-button>
        </el-button-group>
        <el-form
            ref='queryFormRef'
            :inline='true'
            class="query-box"
        >
          <el-form-item prop='ipAddress'>
            <el-input placeholder='请输入数据库名称' clearabl/>
          </el-form-item>
          <el-form-item>
            <el-button type='primary'>搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <div class='card-table-container'>
      <vxe-table
          class="data-table"
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
          class="pagination-toolbar"
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          v-model:current-page="tablePage.pageIndex"
          v-model:page-size="tablePage.pageSize"
          :total="tablePage.totalRow"
          @page-change="handleMdPageChange"
      />
    </div>
  </el-card>
</template>

<script setup lang='ts'>

import {onMounted, reactive, toRefs} from 'vue'
import {getPageData, getScrollPageData} from "../../../api/learn/pagination.js";

import {ref} from 'vue'

const count = ref(0)
const load = () => {
  // count.value += 3
  console.log('load')

  // if (loading.value) return
  state.isLoading = true
  getScrollPageData({
    "pageIndex": state.pageNumber,
    "pageSize": state.pageSize,
  })
      .then((response) => {
        console.log('response', response)
        state.dbExtendedInfo.usageDynamic.push(...response.data.dataList)
        state.isLoading = false
        state.pageNumber++
        // state.hasMore = (response.data.dataList.length < state.pageSize)
        console.log('state.loading', state.isLoading)
      })
}


// 使用动态操作关键字
const KEYWORD = ['导入', '导出', '创建', '删除', '修改', '查询', '注销', '连接', '断开', '申请'];

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

  // 滚动加载
  pageNumber: 1,
  pageSize: 10,
  isLoading: false,
  hasMore: false,
  tableHeight: 0,
})
const {
  dbExtendedInfo,
  tablePage,
  tableHeight
} = toRefs(state)


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


/******************************** init **************************/
/**
 * 获取当前窗口数据
 */
function getScreenData() {
  // 获取窗口高度
  const winHeight = window.innerHeight
  // 获取窗口宽度
  const winWidth = window.innerWidth

  return {
    winHeight,
    winWidth,
  }
}

/**
 * 初始化
 */
async function init() {
  let screenData = getScreenData()
  console.log('screenData', screenData)
  state.tableHeight = screenData.winHeight - 300

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
}

onMounted(() => {
  init()
})

</script>

<style lang="scss" scoped>
.ac_coupon-wrap {
  height: 0; // 高度为0，全靠padding-top撑开
  padding-top: 15.16%; // padding-top设置比例为高/宽
  position: relative; // 相对定位，将子元素的绝对定位基准点设置为该元素
  background-color: #f1fff5;
  // 边框圆角10px，边框宽度1px，边框颜色#e6e6e6
  border-radius: 5px;
  border: 1px solid #daf7d0;

  .ac_coupon-content {
    position: absolute; // 绝对定位，相对于父元素定位
    top: 0; // 顶部距离为0
    width: 100%;
    height: 100%;
    background-size: cover;

    img {
      width: 100%; /* 图像宽度将填充父元素div的宽度 */
      height: 100%; /* 图像高度将填充父元素div的高度 */
      object-fit: contain; /* 图像将按比例缩放以适应父元素div的尺寸 */
    }
  }
}

.ac_coupon-content1 {
  background-color: #f1fff5;
  height: 70vh;
  border-radius: 5px;
  border: 1px solid #daf7d0;

  .p {
    color: #4983ff;
  }
}

.app-card-container {
  width: 100%;
}

.cus-card-header {
  height: 32px;
}

.function-toolbar {
  margin-bottom: 10px;
}

.query-box {
  float: right;
  height: 20px;
  margin-right: 10px;
}

.card-table-container {
  height: 85vh;
  width: calc(100% - 5px);
}

.data-table {
  height: calc(100% - 150px);
}

.use-pct {
  margin-right: 20px;
  font-size: 15px;
}

.pagination-toolbar {
  margin-top: 10px;
}

</style>