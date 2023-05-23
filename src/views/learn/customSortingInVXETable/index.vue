<template>
  <div>
    <div>
      <!--      <vxe-table-->
      <!--          border-->
      <!--          height="300"-->
      <!--          :row-config="{isHover: true}"-->
      <!--          :data="tableData"-->
      <!--      >-->
      <!--        <vxe-column type="seq" width="60"></vxe-column>-->
      <!--        &lt;!&ndash;      配置 sort-by 指定字段排序、或者方法返回自定义排序的值&ndash;&gt;-->
      <!--        <vxe-column-->
      <!--            field="name" title="Name"-->
      <!--            :sort-by="sortNameMethod" sortable-->
      <!--        >-->
      <!--          <template #default="{ row }">-->
      <!--            <span style="color: red;">名字：{{ row.name }}</span>-->
      <!--          </template>-->
      <!--        </vxe-column>-->
      <!--        <vxe-column-->
      <!--            field="num" title="Num"-->
      <!--            sortable-->
      <!--        ></vxe-column>-->
      <!--        <vxe-column-->
      <!--            field="num1" title="分离格式化与数值字段"-->
      <!--            sort-by="num1" sortable-->
      <!--            :formatter="formatterNum"-->
      <!--        ></vxe-column>-->
      <!--        <vxe-column-->
      <!--            field="num2" title="分离格式化与字符串字段"-->
      <!--            sort-by="num2" sort-type="number" sortable-->
      <!--            :formatter="formatterNum"-->
      <!--        ></vxe-column>-->
      <!--      </vxe-table>-->
    </div>

    <vxe-table
        border
        height="500"
        :data="tableData"
        :row-config="{isHover: true}"
        :align="allAlign"
    >
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column title="数据库名称" sortable>
        <template #default="{ row }">
          <div class="name">
            <p>{{ row.showName }}</p>
            <p>{{ row.type }}</p>
            <p>{{ row.ip }}:{{ row.port }}--{{ row.dbName }}</p>
          </div>
        </template>
      </vxe-column>
      <!--      对单个字段直接使用 sortable 属性即可-->
      <vxe-column field="registerStatus" title="注册状态" sortable></vxe-column>
      <vxe-column title="数据库类型">
        <template #default="{ row }">
          <div class="type">
            <p>{{ row.isCenter }}</p>
            <p>{{ row.isLocal }}</p>
          </div>
        </template>
      </vxe-column>
      <vxe-column title="创建信息" :sort-by="sortByIsCenter" sortable>
        <template #default="{ row }">
          <div class="creator">
            <p>{{ row.createTime }}</p>
          </div>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, toRefs, defineComponent} from 'vue'
import {VxeColumnPropTypes, VxeTablePropTypes} from 'vxe-table'
import XEUtils from 'xe-utils'

interface RowVO {
  // 数据库 ip 地址
  ip: string;
  // 数据库端口
  port: string;
  // 数据库展示名称
  showName: string;
  // 服务器上数据库名称
  dbName: string;
  // 数据库类型
  type: string;
  // 数据库用户名
  user: string;
  // 数据库密码
  password: string;
  // 注册状态：0-待授权 1-等待中 2-已拒绝 3-已同意
  registerStatus: number;
  // 运行状态：0-未运行 1-运行中 2-已注销
  runningStatus: number;
  // 中心库/子库 0-中心库 1-子库
  isCenter: number
  // 本地库/域内库/跨域库 0-本地库 1-域内库 2-跨域库
  isLocal: number
  // 创建人
  creator: string;
  // 创建时间
  createTime: string;
  // 更新时间
  updateTime: string;
  // 描述
  description: string;
}

const tableData = ref<RowVO[]>([
      {
        ip: '127.0.0.180',
        port: '17970',
        showName: '中心库1',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 1,
        runningStatus: 1,
        isCenter: 0,
        isLocal: 1,
        creator: 'user0',
        createTime: '2023-04-28 17:16:31',
        updateTime: '2023-04-09 21:35:59',
        description: '中心库1是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.159',
        port: '13006',
        showName: '中心库2',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 0,
        runningStatus: 2,
        isCenter: 0,
        isLocal: 0,
        creator: 'user8',
        createTime: '2023-03-14 00:34:21',
        updateTime: '2023-04-23 02:12:28',
        description: '中心库2是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.129',
        port: '54153',
        showName: '中心库3',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 2,
        runningStatus: 1,
        isCenter: 0,
        isLocal: 0,
        creator: 'user2',
        createTime: '2023-03-14 00:11:10',
        updateTime: '2023-03-24 14:41:31',
        description: '中心库3是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.209',
        port: '25531',
        showName: '中心库4',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 1,
        runningStatus: 1,
        isCenter: 0,
        isLocal: 1,
        creator: 'user0',
        createTime: '2023-01-26 10:55:35',
        updateTime: '2023-02-12 21:29:40',
        description: '中心库4是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.16',
        port: '2765',
        showName: '中心库5',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 0,
        runningStatus: 0,
        isCenter: 0,
        isLocal: 1,
        creator: 'user8',
        createTime: '2023-04-26 11:33:35',
        updateTime: '2023-05-09 07:55:48',
        description: '中心库5是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.0',
        port: '63628',
        showName: '中心库6',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 1,
        runningStatus: 0,
        isCenter: 1,
        isLocal: 0,
        creator: 'user3',
        createTime: '2023-02-28 22:07:50',
        updateTime: '2023-04-25 11:07:00',
        description: '中心库6是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.47',
        port: '54868',
        showName: '中心库7',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 1,
        runningStatus: 0,
        isCenter: 0,
        isLocal: 1,
        creator: 'user5',
        createTime: '2023-05-16 23:14:54',
        updateTime: '2023-02-07 11:43:09',
        description: '中心库7是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.68',
        port: '2765',
        showName: '中心库8',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 0,
        runningStatus: 2,
        isCenter: 0,
        isLocal: 1,
        creator: 'user3',
        createTime: '2023-05-19 17:28:10',
        updateTime: '2023-03-03 22:00:56',
        description: '中心库8是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.148',
        port: '65056',
        showName: '中心库9',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 0,
        runningStatus: 1,
        isCenter: 1,
        isLocal: 1,
        creator: 'user9',
        createTime: '2023-03-22 15:43:39',
        updateTime: '2023-05-07 09:56:18',
        description: '中心库9是一个PostgreSQL数据库'
      },
      {
        ip: '127.0.0.219',
        port: '5596',
        showName: '中心库10',
        dbName: 'postgres',
        type: 'PostgreSQL',
        user: 'postgres',
        password: 'postgres',
        registerStatus: 0,
        runningStatus: 0,
        isCenter: 1,
        isLocal: 0,
        creator: 'user5',
        createTime: '2023-05-12 09:14:25',
        updateTime: '2023-05-01 17:26:48',
        description: '中心库10是一个PostgreSQL数据库'
      }
    ])

const states = reactive({
  allAlign: 'center'
})
const {
  allAlign
} = toRefs(states)


const sortByIsCenter = ref({
  sortMethod({data, sortList}) {
    const sortItem = sortList[0]
    // 取出第一个排序的列
    const {field, order} = sortItem
    console.log('sortItem', sortItem)

    // let list: any[] = []
    // if (order === 'asc' || order === 'desc') {
    //   if (field === 'name') {
    //     // 例如：实现中英文混排，按照字母排序
    //     list = data.sort((a, b) => {
    //       return a.createTime > b.createTime ? 1 : -1
    //     })
    //   } else {
    //     list = data.sort()
    //   }
    // }
    // if (order === 'desc') {
    //   list.reverse()
    // }
    return list
  }
} as VxeTablePropTypes.SortConfig)


// 配置 sort-by 指定字段排序、或者方法返回自定义排序的值
const sortNameMethod: VxeColumnPropTypes.SortBy = ({row}) => {
  // // 按名称长度进行排序
  // return row.name.length

  // // 按照名称的字母顺序进行排序
  // return row.name.charCodeAt(0)

  // 按照创建时间进行排序
  return row.createTime
}
</script>

