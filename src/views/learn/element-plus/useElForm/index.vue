<template>
  <div>
    <el-card
        style="height: 600px;width: 800px;"
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
            <div class="main">
              <code-mirror
                  v-model="SQL"
                  basic
                  :lang="codeMirrorConfig.lang"
                  style="height: 400px;"
                  :extensions="codeMirrorConfig.extensions"/>
            </div>
          </el-tab-pane>
        </el-tabs>
        <template #footer>
          <el-button type="primary" @click="submit">保存</el-button>
        </template>
      </el-form>
    </el-card>
  </div>

  <el-select
      v-model="value"
      clearable
      multiple
      placeholder="Select">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <div>
    {{ value }}
  </div>

</template>

<script setup>
import {ElForm} from "element-plus";
import {onMounted, reactive, ref, toRefs} from "vue";

import CodeMirror from 'vue-codemirror6'
import {oneDark} from '@codemirror/theme-one-dark'
import {sql} from '@codemirror/lang-sql';

const value = ref([{
  value: '1',
  label: 'Option1',
},
  {
    value: '2',
    label: 'Option2',
  }])
const options = [
  {
    value: '1',
    label: 'Option1',
  },
  {
    value: '2',
    label: 'Option2',
  },
  {
    value: '3',
    label: 'Option3',
  },
  {
    value: '4',
    label: 'Option4',
  },
  {
    value: '5',
    label: 'Option5',
  },
]


const state = reactive({
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

  SQL: "CREATE TABLE IF NOT EXISTS public.frame_app_application\n" +
      "(\n" +
      "    id character varying(64) COLLATE pg_catalog.\"default\" NOT NULL,\n" +
      "    alone_app boolean,\n" +
      "    app_code character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    app_desc character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    app_name character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    del_flag integer,\n" +
      "    login_icon character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    login_url character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    remark character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    secret_level character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    show_name character varying(255) COLLATE pg_catalog.\"default\",\n" +
      "    sort_num integer,\n" +
      "    status boolean,\n" +
      "    CONSTRAINT frame_app_application_pkey PRIMARY KEY (id)\n" +
      ")\n" +
      "\n" +
      "TABLESPACE pg_default;\n" +
      "\n" +
      "ALTER TABLE IF EXISTS public.frame_app_application\n" +
      "    OWNER to appdb;",
})
const {
  codeMirrorConfig,
  activeName,
  formData,
  rules,
  SQL,
} = toRefs(state)


/************************* 事件 *************************/
const handleTabChange = (tab) => {
  console.log('tab:', tab)

  if (tab === 'sql') {
    // 根据表单数据生成 SQL
    state.SQL = generateSQL(state.formData)
  }
}


const submit = () => {
  console.log('formData:', formData.value)
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


/************************* 初始化 *************************/
const initCodeMirror = () => {
  // CodeMirror 配置
  state.codeMirrorConfig = {
    lang: sql(),
    extensions: [oneDark],
  }

  state.SQL = ''
}

onMounted(() => {
  initCodeMirror()
})
</script>

<style scoped>
/* required! */
.cm-editor {
  height: 100%;
}
</style>
