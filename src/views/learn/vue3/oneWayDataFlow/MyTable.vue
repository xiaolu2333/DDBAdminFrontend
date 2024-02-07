<script setup lang='ts'>
import {defineProps, ref} from 'vue';

import MyChechbox from "./MyChechbox.vue";


const props = defineProps<{
  config: Array<any>
  data: Array<any>
}>();

const xTable = ref()
// 获取表格数据
const getTableData = () => {
  const $table = xTable.value
  let tableData = [] as any
  tableData = $table?.getTableData().tableData
  return tableData
}

defineExpose({
  getTableData
});
</script>

<template>
  <vxe-table
      ref="xTable"
      :data="props.data"
      height="600"
  >
    <vxe-column type="seq" width="60"/>
    <vxe-column
        v-for="conf in props.config"
        :key="conf.field"
        :field="conf.field"
        :title="conf.title"
    >
      <template #default="{ row, column }">
        <!--输入框类型-->
        <template v-if="conf.uiType === 'input'">
          <vxe-input v-model="row[conf.field]"/>
        </template>
        <!--开关类型-->
        <template v-else-if="conf.uiType === 'switch'">
          <vxe-switch v-model="row[conf.field]"/>
        </template>
        <!--下拉类型-->
        <template v-else-if="conf.uiType === 'select'">
          <vxe-select
              v-model="row[conf.field]"
          >
            <vxe-option
                v-for="option in conf.options"
                :key="option.id"
                :label="option.label"
                :value="option.value"
            />
          </vxe-select>
        </template>
        <!--复选框类型-->
        <template v-else-if="conf.uiType === 'checkbox'">
          <vxe-checkbox-group v-model="row[conf.field]">
            <vxe-checkbox
                v-for="option in conf.options"
                :key="option.label"
                :label="option.val"
                :content="option.label"
            />
          </vxe-checkbox-group>
        </template>
        <!--下拉容器类型-->
        <template v-else-if="conf.uiType === 'pulldown'">
          <my-chechbox
              :checkbox-options="conf.options"
              :checkbox-data="row[conf.field]"
          />
        </template>
        <template v-else>
          <span>{{ conf }}</span>
        </template>
      </template>
    </vxe-column>
  </vxe-table>
</template>

<style scoped>

</style>