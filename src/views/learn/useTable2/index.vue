<template>
  <el-card class='cs-list-card' shadow='never'>
    <template #header>
      <el-button
          type='primary' @click='handleCreateBouncer'
          :icon="Plus">新增pgbouncer
      </el-button>
      <el-button
          type='success' :icon="Edit"
          @click='handleUpdateBouncer'>
        修改
      </el-button>
      <el-button
          type='danger' :icon="Delete"
          @click="handleDeleteBouncer">
        删除
      </el-button>
      <el-button
          type='primary' :icon="More"
          @click="handleDetailBouncer">
        详情
      </el-button>
    </template>
    <div class='show-list'>
      <vxe-table
          border
          :row-config="{isCurrent: true, isHover: true}"
          :data="pgBouncerList"
          ref="xTable1"
          align="center"
          empty-text="暂无数据！"
          @current-change="currentChangeEvent1"
          @toggle-row-expand="toggleExpandChangeEvent">
        >
        <vxe-column type="seq" width="60"/>
        <vxe-column type="expand" width="60">
          <!-- 展开行 -->
          <!--          <template #content="{ bouncerRow }">-->
          <template #content="{ rowIndex }">
            <div class="expand-wrapper">
              <vxe-table
                  border
                  show-header-overflow
                  show-overflow
                  :row-config="{height: 120, isCurrent:true, isHover:true}"
                  :data="listData"
                  align="center"
                  empty-text="暂无数据！"
                  ref="xTable2"
                  @current-change="currentChangeEvent2"
              >
                <!--                <template #header>-->
                <!--                  {{ rowIndex }}-->
                <!--                  <div class='cus-table-header' style='margin: 5px'>-->
                <!--                    <div style="height: 35px">-->
                <!--                      <el-button-group>-->
                <!--                        <el-button-->
                <!--                            type='primary' @click='handleCreateCrossDomain'-->
                <!--                            :icon="Plus">-->
                <!--                          新增跨域库-->
                <!--                        </el-button>-->
                <!--                        <el-button-->
                <!--                            :disabled="editBtnDisabled"-->
                <!--                            type='success' :icon="Edit"-->
                <!--                            @click='handleUpdate'>-->
                <!--                          修改-->
                <!--                        </el-button>-->
                <!--                        <el-button type='danger' @click='handleDelete' :icon="Delete">-->
                <!--                          卸载-->
                <!--                        </el-button>-->
                <!--                        <el-button type='primary' @click='handleRead' :icon="More">-->
                <!--                          详情-->
                <!--                        </el-button>-->
                <!--                      </el-button-group>-->
                <!--                    </div>-->
                <!--                  </div>-->
                <!--                </template>-->
                <vxe-column type="seq" title="序号" align="center" width="60"/>
                <vxe-column field="name" title="数据库名称" align="center">
                  <template #default="{ row }">
                    <p style='font-size: 15px; font-weight: bolder'>{{ row.name }}</p>
                    <p style='font-size: 10px'>{{ row.type }}</p>
                    <p style='font-size: 10px'>{{ row.ip }}:{{ row.port }} -- {{ row.databaseName }}</p>
                  </template>
                </vxe-column>
                <vxe-column field="dbType" title="数据库类型" width="150">
                  <template #default="{ row }">
                    <p v-if="row.isLocal === 0">本地库</p>
                    <p v-if="row.isLocal === 1">域内库</p>
                    <p v-if="row.isLocal === 2">跨域库</p>
                    <p v-if="row.isLocal === 3">中心库</p>
                  </template>
                </vxe-column>
                <vxe-column title="操作" width="440">
                  <template #default="{ row }">
                    <el-button-group>
                      <el-button type='primary' :icon="Edit" @click="handleConfigBouncer(row, 1)">修改
                      </el-button>
                      <el-button type='primary' :icon="Delete" @click="handleRegisterType(row, 2)">删除</el-button>
                      <el-button type='primary' :icon="More" @click="handleConfigBouncer(row, 1)">详情
                      </el-button>
                    </el-button-group>
                  </template>
                </vxe-column>
              </vxe-table>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="name" title="Name"/>
        <vxe-column field="ip" title="IP"/>
        <vxe-column field="create" title="创建信息">
          <template #default="{ row }">
            <p>创建人：{{ row.createUserName }}</p>
            <p>创建时间：{{ row.createTime }}</p>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="440">
          <template #default="{ row }">
            <el-button-group>
              <el-button type='primary' :icon="Check" @click="handleConfigBouncer(row, 1)">配置bouncer</el-button>
              <el-button type='primary' :icon="Close" @click="handleRegisterType(row, 2)">新增数据库</el-button>
            </el-button-group>
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </el-card>

  <el-dialog
      title="配置bouncer"
      v-model="showBouncerDialog"
  >
    <el-form :model="bouncerForm" label-width="80px" ref="bouncerForm" :rules="bouncerFormRules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="bouncerForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="IP" prop="ip">
        <el-input v-model="bouncerForm.ip" placeholder="请输入IP"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input v-model="bouncerForm.port" placeholder="请输入端口"></el-input>
      </el-form-item>
      <el-form-item label="认证类型" prop="authType">
        <el-select v-model="bouncerForm.authType" placeholder="请选择认证类型">
          <el-option label="密码" value="password"></el-option>
          <el-option label="证书" value="certificate"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加密方式" prop="encryption">
        <el-select v-model="bouncerForm.encryption" placeholder="请选择加密方式">
          <el-option label="md5" value="md5"></el-option>
          <el-option label="sha256" value="sha256"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showBouncerDialog = false">取 消</el-button>
      <el-button type="primary" @click="handleBouncerSubmit">确 定</el-button>
    </template>
  </el-dialog>


</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, toRefs} from 'vue'
import {VxeTableInstance, VxeColumnPropTypes, VxeTableEvents} from 'vxe-table'
import {
  Plus, Coin, Delete, Edit, Document, Refresh, Search, Warning, Checked, Rank,
  Finished, WarningFilled, QuestionFilled, Switch, Grid, CirclePlus, Memo, Check, Close, More
} from '@element-plus/icons-vue'

const xTable1 = ref<VxeTableInstance>()
const xTable2 = ref<VxeTableInstance>()
// 表格当前选中行数据
const curRow1: any = ref();
const curRow2: any = ref();


const state = reactive({
  pgBouncerList: [],
  bouncerForm: {
    name: '',
    ip: '',
    port: '',
    authType: '',
    encryption: '',
  },

  listData: [],
  showBouncerDialog: false,
})

const {
  pgBouncerList,
  bouncerForm,
  listData,
  showBouncerDialog,
} = toRefs(state)

const DATA = [

  {
    bouncerName: 'pgBouncer2',
    name: 'pg3',
    isLocal: 2,
    type: 'PostgreSQL',
    ip: '2.e.3.32',
    port: '5432',
    databaseName: 'db3',
    createUserName: 'lisi',
    createTime: '2021-01-01 12:00:00'
  }
]


/******************************** toolbar **************************/
const handleCreateBouncer = () => {
  console.log("handleCreateBouncer")
  state.showBouncerDialog = true
}

const handleUpdateBouncer = () => {
  console.log("handleUpdateBouncer")
  state.showBouncerDialog = true
}

const handleBouncerSubmit = () => {
  console.log("handleBouncerSubmit")
  state.showBouncerDialog = false
}

const handleDeleteBouncer = () => {
  console.log("handleDeleteBouncer")
}

/******************************** table **************************/
/**
 * 获取当前选中的 bouncer 行
 */
const currentChangeEvent1 = () => {
  const $table: any = xTable1.value;
  curRow1.value = $table.getCurrentRecord();
  $table.toggleRowExpand(state.pgBouncerList.indexOf(curRow1.value))
  console.log("curRow1:", curRow1.value)
}

/**
 * bouncer 行展开事件，封装手风琴效果
 */
const toggleExpandChangeEvent: VxeTableEvents.ToggleRowExpand = (val) => {
  const $table = xTable1.value
  if ($table) {
    $table.clearRowExpand()
  }
  console.log('行展开事件:', val)
  const $newTable: any = xTable1.value;
  if ($newTable) {
    // 获取 val.row 在 pgBouncerList 中的索引
    const index = state.pgBouncerList.indexOf(val.row)
    $table.toggleRowExpand(state.pgBouncerList[index])
  }
}

/**
 * 获取当前选中的 db 行
 */
const currentChangeEvent2 = () => {
  const $table: any = xTable2.value;
  curRow2.value = $table.getCurrentRecord();
  console.log("curRow2:", curRow2.value)
}


/******************************** init **************************/
/**
 * 初始化
 */
const init = () => {
  // getPgBouncerList()
  state.pgBouncerList = [
    {
      name: 'pgBouncer1',
      ip: '172.28.19.58',
      port: '6432',
      createUserName: 'zhangsan',
      dbList: [
        {
          bouncerName: 'pgBouncer1',
          name: 'pg1',
          isLocal: 0,
          type: 'PostgreSQL',
          ip: '1.1.11.1',
          port: '5432',
          databaseName: 'db1',
          createUserName: 'zhangsan',
          createTime: '2021-01-01 12:00:00'
        },
        {
          bouncerName: 'pgBouncer1',
          name: 'pg2',
          isLocal: 1,
          type: 'PostgreSQL',
          ip: '2.2.2.2',
          port: '5432',
          databaseName: 'db2',
          createUserName: 'zhangsan',
          createTime: '2021-01-01 12:00:00'
        },
      ]
    },
    {
      name: 'pgBouncer2',
      ip: '172.28.79.59',
      port: '6432',
      createUserName: 'lisi',
      dbList: [
        {
          bouncerName: 'pgBouncer2',
          name: 'pg3',
          isLocal: 2,
          type: 'PostgreSQL',
          ip: '2.e.3.32',
          port: '5432',
          databaseName: 'db3',
          createUserName: 'lisi',
          createTime: '2021-01-01 12:00:00'
        }
      ]
    },
    {
      name: 'pgBouncer3',
      ip: '172.28.79.60',
      port: '6432',
      createUserName: 'wangwu',
      dbList: [
        {
          bouncerName: 'pgBouncer3',
          name: 'pg4',
          isLocal: 0,
          type: 'PostgreSQL',
          ip: '4.4.4.4',
          port: '5432',
          databaseName: 'db4',
          createUserName: 'wangwu',
          createTime: '2021-01-01 12:00:00'
        }
      ]
    }
  ]
}

const searchDbByBouncer = (row: any) => {
  return DATA.filter((item: any) => item.bouncerName === row.name)
}


onMounted(() => {
  init()
})
</script>

<style scoped>
.expand-wrapper {
  padding: 20px;
}
</style>


