<template>
  <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      draggable
      destroy-on-close
      @close="closeDialog"
      style="height: 600px; width: 600px;position: relative;"
      class="dialogTab"
  >
    <el-form
        :model="formData"
        label-width="80px"
        :rules="rules"
        ref="form"
    >
      <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-change="handleTabChange"
      >
        <el-tab-pane label="常规" name="general">
          <el-form-item prop="name" label="名称">
            <el-input v-model="formData.name"/>
          </el-form-item>
          <el-form-item prop="owner" label="所有者">
            <el-input v-model="formData.owner"/>
          </el-form-item>
          <el-form-item prop="schema" label="架构">
            <el-input v-model="formData.schema"/>
          </el-form-item>
          <el-form-item prop="tableSpace" label="表空间">
            <el-input v-model="formData.tableSpace"/>
          </el-form-item>
          <el-form-item prop="desc" label="注释">
            <el-input v-model="formData.desc"/>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="Config" name="config">Config</el-tab-pane>
        <el-tab-pane label="Role" name="role">Role</el-tab-pane>
        <el-tab-pane label="SQL" name="sql">
          <el-scrollbar :height="380">
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
      </el-tabs>
    </el-form>
    <template #footer>
      <el-row style="position: absolute; bottom: 0; width: 100%; margin-left: -20px; padding: 20px 10px;">
        <el-col :span="12" style="text-align: left!important;">
          <el-button @click="cancelForm1" :icon="WarningFilled"/>
          <el-button @click="cancelForm1" :icon="QuestionFilled"/>
        </el-col>
        <el-col :span="12">
          <el-button @click="closeDialog" :icon="CircleClose">关闭</el-button>
          <el-button type="primary" @click="submit" :icon="Checked">提交</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRefs, watch, reactive} from 'vue'
import {ElForm} from 'element-plus'
import {WarningFilled, QuestionFilled, CircleClose, Checked} from '@element-plus/icons-vue'
import CodeMirror from 'vue-codemirror6'
import {oneDark} from '@codemirror/theme-one-dark'
import {sql} from '@codemirror/lang-sql';

const props = defineProps<{
  componentData: any
}>()
const propData = ref(props.componentData)

const emit = defineEmits(['clear-customComponent'])

watch(props, () => {
  (props.componentData.dialogVisible !== false) && (dialogVisible.value = true);
  propData.value = props.componentData
})

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
    desc: '',
  },
  rules: {
    name: [{required: true, message: '请输入名称', trigger: 'blur'},],
    owner: [{required: true, message: '请输入所有者', trigger: 'blur'},],
    schema: [{required: true, message: '请输入架构', trigger: 'blur'},]
  },

  SQL: "",
})
const {
  dialogVisible,

  codeMirrorConfig,
  activeName,
  formData,
  rules,
  SQL
} = toRefs(state)


/************************* 事件 *************************/
/**
 * 标签页面切换
 * @param tab
 */
const handleTabChange = (tab) => {
  console.log('tab:', tab)

  if (tab === 'sql') {
    // 根据表单数据生成 SQL
    state.SQL = generateSQL(state.formData)
  }
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


/************************* 工具 *************************/
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
}

onMounted(() => {
  init()
})
</script>

<style scoped>

</style>