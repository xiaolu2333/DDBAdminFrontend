<template>
  <div>
    <el-dialog
        v-model="dialogVisible"
        title="创建表"
        :close-on-click-modal="false"
        draggable
        destroy-on-close
        @close="closeDialog"
        style="height: 600px; width: 750px;position: relative;"
        class="dialogTab"
    >
      <el-form
          :model="formData"
          label-width="80px"
          :rules="rules"
          ref="form"
      >
        <el-tabs
            type="card"
            v-model="activeName"
            @tab-change="handleTabChange"
        >
          <el-scrollbar :height="390">
            <el-tab-pane label="常规" name="常规">
              <el-form-item prop="name" label="名称">
                <el-input v-model="formData.name" @input="handleNameChange" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item prop="owner" label="所有者">
                <el-select
                    v-model="formData.owner" class="m-2"
                    @change="handleOwnerChange"
                    style="width: 100%"
                >
                  <el-option
                      v-for="item in ownerOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="schema" label="架构">
                <el-select
                    v-model="formData.schema"
                    @change="handleSchemaChange"
                    style="width: 100%"
                >
                  <el-option
                      v-for="item in schemaOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="tableSpace" label="表空间">
                <el-select
                    v-model="formData.tableSpace"
                    @change="handleTableSpaceChange"
                    style="width: 100%"
                >
                  <el-option
                      v-for="item in tableSpaceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="comment" label="注释">
                <el-input
                    v-model="formData.comment"
                    :rows="3"
                    type="textarea"
                    @input="handleCommentChange"
                />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="列" name="列">
              <el-form-item prop="inheritFrom" label="继承自表">
                <el-select
                    v-model="formData.inheritTabl"
                    clearable
                    @change="handleInheritTableChange"
                    style="width: 100%"
                >
                  <el-option
                      v-for="item in inheritTableOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <div>
                <vxe-toolbar>
                  <template #buttons>
                    <vxe-button @click="addColumn">新增</vxe-button>
                    <!--                    <vxe-button @click="removeSelectRowEvent">删除选中</vxe-button>-->
                  </template>
                </vxe-toolbar>

                <vxe-table
                    border
                    show-overflow
                    keep-source
                    ref="columnTable"
                    max-height="400"
                    :data="columnData"
                    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
                >
                  <vxe-column
                      field="name" title="名称"
                      :edit-render="{autofocus: '.vxe-input--inner', defaultValue: '默认的名字'}"
                  >
                    <template #edit="{ row }">
                      <vxe-input v-model="row.name" type="text"></vxe-input>
                    </template>
                  </vxe-column>
                  <vxe-column
                      field="dataType" title="数据类型"
                      :edit-render="{}">
                    <!--                    <template #default="{ row }">-->
                    <!--                      <span>{{ formatSex(row.sex) }}</span>-->
                    <!--                    </template>-->
                    <template #edit="{ row }">
                      <vxe-select v-model="row.type" transfer>
                        <vxe-option
                            v-for="item in columnTypeOptions"
                            :key="item.typeName"
                            :value="item.typeName"
                            :label="item.typeName"
                        ></vxe-option>
                      </vxe-select>
                    </template>
                  </vxe-column>
                  <vxe-column
                      field="lenPer" title="长度/精度"
                      :edit-render="{defaultValue: 18}">
                    <template #edit="{ row }">
                      <vxe-input v-model="row.lenPre" type="text"></vxe-input>
                    </template>
                  </vxe-column>
                  <vxe-column
                      field="scale" title="精度"
                      :edit-render="{defaultValue: 0}">
                    <template #edit="{ row }">
                      <vxe-input v-model="row.scale" type="text"></vxe-input>
                    </template>
                  </vxe-column>
                  <vxe-column
                      field="isNullable" title="不为NULL"
                      :edit-render="{defaultValue: false}">
                    <template #edit="{ row }">
                      <vxe-switch v-model="row.isNullable" type="primary"></vxe-switch>
                    </template>
                  </vxe-column>
                  <vxe-column
                      field="isPrimaryKey" title="主键？"
                      :edit-render="{defaultValue: false}">
                    <template #edit="{ row }">
                      <vxe-switch v-model="row.isPrimaryKey" type="primary"></vxe-switch>
                    </template>
                  </vxe-column>
                  <vxe-column
                      field="defaultValue" title="默认值"
                      :edit-render="{defaultValue: ''}">
                    <template #edit="{ row }">
                      <vxe-input v-model="row.defaultValue" type="text"></vxe-input>
                    </template>
                  </vxe-column>
                </vxe-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="高级" name="高级">

            </el-tab-pane>
            <el-tab-pane label="约束" name="约束">

            </el-tab-pane>
            <el-tab-pane label="分区" name="分区">

            </el-tab-pane>
            <el-tab-pane label="参数" name="参数">

            </el-tab-pane>
            <el-tab-pane label="安全" name="安全">
            </el-tab-pane>
            <el-tab-pane label="SQL" name="sql">
              <el-scrollbar :height="350">
                <code-mirror
                    v-model="SQL"
                    basic
                    :disabled="true"
                    :lang="codeMirrorConfig.lang"
                    :extensions="codeMirrorConfig.extensions"
                >
                </code-mirror>
              </el-scrollbar>
            </el-tab-pane>
          </el-scrollbar>
        </el-tabs>
      </el-form>
      <el-alert v-show="alert.show" :title="alert.title" :type="alert.type" show-icon/>
      <template #footer>
        <el-row style="position: absolute; bottom: 0; width: 100%; margin-left: -20px; padding: 10px 10px;">
          <el-col :span="12" style="text-align: left!important;">
            <el-button :icon="WarningFilled"/>
            <el-button :icon="QuestionFilled"/>
          </el-col>
          <el-col :span="12">
            <el-button @click="closeDialog" :icon="CircleClose">关闭</el-button>
            <el-button type="primary" @click="submit" :icon="Checked">提交</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRefs, watch, reactive} from 'vue'
import {ElForm} from 'element-plus'
import {WarningFilled, QuestionFilled, CircleClose, Checked} from '@element-plus/icons-vue'
import CodeMirror from 'vue-codemirror6'
import {oneDark} from '@codemirror/theme-one-dark'
import {sql} from '@codemirror/lang-sql';

import {
  GetDataType
} from '@/api/dataManage/dataTree'

const props = defineProps<{
  componentData: any
}>()
const propData = ref(props.componentData)

const emit = defineEmits(['clear-customComponent'])

watch(props, () => {
  (props.componentData.dialogVisible !== false) && (dialogVisible.value = true);
  propData.value = props.componentData
})

const columnTable = ref<any>(null)
const state = reactive({
  // 对话框是否可见
  dialogVisible: false,

  codeMirrorConfig: {
    lang: null,
    extensions: [],
  },

  activeName: 'general',

  formData: {
    name: '',
    owner: '',
    schema: '',
    tableSpace: 'pg_default',
    comment: '',
  },
  oldFormData: {
    name: 'test1',
    owner: 'postgres',
    schema: 'public',
    tableSpace: 'pg_default',
    comment: '测试注释',
  },
  ownerOptions: [
    {
      value: 'postgres',
      label: 'postgres',
    },
    {
      value: 'test',
      label: 'test',
    },
  ],
  schemaOptions: [
    {
      value: 'public',
      label: 'public',
    },
    {
      value: 'test',
      label: 'test',
    },
  ],
  tableSpaceOptions: [
    {
      value: 'pg_default',
      label: 'pg_default',
    },
    {
      value: 'test',
      label: 'test',
    },
  ],
  inheritTableOptions: [
    {
      value: 'table1',
      label: 'table1',
    },
    {
      value: 'table2',
      label: 'table2',
    },
    {
      value: 'table3',
      label: 'table3',
    }
  ],
  columnTypeOptions: [] as any,
  columnData: [] as any,
  rules: {
    name: [{required: true, message: '请输入名称', trigger: 'blur'}],
    owner: [{required: true, message: '请输入所有者', trigger: 'blur'}],
    schema: [{required: true, message: '请输入架构', trigger: 'blur'}]
  },

  alert: {
    show: false,
    type: 'error',
    title: 'error alert',
  },

  SQL: "",
})
const {
  dialogVisible,

  codeMirrorConfig,
  activeName,
  formData,
  oldFormData,
  ownerOptions,
  schemaOptions,
  tableSpaceOptions,
  inheritTableOptions,
  columnTypeOptions,
  columnData,
  rules,

  alert,
  SQL
} = toRefs(state)


/************************* 事件 *************************/
/**
 * 标签页面切换
 * @param tab
 */
const handleTabChange = (tab) => {
  console.log('tab:', tab)

  if (tab === '列') {
    GetDataType().then(res => {
      columnTypeOptions.value = res.data.data
      console.log('columnTypeOptions:', columnTypeOptions.value)
    })
  }
  if (tab === 'sql') {
    // 根据表单数据生成 SQL
    state.SQL = generateSQL(state.formData)
  }
}

/**
 * 名称改变
 */
const handleNameChange = (value) => {
  console.log('名称改变:', value)

  if (value === '') {
    setAlert(true, 'error', '名称不能为空')
  } else {
    collectFormData('name', value)
  }
}

/**
 * 所有者改变
 */
const handleOwnerChange = (value) => {
  console.log('所有者改变:', value)
  collectFormData('owner', value)
}

/**
 * 架构改变
 */
const handleSchemaChange = (value) => {
  console.log('架构改变:', value)
  collectFormData('schema', value)
}

/**
 * 表空间改变
 */
const handleTableSpaceChange = (value) => {
  console.log('表空间改变:', value)
  collectFormData('tableSpace', value)
}

/**
 * 注释改变
 */
const handleCommentChange = (value) => {
  console.log('注释改变:', value)
  collectFormData('comment', value)
}

/**
 * 继承表改变
 */
const handleInheritTableChange = (value) => {
  console.log('继承表改变:', value)
  collectFormData('inheritTable', value)
}

/**
 * 提交表单
 */
function submit() {
}


/**
 * 关闭对话框
 */
function closeDialog() {
  dialogVisible.value = false

  // 抛出关闭事件
  let isDialogVisible = false
  emit('clear-customComponent', (isDialogVisible))
}


/************************* vex table *************************/
/**
 * 添加列
 */
const addColumn = async (row) => {
  console.log('添加列:', row)
  const $table = columnTable.value
  if ($table) {
    const record = {
      name: '',
      type: '',
      lenPre: '',
      scale: '',
      isNullable: false,
      isPrimaryKey: false,
      default: '',
    }
    await $table.insertAt(record, row)
    // const {row: newRow} = await $table.insertAt(record, row)
    // await $table.setEditCell(newRow, '')
  }
}


/************************* 工具 *************************/
/**
 * 设置alert
 */
function setAlert(show, type, title) {
  alert.value.show = show
  alert.value.type = type
  alert.value.title = title
}

/**
 * 收集表单数据
 */
const collectFormData = (key: string, value: any) => {
  console.log('收集表单数据')

  let formData = {} as any

  if (key === 'name' && value !== '') {
    formData.name = value
  }

  if (key === 'owner') {
    formData.owner = value
  }

  if (key === 'schema') {
    formData.schema = value
  }

  if (key === 'tableSpace') {
    formData.tableSpace = value
  }

  if (key === 'comment') {
    formData.comment = value
  }


}


/**
 * 根据表单数据生成 SQL
 * @param formData
 * @returns {string}
 */
const generateSQL = (formData) => {
  function genSQL(data) {
    let sql = 'CREATE';

    sql += ' TABLE';

    if (data.add_not_exists_clause) {
      sql += ' IF NOT EXISTS';
    }

    sql += ` ${data.schema}.${data.name}`;

    if (
        data.like_relation ||
        data.coll_inherits ||
        data.columns.length > 0
    ) {
      sql += '\n(\n';
    }

    // 拼接列
    if (data.columns && data.columns.length > 0) {
      data.columns.forEach((c, index) => {
        if (c.name && c.cltype) {
          sql += `  ${c.name} ${c.cltype}`;

          if (c.collspcname) {
            sql += ` COLLATE ${c.collspcname}`;
          }

          if (c.attnotnull) {
            sql += ' NOT NULL';
          }

          if (
              c.defval !== undefined &&
              c.defval !== null &&
              c.defval !== ''
          ) {
            sql += ` DEFAULT ${c.defval}`;
          }

          if (index !== data.columns.length - 1) {
            sql += ',\n';
          }
        }
      });
    }

    // 拼接约束
    if (data.constraint && data.constraint.length > 0) {
      sql += ',\n'

      if (data.constraint[0].column.name && data.constraint[0].column.colName) {
        sql += `  CONSTRAINT ${data.constraint[0].column.name} PRIMARY KEY (${data.constraint[0].column.colName})`;
      }

      if (data.constraint[1].column.length > 0) {
        sql += ',\n'

        data.constraint[1].column.forEach((c) => {
          sql += `  CONSTRAINT ${c.name} FOREIGN KEY (${c.localCol}) MATCH SIMPLE\n`;
          sql += `    REFERENCES ${c.refTable} (${c.refCol})\n`;
          sql += `    ON UPDATE NO ACTION\n`;
          sql += `    ON DELETE NO ACTION\n`;
        })
      }
    }


    sql += '\n)\n';
    console.log('sql:', sql)

    return sql;
  }

  // Example usage
  const data = {
    relpersistence: true,
    add_not_exists_clause: false,
    schema: 'public',
    name: 'my_table',
    typname: 'my_type',
    like_relation: null,
    coll_inherits: null,
    columns: [
      {
        name: 'column1',
        cltype: 'integer',
        inheritedfromtable: null,
        inheritedfromtype: null,
        collspcname: null,
        attnotnull: true,
        defval: null,
      },
      {
        name: 'column2',
        cltype: 'text',
        inheritedfromtable: null,
        inheritedfromtype: null,
        collspcname: null,
        attnotnull: false,
        defval: "'default value'",
      },
    ],
    // 约束
    constraint: [
      // 主键
      {
        type: 'primary_key',
        column: {name: 'pk_column', colName: 'column1, column2'},
      },
      // 外键
      {
        type: 'foreign_key',
        column: [
          {name: 'f1', localCol: 'column1', refTable: 'table1', refCol: 'column1'},
          {name: 'f2', localCol: 'column2', refTable: 'table2', refCol: 'column2'},
        ]
      }
    ]
  };

  console.log(genSQL(data));
  return genSQL(data);
}


/************************* init *************************/
function init() {
  // CodeMirror 配置
  // @ts-ignore
  state.codeMirrorConfig = {
    lang: sql(),
    extensions: [oneDark],
  }

  state.SQL = ''

  console.log('propData.value', propData.value)
  dialogVisible.value = true
  activeName.value = '常规'

  state.formData = state.oldFormData
  setAlert(false, 'error', '')
}

onMounted(() => {
  init()
})
</script>

<style scoped>
</style>