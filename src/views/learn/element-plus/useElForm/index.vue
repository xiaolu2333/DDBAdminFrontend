<template>
  <div>
    <el-card
        style="height: 600px;width: 800px;"
    >
      <el-form
          :model="formData"
          label-width="80px"
          @keydown.enter="submit"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="常规">
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
          <el-tab-pane label="Config">Config</el-tab-pane>
          <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="SQL">
            <div>
              <highlightjs language="JavaScript" :autodetect="false" :code="SQL"></highlightjs>
            </div>
          </el-tab-pane>
        </el-tabs>
        <template #footer>
          <el-button type="primary" @click="submit">保存</el-button>
        </template>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>

import {ElForm} from "element-plus";
import {reactive, toRefs} from "vue";

const state = reactive({
  formData: {
    name: '',
    owner: '',
    schema: '',
    tableSpace: '',
    desc: '',
  },
  formDisabled: true,

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
  formData,
  formDisabled,
  SQL,
} = toRefs(state)


const submit = () => {
  console.log('formData:', formData.value)
}
</script>

<style scoped>

</style>