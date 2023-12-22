<template>
  <div class="box">
    <div class="side">
      <div class="bar">⋮</div>
      <div class="text">
        <el-card>
          <el-scrollbar style="height: calc(95vh - 105px);">
            <el-tree
                :data="state.treeData" :props="{children: 'children', label: 'label',value: 'id' }"
                :default-expand-all="true"
                :highlight-current="true"
            />
          </el-scrollbar>
        </el-card>
      </div>
    </div>
    <div class="content">
      <div class="tool-bar">
        <el-button type="success">
          新增
        </el-button>
        <el-button type="success">
          复制新增
        </el-button>
        <el-button type="success">
          导入Excel
        </el-button>
      </div>
      <vxe-table
          class="data-table"
          ref="xTable"
          border
          show-header-overflow
          show-overflow
          keep-source
          :column-config="{resizable: true}"
          :row-config="{ isCurrent:true, isHover:true}"
          :data="state.tableData"
          :height="tableHeight"
          align="center"
          empty-text="暂无数据！"
      >
        <vxe-column type="seq" fixed="left" width="60"></vxe-column>
      </vxe-table>
      <vxe-pager
          :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']"
          v-model:current-page="state.tablePage.pageNumber"
          v-model:page-size="state.tablePage.pageSize"
          :total="state.tablePage.totalRow"
      />
    </div>
  </div>
</template>

<script setup>


import {onMounted, onUpdated, reactive, ref, watch} from "vue";

const state = reactive({
  treeData: [
    {
      label: 'Level one 1',
      children: [
        {
          label: 'Level two 1-1',
          children: [
            {
              label: 'Level three 1-1-1',
            },
          ],
        },
      ],
    },
    {
      label: 'Level one 2',
      children: [
        {
          label: 'Level two 2-1',
          children: [
            {
              label: 'Level three 2-1-1',
            },
          ],
        },
        {
          label: 'Level two 2-2',
          children: [
            {
              label: 'Level three 2-2-1',
            },
          ],
        },
      ],
    }
  ],

  tableData: [
    {name: '1'},
    {name: '1'},
    {name: '1'},
    {name: '1'},
    {name: '1'},
  ],

  tablePage: {
    pageNumber: 1,
    pageSize: 20,
    totalRow: 0
  }
})

const contentHeight = ref(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
watch(
    () => contentHeight.value,
    (newVal, oldVal) => {
      contentHeight.value = newVal

      console.log('内容区域高度：', contentHeight.value)
      tableHeight.value = contentHeight.value - 150
    }
)
const tableHeight = ref(0)


onMounted(() => {

  window.onresize = () => {
    return (() => {
      // screenHeight.value = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      contentHeight.value = document.getElementsByClassName('content')[0].clientHeight
      console.log('高度：', contentHeight.value)
      tableHeight.value = contentHeight.value - 100
    })()
  }
})

onUpdated(() => {
  contentHeight.value = document.getElementsByClassName('content')[0].clientHeight
  console.log('最新高度：', contentHeight.value)
})
</script>


<style lang='scss' scoped>
div.box {
  height: 100%;
  width: 100%;
}

div {
  box-sizing: border-box;
}

div.box {
  display: flex;
}

div.side {
  position: relative;
  height: 100%;
  //outline: 1px solid greenyellow;
}

div.content {
  flex: 1;
  height: auto;
  padding: 0 10px;
  min-width: 300px;
}

/* 侧边栏文本样式 */
div.text {
  width: 100%;
  height: 100%;
  min-width: 10px;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  padding: 0 5px;
  background: #ffffff;
}

/*拖动按钮样式*/
/*拖动bar盒时，父级盒side会被bar盒撑开，又因为text盒的宽高都设为100%，所以改变bar盒就是在改变text盒*/
div.bar {
  width: 200px;
  min-width: 70px;
  //height: calc(100% - 505px);
  margin-right: -4px;
  margin-top: -40px;
  /* 因为bar盒子和text盒子是重合的所以必须设置一个负值才能看到我们的拖动按钮*/
  overflow: scroll;
  /* 可设置其他值来进行对别，只可意会，不可言传*/
  resize: horizontal;
  /*水平拖放*/
}

/*因为拖动按钮属于滚动条系列，所以可通过改变滚动来间接改变拖动按钮的样式*/
div.bar::-webkit-scrollbar {
  width: 5px;
  height: calc(100vh - 100px);
  /*可设为100%或者其他数值来查看展示效果，只可意会，不可言传*/
}

div.bar::-webkit-resizer {
  /* 设置拖放按钮的背景颜色 */
  background: #888888;
}


.app-card-container {
  height: 100%;
  width: 100%;
}

.tool-bar {
  height: 32px;
  padding: 7px;
}

.data-table {
  margin-top: 5px;
}

</style>


<!--<template>-->
<!--  &lt;!&ndash;  <div class="ac_coupon-wrap">&ndash;&gt;-->
<!--  &lt;!&ndash;    <div class="ac_coupon-content">&ndash;&gt;-->
<!--  &lt;!&ndash;      <img src="/static/img/coupon.svg" alt="优惠券"/>&ndash;&gt;-->
<!--  &lt;!&ndash;    </div>&ndash;&gt;-->
<!--  &lt;!&ndash;  </div>&ndash;&gt;-->
<!--  &lt;!&ndash;  <br/>&ndash;&gt;-->

<!--  <el-card class='app-card-container' shadow='never'>-->
<!--    <template #header>-->
<!--      <div class='cus-card-header'>-->
<!--        <el-button-group class="function-toolbar">-->
<!--          <el-button>功能一</el-button>-->
<!--          <el-button>功能二</el-button>-->
<!--          <el-button>功能三</el-button>-->
<!--        </el-button-group>-->
<!--        <el-form-->
<!--            ref='queryFormRef'-->
<!--            :inline='true'-->
<!--            class="query-box"-->
<!--        >-->
<!--          <el-form-item prop='ipAddress'>-->
<!--            <el-input placeholder='请输入数据库名称' clearabl/>-->
<!--          </el-form-item>-->
<!--          <el-form-item>-->
<!--            <el-button type='primary'>搜索</el-button>-->
<!--            <el-button>重置</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </template>-->
<!--    <div class='card-table-container'>-->
<!--      <vxe-table-->
<!--          class="data-table"-->
<!--          border-->
<!--          show-header-overflow-->
<!--          show-overflow-->
<!--          :row-config="{height: 40}"-->
<!--          :data='dbExtendedInfo.managementDynamic'-->
<!--          align="center"-->
<!--          height="auto"-->
<!--          empty-text="暂无数据！"-->
<!--      >-->
<!--        <div v-if="dbExtendedInfo.managementDynamic.length > 0">-->
<!--          <vxe-column type="seq" title="序号" width="60"/>-->
<!--          <vxe-column field="name" title="用户"/>-->
<!--          <vxe-column field="status" title="状态"/>-->
<!--        </div>-->
<!--      </vxe-table>-->
<!--    </div>-->
<!--    <vxe-pager-->
<!--        class="pagination-toolbar"-->
<!--        :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"-->
<!--        v-model:current-page="tablePage.pageIndex"-->
<!--        v-model:page-size="tablePage.pageSize"-->
<!--        :total="tablePage.totalRow"-->
<!--        @page-change="handleMdPageChange"-->
<!--    />-->
<!--  </el-card>-->
<!--</template>-->

<!--<script setup lang='ts'>-->

<!--import {onMounted, reactive, toRefs} from 'vue'-->
<!--import {getPageData, getScrollPageData} from "../../../../api/learn/pagination.js";-->

<!--import {ref} from 'vue'-->

<!--const count = ref(0)-->
<!--const load = () => {-->
<!--  // count.value += 3-->
<!--  console.log('load')-->

<!--  // if (loading.value) return-->
<!--  state.isLoading = true-->
<!--  getScrollPageData({-->
<!--    "pageIndex": state.pageNumber,-->
<!--    "pageSize": state.pageSize,-->
<!--  })-->
<!--      .then((response) => {-->
<!--        console.log('response', response)-->
<!--        state.dbExtendedInfo.usageDynamic.push(...response.data.dataList)-->
<!--        state.isLoading = false-->
<!--        state.pageNumber++-->
<!--        // state.hasMore = (response.data.dataList.length < state.pageSize)-->
<!--        console.log('state.loading', state.isLoading)-->
<!--      })-->
<!--}-->


<!--// 使用动态操作关键字-->
<!--const KEYWORD = ['导入', '导出', '创建', '删除', '修改', '查询', '注销', '连接', '断开', '申请'];-->

<!--const state = reactive({-->
<!--  dbExtendedInfo: {-->
<!--    managementDynamic: [],-->
<!--  },-->

<!--  // 分页数据-->
<!--  tablePage: {-->
<!--    pageIndex: 1,-->
<!--    pageSize: 20,-->
<!--    totalPage: 0,-->
<!--    totalRow: 0,-->
<!--  },-->

<!--  // 滚动加载-->
<!--  pageNumber: 1,-->
<!--  pageSize: 10,-->
<!--  isLoading: false,-->
<!--  hasMore: false,-->
<!--  tableHeight: 0,-->
<!--})-->
<!--const {-->
<!--  dbExtendedInfo,-->
<!--  tablePage,-->
<!--  tableHeight-->
<!--} = toRefs(state)-->


<!--/******************************** management-dynamic **************************/-->
<!--/**-->
<!-- * management-dynamic页数改变事件-->
<!-- */-->
<!--async function handleMdPageChange({currentPage, pageSize}) {-->
<!--  state.tablePage.pageIndex = currentPage-->
<!--  state.tablePage.pageSize = pageSize-->
<!--  const queryForm = {-->
<!--    "pageIndex": state.tablePage.pageIndex,-->
<!--    "pageSize": state.tablePage.pageSize,-->
<!--  }-->
<!--  // 获取管理动态详情-->
<!--  await getPageData(queryForm)-->
<!--      .then((response) => {-->
<!--        console.log('response', response)-->
<!--        state.dbExtendedInfo.managementDynamic = response.data.dataList-->
<!--        state.tablePage.pageIndex = response.data.pageIndex-->
<!--        state.tablePage.pageSize = response.data.pageSize-->
<!--        state.tablePage.totalPage = response.data.totalPage-->
<!--        state.tablePage.totalRow = response.data.totalRow-->
<!--      })-->
<!--}-->


<!--/******************************** init **************************/-->
<!--/**-->
<!-- * 获取当前窗口数据-->
<!-- */-->
<!--function getScreenData() {-->
<!--  // 获取窗口高度-->
<!--  const winHeight = window.innerHeight-->
<!--  // 获取窗口宽度-->
<!--  const winWidth = window.innerWidth-->

<!--  return {-->
<!--    winHeight,-->
<!--    winWidth,-->
<!--  }-->
<!--}-->

<!--/**-->
<!-- * 初始化-->
<!-- */-->
<!--async function init() {-->
<!--  let screenData = getScreenData()-->
<!--  console.log('screenData', screenData)-->
<!--  state.tableHeight = screenData.winHeight - 300-->

<!--  const queryForm = {-->
<!--    "pageIndex": 1,-->
<!--    "pageSize": 20,-->
<!--  }-->
<!--  // 获取管理动态详情-->
<!--  await getPageData(queryForm)-->
<!--      .then((response) => {-->
<!--        state.dbExtendedInfo.managementDynamic = response.data.dataList-->
<!--        state.tablePage.pageIndex = response.data.pageIndex-->
<!--        state.tablePage.pageSize = response.data.pageSize-->
<!--        state.tablePage.totalPage = response.data.totalPage-->
<!--        state.tablePage.totalRow = response.data.totalRow-->
<!--      })-->
<!--}-->

<!--onMounted(() => {-->
<!--  init()-->
<!--})-->

<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--//.ac_coupon-wrap {-->
<!--//  height: 0; // 高度为0，全靠padding-top撑开-->
<!--//  padding-top: 15.16%; // padding-top设置比例为高/宽-->
<!--//  position: relative; // 相对定位，将子元素的绝对定位基准点设置为该元素-->
<!--//  background-color: #f1fff5;-->
<!--//  // 边框圆角10px，边框宽度1px，边框颜色#e6e6e6-->
<!--//  border-radius: 5px;-->
<!--//  border: 1px solid #daf7d0;-->
<!--//-->
<!--//  .ac_coupon-content {-->
<!--//    position: absolute; // 绝对定位，相对于父元素定位-->
<!--//    top: 0; // 顶部距离为0-->
<!--//    width: 100%;-->
<!--//    height: 100%;-->
<!--//    background-size: cover;-->
<!--//-->
<!--//    img {-->
<!--//      width: 100%; /* 图像宽度将填充父元素div的宽度 */-->
<!--//      height: 100%; /* 图像高度将填充父元素div的高度 */-->
<!--//      object-fit: contain; /* 图像将按比例缩放以适应父元素div的尺寸 */-->
<!--//    }-->
<!--//  }-->
<!--//}-->
<!--//-->
<!--//.ac_coupon-content1 {-->
<!--//  background-color: #f1fff5;-->
<!--//  height: 70vh;-->
<!--//  border-radius: 5px;-->
<!--//  border: 1px solid #daf7d0;-->
<!--//-->
<!--//  .p {-->
<!--//    color: #4983ff;-->
<!--//  }-->
<!--//}-->

<!--.app-card-container {-->
<!--  height: 85vh;-->
<!--  width: 100%;-->


<!--  .cus-card-header {-->
<!--    height: 32px;-->

<!--    .function-toolbar {-->
<!--      margin-bottom: 10px;-->
<!--    }-->

<!--    .query-box {-->
<!--      float: right;-->
<!--      height: 20px;-->
<!--      margin-right: 10px;-->
<!--    }-->
<!--  }-->

<!--  .card-table-container {-->
<!--    height: calc(85vh - 130px);-->
<!--    width: calc(100%);-->

<!--    .use-pct {-->
<!--      margin-right: 20px;-->
<!--      font-size: 15px;-->
<!--    }-->
<!--  }-->

<!--  .pagination-toolbar {-->
<!--  }-->
<!--}-->

<!--//:deep(.el-card) {-->
<!--//  padding: 0;-->
<!--//}-->

<!--:deep(.el-card .el-card__body) {-->
<!--  padding: 0;-->
<!--}-->

<!--</style>-->
<script setup>
</script>